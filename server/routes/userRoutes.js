import express from 'express';
import { isAuthenticated, loginUser, logoutUser, registerUser, sendVerifyOtp, verifyEmail } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', logoutUser);
userRoutes.post('/send-verify-otp', protect, sendVerifyOtp);
userRoutes.post('/verify-account', protect, verifyEmail);
userRoutes.post('/is-auth', protect, isAuthenticated);

export default userRoutes;