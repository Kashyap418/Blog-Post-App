// This file defines the Token model for MongoDB using Mongoose
import mongoose from "mongoose";

// Define the schema for a token
const tokenSchema=mongoose.Schema({
    token:{
        type:String,
        required:true // Token value is required
    }
})

// Create the Token model from the schema
const token =mongoose.model('token',tokenSchema);

export default token;