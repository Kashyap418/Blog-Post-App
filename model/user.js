// This file defines the User model for MongoDB using Mongoose
import mongoose from 'mongoose';

// Define the schema for a user
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true // Name is required
    },
    username: {
        type: String,
        required: true, // Username is required
        unique: true // Username must be unique
    },
    password: {
        type: String,
        required: true // Password is required
    }
});

// Create the User model from the schema
const user = mongoose.model('user', userSchema);

export default user;