// This component displays a grid of blog posts with responsive layout
// It fetches posts from the API and filters them by category if specified
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

// Import API service for fetching posts
import { API } from '../../../service/api';

// Import Post component to display individual posts
import Post from './Post';

// Main Posts component for displaying blog posts
const Posts = () => {
    // State to store the fetched posts
    const [posts, setPosts] = useState([]);
    // Get search parameters to check for category filter
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    // Effect to fetch posts when component mounts or category changes
    useEffect(() => {
        // Function to fetch posts from API
        const fetchData = async () => {
            // Call API with category filter if specified
            const response = await API.getAllPosts({ category: category || '' });
            if (response.isSuccess) {
                // Set the fetched posts in state
                setPosts(response.data);
            }
        };
        fetchData();
    }, [category]);

    return (
        <>
            {/* Check if posts exist and display them */}
            {posts?.length ? (
                // Grid container for posts with responsive layout
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        justifyContent: 'center',
                    }}
                >
                    {/* Map through posts and display each one */}
                    {posts.map((post) => (
                        // Individual post container with responsive sizing
                        <Box
                            key={post._id}
                            sx={{
                                flex: {
                                    xs: '0 0 100%', // Full width on extra small screens
                                    sm: '0 0 calc(100% / 3)', // 1/3 width on small screens
                                    lg: '0 0 calc(100% / 4)', // 1/4 width on large screens
                                },
                                maxWidth: {
                                    xs: '100%',
                                    sm: 'calc(100% / 3)',
                                    lg: 'calc(100% / 4)',
                                },
                            }}
                        >
                            {/* Link to post details page */}
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                to={`details/${post._id}`} //mongodbID
                            >
                                {/* Display individual post component */}
                                <Post post={post} />
                            </Link>
                        </Box>
                    ))}
                </Box>
            ) : (
                // Display message when no posts are available
                <Box
                    sx={{
                        color: '#878787',
                        margin: '30px 80px',
                        fontSize: 18,
                        textAlign: 'center',
                    }}
                >
                    No data is available for the selected category.
                </Box>
            )}
        </>
    );
};

export default Posts;
