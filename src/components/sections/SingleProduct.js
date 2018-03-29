import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/SingleProduct.css';
import noImage from './../../images/no_image.png';
import { fetchProductMargin } from './../../reducers/productMarginReducer';
import { setProductSelected } from '../../reducers/productReducer';
import { Route, withRouter, NavLink } from 'react-router-dom';
import ProductAddStock from './ProductAddStock';

export class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyInClicked: false
        };
    }

    componentWillUnmount() {
        this.props.setProductSelected(0);
    }
    
    render() {
        const product = this.props.product;
        if (!product) {
            return <div>Valitse tuote tai lue viivakoodi.</div>;
        }

        const match = this.props.match;

        return (
            <React.Fragment>
                <div className="product-info">
                    <div className="product-title">
                        <h1>{product.product_name}</h1>
                        <h2>{product.quantity} varastossa</h2>
                    </div>
                    <div className="product-image">
                        <img src={noImage} alt={product.product_name}/>
                    </div>
                </div>
                <div className="product-menu">
                    <ul>
                        <li><NavLink exact to={match.url}>Perustiedot</NavLink></li>
                        <li><NavLink to={`${match.url}/stock`}>Sisäänosto</NavLink></li>
                    </ul>
                </div>
                <div className="product-section-container">
                    <Route 
                        exact path={`${match.path}`} 
                        component={props => <div>Tietojen editointi tähän.</div>}
                    />
                    <Route
                        path={`${match.path}/stock`}
                        render={() => <ProductAddStock product={product}/>}
                    />
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = {
    fetchProductMargin,
    setProductSelected
};

const mapStateToProps = (state, props) => {
    return {
        product: state.product.products.find(
            product => product.product_id === parseInt(props.match.params.productid, 10)
        ),
        productMargin: state.productMargin.productMargin,
        globalMargin: state.product.globalMargin
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));
