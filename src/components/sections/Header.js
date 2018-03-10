import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderNav from './HeaderNav';
import HeaderUser from './HeaderUser';
import { withRouter } from 'react-router-dom';

import './styles/Header.css';

class Header extends Component {
    render() {
        return (
            <header className="topheader">
                <div class="header-title">
                    <h1>RV management</h1>
                </div>
                { this.props.isAuthenticated && <HeaderNav/> }
                { this.props.isAuthenticated && <HeaderUser/> }
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    };
};

export default withRouter(connect(mapStateToProps)(Header));
