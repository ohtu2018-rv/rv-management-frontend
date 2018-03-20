import React, { Component } from 'react';
import ProductList from './../sections/ProductList';
import SingleProduct from './../sections/SingleProduct';
import BarcodeListener from './../sections/BarcodeListener';
import ProductFilter from './../sections/ProductFilter';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import './styles/ProductListPage.css';
import { getProducts } from '../../reducers/productReducer';
import { getGlobalMargin } from '../../reducers/productReducer';
import NewGlobalMargin from '../sections/NewGlobalMargin'
export class ProductListPage extends Component {
    componentWillMount() {
        this.props.getProducts(this.props.token);
        this.props.getGlobalMargin(this.props.token)
    }

    render() {
        return (
            <div className="productListPage">
                <Row>
                    <Col xs={12}>
                        <BarcodeListener />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <ProductFilter />
                        <ProductList active={this.props.activeProduct} />
                    </Col>
                    <Col xs={9}>
                        <SingleProduct productId={this.props.activeProduct} />
                    </Col>
                    <NewGlobalMargin />
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
