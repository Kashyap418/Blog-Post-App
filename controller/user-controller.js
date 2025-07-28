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
        // Generate a salt and hash the user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user object with the hashed password
        const user = { ...req.body, password: hashedPassword };

        // Save the new user to the database
        const newUser = new User(user);
        await newUser.save();
        console.log('Sab changa si');
        return res.status(200).json({ msg: 'Signed Up Successfully' });
    }
    catch (error) {
        // Handle server errors
        console.log('Error 500 in user-controller.js', error)
        return res.status(500).json({ msg: 'Error while signup the user' })
    }
}

// Controller to handle user login
export const loginUser = async (req, res) => {
    // Find the user by username
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
        // If user not found, return 400
        return res.status(400).json({ msg: 'Username does not exist' });
    }
    try {
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

        }
        else {
            // If password does not match, return 400
            return res.status(400).json({ msg: 'You have Entered Wrong PassWord' })
        }
    } catch (error) {
        // Handle server errors
        return res.status(500).json({ msg: 'Error while login in user' })
    }
}