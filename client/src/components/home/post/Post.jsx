// This component displays an individual blog post card
// It shows the post image, title, description, author, and category in a compact format
import { styled, Box, Typography } from '@mui/material';

// Styled component for the post card container
// Creates a bordered card with rounded corners and proper spacing
const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 350px;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

// Styled component for the post image
// Makes the image responsive and maintains aspect ratio with rounded top corners
const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

// Styled component for secondary text (category, author)
// Uses muted gray color and smaller font size
const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

// Styled component for the post title
// Uses larger, bold font for the main heading
const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

// Styled component for the post description
// Uses medium font size with word break for long text
const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;

// Main Post component for displaying individual post cards
const Post = ({ post }) => {
    // Default image URL for posts without images
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    
    // Function to truncate text with ellipsis if it exceeds the limit
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 

    return (
        <Container>
            {/* Display the post image (or default if none exists) */}
            <Image src={url} alt="post" />
            {/* Display the post category */}
            <Text>{post.categories}</Text>
            {/* Display the post title (truncated if too long) */}
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            {/* Display the post author */}
            <Text>Author: {post.username}</Text>
            {/* Display the post description (truncated if too long) */}
            <Details>{addEllipsis(post.description, 100)}</Details>
        </Container>
    )
}

export default Post;