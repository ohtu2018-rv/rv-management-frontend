import React, { Component } from 'react';
import ProductList from './../sections/ProductList';

const products = [
    {
        id: 1,
        name: 'Twix'
    },
    {
        id: 2,
        name: 'Tupla'
    },
    {
        id: 3,
        name: 'Mars'
    },
    {
        id: 4,
        name: 'Snickers'
    },
    {
        id: 5,
        name: 'Toblerone'
    },
    {
        id: 6,
        name: 'Dacapo'
    },
    {
        id: 7,
        name: 'Jim'
    },
    {
        id: 8,
        name: 'Marianne'
    },
    {
        id: 9,
        name: 'Milka'
    },
    {
        id: 10,
        name: 'Oreo'
    }
];

export class ProductListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeProduct: null
        };
    }

    onProductClick = (productId) => {
        this.setState({ activeProduct: productId });
    }
    render() {
        return (
            <ProductList
                products={products}
                active={this.state.activeProduct}
                onProductClick={this.onProductClick}
            />
        );
    }
}

export default ProductListPage;
