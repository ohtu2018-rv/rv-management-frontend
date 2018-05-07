import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/SingleProduct.css';
import noImage from './../../images/no_image.png';
import { fetchProductMargin } from './../../reducers/productMarginReducer';
import { setProductSelected } from '../../reducers/productReducer';
import { Route, withRouter, NavLink } from 'react-router-dom';
import ProductAddStock from './ProductAddStock';
import BoxAddStock from './BoxAddStock';
import ProductEditForm from './ProductEditForm';

export class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyInClicked: false
        };
    }

    componentDidUpdate() {
        if (this.props.selectedProduct === 0 && this.props.product) {
            this.props.setProductSelected(this.props.product.product_id);
        }
    }

    componentWillUnmount() {
        this.props.setProductSelected(0);
    }

    handleProductEdit = values => {
        values.sellprice = parseFloat(values.sellprice) * 100;
        values.buyprice = parseFloat(values.buyprice) * 100;
        console.log(values);

        // Back-end call here
    };

    render() {
        const product = this.props.product;
        const box = this.props.box;
        if (!product) {
            return <div>Valitse tuote tai lue viivakoodi.</div>;
        }
        const match = this.props.match;

        //link to box exist only if product has a box
        let linkToBox = box ? (
            <li>
                <NavLink to={`${match.url}/box`}> Laatikon sisäänosto </NavLink>
            </li>
        ) : (
            <li />
        );

        return (
            <React.Fragment>
                <div className="product-info">
                    <div className="product-title">
                        <h1>{product.product_name}</h1>
                        <h2>{product.quantity} varastossa</h2>
                    </div>
                    <div className="product-image">
                        <img src={noImage} alt={product.product_name} />
                    </div>
                </div>
                <div className="product-menu">
                    <ul>
                        <li>
                            <NavLink exact to={match.url}>
                                Perustiedot
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`${match.url}/stock`}>
                                Tuotteen sisäänosto
                            </NavLink>
                        </li>
                        {linkToBox}
                    </ul>
                </div>
                <div className="product-section-container">
                    <Route
                        exact
                        path={`${match.path}`}
                        render={() => (
                            <ProductEditForm
                                product={product}
                                onSubmit={this.handleProductEdit}
                            />
                        )}
                    />
                    <Route
                        path={`${match.path}/stock`}
                        render={() => <ProductAddStock product={product} />}
                    />
                    <Route
                        path={`${match.path}/box`}
                        render={() => (
                            <BoxAddStock product={product} box={box} />
                        )}
                    />
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = {
    fetchProductMargin,
    setProductSelected
};

const mapStateToProps = (state, props) => {
    return {
        product: state.product.products.find(
            product =>
                product.product_id ===
                parseInt(props.match.params.productid, 10)
        ),
        box: state.box.boxes.find(
            box => box.product_id === parseInt(props.match.params.productid, 10)
        ),
        productMargin: state.productMargin.productMargin,
        selectedProduct: state.product.selectedProduct,
        globalMargin: state.product.globalMargin
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
);
