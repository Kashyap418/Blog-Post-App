// This component handles the comments section for a blog post
// It allows users to add new comments and displays existing comments
import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

// Import context for accessing user account information
import { DataContext } from '../../../context/DataProvider';

// Import API service for managing comments
import { API } from '../../../service/api';
import { v4 as uuid } from 'uuid';

// Import Comment component to display individual comments
import Comment from './Comment';

// Styled component for the comment input container
// Arranges the comment form elements in a horizontal layout
const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

// Styled component for the user avatar image
// Creates a circular profile picture
const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

// Styled component for the comment input textarea
// Provides proper sizing and spacing for the comment input
const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width: 100%; 
    margin: 0 20px;
`;

// Initial state for a new comment
// Contains empty values that will be populated when user types
const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

// Main Comments component for managing post comments
const Comments = ({post}) => {
    // Default avatar image URL for users
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    // State to store the current comment being typed
    const [comment, setComment] = useState(initialValue);
    // State to store all comments for this post
    const [comments, setComments] = useState([]);
    // State to trigger re-fetching of comments (toggle for refresh)
    const [toggle, setToggle] = useState(false);

    // Get user account information from context
    const { account } = useContext(DataContext);

    // Effect to fetch comments when component mounts or when toggle changes
    useEffect(() => {
        // Function to fetch all comments for this post
        const getData = async () => {
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    // Set the comments in state
                    setComments(response.data);
                }
            } catch (error) {
                 // Handle errors when fetching comments
                 console.error('Error fetching comments:', error);
            }
        }
        // Only fetch comments after the post is loaded
        if(post._id){
            getData(); //we want to load comments only after post is loaded
         }
    }, [post,toggle]);

    // Function to handle changes in the comment input
    const handleChange = (e) => {
        setComment({ 
            ...comment, //what the hell
            name: account.username, // Set the current user's username
            postId: post._id, // Set the current post ID
            comments: e.target.value // Set the comment text
        });
    }

    // Function to add a new comment
    const addComment = async() => {
       // Call API to create the new comment
       let response= await API.newComment(comment);
        if(response.isSuccess){
            // Reset the comment form if successful
            setComment(initialValue)
        }
        // Toggle to trigger re-fetching of comments
        setToggle(prevState => !prevState);
    }

    return (
        <Box>
        {/* Comment input form */}
        <Container>
            {/* User avatar image */}
            <Image src={url} alt="dp" />   
            {/* Comment input textarea */}
            <StyledTextArea 
                rowsmin={5} 
                placeholder="What's on your mind?"
                onChange={(e) => handleChange(e)} 
                value={comment.comments}
            />
            {/* Post comment button */}
            <Button 
                variant="contained" 
                color="primary" 
                size="medium" 
                style={{ height: 40 }}
                onClick={addComment}
            >Post</Button>             
        </Container>
        {/* Display all existing comments */}
        <Box>
            {
                comments && comments.length > 0 && comments.map(comment => (
                    <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                ))
            }
        </Box>
    </Box>
    )
}


export default Comments