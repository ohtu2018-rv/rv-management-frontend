import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';

import App from './App';

// Import reducers

// Combine reducers

// Create store

// Load config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

ReactDOM.render(<App />, document.getElementById('root'));
