import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './reset.css';
import './index.css';

import App from './App';

// redux store
import store from './store';

// Load config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
