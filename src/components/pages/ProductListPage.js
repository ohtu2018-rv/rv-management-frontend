import React, { Component } from 'react';
import ProductList from './../sections/ProductList';
import SingleProduct from './../sections/SingleProduct';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import './styles/ProductListPage.css';
import { getProducts } from '../../reducers/productReducer';

export class ProductListPage extends Component {
    componentWillMount() {
        console.log(this.props.token);
        this.props.getProducts(this.props.token);
    }

    render() {
        return (
            <div className="productListPage">
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


const mapDispatchToProps = {
    getProducts
};

const mapStateToProps = state => {
    return {
        activeProduct: state.product.selectedProduct,
        token: state.authentication.accessToken
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
