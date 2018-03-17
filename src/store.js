import authenticationReducer from './reducers/authenticationReducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Combine reducers
const reducer = combineReducers({
    authentication: authenticationReducer
});

// Create store
const middleware = [thunk];
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
);

export default store;
