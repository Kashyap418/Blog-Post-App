// This file handles all comment-related operations for the blog application
import Comment from '../model/comment.js';

// Import Joi for input validation
import Joi from 'joi';

// Define the schema for a comment using Joi
const commentSchema = Joi.object({
    name: Joi.string().required(), // Name of the commenter
    postId: Joi.string().required(), // ID of the post being commented on
    date: Joi.date().required(), // Date of the comment
    comments: Joi.string().required() // The comment text
});

// Controller to add a new comment
export const newComment = async (request, response) => {
    try {
        // Validate the request body against the schema
        const { error } = commentSchema.validate(request.body);
        if (error) {
            // If validation fails, send a 400 error
            return response.status(400).json({ msg: error.details[0].message });
        }

        // Create a new comment and save it to the database
        const comment = new Comment(request.body);
        await comment.save();
        response.status(200).json({ msg: 'Comment added successfully' });
    } catch (error) {
        // Handle server errors
        response.status(500).json({ error: error.message });
    }
};

// Controller to get all comments for a specific post
export const getComments = async (request, response) => {
    try {
        // Find comments by postId
        const comments = await Comment.find({ postId: request.params.id });
        
        response.status(200).json(comments);
    } catch (error) {
        // Handle server errors
        response.status(500).json({error:error.message});
    }
}

// Controller to delete a comment by its ID
export const deleteComment = async (request, response) => {
    try {
        // Find the comment by ID
        const comment = await Comment.findById(request.params.id);
        if (!comment) {
            // If comment not found, send a 404 error
            console.log('Comment not found');
            return response.status(404).json({ msg: 'Comment not found' });
        }

        // Delete the comment from the database
        await Comment.findByIdAndDelete(request.params.id);
        response.status(200).json({ msg: 'Comment deleted successfully' });
    } catch (error) {
        // Handle server errors
        response.status(500).json({ error: error.message });
    }
};
