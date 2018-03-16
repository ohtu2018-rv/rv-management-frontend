import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles/ProductList.css';

export class ProductList extends Component {
    render() {
        return (
            <div className="products">
                <div className="product-container">
                    {this.props.products &&
                        this.props.products.map(product => (
                            <button
                                className={
                                    product.id == this.props.active
                                        ? 'product active'
                                        : 'product'
                                }
                                onClick={() =>
                                    this.props.onProductClick(product.id)
                                }
                            >
                                {product.name}
                            </button>
                        ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
