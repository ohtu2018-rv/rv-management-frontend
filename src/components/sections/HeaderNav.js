import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/HeaderNav.css';

const activeClass = 'header-nav-active';

export class HeaderNav extends Component {
    render() {
        return (
            <div className="header-nav">
                <ul>
                    <li>
                        <NavLink to="/products" activeClassName={activeClass}>Tuotteet</NavLink>
                    </li>
                    <li>
                        <NavLink to="/users" activeClassName={activeClass}>Käyttäjät</NavLink>
                    </li>
                    <li>
                        <NavLink to="/reports" activeClassName={activeClass}>Raportit</NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

export default HeaderNav;
