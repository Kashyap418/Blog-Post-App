// This component displays the full details of a blog post
// It shows the post content, author information, and provides edit/delete options for post owners
import { useState, useEffect, useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom'

// Import API service for fetching and deleting posts
import { API } from '../../service/api';

// Import context for accessing user account information
import { DataContext } from '../../context/DataProvider';

// Import Comments component to display post comments
import Comments from './comments/Comments';

// Styled component for the main container
// Provides responsive margins that adjust on smaller screens
const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

// Styled component for the post image
// Makes the image responsive and maintains aspect ratio
const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

// Styled component for the edit icon
// Adds border and padding for better visual appearance
const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

// Styled component for the delete icon
// Adds border and padding for better visual appearance
const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

// Styled component for the post title
// Large, centered heading with proper spacing
const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

// Styled component for author information
// Displays author name and date with responsive layout
const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

// Main DetailView component for displaying full post details
const DetailView = () => {
    // Default image URL for posts without images
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    // State to store the post data
    const [post, setPost] = useState({});
    // Get user account information from context
    const { account } = useContext(DataContext);

    // Navigation hook for redirecting after actions
    const navigate = useNavigate();
    // Get the post ID from URL parameters
    const { id } = useParams();

    // Effect to fetch post data when component mounts
    useEffect(() => {
        // Function to fetch post details by ID
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response && response.isSuccess) {
                // Set the post data in state
                setPost(response.data);
            } else {
                // Log error if response is unexpected
                console.error('Unexpected response:', response);
            }
        }
        // Only fetch if we have a valid ID
        if (id) fetchData();
    }, [id]);

    // Function to delete the blog post
    const deleteBlog = async () => {
        // Call API to delete the post
        await API.deletePost(post._id);
        // Navigate back to home page after deletion
        navigate('/')
    }

    return (
        <Container>
            {/* Display the post image (or default if none exists) */}
            {post && <Image src={post.picture || url} alt="post" />}
            {/* Edit and delete buttons (only shown to post owner) */}
            <Box style={{ float: 'right' }}>
                {
                    account.username === post.username &&
                    <>
                        {/* Link to edit the post */}
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                        {/* Delete button for the post */}
                        <DeleteIcon onClick={() => deleteBlog()} color="error" />
                    </>
                }
            </Box>
            {/* Display the post title */}
            {post && <Heading>{post.title}</Heading>}

            {/* Display author information and date */}
            <Author>
                {/* Link to filter posts by this author */}
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{ fontWeight: 600 }}>{post.username}</span></Typography>
                </Link>
                {/* Display the post creation date */}
                <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            {/* Display the post description/content */}
            <Typography>{post.description}</Typography>
            {/* Display comments section */}
            <Comments post={post} />
        </Container>
    )
}

export default DetailView;