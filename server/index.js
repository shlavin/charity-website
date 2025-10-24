// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');
const connectDB = require('./config/db');

// Routes
const donationRoutes = require('./routes/donationRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true,
}));
app.use(express.json());

// Configure SendGrid (optional)
if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.startsWith('SG.')) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('✅ SendGrid configured');
} else {
  console.warn('⚠️ SendGrid API key missing or invalid — email notifications disabled');
}

// Environment check for M-Pesa credentials
const mpesaVars = [
  'M_PESA_CONSUMER_KEY',
  'M_PESA_CONSUMER_SECRET',
  'M_PESA_SHORTCODE',
  'M_PESA_PASSKEY',
  'M_PESA_CALLBACK_URL'
];
const missingMpesaVars = mpesaVars.filter(v => !process.env[v]);
if (missingMpesaVars.length) {
  console.warn(`⚠️ Missing M-Pesa environment variables: ${missingMpesaVars.join(', ')}`);
} else {
  console.log('✅ M-Pesa environment variables loaded');
}

// API Routes
app.use('/api/donations', donationRoutes);
app.use('/api/contact', contactRoutes);

// Optional: Donation email notification route
app.post('/api/notify-donation', async (req, res) => {
  const { name, email, amount } = req.body;

  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_API_KEY.startsWith('SG.')) {
    return res.status(503).json({ success: false, message: 'Email notifications are disabled.' });
  }

  const msg = {
    to: process.env.ADMIN_EMAIL,
    from: process.env.SENDER_EMAIL,
    subject: 'New Donation Received 🎉',
    text: `You received a donation of $${amount} from ${name} (${email}).`,
    html: `
      <h2>Donation Alert</h2>
      <p><strong>Amount:</strong> $${amount}</p>
      <p><strong>Donor:</strong> ${name} (${email})</p>
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true, message: "Donation email sent!" });
  } catch (error) {
    console.error("❌ SendGrid error:", error);
    res.status(500).json({ success: false, message: "Failed to send donation email." });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('🌍 Charity API is running smoothly 🚀');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
