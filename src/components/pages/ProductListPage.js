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
import NewGlobalMargin from '../sections/NewGlobalMargin';
import { Route } from 'react-router-dom';
import axios from 'axios';

export class ProductListPage extends Component {
    componentWillMount() {
        this.props.getProducts(this.props.token);
        this.props.getGlobalMargin(this.props.token);
    }

    request = () => {
        console.log("Request->")
        return axios(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/products`, {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + this.props.token },
            data: {
                descr: 'body.descr',
                pgrpid: '21',
                barcode: '6411301656749',
                count: 12,
                buyprice: 50,
                sellprice: 150,
            }
        }).then(res => console.log(res.data));
    }

    render() {
        const match = this.props.match;

        return (
            <div className="productListPage">
                <Row className="products-content">
                    <Col xs={3} className="products-sidebar">
                        <BarcodeListener/>
                        <ProductFilter />
                        <ProductList active={this.props.activeProduct} />
                    </Col>
                    <Col xs={9} className="single-product">
                        <Route exact path={`${match.path}`} component={props => (
                            <div>Valitse tuote tai lue viivakoodi.
                                <button onClick={() => this.request()}>Testi</button>
                            </div>
                        )}/>
                        <Route path={`${match.path}/:productid(\\d+)`} component={SingleProduct}/>
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
