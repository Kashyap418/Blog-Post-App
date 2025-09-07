// This component handles user authentication (login and signup)
// It provides a modern form interface for users to either log in with existing credentials or create a new account
import { useState, useContext } from "react";
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Paper,
    Container,
    Divider,
    InputAdornment,
    IconButton,
    Alert,
    Fade
} from "@mui/material";
import { 
    Visibility, 
    VisibilityOff, 
    Person as PersonIcon, 
    Lock as LockIcon,
    Email as EmailIcon,
    Login as LoginIcon,
    PersonAdd as PersonAddIcon
} from "@mui/icons-material";

// Import API service for making authentication requests
import { API } from "../../service/api";
// Import context for managing user account state
import { DataContext } from "../../context/DataProvider";

// Import navigation hook for redirecting after successful login
import { useNavigate } from "react-router-dom";

// Initial values for the signup form
// These are used to reset the form after successful submission
const signUpInitialValues = {
  name: "",
  username: "",
  password: "",
};

// Initial values for the login form
// These are used to reset the form after successful submission
const loginInitialValues = {
  username: "",
  password: "",
};

// Main Login component that handles both login and signup functionality
// Takes a callback function to notify parent component about authentication status
const Login = ({ isUserAuthenticated = () => {} }) => {
  // State to toggle between login and signup forms
  const [Account, toggleAccount] = useState("login");
  // State to store signup form data
  const [signup, setSignup] = useState(signUpInitialValues);
  // State to store error messages
  const [error, setError] = useState("");
  // State to store login form data
  const [login, setLogin] = useState(loginInitialValues);
  // State to show/hide password
  const [showPassword, setShowPassword] = useState(false);
  // State to show/hide signup password
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  // State for loading
  const [loading, setLoading] = useState(false);

  // Get setAccount function from context to update user state
  const { setAccount } = useContext(DataContext);
  // Get navigate function for programmatic navigation
  const navigate = useNavigate();

  // Function to switch between login and signup forms
  const toggleSignUp = () => {
    toggleAccount((prevAccount) =>
      prevAccount === "login" ? "signup" : "login"
    );
    setError("");
  };

  // Function to handle input changes in signup form
  // Updates the signup state with new values
  const inputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value || "" });
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  // Function to validate signup form
  const validateSignup = () => {
    if (!signup.name.trim()) {
      setError("Full name is required");
      return false;
    }
    if (signup.name.trim().length < 2) {
      setError("Full name must be at least 2 characters long");
      return false;
    }
    if (!signup.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (signup.username.trim().length < 3) {
      setError("Username must be at least 3 characters long");
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(signup.username.trim())) {
      setError("Username can only contain letters, numbers, and underscores");
      return false;
    }
    if (!signup.password) {
      setError("Password is required");
      return false;
    }
    if (signup.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  // Function to handle user signup
  // Makes API call to create new user account
  const signupUser = async () => {
    if (!validateSignup()) {
      return;
    }

    setLoading(true);
    setError("");
    try {
      let response = await API.userSignup(signup);
      if (response.isSuccess) { 
        // If signup successful, clear error and reset form
        setError("");
        setSignup(signUpInitialValues);
        // Switch back to login form
        toggleAccount("login");
      } else {
        // If signup fails for other reasons, show generic error message
        setError("Failed to create account. Please try again.");
      }
    } catch (err) {
      console.error('Signup error:', err);
      // Handle API errors (400, 500, etc.)
      if (err.isError && err.msg) {
        setError(err.msg);
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle input changes in login form
  // Updates the login state with new values
  const valueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value || "" });
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  // Function to validate login form
  const validateLogin = () => {
    if (!login.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!login.password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  // Function to handle user login
  // Makes API call to authenticate user and store tokens
  const loginUser = async () => {
    if (!validateLogin()) {
      return;
    }

    setLoading(true);
    setError("");
    try {
      let response = await API.userLogin(login);
      if (response.isSuccess) {
        // If login successful, clear error
        setError("");

        // Store access token in session storage for API authentication
        sessionStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );
        // Store refresh token in session storage for token renewal
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`
        );

        // Update user account information in context
        setAccount({
          username: response.data.username,
          name: response.data.name,
        });

        // Notify parent component that user is authenticated
        isUserAuthenticated(true);

        // Navigate to home page after successful login
        navigate("/");
      } else {
        // If login fails for other reasons, show generic error message
        setError("Login failed. Please check your credentials and try again.");
      }
    } catch (err) {
      console.error('Login error:', err);
      // Handle API errors (400, 500, etc.)
      if (err.isError && err.msg) {
        setError(err.msg);
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Render the login/signup form
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: '100%',
            maxWidth: 450,
            borderRadius: 4,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/cover',
              opacity: 0.1,
              zIndex: 1,
            },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            {/* Header Section */}
            <Box
              sx={{
                p: 4,
                textAlign: 'center',
                color: 'white',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                BlogApp
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {Account === "login" ? "Welcome back!" : "Join our community"}
              </Typography>
            </Box>

            {/* Form Section */}
            <Box sx={{ p: 4, backgroundColor: 'white' }}>
              {/* Error Alert */}
              <Fade in={!!error}>
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              </Fade>

              {Account === "login" ? (
                // Login Form
                <Box>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                    Sign In
                  </Typography>
                  
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={login.username || ""}
                    onChange={(e) => valueChange(e)}
                    name="username"
                    label="Username"
                    sx={{ mb: 3 }}
                    error={error && error.includes("Username")}
                    helperText={error && error.includes("Username") ? error : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={login.password || ""}
                    onChange={(e) => valueChange(e)}
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    sx={{ mb: 3 }}
                    error={error && error.includes("Password")}
                    helperText={error && error.includes("Password") ? error : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() => loginUser()}
                    disabled={loading}
                    startIcon={<LoginIcon />}
                    sx={{
                      mb: 3,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </Box>
              ) : (
                // Signup Form
                <Box>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                    Create Account
                  </Typography>
                  
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={signup.name || ""}
                    onChange={(e) => inputChange(e)}
                    name="name"
                    label="Full Name"
                    sx={{ mb: 3 }}
                    error={error && error.includes("name")}
                    helperText={error && error.includes("name") ? error : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={signup.username || ""}
                    onChange={(e) => inputChange(e)}
                    name="username"
                    label="Username"
                    sx={{ mb: 3 }}
                    error={error && error.includes("Username")}
                    helperText={error && error.includes("Username") ? error : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={signup.password || ""}
                    onChange={(e) => inputChange(e)}
                    name="password"
                    label="Password"
                    type={showSignupPassword ? "text" : "password"}
                    sx={{ mb: 3 }}
                    error={error && error.includes("Password")}
                    helperText={error && error.includes("Password") ? error : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                            edge="end"
                          >
                            {showSignupPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() => signupUser()}
                    disabled={loading}
                    startIcon={<PersonAddIcon />}
                    sx={{
                      mb: 3,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                </Box>
              )}

              {/* Divider */}
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              {/* Toggle Button */}
              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={() => toggleSignUp()}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 500,
                  borderRadius: 2,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.50',
                    borderColor: 'primary.dark',
                  },
                }}
              >
                {Account === "login" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
