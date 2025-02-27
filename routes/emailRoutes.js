const express = require('express');
const router = express.Router();
const Email = require('../models/Email'); // Import the Email model

// Route to handle email submission
router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email already exists in the database
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(200).json({ message: 'We will connect with you soon.' });
    }

    // Save the email to the database
    const newEmail = new Email({ email });
    await newEmail.save();

    res.status(201).json({ message: 'Email stored successfully', email: newEmail });
  } catch (error) {
    console.error('Error storing email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;