// This component displays a grid of blog posts with responsive layout
// It fetches posts from the API and filters them by category if specified
import { useEffect, useState } from 'react';
import { Box, Typography, Pagination } from '@mui/material';
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
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(false);
    // Get search parameters to check for category filter
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    // Effect to fetch posts when component mounts or category changes
    useEffect(() => {
        // Function to fetch posts from API
        const fetchData = async () => {
            setLoading(true);
            const response = await API.getAllPosts({ category: category || '', page, limit: 9 });
            if (response.isSuccess) {
                const { posts: fetched, pages: totalPages } = response.data;
                setPages(totalPages || 1);
                // Replace list for numbered pagination
                setPosts(fetched);
            }
            setLoading(false);
        };
        fetchData();
    }, [category, page]);

    useEffect(() => {
        // reset when category changes
        setPage(1);
    }, [category]);

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
            {pages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                    <Pagination 
                        count={pages}
                        page={page}
                        color="primary"
                        onChange={(_, value) => setPage(value)}
                        showFirstButton
                        showLastButton
                        disabled={loading}
                    />
                </Box>
            )}
        </>
    );
};

export default Posts;
