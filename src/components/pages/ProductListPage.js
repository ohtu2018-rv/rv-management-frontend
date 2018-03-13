import React, { Component } from 'react';
import ProductList from './../sections/ProductList';
import SingleProduct from './../sections/SingleProduct';
import { connect } from 'react-redux';

export class ProductListPage extends Component {
    render() {
        return (
            <div>
                <div style={{ float: 'left', width: '50%' }}>
                    <ProductList
                        active={this.props.activeProduct}
                    />
                </div>
                <div style={{ float: 'right', width: '50%', textAlign: 'center' }}>
                    <SingleProduct productId={this.props.activeProduct} />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    
};

const mapStateToProps = state => {
    return {
        activeProduct: state.product.selectedProduct
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
