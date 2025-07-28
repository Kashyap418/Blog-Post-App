// This component allows users to update existing blog posts
// It provides a form interface for editing posts with pre-filled data from the existing post
import React, { useState, useEffect, useContext } from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation ,useParams } from 'react-router-dom';

// Import API service for updating posts and uploading files
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

// Styled component for the form control containing title input and update button
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

// Initial state for a post (will be populated with existing post data)
// Contains empty values that will be replaced with current post data
const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

// Main Update component for editing existing blog posts
const Update = () => {
    // Navigation hook for redirecting after post update
    const navigate = useNavigate();
    // Location hook for accessing URL parameters (like category)
    const location = useLocation();

    // State to store the post data (will be populated with existing post)
    const [post, setPost] = useState(initialPost);
    // State to store the selected image file for upload
    const [file, setFile] = useState('');
    // Get user account information from context
    const { account } = useContext(DataContext);

    // Get the post ID from URL parameters
    const {id}=useParams();

    // URL for the post image (either existing image or default placeholder)
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    // Effect to fetch existing post data when component mounts
    useEffect(()=>{
        // Function to fetch the existing post by ID
        const fetchData= async ()=>{
            let response= await API.getPostById(id);
            if(response.isSuccess){
                 // Populate the form with existing post data
                 setPost(response.data);
            }
        }
        fetchData();
    },[])

    // Effect to handle image upload and set post metadata
    useEffect(() => {
        // Function to upload new image file to server
        const getImage = async () => {
            if (file) {
                // Create FormData to send file to server
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                // console.log("gupta");
                console.log('File being uploaded:', file);
                // Upload file and get the URL
                const response = await API.uploadFile(data);
                console.log('Upload response:', response);
                // Update post with the new uploaded image URL
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

    // Function to update the post in the database
    const updateBlogPost = async () => {
        try {
            // Call API to update the post
            let response=await API.updatePost(post);
            if(response.isSuccess){
                // If successful, navigate to the post details page
                navigate(`/details/${id}`);
            }

        } catch (error) {
            // Handle any errors during post update
            console.error('Failed to update post:', error);
        }
    };

    // Function to handle input changes in form fields
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            {/* Display the post image (existing or default) */}
            <Image
                src={url}
                alt="post"
                onError={(e) => {
                    // Handle image loading errors with fallback
                    console.error('Image failed to load:', url);
                    e.target.src = 'https://via.placeholder.com/150'; // Replace with a fallback URL
                }}
            />

            {/* Form control for title input and update button */}
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
                {/* Title input field with pre-filled value */}
                <InputTextField value={post.title} onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                {/* Update button to save the changes */}
                <Button onClick={() => updateBlogPost()} variant="contained" color="primary">Update</Button>
            </StyledFormControl>

            {/* Description textarea with pre-filled value */}
            <Textarea
                minRows={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)}
                value={post.description}
            />

        </Container>
    )
}

export default Update;