const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    isReferred: { type: Boolean, default: false },
    otp: { type: String, default: "" },
    googleId: { type: String, default: null },
    lastLoginTime: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },
    isSignedWithGoogle: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    userId: { type: String, required: true, unique: true },
    accountCreatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
