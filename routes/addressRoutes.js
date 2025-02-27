const express = require("express");
const router = express.Router();
const Address = require("../models/Address");

// Save address data
router.post("/", async (req, res) => {
  const { address, country, city, zipCode, state, mapLocation } = req.body;

  try {
    const newAddress = new Address({ address, country, city, zipCode, state, mapLocation });
    await newAddress.save();
    res.status(201).json({ message: "Address data saved successfully", address: newAddress });
  } catch (error) {
    console.error("Error saving address data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;