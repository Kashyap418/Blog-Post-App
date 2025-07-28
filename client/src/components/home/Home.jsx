import { Box } from '@mui/material';

// Import the main components for the home page
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

// Main Home component that provides the overall page layout
const Home = () => {
    return (
        <>
            {/* Display the main banner at the top */}
            <Banner />
            {/* Main content area with responsive layout */}
            <Box display="flex" flexWrap="wrap">
                {/* Categories sidebar - takes 1/6 width on small screens and up */}
                <Box flex={{ xs: '100%', sm: '16.67%' }} maxWidth={{ xs: '100%', sm: '16.67%' }}>
                    <Categories />
                </Box>
                {/* Posts display area - takes 5/6 width on small screens and up */}
                <Box flex={{ xs: '100%', sm: '83.33%' }} maxWidth={{ xs: '100%', sm: '83.33%' }}>
                    <Posts />
                </Box>
            </Box>
        </>
    );
};

export default Home;
