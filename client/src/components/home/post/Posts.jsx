import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

// API service
import { API } from '../../../service/api';

// Components
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            const response = await API.getAllPosts({ category: category || '' });
            if (response.isSuccess) {
                setPosts(response.data);
            }
        };
        fetchData();
    }, [category]);

    return (
        <>
            {posts?.length ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        justifyContent: 'center',
                    }}
                >
                    {posts.map((post) => (
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
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                to={`details/${post._id}`} //mongodbID
                            >
                                <Post post={post} />
                            </Link>
                        </Box>
                    ))}
                </Box>
            ) : (
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
