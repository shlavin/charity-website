const express = require('express');
const Donation = require('../models/Donation');
const { initiateDonation, mpesaCallback } = require('../controllers/donationController');

const router = express.Router();

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    console.error('Error fetching donations:', err);
    res.status(500).json({ message: 'Server error while fetching donations.' });
  }
});

// Add manual donation
router.post('/', async (req, res) => {
  const { name, amount, message, phoneNumber } = req.body;
  if (!name || !amount) return res.status(400).json({ message: 'Name and amount required.' });

  try {
    const newDonation = new Donation({ name, amount, message, phoneNumber, status: 'Completed' });
    const savedDonation = await newDonation.save();
    res.status(201).json(savedDonation);
  } catch (err) {
    console.error('Error saving donation:', err);
    res.status(400).json({ message: 'Error saving donation data.' });
  }
});

// M-Pesa donation
router.post('/mpesa', initiateDonation);

// M-Pesa callback
router.post('/mpesa/callback', mpesaCallback);

module.exports = router;
