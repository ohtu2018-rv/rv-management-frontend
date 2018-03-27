import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import './styles/ProductAddStock.css';
import { connect } from 'react-redux';

export class ProductAddStock extends React.Component {

    constructor(props) {
        super(props);

        this.calculateSellprice = this.calculateSellprice.bind(this);
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
        this.updateFields();
    }

    formSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="product-stocking-form">
                <form onSubmit={this.formSubmit}>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="barcode">Viivakoodi</label>
                        </Col>
                        <Col xs={6}>
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
                        <Col xs={6}>
                            <input 
                                id="cost" 
                                name="cost"
                                type="number"
                                step="0.05"
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
                        <Col xs={6}>
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
                        <Col xs={6}>
                            <input 
                                id="sellprice" 
                                name="sellprice"
                                type="number"
                                step="0.05"
                                ref={input => { this.sellpriceInput = input; }}
                            />
                            <span className="unit">&euro;</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="quantity">Kappalemäärä</label>
                        </Col>
                        <Col xs={6}>
                            <input 
                                id="quantity"
                                name="quantity"
                                type="number"
                                defaultValue="1"
                                min="1"
                                step="1"
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

const mapStateToProps = state => {
    return {
        globalMargin: state.product.globalMargin
    };
};

export default connect(mapStateToProps)(ProductAddStock);
