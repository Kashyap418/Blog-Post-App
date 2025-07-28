import { Box, styled, Typography } from '@mui/material';

// Styled component for the background banner image
// Creates a full-width banner with a background image for visual appeal
const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

// Styled component for the content wrapper
// Provides padding and spacing for the text content below the banner
const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

// Styled component for the main text content
// Uses muted gray color and increased line height for better readability
const Text = styled(Typography)`
    color: #878787;
    line-height: 1.8;
`;

// Main About component that displays developer information
const About = () => {
    return (
        <Box>
            {/* Background banner image for visual appeal */}
            <Banner/>
            {/* Content wrapper containing the developer information */}
            <Wrapper>
                {/* Developer's name as the main heading */}
                <Typography variant="h3">Kashyap Raina</Typography>
                {/* Detailed information about the developer's background and projects */}
                <Text variant="h5">
                    I'm a graduate from Punjab Engineering College, Chandigarh.
                    During my internship at J&K Power Transmission Corporation Limited, I built a secure real-time chat application aimed at improving internal communication.
                    I've completed several meaningful projects, including:
                    <br />
                    • A full-fledged blogging platform with secure authentication
                    <br />
                    • College minor project which solves ELD problem of Power system
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;