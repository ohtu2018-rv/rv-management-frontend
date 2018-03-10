import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import ProductListPage from './components/pages/ProductListPage';
import LoginPage from './components/pages/LoginPage';
import Header from './components/sections/Header';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            return rest.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            );
        }}
    />
);

class App extends Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <Header/>
                    <AuthenticatedRoute 
                        exact path="/" 
                        component={ProductListPage}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                    <Route path="/login" component={LoginPage} />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    };
};


export default connect(mapStateToProps)(App);
