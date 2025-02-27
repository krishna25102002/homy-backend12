const express = require("express");
const router = express.Router();
const AccountSettings = require("../models/AccountSettings");

// Save account settings
router.post("/", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newAccountSettings = new AccountSettings({ firstName, lastName, email, phoneNumber, password });
    await newAccountSettings.save();
    res.status(201).json({ message: "Account settings saved successfully", accountSettings: newAccountSettings });
  } catch (error) {
    console.error("Error saving account settings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;