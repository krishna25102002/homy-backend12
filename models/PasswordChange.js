const mongoose = require("mongoose");

const passwordChangeSchema = new mongoose.Schema({
  oldPassword: { type: String, required: true },
  newPassword: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

module.exports = mongoose.model("PasswordChange", passwordChangeSchema);