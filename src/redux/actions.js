export const setAuthToken = (token) => ({
    type: 'SET_AUTH_TOKEN',
    payload: token,
});

export const setUserData = (userData) => ({
    type: 'SET_USER_DATA',
    payload: userData,
});

export const updateAuthToken = (newToken) => ({
    type: 'UPDATE_AUTH_TOKEN',
    payload: newToken,
});

export const updateUserData = (userData) => ({
    type: 'UPDATE_USER_DATA',
    payload: userData,
});