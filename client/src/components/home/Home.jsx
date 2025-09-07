import { Box, Container, useTheme, useMediaQuery } from '@mui/material';

// Import the main components for the home page
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

// Main Home component that provides the overall page layout
const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            {/* Display the main banner at the top */}
            <Banner />
            
            {/* Main content area with responsive layout */}
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        gap: 3,
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'flex-start'
                    }}
                >
                    {/* Categories sidebar */}
                    <Box 
                        sx={{ 
                            width: { xs: '100%', md: '300px' },
                            flexShrink: 0,
                            position: { md: 'sticky' },
                            top: { md: 80 },
                        }}
                    >
                        <Categories />
                    </Box>
                    
                    {/* Posts display area */}
                    <Box 
                        sx={{ 
                            flex: 1,
                            minWidth: 0, // Prevents flex item from overflowing
                        }}
                    >
                        <Posts />
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Home;
