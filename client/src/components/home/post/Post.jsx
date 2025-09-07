// This component displays an individual blog post card
// It shows the post image, title, description, author, and category in a modern card format
import { 
    Card, 
    CardMedia, 
    CardContent, 
    CardActions, 
    Typography, 
    Box, 
    Chip, 
    Avatar,
    IconButton,
    useTheme
} from '@mui/material';
import { 
    Person as PersonIcon, 
    CalendarToday as CalendarIcon,
    Visibility as ViewIcon,
    BookmarkBorder as BookmarkIcon
} from '@mui/icons-material';

// Main Post component for displaying individual post cards
const Post = ({ post }) => {
    const theme = useTheme();
    
    // Default image URL for posts without images
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    
    // Function to truncate text with ellipsis if it exceeds the limit
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                },
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'grey.200',
            }}
        >
            {/* Post Image */}
            <CardMedia
                component="img"
                height="200"
                image={url}
                alt={post.title}
                sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    },
                }}
            />

            {/* Post Content */}
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                {/* Category Chip */}
                {post.categories && (
                    <Chip
                        label={post.categories}
                        size="small"
                        sx={{
                            mb: 2,
                            backgroundColor: 'primary.50',
                            color: 'primary.main',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                        }}
                    />
                )}

                {/* Post Title */}
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 600,
                        mb: 1.5,
                        lineHeight: 1.3,
                        color: 'text.primary',
                        fontSize: '1.1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {addEllipsis(post.title, 60)}
                </Typography>

                {/* Post Description */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {addEllipsis(post.description, 120)}
                </Typography>

                {/* Author and Date Info */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 1,
                    }}
                >
                    <Avatar
                        sx={{
                            width: 24,
                            height: 24,
                            backgroundColor: 'primary.main',
                            fontSize: '0.75rem',
                        }}
                    >
                        {post.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                    >
                        {post.username}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                    }}
                >
                    <CalendarIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                        {formatDate(post.createdDate)}
                    </Typography>
                </Box>
            </CardContent>

            {/* Card Actions */}
            <CardActions
                sx={{
                    p: 2,
                    pt: 0,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        <ViewIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="caption" color="text.secondary">
                        Read more
                    </Typography>
                </Box>
                
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <BookmarkIcon fontSize="small" />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Post;