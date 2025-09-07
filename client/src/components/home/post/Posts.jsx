// This component displays a grid of blog posts with responsive layout
// It fetches posts from the API and filters them by category if specified
import { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

// Import API service for fetching posts
import { API } from '../../../service/api';

// Import Post component to display individual posts
import Post from './Post';

// Main Posts component for displaying blog posts
const Posts = () => {
    // State to store the fetched posts
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // Get search parameters to check for category filter
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    // Effect to fetch posts when component mounts or category changes
    useEffect(() => {
        // Function to fetch posts from API
        const fetchData = async () => {
            const params = { category: category || '', page, limit: 8 };
            const response = await API.getAllPosts(params);
            if (response.isSuccess) {
                setPosts(response.data.items || []);
                setTotalPages(response.data.totalPages || 1);
            }
        };
        fetchData();
    }, [category, page]);

    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

    return (
        <>
            {/* Check if posts exist and display them */}
            {posts?.length ? (
                // Grid container for posts with responsive layout
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)',
                            xl: 'repeat(4, 1fr)',
                        },
                        gap: 3,
                        p: 2,
                    }}
                >
                    {/* Map through posts and display each one */}
                    {posts.map((post) => (
                        // Individual post container
                        <Box
                            key={post._id}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {/* Link to post details page */}
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit', height: '100%' }}
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
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 8,
                        px: 4,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                        No posts found
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        No data is available for the selected category. Be the first to create a post!
                    </Typography>
                </Box>
            )}

            {/* Pagination Controls */}
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ my: 3 }}>
                <Button variant="outlined" disabled={page <= 1} onClick={handlePrev}>Previous</Button>
                <Typography variant="body2" sx={{ alignSelf: 'center' }}>Page {page} of {totalPages}</Typography>
                <Button variant="outlined" disabled={page >= totalPages} onClick={handleNext}>Next</Button>
            </Stack>
        </>
    );
};

export default Posts;
