// This component displays the categories sidebar with filtering options
// It allows users to filter posts by category and provides a link to create new posts
import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

// Import predefined categories from constants
import { categories } from '../../constants/data';

// Styled component for the categories table
// Adds border to the table for better visual separation
const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;
    
// Styled component for the create blog button
// Uses blue background with white text and proper spacing
const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;
    
// Styled component for category links
// Removes default link styling for cleaner appearance
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

// Main Categories component for filtering posts
const Categories = () => {
    // Get search parameters from URL to determine current category filter
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    
    return (
        <>
            {/* Create Blog button with current category pre-selected */}
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>
            
            {/* Categories table for filtering posts */}
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            {/* Link to show all categories (no filter) */}
                            <StyledLink to={"/"}>
                                All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Map through predefined categories to create filter links */}
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    {/* Link to filter posts by specific category */}
                                    <StyledLink to={`/?category=${category.type}`}>
                                        {category.type}
                                    </StyledLink>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Categories;