const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// Save profile data
router.post("/", async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    email,
    position,
    phoneNumber,
    website,
    about,
    address,
    city,
    zipCode,
    state,
  } = req.body;

  // Validate required fields
  if (!username || !firstName || !lastName || !phoneNumber || !address || !city || !zipCode || !state) {
    return res.status(400).json({ message: "Username, First Name, Last Name, Phone Number, Address, City, Zip Code, and State are required." });
  }

  try {
    const newProfile = new Profile({
      username,
      firstName,
      lastName,
      email,
      position,
      phoneNumber,
      website,
      about,
      address,
      city,
      zipCode,
      state,
    });
    await newProfile.save();
    res.status(201).json({ message: "Profile data saved successfully", profile: newProfile });
  } catch (error) {
    console.error("Error saving profile data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;