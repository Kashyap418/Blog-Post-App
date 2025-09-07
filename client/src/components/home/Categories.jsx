// This component displays the categories sidebar with filtering options
// It allows users to filter posts by category and provides a link to create new posts
import { 
    Box, 
    Typography, 
    Button, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemText,
    Paper,
    Divider,
    Chip
} from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { 
    Create as CreateIcon, 
    Category as CategoryIcon,
    TrendingUp as TrendingIcon
} from '@mui/icons-material';

// Import predefined categories from constants
import { categories } from '../../constants/data';

// Main Categories component for filtering posts
const Categories = () => {
    // Get search parameters from URL to determine current category filter
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    
    return (
        <Box sx={{ p: 2 }}>
            {/* Create Blog Button */}
            <Paper
                elevation={2}
                sx={{
                    p: 2,
                    mb: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                }}
            >
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    Start Writing
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                    Share your thoughts with the community
                </Typography>
                <Button
                    component={Link}
                    to={`/create?category=${category || ''}`}
                    variant="contained"
                    startIcon={<CreateIcon />}
                    fullWidth
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        fontWeight: 600,
                        py: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.2s ease',
                    }}
                >
                    Create New Post
                </Button>
            </Paper>

            {/* Categories Section */}
            <Paper
                elevation={1}
                sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'grey.200',
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        backgroundColor: 'grey.50',
                        borderBottom: '1px solid',
                        borderBottomColor: 'grey.200',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <CategoryIcon fontSize="small" />
                        Categories
                    </Typography>
                </Box>

                <List sx={{ p: 0 }}>
                    {/* All Categories Link */}
                    <ListItem disablePadding>
                        <ListItemButton
                            component={Link}
                            to="/"
                            selected={!category}
                            sx={{
                                py: 1.5,
                                px: 2,
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.50',
                                    '&:hover': {
                                        backgroundColor: 'primary.100',
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: 'grey.50',
                                },
                            }}
                        >
                            <TrendingIcon sx={{ mr: 2, fontSize: 20, color: 'primary.main' }} />
                            <ListItemText
                                primary="All Posts"
                                primaryTypographyProps={{
                                    fontWeight: category ? 400 : 600,
                                    color: category ? 'text.secondary' : 'primary.main',
                                }}
                            />
                            {!category && (
                                <Chip
                                    label="Active"
                                    size="small"
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        fontSize: '0.7rem',
                                        height: 20,
                                    }}
                                />
                            )}
                        </ListItemButton>
                    </ListItem>

                    <Divider />

                    {/* Category Links */}
                    {categories.map((cat, index) => (
                        <ListItem key={cat.id} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={`/?category=${cat.type}`}
                                selected={category === cat.type}
                                sx={{
                                    py: 1.5,
                                    px: 2,
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.50',
                                        '&:hover': {
                                            backgroundColor: 'primary.100',
                                        },
                                    },
                                    '&:hover': {
                                        backgroundColor: 'grey.50',
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={cat.type}
                                    primaryTypographyProps={{
                                        fontWeight: category === cat.type ? 600 : 400,
                                        color: category === cat.type ? 'primary.main' : 'text.secondary',
                                    }}
                                />
                                {category === cat.type && (
                                    <Chip
                                        label="Active"
                                        size="small"
                                        sx={{
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                            fontSize: '0.7rem',
                                            height: 20,
                                        }}
                                    />
                                )}
                            </ListItemButton>
                            {index < categories.length - 1 && <Divider />}
                        </ListItem>
                    ))}
                </List>
            </Paper>

        </Box>
    );
};

export default Categories;