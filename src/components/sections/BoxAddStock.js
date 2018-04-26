import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import './styles/BoxAddStock.css';
import { connect } from 'react-redux';

export class BoxAddStock extends React.Component {
    constructor(props) {
        super(props);

        this.calculateProductSellprice = this.calculateProductSellprice.bind(
            this
        );
        this.calculateProductSellpriceAndBoxcost = this.calculateProductSellpriceAndBoxcost.bind(
            this
        );
        this.formSubmit = this.formSubmit.bind(this);
    }

    updateFields() {
        //        this.barcodeInput.value =
        //        this.productBarcodeInput.value =
        this.costInput.value = (this.props.product.buyprice / 100).toFixed(2);
        //        this.amountInput.value =

        this.marginInput.value = this.props.globalMargin;
        this.calculateProductSellpriceAndBoxcost();
    }

    calculateProductSellprice() {
        const boxcost = parseFloat(this.boxcostInput.value);
        const amount = parseFloat(this.amountInput.value);
        const margin = parseFloat(this.marginInput.value);
        const productcost = boxcost / amount;

        this.costInput.value = productcost.toFixed(2);
        this.sellpriceInput.value = (
            productcost *
            ((100 + margin) / 100)
        ).toFixed(2);
    }

    calculateProductSellpriceAndBoxcost() {
        const productcost = parseFloat(this.costInput.value);
        const margin = parseFloat(this.marginInput.value);
        const amount = parseFloat(this.amountInput.value);

        this.boxcostInput.value = (productcost * amount).toFixed(2);
        this.sellpriceInput.value = (
            productcost *
            ((100 + margin) / 100)
        ).toFixed(2);
    }

    componentDidMount() {
        this.updateFields();
    }

    componentDidUpdate() {
        this.updateFields();
    }

    componentWillUnmount() {}

    formSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="box-stocking-form">
                <form onSubmit={this.formSubmit}>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="barcode">Laatikon viivakoodi</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="barcode"
                                name="barcode"
                                type="text"
                                ref={input => {
                                    this.barcodeInput = input;
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="cost">
                                Laatikon sisäänostohinta
                            </label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="boxcost"
                                name="boxcost"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue="1.50"
                                ref={input => {
                                    this.boxcostInput = input;
                                }}
                                onChange={this.calculateProductSellprice}
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
                                ref={input => {
                                    this.marginInput = input;
                                }}
                                onChange={this.calculateProductSellprice}
                            />
                            <span className="unit">%</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="amount">Tuotteita laatikossa</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                step="1"
                                defaultValue="10"
                                ref={input => {
                                    this.amountInput = input;
                                }}
                            />
                            <span className="unit">kpl</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="quantity">Laatikoiden määrä</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                defaultValue="1"
                                min="1"
                                step="1"
                                ref={input => {
                                    this.quantityInput = input;
                                }}
                            />
                            <span className="unit">kpl</span>
                        </Col>
                    </Row>
                    <div className="product-wrapper">
                        <Row>
                            <Col xs={3}>
                                <label className="product-title">
                                    Laatikko sisältää:
                                </label>
                            </Col>
                            <Col xs={9}>
                                <label className="product-title">Twix</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <label htmlFor="barcode">
                                    Tuotteen viivakoodi
                                </label>
                            </Col>
                            <Col xs={9}>
                                <input
                                    id="barcode"
                                    name="barcode"
                                    type="text"
                                    ref={input => {
                                        this.productBarcodeInput = input;
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <label htmlFor="cost">
                                    Tuotteen sisäänostohinta
                                </label>
                            </Col>
                            <Col xs={9}>
                                <input
                                    id="cost"
                                    name="cost"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    defaultValue="1.50"
                                    ref={input => {
                                        this.costInput = input;
                                    }}
                                    onChange={
                                        this.calculateProductSellpriceAndBoxcost
                                    }
                                />
                                <span className="unit">&euro;</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <label htmlFor="sellprice">
                                    Tuotteen myyntihinta
                                </label>
                            </Col>
                            <Col xs={9}>
                                <input
                                    id="sellprice"
                                    name="sellprice"
                                    type="number"
                                    step="0.01"
                                    ref={input => {
                                        this.sellpriceInput = input;
                                    }}
                                />
                                <span className="unit">&euro;</span>
                            </Col>
                        </Row>
                    </div>
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

const mapDispatchToProps = {};

const mapStateToProps = state => {
    return {
        globalMargin: state.product.globalMargin,
        token: state.authentication.accessToken
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxAddStock);
