// This component displays the main banner/header section of the blog
// It shows the blog title and subtitle with a modern gradient background and animations
import { Box, Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Create as CreateIcon, TrendingUp as TrendingIcon } from '@mui/icons-material';

// Main Banner component that displays the blog header
const Banner = () => {
    const navigate = useNavigate();
    
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '60vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/cover',
                    opacity: 0.1,
                    zIndex: 1,
                },
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                <Box
                    sx={{
                        textAlign: 'center',
                        color: 'white',
                        py: 8,
                    }}
                >
                    {/* Main heading with animation */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '3rem', md: '4rem', lg: '5rem' },
                            fontWeight: 800,
                            mb: 2,
                            background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'fadeInUp 1s ease-out',
                            '@keyframes fadeInUp': {
                                '0%': {
                                    opacity: 0,
                                    transform: 'translateY(30px)',
                                },
                                '100%': {
                                    opacity: 1,
                                    transform: 'translateY(0)',
                                },
                            },
                        }}
                    >
                        Welcome to BlogApp
                    </Typography>
                    
                    {/* Subtitle */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                            mb: 4,
                            opacity: 0.9,
                            fontWeight: 300,
                            animation: 'fadeInUp 1s ease-out 0.2s both',
                        }}
                    >
                        Share your thoughts, ideas, and stories with the world
                    </Typography>
                    
                    {/* Action buttons */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            animation: 'fadeInUp 1s ease-out 0.4s both',
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<CreateIcon />}
                            onClick={() => navigate('/create')}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                color: 'white',
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: 3,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Start Writing
                        </Button>
                        
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<TrendingIcon />}
                            onClick={() => navigate('/')}
                            sx={{
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                color: 'white',
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: 3,
                                '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Explore Posts
                        </Button>
                    </Box>
                    
                </Box>
            </Container>
        </Box>
    );
};

export default Banner;