// This component allows users to create new blog posts
// It provides a form interface for writing posts with title, description, and image upload functionality
import React, { useState, useEffect, useContext } from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

// Import API service for creating posts and uploading files
import { API } from '../../service/api';
// Import context for accessing user account information
import { DataContext } from '../../context/DataProvider';

// Styled component for the main container
// Provides responsive margins that adjust on smaller screens
const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

// Styled component for the post image
// Makes the image responsive and maintains aspect ratio
const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

// Styled component for the form control containing title input and publish button
// Arranges elements in a horizontal row with proper spacing
const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

// Styled component for the title input field
// Large font size for the main title with proper margins
const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

// Styled component for the description textarea
// Full width text area for the post content with no border and proper focus styling
const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

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
    // Get user account information from context
    const { account } = useContext(DataContext);

    // URL for the post image (either uploaded image or default placeholder)
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    // Effect to handle image upload and set post metadata
    useEffect(() => {
        // Function to upload image file to server
        const getImage = async () => {
            if (file) {
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
        try {
            // Call API to create the post
            let response=await API.createPost(post);
            if(response.isSuccess){
                // If successful, navigate to home page
                navigate('/');
            }

        } catch (error) {
            // Handle any errors during post creation
            console.error('Failed to create post:', error);
        }
    };

    // Function to handle input changes in form fields
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            {/* Display the post image (uploaded or default) */}
            <Image
                src={url}
                alt="post"
                onError={(e) => {
                    // Handle image loading errors with fallback
                    console.error('Image failed to load:', url);
                    e.target.src = 'https://via.placeholder.com/150'; // Replace with a fallback URL
                }}
            />

            {/* Form control for title input and publish button */}
            <StyledFormControl>
                {/* Hidden file input triggered by the Add icon */}
                <label htmlFor="fileInput" aria-label="Upload image">
                    <Add fontSize="large" color="action" />
                </label>

                {/* Hidden file input for image selection */}
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                {/* Title input field */}
                <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                {/* Publish button to save the post */}
                <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>

            {/* Description textarea for post content */}
            <Textarea
                minRows={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)}
            />

        </Container>
    )
}

export default CreatePost;