// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /api/contact - Submit contact form
router.post("/", async (req, res) => { // Changed from "/contact" to "/"
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Save the contact form data to the database
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "Contact form submitted successfully!" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ success: false, message: "Error submitting contact form." });
  }
});

module.exports = router;