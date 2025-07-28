import { useContext } from "react";

import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';

// Import API service for deleting comments
import { API } from '../../../service/api';
// Import context for accessing user account information
import { DataContext } from "../../../context/DataProvider";

// Styled component for the comment container
// Provides background color and padding for each comment
const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

// Styled component for the comment header
// Arranges author name, date, and delete button in a row
const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

// Styled component for the author name
// Makes the author name bold and properly sized
const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

// Styled component for the comment date
// Uses smaller, muted text for the date
const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

// Styled component for the delete icon
// Positions the delete button on the right side
const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

// Main Comment component for displaying individual comments
const Comment = ({ comment, setToggle }) => {

    // Get user account information from context
    const { account } = useContext(DataContext)

    // Function to delete a comment
    const removeComment = async () => {
        try {
            // Call API to delete the comment
            let response = await API.deleteComment(comment._id);
            if (response.isSuccess) {
                // Toggle to trigger re-fetching of comments
                setToggle(prevState => !prevState);
                console.log('Comment deleted successfully');
            }
        }
        catch (error) {
            // Handle errors when deleting comment
            console.log('Error in deleting comment:', error);
        }    
    }

    return (
        <Component>
            {/* Comment header with author info and delete button */}
            <Container>
                {/* Display the comment author's name */}
                <Name>{comment.name}</Name>
                {/* Display the comment date */}
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {/* Show delete button only to comment owner */}
                {comment.name === account.username && <DeleteIcon onClick={() => removeComment()} />}
            </Container>
            {/* Display the comment text */}
            <Typography>{comment.comments}</Typography>
        </Component>
    )
}

export default Comment;