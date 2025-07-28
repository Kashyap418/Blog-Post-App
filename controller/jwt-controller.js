// This file handles JWT authentication for protected routes
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Token from '../model/token.js';

dotenv.config();

// Middleware to authenticate JWT tokens
export const authenticateToken = (request, response, next) => {
    // Get the token from the Authorization header
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        // If no token is provided, return 401
        return response.status(401).json({ msg: 'token is missing' });
    }

    // Verify the token using the secret key
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            // If token is invalid, return 403
            return response.status(403).json({ msg: 'invalid token' })
        }

        // If token is valid, attach user info to request and continue
        request.user = user;
        next();
    })
}