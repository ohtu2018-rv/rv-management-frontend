import React, { Component } from 'react';
import { authenticate } from '../../reducers/authenticationReducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.authenticate(this.usernameInput.value, this.passwordInput.value);
    }

    render() {
        if (this.props.isAuthenticated) {
            // redirect to root if referrer isn't set in router
            const redirectPath = 
                this.props.location.state ? this.props.location.state.from.pathname : '/';

            return (
                <Redirect to={redirectPath} />
            );
        }

        return (
            <div>
                <h1>Kirjaudu sisään</h1>
                <form method="post" onSubmit={this.onSubmit}>
                    <label for="username">Käyttäjätunnus</label>
                    <input 
                        id="username" 
                        name="username" 
                        type="text"
                        ref={input => {
                            this.usernameInput = input;
                        }}
                    />
                    <label for="password">Salasana</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password"
                        ref={input => {
                            this.passwordInput = input;
                        }}
                    />
                    <input type="submit" value="Kirjaudu sisään"/>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = {
    authenticate
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
