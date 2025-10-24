const sgMail = require('@sendgrid/mail');
const Contact = require('../models/contact'); // ✅ Import Contact model
require('dotenv').config();

// ✅ Initialize SendGrid only if key exists
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// ✅ Send (and save) contact message
exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // ✅ Save message to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    console.log('📩 Message saved to MongoDB:', newContact);

    // ✅ Optional: Send email via SendGrid (if configured)
    if (process.env.SENDGRID_API_KEY && process.env.SENDER_EMAIL) {
      const msg = {
        to: process.env.ADMIN_EMAIL,
        from: process.env.SENDER_EMAIL,
        subject: `📩 New Contact Form Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <h3>New Contact Form Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      };

      await sgMail.send(msg);
      console.log('✅ Email sent successfully');
    } else {
      console.log('⚠️ SendGrid disabled — message saved only in DB.');
    }

    // ✅ Response to client
    res.status(200).json({
      message: 'Message saved successfully ✅',
      data: newContact,
    });
  } catch (error) {
    console.error('❌ Error handling message:', error.response?.body || error.message);
    res.status(500).json({ error: 'Error processing message ❌' });
  }
};

// ✅ Get all contact messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(messages);
  } catch (error) {
    console.error('❌ Error fetching messages:', error.message);
    res.status(500).json({ error: 'Error fetching messages ❌' });
  }
};
