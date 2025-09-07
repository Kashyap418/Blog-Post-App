// This file defines the Post model for MongoDB using Mongoose
import mongoose from 'mongoose';

// Define the schema for a blog post
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is required
        unique: true // Title must be unique
    },
    description: {
        type: String,
        required: true // Description is required
    },
    picture: {
        type: String,
        required: false // Picture is optional
    },
    username: {
        type: String,
        required: true // Username of the post creator is required
    },
    categories: {
        type: Array,
        required: false   // Categories are optional
    },
    createdDate: {
        type: Date // Date when the post was created
    }
});

// Indexes to optimize common queries and sorts
PostSchema.index({ categories: 1, createdDate: -1 }); // feed by category/date
PostSchema.index({ username: 1, createdDate: -1 });   // user profile feed
PostSchema.index({ createdDate: -1 });                 // recent posts
PostSchema.index({ title: 'text', description: 'text' }); // text search

// Create the Post model from the schema
const post = mongoose.model('post', PostSchema);

export default post;