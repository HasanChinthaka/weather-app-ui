import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from '../configs/nodemailer.js';
import oauth2client from "../configs/googleOAuth.js";

// Generate a JWT token
const generateToken = (userId) => {
    const payload = userId;
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password || !email.includes('@') || !email.includes('.') || password.length < 8) {
            // return res.status(400).json({ message: 'All fields are required' });
            return res.json({ success: false, message: 'All fields are required' });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(user._id.toString());

        // Sending email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome Weather APP',
            text: `Welcome to weather app, ${name}. Your account has been created with email ${email}.`
        }
        await transporter.sendMail(mailOptions);

        res.json({ success: true, token })

    }
    catch (error) {
        console.error('Error registering user:', error.message);
        return res.json({ success: false, message: error.message });
    }
}

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password || !email.includes('@') || !email.includes('.') || password.length < 8) {
            return res.json({ success: false, message: 'All fields are required' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User does not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user._id.toString());



        res.json({ success: true, token });

    } catch (error) {
        console.error('Error logging in user:', error.message);
        return res.json({ success: false, message: error.message });
    }
}

// Register with google account
export const loginWithGoogle = async (req, res) => {
    try {
        console.log("query",req.body)
        const { code } = req.body;
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);

        const userRes = await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        //     {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        )
        const userData = await userRes.json();
console.log(userData)
        const { email, name, picture } = userData;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash('pa$$w0rd', 10);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(user._id.toString());

        // Sending email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome Weather APP',
            text: `Welcome to weather app, ${name}. Your account has been created with email ${email}.`
        }
        await transporter.sendMail(mailOptions);

        res.json({ success: true, token })

    } catch (error) {
console.log("error loging  with google",error)
    }
}

// Logout
export const logoutUser = async (req, res) => {
    try {
        res.json({ success: true, message: 'Logged Out' });
    }
    catch (error) {
        console.error('Error geting in user:', error.message);
        return res.json({ success: false, message: error.message });
    }
}

// otp email
export const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId);
        // return res.json({ success: false, user });

        if (user.isAccountVerified) {
            return res.json({ success: false, message: 'Account is already verified' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 1000;
        await user.save();

        // send otp mail
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Accounnt Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP`
        }

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: 'Verification mail  send' });

    } catch (error) {
        console.error('Error geting in user:', error.message);
        return res.json({ success: false, message: error.message });
    }
}

// verify otp
export const verifyEmail = async (req, res) => {
    const userId = req.user;
    const { otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

        return res.json({ success: true, message: 'Email verified successfully' });

    } catch (error) {
        console.error('Error :', error.message);
        return res.json({ success: false, message: error.message });
    }
}

// checck authenticated or not
export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true, message: 'User authenticated' })
    } catch (error) {
        console.error('Error :', error.message);
        return res.json({ success: false, message: error.message });
    }
}