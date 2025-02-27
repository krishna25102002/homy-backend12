require("dotenv").config();
const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Generate random OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Fetch all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a user and send OTP
const createUser = async (req, res) => {
    try {
        const { name, email, mobile, password, isReferred } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = generateOtp();
        const userId = uuidv4();

        const newUser = await User.create({
            name,
            email,
            mobile,
            password: hashedPassword,
            isReferred,
            otp,
            userId,
            isVerified: false
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Hello ${name},\n\nYour OTP is: ${otp}\n\nThank you for registering with us!`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).json({ message: 'Failed to send OTP email' });
            }
            res.status(201).json({ message: 'User registered successfully, OTP sent to email', user: newUser });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Verify OTP
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp === otp) {
            user.isVerified = true;
            user.otp = ''; 
            await user.save();
            res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(email,password);
        

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if user is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Account not verified. Please verify using OTP.' });
        }

        const userID =user.userId

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({ message: 'Login successful', token, userID });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllUsers, createUser, verifyOtp, loginUser };
