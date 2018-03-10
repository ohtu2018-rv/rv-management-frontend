import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DangerBtn } from '../buttons/Buttons';
import { logout } from '../../reducers/authenticationReducer';

import './styles/HeaderUser.css';

class HeaderUser extends Component {
    render() {
        return (
            <div className="header-user">
                <DangerBtn small onClick={this.props.logout}>Kirjaudu ulos</DangerBtn>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = {
    logout
};


export default connect(mapStateToProps, mapDispatchToProps)(HeaderUser);
