// This component allows users to create new blog posts
// It provides a modern form interface for writing posts with title, description, and image upload functionality
import React, { useState, useEffect, useContext } from 'react';

import { 
    Box, 
    TextField, 
    Button, 
    Paper,
    Container,
    Typography,
    IconButton,
    Alert,
    Chip,
    Avatar,
    Divider
} from '@mui/material';
import { 
    AddPhotoAlternate as AddPhotoIcon,
    Publish as PublishIcon,
    Person as PersonIcon,
    Category as CategoryIcon,
    Image as ImageIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

// Import API service for creating posts and uploading files
import { API } from '../../service/api';
// Import context for accessing user account information
import { DataContext } from '../../context/DataProvider';

// Initial state for a new post
// Contains empty values for all post fields with current date
const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

// Main CreatePost component for creating new blog posts
const CreatePost = () => {
    // Navigation hook for redirecting after post creation
    const navigate = useNavigate();
    // Location hook for accessing URL parameters (like category)
    const location = useLocation();

    // State to store the post data
    const [post, setPost] = useState(initialPost);
    // State to store the selected image file
    const [file, setFile] = useState('');
    // State for loading
    const [loading, setLoading] = useState(false);
    // State for error messages
    const [error, setError] = useState('');
    // Get user account information from context
    const { account } = useContext(DataContext);

    // URL for the post image (either uploaded image or default placeholder)
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    // Effect to handle image upload and set post metadata
    useEffect(() => {
        // Function to upload image file to server
        const getImage = async () => {
            if (file) {
                try {
                    // Create FormData to send file to server
                    const data = new FormData();
                    data.append("name", file.name);
                    data.append("file", file);
                    console.log("File uploaded from CreatePost :)");
                    console.log('File being uploaded:', file);
                    // Upload file and get the URL
                    const response = await API.uploadFile(data);
                    console.log('Upload response:', response);
                    // Update post with the uploaded image URL
                    setPost(prev => ({ ...prev, picture: response.data }));
                    console.log('URL is ', response.data);
                } catch (error) {
                    console.error('Image upload failed:', error);
                    setError('Failed to upload image. Please try again.');
                }
            }
        };
        getImage();
        // Set category from URL parameter and username from account
        setPost(prev => ({
            ...prev,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username
        }));
    }, [file]);

    // Function to save the post to the database
    const savePost = async () => {
        if (!post.title.trim() || !post.description.trim()) {
            setError('Please fill in both title and description.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            // Call API to create the post
            let response = await API.createPost(post);
            if (response.isSuccess) {
                // If successful, navigate to home page
                navigate('/');
            } else {
                setError('Failed to create post. Please try again.');
            }
        } catch (error) {
            // Handle any errors during post creation
            console.error('Failed to create post:', error);
            setError('Failed to create post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to handle input changes in form fields
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper
                elevation={3}
                sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    backgroundColor: 'white',
                }}
            >
                {/* Header Section */}
                <Box
                    sx={{
                        p: 3,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        Create New Post
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Share your thoughts and ideas with the community
                    </Typography>
                </Box>

                {/* Main Content */}
                <Box sx={{ p: 4 }}>
                    {/* Error Alert */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Image Section */}
                    <Paper
                        elevation={1}
                        sx={{
                            mb: 4,
                            borderRadius: 3,
                            overflow: 'hidden',
                            border: '2px dashed',
                            borderColor: 'grey.300',
                            position: 'relative',
                            minHeight: 300,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {post.picture ? (
                            <Box sx={{ position: 'relative', width: '100%' }}>
                                <img
                                    src={url}
                                    alt="post"
                                    style={{
                                        width: '100%',
                                        height: '300px',
                                        objectFit: 'cover',
                                    }}
                                    onError={(e) => {
                                        console.error('Image failed to load:', url);
                                        e.target.src = 'https://via.placeholder.com/600x300?text=Image+Failed+to+Load';
                                    }}
                                />
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 1)',
                                        },
                                    }}
                                    onClick={() => setPost(prev => ({ ...prev, picture: '' }))}
                                >
                                    <ImageIcon />
                                </IconButton>
                            </Box>
                        ) : (
                            <Box sx={{ textAlign: 'center', p: 4 }}>
                                <ImageIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                                    Add a cover image
                                </Typography>
                                <Button
                                    variant="outlined"
                                    startIcon={<AddPhotoIcon />}
                                    component="label"
                                    sx={{
                                        borderColor: 'primary.main',
                                        color: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'primary.50',
                                            borderColor: 'primary.dark',
                                        },
                                    }}
                                >
                                    Upload Image
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </Button>
                            </Box>
                        )}
                    </Paper>

                    {/* Form Fields */}
                    <Box sx={{ mb: 4 }}>
                        {/* Title Input */}
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                            placeholder="Enter your post title..."
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                },
                            }}
                        />

                        {/* Category and Author Info */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                            <Chip
                                icon={<CategoryIcon />}
                                label={`Category: ${post.categories}`}
                                variant="outlined"
                                sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                            />
                            <Chip
                                icon={<PersonIcon />}
                                label={`Author: ${post.username}`}
                                variant="outlined"
                                sx={{ borderColor: 'secondary.main', color: 'secondary.main' }}
                            />
                        </Box>

                        {/* Description Textarea */}
                        <TextField
                            fullWidth
                            multiline
                            rows={8}
                            variant="outlined"
                            name="description"
                            value={post.description}
                            onChange={handleChange}
                            placeholder="Tell your story... Share your thoughts, ideas, and experiences with the community."
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    fontSize: '1.1rem',
                                    lineHeight: 1.6,
                                },
                            }}
                        />
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate('/')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 500,
                                borderRadius: 2,
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={savePost}
                            disabled={loading || !post.title.trim() || !post.description.trim()}
                            startIcon={<PublishIcon />}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                '&:hover': {
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                                },
                                '&:disabled': {
                                    background: 'grey.300',
                                    color: 'grey.500',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {loading ? 'Publishing...' : 'Publish Post'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default CreatePost;