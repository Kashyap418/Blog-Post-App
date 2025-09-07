// This file handles the connection to the MongoDB database
import mongoose from 'mongoose';
import logger from '../utils/logger.js';

// Function to connect to MongoDB using Mongoose
const Connection = async (username, password) => {
    // Build the MongoDB connection URL
    const URL = `mongodb://${username}:${password}@blog-app-shard-00-00.mfzqo.mongodb.net:27017,blog-app-shard-00-01.mfzqo.mongodb.net:27017,blog-app-shard-00-02.mfzqo.mongodb.net:27017/?ssl=true&replicaSet=atlas-k2wn1l-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`;

    try {
        // Try to connect to the database
        await mongoose.connect(URL);
        logger.info('Database Connected Successfully');
    } catch (error) {
        // If connection fails, log the error
        logger.error('Error while Connecting Database', { error: error.message || error });
    }
};

export default Connection;