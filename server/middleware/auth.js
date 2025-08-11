import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({ success: false, message: 'Unauthorized access', token });
    }

    try {
        const userId = jwt.decode(token, process.env.JWT_SECRET);
        if (!userId) {
            return res.json({ success: false, message: 'Unauthorized access', token });
        }
        // req.user = await User.findById(userId).select("-password")
        req.user = userId
        // return res.json({ success: false, message: 'access', token ,userId});

        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return res.json({ success: false, message: 'Unauthorized access' });
    }
}
