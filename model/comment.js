// This file defines the Comment model for MongoDB using Mongoose
import mongoose from 'mongoose';

// Define the schema for a comment
const CommentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, // Name of the commenter is required
    },
    postId: {
        type: String,
        required: true // ID of the post being commented on is required
    },
    date: {
        type: Date,
        required: true // Date of the comment is required
    },
    comments: {
        type: String,
        required: true // The comment text is required
    }
});

// Indexes for efficient lookups and ordering
CommentSchema.index({ postId: 1, date: -1 }); // comments by post, newest first
CommentSchema.index({ date: -1 });

// Create the Comment model from the schema
const comment = mongoose.model('comment', CommentSchema);

export default comment;