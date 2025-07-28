// This component displays contact information and social media links
// It provides ways for users to connect with the developer through various platforms
import { Box, styled, Typography, Link } from '@mui/material';
// Import Material-UI icons for social media platforms
import { GitHub, LinkedIn, Instagram, Email } from '@mui/icons-material';

// Styled component for the background banner image
// Creates a full-width banner with background image for visual appeal
const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

// Styled component for the content wrapper
// Provides padding and spacing for the contact information below the banner
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

// Main Contact component that displays contact information and social links
const Contact = () => {
    return (
        <Box>
            {/* Background banner image for visual appeal */}
            <Banner />
            {/* Content wrapper containing contact information */}
            <Wrapper>
                {/* Main heading for the contact section */}
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                {/* Contact information with social media links */}
                <Text variant="h5">
                    Connect with me on
                    {/* GitHub profile link with icon */}
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/Kashyap418" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                    {/* LinkedIn profile link with icon */}
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.linkedin.com/in/kashyapraina20/" color="inherit" target="_blank"><LinkedIn /></Link>
                    </Box>
                    {/* Instagram profile link with icon */}
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/kashyapraina418/" color="inherit" target="_blank"><Instagram /></Link>
                    </Box>
                    or send me an Email 
                    {/* Email link with icon */}
                    <Link href="mailto:kashyapraina418@gmail.com" target="_blank" color="inherit">
                        <Email />
                    </Link>
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;