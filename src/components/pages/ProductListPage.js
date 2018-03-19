import React, { Component } from 'react';
import ProductList from './../sections/ProductList';
import SingleProduct from './../sections/SingleProduct';
import BarcodeListener from './../sections/BarcodeListener';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import './styles/ProductListPage.css';

export class ProductListPage extends Component {
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
                        <ProductList active={this.props.activeProduct} />
                    </Col>
                    <Col xs={9}>
                        <SingleProduct productId={this.props.activeProduct} />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = {};

const mapStateToProps = state => {
    return {
        activeProduct: state.product.selectedProduct
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
