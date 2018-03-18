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
                    {this.props.products != false &&
                        this.props.products.map(product => (
                            <button
                                key={product.product_id}
                                className={
                                    product.product_id === this.props.active
                                        ? 'product active'
                                        : 'product'
                                }
                                onClick={() =>
                                    this.props.setProductSelected(product.product_id)
                                }
                            >
                                {product.product_name}
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

const mapStateToProps = (state) => {
    return {
        products: state.product.products.products // lol
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
