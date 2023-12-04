import { IUser } from "../models/User";
import jwt from 'jsonwebtoken';

export function generateToken(user: IUser) {
    const secretKey = 'yourSecretKey'; // Replace with your actual secret key
    const payload = {
        userId: user._id,
        email: user.email,
        role: user.role, // Assuming you have a 'role' property in your IUser interface
    };

    const options = {
        expiresIn: '1h', // You can adjust the expiration time as needed
    };

    return jwt.sign(payload, secretKey, options);
}