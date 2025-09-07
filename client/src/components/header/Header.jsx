// This component displays the main navigation header for the blog application
// It provides navigation links to different sections of the app with modern styling
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Box, 
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material'; 
import { Link, useNavigate } from 'react-router-dom';
import { 
    Home as HomeIcon, 
    Info as AboutIcon, 
    ContactMail as ContactIcon,
    Logout as LogoutIcon,
    Menu as MenuIcon,
    Create as CreateIcon
} from '@mui/icons-material';
import { useState, useContext } from 'react';
import { DataContext } from '../../context/DataProvider';

// Main Header component for navigation
const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const { account } = useContext(DataContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Function to handle logout
    const handleLogout = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        navigate('/login');
    };

    const navItems = [
        { label: 'Home', path: '/', icon: <HomeIcon /> },
        { label: 'Create', path: '/create', icon: <CreateIcon /> },
        { label: 'About', path: '/about', icon: <AboutIcon /> },
        { label: 'Contact', path: '/contact', icon: <ContactIcon /> },
    ];
        
    return (
        <AppBar 
            position="fixed" 
            sx={{ 
                backgroundColor: 'background.paper',
                color: 'text.primary',
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
                borderBottom: '1px solid',
                borderBottomColor: 'grey.200'
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
                {/* Logo/Brand */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography 
                        variant="h6" 
                        component={Link}
                        to="/"
                        sx={{ 
                            fontWeight: 700,
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontSize: { xs: '1.1rem', md: '1.25rem' }
                        }}
                    >
                        BlogApp
                    </Typography>
                </Box>

                {/* Desktop Navigation */}
                {!isMobile && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                component={Link}
                                to={item.path}
                                startIcon={item.icon}
                                sx={{
                                    color: 'text.primary',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    px: 2,
                                    py: 1,
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: 'primary.50',
                                        color: 'primary.main',
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                        
                        {/* User Info & Logout */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                Welcome, {account.name || account.username}
                            </Typography>
                            <Button
                                onClick={handleLogout}
                                startIcon={<LogoutIcon />}
                                variant="outlined"
                                size="small"
                                sx={{
                                    borderColor: 'error.main',
                                    color: 'error.main',
                                    '&:hover': {
                                        backgroundColor: 'error.50',
                                        borderColor: 'error.dark',
                                    },
                                }}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Box>
                )}

                {/* Mobile Menu Button */}
                {isMobile && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                            {account.name || account.username}
                        </Typography>
                        <IconButton
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            sx={{ color: 'text.primary' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                )}
            </Toolbar>

            {/* Mobile Menu */}
            {isMobile && mobileMenuOpen && (
                <Box sx={{ 
                    backgroundColor: 'background.paper',
                    borderTop: '1px solid',
                    borderTopColor: 'grey.200',
                    px: 2,
                    py: 1
                }}>
                    {navItems.map((item) => (
                        <Button
                            key={item.label}
                            component={Link}
                            to={item.path}
                            startIcon={item.icon}
                            fullWidth
                            sx={{
                                color: 'text.primary',
                                textTransform: 'none',
                                justifyContent: 'flex-start',
                                mb: 1,
                                '&:hover': {
                                    backgroundColor: 'primary.50',
                                    color: 'primary.main',
                                },
                            }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Button>
                    ))}
                    <Button
                        onClick={handleLogout}
                        startIcon={<LogoutIcon />}
                        fullWidth
                        variant="outlined"
                        sx={{
                            borderColor: 'error.main',
                            color: 'error.main',
                            mt: 1,
                            '&:hover': {
                                backgroundColor: 'error.50',
                                borderColor: 'error.dark',
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            )}
        </AppBar>
    );
};

export default Header;



// const Header = () => {

//     return (
//         <div>Hello from Header</div>
//     )
// }

// export default Header;