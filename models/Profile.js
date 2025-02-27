const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: false }, // Optional
  position: { type: String, required: false }, // Optional
  phoneNumber: { type: String, required: true },
  website: { type: String, required: false }, // Optional
  about: { type: String, required: false }, // Optional
  address: { type: String, required: true }, // New field
  city: { type: String, required: true }, // New field
  zipCode: { type: String, required: true }, // New field
  state: { type: String, required: true }, // New field
});

module.exports = mongoose.model("Profile", profileSchema);