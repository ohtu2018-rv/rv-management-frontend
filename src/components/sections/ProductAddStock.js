import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import './styles/ProductAddStock.css';
import { connect } from 'react-redux';

import { addStock , setUpgradeStock } from '../../reducers/productReducer';
import { Redirect } from 'react-router-dom';

export class ProductAddStock extends React.Component {

    constructor(props) {
        super(props);

        this.calculateSellprice = this.calculateSellprice.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    updateFields() {
        this.barcodeInput.value = this.props.product.product_barcode;
        this.marginInput.value = this.props.globalMargin;
        this.calculateSellprice();
    }

    calculateSellprice() {
        const cost = parseFloat(this.costInput.value);
        const margin = parseFloat(this.marginInput.value);

        this.sellpriceInput.value =
            (cost * ((100 + margin) / 100)).toFixed(2);
    }

    componentDidMount() {
        this.updateFields();
    }

    componentDidUpdate() {
        if (!this.props.upgradeStock) {
            this.updateFields();
        }
    }

    componentWillUnmount() {
        this.props.setUpgradeStock(false);
    }
    
    formSubmit(event) {
        event.preventDefault();
        const product = {
            id: this.props.product.product_id,
            buyprice: this.costInput.value,
            margin: this.marginInput.value,
            sellprice: this.sellpriceInput.value,
            quantity: this.quantityInput.value
        };

        this.props.addStock(
            product, this.props.token);
    }

    render() {
        if (this.props.upgradeStock) {
            const link = '/products/' + this.props.product.product_id;         
            return <Redirect to={ link }/>;
        }
        return (
            <div className="product-stocking-form">
                <form onSubmit={this.formSubmit}>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="barcode">Viivakoodi</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="barcode"
                                name="barcode"
                                type="text"
                                ref={input => { this.barcodeInput = input; }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="cost">Sisäänostohinta (1 tuote)</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="cost"
                                name="cost"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue="1.50"
                                ref={input => { this.costInput = input; }}
                                onChange={this.calculateSellprice}
                            />
                            <span className="unit">&euro;</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="margin">Kate</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="margin"
                                name="margin"
                                type="number"
                                step="1"
                                min="0"
                                defaultValue={this.props.globalMargin}
                                ref={input => { this.marginInput = input; }}
                                onChange={this.calculateSellprice}
                            />
                            <span className="unit">%</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="sellprice">Myyntihinta (1 tuote)</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="sellprice"
                                name="sellprice"
                                type="number"
                                step="0.01"
                                ref={input => { this.sellpriceInput = input; }}
                            />
                            <span className="unit">&euro;</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="quantity">Kappalemäärä</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                defaultValue="1"
                                min="1"
                                step="1"
                                ref={input => { this.quantityInput = input; }}
                            />
                            <span className="unit">kpl</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <input
                                type="submit"
                                className="btn btn-success"
                                value="Osta sisään"
                            />
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = {
    addStock,
    setUpgradeStock
};


const mapStateToProps = state => {
    return {
        globalMargin: state.product.globalMargin,
        token: state.authentication.accessToken,
        upgradeStock: state.product.upgradeStock
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddStock);
