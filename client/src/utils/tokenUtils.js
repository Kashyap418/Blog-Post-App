// Utility functions for handling token refresh
import { API } from '../service/api';
import { getRefreshToken, setAccessToken } from './common-utils';

// Function to refresh the access token using the refresh token
export const refreshAccessToken = async () => {
    try {
        const refreshToken = getRefreshToken();
        
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        // Remove 'Bearer ' prefix if it exists
        const cleanRefreshToken = refreshToken.replace('Bearer ', '');
        
        // Call the refresh token API
        const response = await API.getRefreshToken({ refreshToken: cleanRefreshToken });
        
        if (response.isSuccess) {
            // Update the access token in session storage
            setAccessToken(response.data.accessToken);
            return response.data.accessToken;
        } else {
            throw new Error('Failed to refresh token');
        }
    } catch (error) {
        console.error('Token refresh failed:', error);
        // Clear tokens and redirect to login
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        window.location.href = '/login';
        throw error;
    }
};

// Function to check if a token is expired (basic check)
export const isTokenExpired = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        return payload.exp < currentTime;
    } catch (error) {
        return true; // If we can't parse the token, consider it expired
    }
};
