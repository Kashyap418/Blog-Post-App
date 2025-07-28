// This component handles user authentication (login and signup)
// It provides a form interface for users to either log in with existing credentials or create a new account
import { useState, useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";

// Import API service for making authentication requests
import { API } from "../../service/api";
// Import context for managing user account state
import { DataContext } from "../../context/DataProvider";

// Import navigation hook for redirecting after successful login
import { useNavigate } from "react-router-dom";

// Styled component for the main login/signup container
// Creates a centered box with shadow for better visual appeal
const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
`;

// Styled component for the logo/brand image
// Centers the image and adds padding for proper spacing
const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

// Styled component for the form wrapper
// Provides consistent spacing and layout for form elements
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

// Styled component for the login button
// Uses orange background color to match the brand theme
const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

// Styled component for the signup button
// Uses white background with blue text and subtle shadow
const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

// Styled component for helper text (like "OR" separator)
// Uses muted gray color for secondary information
const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

// Styled component for error messages
// Uses red color to make errors clearly visible
const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

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
  // URL for the brand logo image
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  // State to toggle between login and signup forms
  const [Account, toggleAccount] = useState("login");
  // State to store signup form data
  const [signup, setSignup] = useState(signUpInitialValues);
  // State to store error messages
  const [error, setError] = useState("");
  // State to store login form data
  const [login, setLogin] = useState(loginInitialValues);

  // Get setAccount function from context to update user state
  const { setAccount } = useContext(DataContext);
  // Get navigate function for programmatic navigation
  const navigate = useNavigate();

  // Function to switch between login and signup forms
  const toggleSignUp = () => {
    toggleAccount((prevAccount) =>
      prevAccount === "login" ? "signup" : "login"
    );
  };

  // Function to handle input changes in signup form
  // Updates the signup state with new values
  const inputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value || "" });
  };

  // Function to handle user signup
  // Makes API call to create new user account
  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      // If signup successful, clear error and reset form
      setError("");
      setSignup(signUpInitialValues);
      // Switch back to login form
      toggleAccount("login");
    } else {
      // If signup fails, show error message
      setError("Something went wrong! Please try again later");
    }
  };

  // Function to handle input changes in login form
  // Updates the login state with new values
  const valueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value || "" });
  };

  // Function to handle user login
  // Makes API call to authenticate user and store tokens
  const loginUser = async () => {
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
      // If login fails, show error message
      setError("Something went wrong! Please try again later");
    }
  };

  // Render the login/signup form
  return (
    <Component>
      <Box>
        {/* Display the brand logo */}
        <Image src={imageURL} alt="Login" />
        {/* Conditionally render login or signup form based on Account state */}
        {Account === "login" ? (
          // Login form
          <Wrapper>
            {/* Username input field */}
            <TextField
              variant="standard"
              value={login.username || ""}
              onChange={(e) => valueChange(e)}
              name="username"
              label="Enter Username"
            />
            {/* Password input field */}
            <TextField
              variant="standard"
              value={login.password || ""}
              onChange={(e) => valueChange(e)}
              name="password"
              label="Enter Password"
              type="password"
            />
            {/* Display error message if any */}
            {error && <Error>{error}</Error>}
            {/* Login button */}
            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            {/* Separator text */}
            <Text style={{ textAlign: "center" }}>OR</Text>
            {/* Button to switch to signup form */}
            <SignupButton onClick={() => toggleSignUp()}>
              Create An Account
            </SignupButton>
          </Wrapper>
        ) : (
          // Signup form
          <Wrapper>
            {/* Name input field */}
            <TextField
              variant="standard"
              value={signup.name || ""}
              onChange={(e) => inputChange(e)}
              name="name"
              label="Enter Name"
            />
            {/* Username input field */}
            <TextField
              variant="standard"
              value={signup.username || ""}
              onChange={(e) => inputChange(e)}
              name="username"
              label="Enter Username"
            />
            {/* Password input field */}
            <TextField
              variant="standard"
              value={signup.password || ""}
              onChange={(e) => inputChange(e)}
              name="password"
              label="Enter Password"
              type="password"
            />
            {/* Display error message if any */}
            {error && <Error>{error}</Error>}
            {/* Signup button */}
            <SignupButton onClick={() => signupUser()}>Sign Up</SignupButton>
            {/* Separator text */}
            <Text style={{ textAlign: "center" }}>OR</Text>
            {/* Button to switch to login form */}
            <LoginButton
              variant="contained"
              onClick={() => toggleSignUp()}
            >
              Already Have An Account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
