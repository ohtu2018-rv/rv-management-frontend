import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/NewProduct.css';
import { Route, withRouter, NavLink } from 'react-router-dom';
import ProductForm from './ProductForm';
import BoxForm from './BoxForm';

export class NewProduct extends Component {
    render() {
        const match = this.props.match;

        return (
            <React.Fragment>
                <div className="create-title">
                    <h1>Luo uusi tuote/laatikko </h1>
                </div>
                <div className="create-menu">
                    <ul>
                        <li>
                            <NavLink to={`${match.url}/product`}>
                                Uusi tuote
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`${match.url}/box`}>
                                Uusi laatikko
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="form-container">
                    <Route
                        exact
                        path={`${match.path}/product`}
                        render={() => <ProductForm />}
                    />
                    <Route
                        path={`${match.path}/box`}
                        render={() => <BoxForm />}
                    />
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = {};

export default withRouter(connect(null, mapDispatchToProps)(NewProduct));
