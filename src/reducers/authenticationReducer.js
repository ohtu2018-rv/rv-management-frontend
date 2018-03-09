export const authenticationActions = {
    SET_AUTHENTICATING: 'SET_AUTHENTICATING',
    AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS',
    AUTHENTICATION_FAILURE: 'AUTHENTICATION_FAILURE',
    LOGOUT: 'LOGOUT'
};

export const initialState = {
    isAuthenticating: false,
    isAuthenticated: false,
    accessToken: null,
    authenticationError: null
};

export const setAuthenticating = authenticating => {
    return {
        type: authenticationActions.SET_AUTHENTICATING,
        isAuthenticating: authenticating
    };
};

export const authenticationSuccess = token => {
    return {
        type: authenticationActions.AUTHENTICATION_SUCCESS,
        accessToken: token
    };
};

export const authenticationFailure = error => {
    return {
        type: authenticationActions.AUTHENTICATION_FAILURE,
        error: error
    };
};

export const authenticate = (username, password) => {
    return async dispatch => {
        dispatch(setAuthenticating(true));

        // dummy auth for now
        return new Promise((resolve, reject) => {
            if (username === 'admin' && password === 'admin') {
                resolve('access token');
            } else {
                reject('authentication failed');
            }
        }).then((token) => {
            dispatch(setAuthenticating(false));
            dispatch(authenticationSuccess(token));
        }).catch((err) => {
            dispatch(setAuthenticating(false));
            dispatch(authenticationFailure(err));
        });
    };
};

export const logout = () => {
    return {
        type: authenticationActions.LOGOUT
    };
};

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {

    case authenticationActions.SET_AUTHENTICATING:
        return Object.assign({}, state, {
            isAuthenticating: action.isAuthenticating
        });

    case authenticationActions.AUTHENTICATION_SUCCESS:
        return Object.assign({}, state, {
            isAuthenticated: true,
            accessToken: action.accessToken,
            authenticationError: null
        });
    
    case authenticationActions.AUTHENTICATION_FAILURE:
        return Object.assign({}, state, {
            isAuthenticated: false,
            accessToken: null,
            authenticationError: action.error
        });

    case authenticationActions.LOGOUT:
        return Object.assign({}, state, {
            isAuthenticated: false,
            accessToken: null,
            authenticationError: null
        });

    default:
        return state;

    }
};

export default authenticationReducer;
