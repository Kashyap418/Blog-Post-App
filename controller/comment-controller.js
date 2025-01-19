import Comment from '../model/comment.js';

import Joi from 'joi';

const commentSchema = Joi.object({
    name: Joi.string().required(),
    postId: Joi.string().required(),
    date: Joi.date().required(),
    comments: Joi.string().required()
});

export const newComment = async (request, response) => {
    try {
        const { error } = commentSchema.validate(request.body);
        if (error) {
            return response.status(400).json({ msg: error.details[0].message });
        }

        const comment = new Comment(request.body);
        await comment.save();
        response.status(200).json({ msg: 'Comment added successfully' });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json({error:error.message});
    }
}

export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);
        if (!comment) {
            return response.status(404).json({ msg: 'Comment not found' });
        }

        // Use findByIdAndDelete directly or call remove() on the comment instance
        await Comment.findByIdAndDelete(request.params.id);
        response.status(200).json({ msg: 'Comment deleted successfully' });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};
