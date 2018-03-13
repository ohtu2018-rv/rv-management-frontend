import React, { Component } from 'react';
import { connect } from 'react-redux';

export class SingleProduct extends Component {
    render() {
        return (
            <div>
                <p>ID: { this.props.product.id }</p>
                <p>Name: { this.props.product.name }</p>
            </div>
        );
    }
}

const mapDispatchToProps = {
    
};

const mapStateToProps = (state, props) => {
    return {
        product: state.product.products.find((product) => product.id === props.productId)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);