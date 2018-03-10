import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderNav from './HeaderNav';
import { withRouter } from 'react-router-dom';

import './styles/Header.css';

class Header extends Component {
    render() {
        return (
            <header className="topheader">
                <div class="header-title">
                    <h1>RV management</h1>
                </div>
                <HeaderNav/>
                { this.props.isAuthenticated && <div className="user-info">USER INFO</div> }
            </header>
        );
    }
}

const mapDispatchToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    };
};

export default withRouter(connect(mapDispatchToProps)(Header));
