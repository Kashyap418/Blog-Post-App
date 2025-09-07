import { 
    Box, 
    Typography, 
    Container, 
    Paper, 
    Chip,
    Avatar,
    Divider,
    Grid,
    Card,
    CardContent
} from '@mui/material';
import { 
    School as SchoolIcon,
    Work as WorkIcon,
    Code as CodeIcon,
    TrendingUp as TrendingUpIcon,
    Engineering as EngineeringIcon,
    Computer as ComputerIcon
} from '@mui/icons-material';

// Main About component that displays developer information
const About = () => {
    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    py: 8,
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="md">
                    <Avatar
                        sx={{
                            width: 120,
                            height: 120,
                            mx: 'auto',
                            mb: 3,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            fontSize: '3rem',
                            fontWeight: 'bold',
                        }}
                    >
                        KR
                    </Avatar>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                        Kashyap Raina
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
                        Software Developer | Full-Stack Engineer | Tech Innovator
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 600, mx: 'auto' }}>
                        Creator of this website and passionate software developer with a strong foundation in 
                        problem-solving and building scalable applications.
                    </Typography>
                </Container>
            </Box>

            {/* Main Content */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Grid container spacing={4}>
                    {/* About Section */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                                About Me
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3, fontSize: '1.1rem' }}>
                                Hi, I'm Kashyap Raina — the creator of this website and a passionate software developer 
                                with a strong foundation in problem-solving and building scalable applications.
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3, fontSize: '1.1rem' }}>
                                During my internship at J&K Power Transmission Corporation Limited, I engineered a secure 
                                real-time chat application using React, Node.js, Express, MongoDB, and Socket.IO, enabling 
                                seamless internal communication within the organization.
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3, fontSize: '1.1rem' }}>
                                I've also solved 500+ DSA problems on LeetCode and GeeksforGeeks and completed 
                                The Web Developer Bootcamp 2024 by Colt Steele.
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                                With expertise in C++, JavaScript, TypeScript, React, Node.js, Express.js, and MongoDB, 
                                I enjoy creating scalable applications, experimenting with new technologies, and continuously 
                                growing as a developer.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Skills Section */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                                Skills & Technologies
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {['C++', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO'].map((skill) => (
                                    <Chip
                                        key={skill}
                                        label={skill}
                                        sx={{
                                            backgroundColor: 'primary.50',
                                            color: 'primary.main',
                                            fontWeight: 500,
                                        }}
                                    />
                                ))}
                            </Box>
                        </Paper>

                        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                                Achievements
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <TrendingUpIcon color="primary" />
                                    <Typography variant="body2">
                                        500+ DSA problems solved
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <SchoolIcon color="primary" />
                                    <Typography variant="body2">
                                        Web Developer Bootcamp 2024
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <WorkIcon color="primary" />
                                    <Typography variant="body2">
                                        J&K Power Transmission Internship
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Projects Section */}
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, textAlign: 'center', color: 'primary.main' }}>
                        Featured Projects
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: '100%', borderRadius: 3 }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <ComputerIcon color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            Blog-Post App
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        A full-stack blogging platform with JWT authentication, category-based search, 
                                        and secure user-specific comment management.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: '100%', borderRadius: 3 }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <EngineeringIcon color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            Economic Load Dispatch
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        Led a team of 5 to solve the ELD problem using Dynamic Programming, integrating 
                                        Apps Script API for data handling and Chart.js for visualization.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default About;