const express = require("express");
const router = express.Router();
const PasswordChange = require("../models/PasswordChange");

// Change password
router.post("/", async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  // Validate required fields
  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if new password matches confirm password
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "New passwords do not match." });
  }

  try {
    const newPasswordChange = new PasswordChange({ oldPassword, newPassword, confirmPassword });
    await newPasswordChange.save();
    res.status(201).json({ message: "Password changed successfully", passwordChange: newPasswordChange });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;