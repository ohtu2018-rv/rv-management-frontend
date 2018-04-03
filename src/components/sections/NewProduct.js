import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/NewProduct.css';
import { Route, withRouter, NavLink } from 'react-router-dom';
import ProductForm from './ProductForm';

export class NewProduct extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const match = this.props.match;

        return (
            <React.Fragment>
                <div className="create-title">
                    <h1>Luo uusi tuote/laatikko </h1>
                </div>
                <div className="create-menu">
                    <ul>
                        <li><NavLink to={`${match.url}/product`}>Uusi tuote</NavLink></li>
                        <li><NavLink to={`${match.url}/box`}>Uusi laatikko</NavLink></li>
                    </ul>
                </div>
                <div className="form-container">
                    <Route 
                        exact path={`${match.path}/product`} 
                        render={() => <ProductForm/>}
                    />
                    <Route
                        path={`${match.path}/box`}
                        component={props => <div>TODO - BoxForm</div>}
                    />
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = {
};

export default withRouter(connect(null, mapDispatchToProps)(NewProduct));