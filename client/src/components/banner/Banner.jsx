// This component displays the main banner/header section of the blog
// It shows the blog title and subtitle with a background image for visual impact
import { styled, Box, Typography } from '@mui/material';

// Styled component for the banner background
// Creates a full-width banner with background image, centered content, and proper height
const Image = styled(Box)`
    width: 100%;
    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

// Styled component for the main heading
// Large white text for the blog title with proper line height
const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1
`;

// Styled component for the subtitle
// Smaller text with white background for contrast against the banner
const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;

// Main Banner component that displays the blog header
const Banner = () => {
    
    return (
        <Image>
            {/* Main blog title */}
            <Heading>BLOG</Heading>
            {/* Blog subtitle/description */}
            <SubHeading>Code for Interview</SubHeading>
        </Image>
    )
}

export default Banner;