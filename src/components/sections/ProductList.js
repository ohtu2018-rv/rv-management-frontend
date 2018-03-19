import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/ProductList.css';

import { setProductSelected } from '../../reducers/productReducer';
import { productFilterType } from '../../reducers/productFilterReducer';

const sorters = {
    [productFilterType.NONE]: (a, b) => a.id - b.id,
    [productFilterType.NAME_ASC]: (a, b) =>
        a.name < b.name ? -1 : b.name === a.name ? 0 : 1,

    [productFilterType.NAME_DESC]: (a, b) =>
        a.name < b.name ? 1 : b.name === a.name ? 0 : -1,

    [productFilterType.STOCK_LOW]: (a, b) => a.stock - b.stock,

    [productFilterType.STOCK_HIGH]: (a, b) => b.stock - a.stock,

    [productFilterType.MOST_BOUGHT_LOW]: (a, b) => a.stock - b.stock,

    [productFilterType.MOST_BOUGHT_HIGH]: (a, b) => b.stock - a.stock
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
                            key={product.id}
                            className={
                                product.id === this.props.active
                                    ? 'product active'
                                    : 'product'
                            }
                            onClick={() =>
                                this.props.setProductSelected(product.id)
                            }
                        >
                            {product.name} {' ('}
                            {product.stock}
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
