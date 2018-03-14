import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/ProductList.css';

import { setProductSelected } from '../../reducers/productReducer';

export class ProductList extends Component {
    render() {
        return (
            <div className="products">
                <div className="product-container">
                    <button className="product" disabled>
                        Nimi (varastosaldo)
                    </button>
                    {this.props.products &&
                        this.props.products.map(product => (
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
        products: state.product.products
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
