// This file handles user signup and login operations
import User from "../model/user.js";
import jwt from 'jsonwebtoken';

// Import bcrypt for password hashing
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import Token from "../model/token.js";
import { response } from "express";

dotenv.config();

// Controller to handle user signup
export const signUserUp = async (req, res) => {
    try {
        // Validate input
        if (!req.body.name || !req.body.username || !req.body.password) {
            return res.status(400).json({ 
                msg: 'Name, username, and password are required',
                field: 'required'
            });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username: req.body.username.trim() });
        if (existingUser) {
            return res.status(400).json({ 
                msg: 'Username already exists. Please choose a different username.',
                field: 'username'
            });
        }

        // Generate a salt and hash the user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user object with the hashed password
        const user = { 
            name: req.body.name.trim(),
            username: req.body.username.trim(),
            password: hashedPassword 
        };

        // Save the new user to the database
        const newUser = new User(user);
        await newUser.save();
        console.log('User signed up successfully');
        return res.status(200).json({ msg: 'Account created successfully! You can now sign in.' });
    }
    catch (error) {
        // Handle server errors
        console.error('Signup error:', error);
        
        // Handle specific MongoDB errors
        if (error.code === 11000) {
            return res.status(400).json({ 
                msg: 'Username already exists. Please choose a different username.',
                field: 'username'
            });
        }
        
        return res.status(500).json({ 
            msg: 'Server error occurred during signup. Please try again later.',
            field: 'server'
        });
    }
}

// Controller to handle user login
export const loginUser = async (req, res) => {
    try {
        // Validate input
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ 
                msg: 'Username and password are required',
                field: 'both'
            });
        }

        // Find the user by username
        let user = await User.findOne({ username: req.body.username.trim() });
        if (!user) {
            // If user not found, return 400
            return res.status(400).json({ 
                msg: 'Username does not exist. Please check your username or sign up for a new account.',
                field: 'username'
            });
        }

        // Compare the provided password with the hashed password
        let match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            // If password matches, generate access and refresh tokens
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            // Save the refresh token in the database
            const newToken = await Token({ token: refreshToken });
            await newToken.save();
            return res.status(200).json({ accessToken, refreshToken, name: user.name, username: user.username });

        } else {
            // If password does not match, return 400
            return res.status(400).json({ 
                msg: 'Incorrect password. Please check your password and try again.',
                field: 'password'
            });
        }
    } catch (error) {
        // Handle server errors
        console.error('Login error:', error);
        return res.status(500).json({ 
            msg: 'Server error occurred during login. Please try again later.',
            field: 'server'
        });
    }
}

// Controller to handle refresh token requests
export const refreshToken = async (req, res) => {
    try {
        // Get the refresh token from the request body
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({ 
                msg: 'Refresh token is required',
                field: 'refreshToken'
            });
        }

        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
        
        // Check if the refresh token exists in the database
        const tokenExists = await Token.findOne({ token: refreshToken });
        if (!tokenExists) {
            return res.status(401).json({ 
                msg: 'Invalid refresh token',
                field: 'refreshToken'
            });
        }

        // Get the user information
        const user = await User.findOne({ username: decoded.username });
        if (!user) {
            return res.status(401).json({ 
                msg: 'User not found',
                field: 'user'
            });
        }

        // Generate new access token
        const newAccessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });

        // Return the new access token
        return res.status(200).json({ 
            accessToken: newAccessToken,
            name: user.name,
            username: user.username
        });

    } catch (error) {
        console.error('Refresh token error:', error);
        
        // Handle JWT errors
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                msg: 'Invalid or expired refresh token',
                field: 'refreshToken'
            });
        }
        
        return res.status(500).json({ 
            msg: 'Server error occurred during token refresh. Please try again later.',
            field: 'server'
        });
    }
}