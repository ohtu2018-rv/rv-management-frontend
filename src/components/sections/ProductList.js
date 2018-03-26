import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/ProductList.css';

import { setProductSelected } from './../../reducers/productReducer';
import { productFilterType } from './../../reducers/productFilterReducer';

const sorters = {
    [productFilterType.NONE]: (a, b) => a.product_id - b.product_id,
    [productFilterType.NAME_ASC]: (a, b) =>
        a.product_name < b.product_name
            ? -1
            : b.product_name === a.product_name ? 0 : 1,

    [productFilterType.NAME_DESC]: (a, b) =>
        a.product_name < b.product_name
            ? 1
            : b.product_name === a.product_name ? 0 : -1,

    [productFilterType.STOCK_LOW]: (a, b) => a.stock - b.stock,

    [productFilterType.STOCK_HIGH]: (a, b) => b.stock - a.stock
};

export class ProductList extends Component {
    render() {
        const prods = this.props.products
            ? this.props.products.sort(sorters[this.props.sortedBy])
            : [];
        return (
            <div className="products">
                <div className="product-container">
                    <button className="product" disabled>
                        Nimi (varastosaldo)
                    </button>
                    {prods.map(product => (
                        <button
                            key={product.product_id}
                            className={
                                product.product_id === this.props.active
                                    ? 'product active'
                                    : 'product'
                            }
                            onClick={() => {
                                this.props.setProductSelected(
                                    product.product_id
                                );
                                document.getElementById('barcodeInput').focus();
                            }}
                        >
                            {product.product_name} {' ('}
                            {product.quantity}
                            {') '}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setProductSelected
};

const mapStateToProps = state => {
    return {
        products: state.product.products,
        sortedBy: state.productFilter.sortedBy
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
