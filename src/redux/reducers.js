const initialState = {
    authToken: null,
    userData: null,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH_TOKEN':
            return {
                ...state,
                authToken: action.payload,
            };
        case 'UPDATE_AUTH_TOKEN':
            return {
                ...state,
                authToken: action.payload,
            };
        case 'SET_USER_DATA':
            return {
                ...state,
                userData: action.payload,
            };
        case 'UPDATE_USER_DATA':
            return {
                ...state,
                userData: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;