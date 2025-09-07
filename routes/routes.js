// This file defines all the API routes for the blog application
import express from "express";
// import cors from 'cors';

// const app = express();

// app.use(cors());

// Import controllers for user, image, post, and comment operations
import { signUserUp, loginUser, refreshToken } from "../controller/user-controller.js";
import { getImage, uploadImage } from "../controller/image-controller.js";

// Import upload utility for handling file uploads
import upload from "../utils/upload.js";

import { createPost, getAllPosts, getPost, updatePost, deletePost } from "../controller/post-controller.js";
import { newComment ,getComments,deleteComment} from "../controller/comment-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";

// Create a new router object
const router = express.Router();

// User signup route
router.post('/signup', signUserUp);
// User login route
router.post('/login', loginUser);
// Refresh token route
router.post('/token', refreshToken);
// File upload route
router.post('/file/upload', upload.single('file'), uploadImage);
// Get image by filename
router.get('/file/:filename', getImage);
// Create a new post (protected route)
router.post('/create', authenticateToken, createPost); ///check
// Get all posts (protected route)
router.get('/posts', authenticateToken, getAllPosts);
// Get a single post by ID (protected route)
router.get('/post/:id', authenticateToken, getPost);
// Update a post by ID (protected route)
router.put('/update/:id', authenticateToken, updatePost);
// Delete a post by ID (protected route)
router.delete('/delete/:id', authenticateToken, deletePost);

// Add a new comment (protected route)
router.post('/comment/new',authenticateToken,newComment);
// Get comments for a post (protected route)
router.get('/comments/:id',authenticateToken,getComments);
// Delete a comment by ID (protected route)
router.delete('/comment/delete/:id',authenticateToken,deleteComment)

export default router;