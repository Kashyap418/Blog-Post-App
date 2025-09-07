export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
} //get access token from session storage for authentication of user for api calls on frontend

export const getRefreshToken = () => {
    return sessionStorage.getItem('refreshToken');
}

export const setAccessToken = (accessToken) => {
    sessionStorage.setItem('accessToken', `Bearer ${accessToken}`);
}

export const setRefreshToken = (refreshToken) => {
    sessionStorage.setItem('refreshToken', `Bearer ${refreshToken}`);
}

export const getType = (value, body) => {
    if (value.params) {
        return { params: body }
    } else if (value.query) {
        if (typeof body === 'object') {
            return { query: body._id }
        } else {
            return { query: body }
        }
    }
    return {};
}