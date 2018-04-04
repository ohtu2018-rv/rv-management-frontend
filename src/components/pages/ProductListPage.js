import React, { Component } from 'react';
import ProductList from './../sections/ProductList';
import SingleProduct from './../sections/SingleProduct';
import BarcodeListener from './../sections/BarcodeListener';
import ProductFilter from './../sections/ProductFilter';
import NewProduct from './../sections/NewProduct';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import './styles/ProductListPage.css';
import { getProducts } from '../../reducers/productReducer';
import { getGlobalMargin } from '../../reducers/productReducer';
import NewGlobalMargin from '../sections/NewGlobalMargin';
import { Route, NavLink } from 'react-router-dom';
import { SuccessBtn } from '../buttons/Buttons';

export class ProductListPage extends Component {
    componentWillMount() {
        this.props.getProducts(this.props.token);
        this.props.getGlobalMargin(this.props.token);
    }

    render() {
        const match = this.props.match;

        return (
            <div className="productListPage">
                <Row className="products-content">
                    <Col xs={3} className="products-sidebar">
                        <BarcodeListener />
                        <ProductFilter />
                        <ProductList active={this.props.activeProduct} />
                    </Col>
                    <Col xs={9} className="single-product">
                        <Route
                            exact
                            path={`${match.path}`}
                            component={props => (
                                <div>
                                    <div>Valitse tuote tai lue viivakoodi.</div>
                                </div>
                            )}
                        />
                        <Route
                            path={`${match.path}/:productid(\\d+)`}
                            component={SingleProduct}
                        />
                        <Route
                            path={`${match.path}/create`}
                            component={NewProduct}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = {
    getProducts,
    getGlobalMargin
};

const mapStateToProps = state => {
    return {
        activeProduct: state.product.selectedProduct,
        token: state.authentication.accessToken
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
