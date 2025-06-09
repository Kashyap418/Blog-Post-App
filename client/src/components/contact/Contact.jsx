import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, LinkedIn, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
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

const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Text variant="h5">
                    Connect with me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/Kashyap418" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.linkedin.com/in/kashyapraina20/" color="inherit" target="_blank"><LinkedIn /></Link>
                    </Box>
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/kashyapraina418/" color="inherit" target="_blank"><Instagram /></Link>
                    </Box>
                    or send me an Email 
                    <Link href="mailto:kashyapraina418@gmail.com" target="_blank" color="inherit">
                        <Email />
                    </Link>
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;