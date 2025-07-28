// This file handles all API calls to the backend using axios
// It provides a centralized way to make HTTP requests with proper error handling and authentication
import axios from 'axios';
// Import notification messages and service URLs from config
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
// Import utility functions for token and type handling
import { getAccessToken, getType } from '../utils/common-utils';

// const API_URL = '';

// Set the base URL for API requests (from environment or default to localhost)
// This allows the app to work in different environments (development, production, etc.)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
// const API_URL = 'http://localhost:8000';

// Create an axios instance with default settings
// This instance will be used for all API calls with consistent configuration
const axiosInstance = axios.create({
    baseURL: API_URL, // Base URL for all requests
    timeout: 10000, // 10 seconds timeout if response is not received      
    headers: {
        'Content-Type': 'application/json', // Set default content type to JSON
    }
})

// Request Interceptor: runs before every request
// This allows us to modify requests before they are sent (add auth tokens, params, etc.)
axiosInstance.interceptors.request.use(
    function (config) {
        // If TYPE has params, add them to the request as query parameters
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            // If TYPE has query, append it to the URL path
            config.url = `${config.url}/${config.TYPE.query}`;  // Use template string for better readability
        }
        return config;
    },
    function (error) {
        // Handle request error - reject the promise to trigger error handling
        return Promise.reject(error);
    }
)

// Response Interceptor: runs after every response
// This allows us to process all responses consistently and handle errors globally
axiosInstance.interceptors.response.use(
    function (response) {
        console.log('Response:', response);  // Log the raw response for debugging
        //Stop Global Loader here (if you have a loader)
        return processResponse(response);
    },
    function (error) {
        console.log('Error:', error);  // Log the error for debugging
        //Stop Global Loader here (if you have a loader)
        return Promise.reject(processError(error));
    }
);

// Function to process successful responses from the API
// Standardizes the response format for consistent handling throughout the app
const processResponse = (response) => {
    if (response?.status == 200) { // Check if response status is 200 (success)
        return {
            isSuccess: true,
            data: response.data // Return the actual data from the response
        }
    } else {    // Handle non-200 responses
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code,
        }
    }
}

// Function to process errors from API calls
// Categorizes different types of errors and provides appropriate error messages
const processError = (error) => {
    if (error.response) {
        // Request was made successfully but server responded with error status (4xx, 5xx)
        // This means the server received the request but couldn't process it
        console.log('ERROR IN RESPONSE:', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }
    else if (error.request) {
        // Request made but no response received (server might be down or network issue)
        // This usually means the backend is not running or there's a network problem
        console.log('ERROR IN REQUEST:', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    }
    else {
        // Problem in frontend setup (invalid URL, CORS issues, etc.)
        // This is usually a configuration problem in the frontend
        console.log('ERROR IN NETWORK:', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

// API object to hold all API call functions
// This will be populated dynamically based on SERVICE_URLS configuration
const API = {};

// Dynamically create API functions for each service URL
// This loop creates a function for each API endpoint defined in SERVICE_URLS
for (const [key, value] of Object.entries(SERVICE_URLS)) { //
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method, // HTTP method (GET, POST, PUT, DELETE, etc.)
            url: value.url, // API endpoint URL
            data: value.method === 'DELETE' ? undefined : body, // Do not send body for DELETE requests (RESTful convention)
            responseType: value.responseType, // Response type if specified (e.g., 'blob' for file downloads)
            headers: {
                authorization: getAccessToken(), // Add access token to headers for authentication
                "Accept": "application/json", // Tell server we expect JSON response
                "Content-Type": value.method === 'POST' && body instanceof FormData ? "multipart/form-data" : "application/json"
                // Use multipart/form-data for file uploads, JSON for regular data
            },
            TYPE: getType(value, body), // Add TYPE info for request interceptor to process params/query
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    // Calculate and show upload progress percentage
                    // Useful for file uploads to show user progress
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    // Calculate and show download progress percentage
                    // Useful for large file downloads to show user progress
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            },
            // headers: {
            //     "Accept": "application/json, multipart/form-data", 
            //     "Content-Type": "application/json"
            // }
        });
}

// Export the API object for use in other parts of the app
// This provides a clean interface for making API calls throughout the application
export { API };