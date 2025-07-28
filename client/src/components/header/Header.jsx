// This component displays the main navigation header for the blog application
// It provides navigation links to different sections of the app
import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

// Styled component for the main app bar
// Uses white background with black text for clean appearance
const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

// Styled component for the toolbar container
// Centers the navigation links and provides proper spacing
const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }
`

// Main Header component for navigation
const Header = () => {

    // Navigation hook for programmatic navigation
    const navigate = useNavigate();

    // Function to handle logout (navigates to account page)
    const logout = async () => navigate('/account');
        
    return (
        <Component>
            <Container>
                {/* Navigation link to home page */}
                <Link to='/'>HOME</Link>
                {/* Navigation link to about page */}
                <Link to='/about'>ABOUT</Link>
                {/* Navigation link to contact page */}
                <Link to='/contact'>CONTACT</Link>
                {/* Navigation link to logout/account page */}
                <Link to='/login'>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;



// const Header = () => {

//     return (
//         <div>Hello from Header</div>
//     )
// }

// export default Header;