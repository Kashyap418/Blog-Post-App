import { Box, styled, Typography } from '@mui/material';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
    line-height: 1.8;
`;

const About = () => {
    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Kashyap Raina</Typography>
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