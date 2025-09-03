import express from 'express';
import { loginUser, registerUser, logoutUser, sendOtp, verifyOtp, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser); // A logout route is useful for clearing cookies
router.post('/forgot-password', sendOtp); // New route
router.post('/verify-otp', verifyOtp); // New route
router.patch('/reset-password', resetPassword); // New route

export default router;