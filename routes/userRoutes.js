const express = require('express');
const { getAllUsers, createUser, verifyOtp, loginUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/add', createUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser); // This is the login route
module.exports = router;
