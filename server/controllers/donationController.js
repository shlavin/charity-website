const axios = require('axios');
const Donation = require('../models/Donation');

const {
  M_PESA_CONSUMER_KEY,
  M_PESA_CONSUMER_SECRET,
  M_PESA_SHORTCODE,
  M_PESA_PASSKEY,
  M_PESA_CALLBACK_URL
} = process.env;

// Generate Access Token
const getAccessToken = async () => {
  const auth = Buffer.from(`${M_PESA_CONSUMER_KEY}:${M_PESA_CONSUMER_SECRET}`).toString("base64");
  const response = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return response.data.access_token;
};

// Initiate M-Pesa Payment
exports.initiateDonation = async (req, res) => {
  try {
    console.log("Received donation request:", req.body); // Debug log
    const { phoneNumber, amount } = req.body;

    if (!phoneNumber || !amount) {
      return res.status(400).json({ error: "Phone number and amount are required" });
    }

    // Save pending donation in DB
    const donation = new Donation({ phoneNumber, amount, status: 'Pending' });
    await donation.save();

    const accessToken = await getAccessToken();

    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14);

    const password = Buffer.from(`${M_PESA_SHORTCODE}${M_PESA_PASSKEY}${timestamp}`).toString("base64");

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: M_PESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: M_PESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: M_PESA_CALLBACK_URL,
        AccountReference: "Donation",
        TransactionDesc: "Charity Donation"
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.status(200).json({
      message: "Donation request sent",
      data: response.data
    });
  } catch (error) {
    console.error("M-Pesa Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Error initiating donation" });
  }
};

// M-Pesa Callback
exports.mpesaCallback = async (req, res) => {
  try {
    console.log("M-Pesa Callback:", req.body);

    const callbackData = req.body.Body.stkCallback;

    if (callbackData.ResultCode === 0) {
      const receiptNumber = callbackData.CallbackMetadata.Item.find(item => item.Name === "MpesaReceiptNumber")?.Value;
      const amount = callbackData.CallbackMetadata.Item.find(item => item.Name === "Amount")?.Value;
      const phoneNumber = callbackData.CallbackMetadata.Item.find(item => item.Name === "PhoneNumber")?.Value;
      const transactionDate = callbackData.CallbackMetadata.Item.find(item => item.Name === "TransactionDate")?.Value;

      await Donation.findOneAndUpdate(
        { phoneNumber, amount, status: 'Pending' },
        { receiptNumber, transactionDate, status: 'Completed' }
      );
    } else {
      await Donation.findOneAndUpdate(
        { phoneNumber: req.body.phoneNumber, status: 'Pending' },
        { status: 'Failed' }
      );
    }

    res.status(200).send("Callback received successfully");
  } catch (error) {
    console.error("Error processing callback:", error);
    res.status(500).send("Error");
  }
};
