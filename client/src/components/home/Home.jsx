import { Box } from '@mui/material';

// Components
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

const Home = () => {
    return (
        <>
            <Banner />
            <Box display="flex" flexWrap="wrap">
                <Box flex={{ xs: '100%', sm: '16.67%' }} maxWidth={{ xs: '100%', sm: '16.67%' }}>
                    <Categories />
                </Box>
                <Box flex={{ xs: '100%', sm: '83.33%' }} maxWidth={{ xs: '100%', sm: '83.33%' }}>
                    <Posts />
                </Box>
            </Box>
        </>
    );
};

export default Home;
