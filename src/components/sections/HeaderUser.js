import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DangerBtn } from '../buttons/Buttons';
import './styles/HeaderUser.css';

class HeaderUser extends Component {
    render() {
        return (
            <div className="header-user">
                <DangerBtn small>Kirjaudu ulos</DangerBtn>
            </div>
        );
    }
}

const mapDispatchToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    };
};

export default HeaderUser;
