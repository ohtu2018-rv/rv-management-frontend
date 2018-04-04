import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { addProduct } from '../../reducers/productReducer';
import './styles/ProductForm.css';

export class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.calculateSellprice = this.calculateSellprice.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    updateFields() {
        this.marginInput.value = this.props.globalMargin;
        this.calculateSellprice();
    }

    calculateSellprice() {
        const cost = parseFloat(this.buyInInput.value);
        const margin = parseFloat(this.marginInput.value);

        this.sellpriceInput.value = (cost * ((100 + margin) / 100)).toFixed(2);
    }

    componentDidMount() {
        this.updateFields();
    }

    componentDidUpdate() {
        this.updateFields();
    }

    formSubmit(event) {
        event.preventDefault();
        const newProduct = {
            descr: event.target.name.value,
            pgrpid: 1,
            weight: event.target.weight.value,
            barcode: event.target.barcode.value,
            count: 0,
            buyprice: parseInt(event.target.buyprice.value * 100, 10),
            sellprice: parseInt(event.target.sellprice.value * 100, 10)
        };
        this.props.addProduct(newProduct, this.props.token);
    }

    render() {
        return (
            <div className="product-create-form">
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
                                ref={input => {
                                    this.barcodeInput = input;
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="name">Nimi</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                ref={input => {
                                    this.nameInput = input;
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="category">Kategoria</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="category"
                                name="category"
                                type="text"
                                ref={input => {
                                    this.categoryInput = input;
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="weight">Paino</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="weight"
                                name="weight"
                                type="number"
                                step="1"
                                min="0"
                                defaultValue="42"
                                ref={input => {
                                    this.weightInput = input;
                                }}
                            />
                            <span className="unit">g</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="descr">Kuvaus</label>
                        </Col>
                        <Col xs={9}>
                            <textarea
                                id="descr"
                                name="descr"
                                type="text"
                                ref={input => {
                                    this.descriptionInput = input;
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="buyprice">Sisäänostohinta</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="buyprice"
                                name="buyprice"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue="0"
                                ref={input => {
                                    this.buyInInput = input;
                                }}
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
                                ref={input => {
                                    this.marginInput = input;
                                }}
                                onChange={this.calculateSellprice}
                            />
                            <span className="unit">%</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="sellprice">Myyntihinta</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="sellprice"
                                name="sellprice"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue="0"
                                ref={input => {
                                    this.sellpriceInput = input;
                                }}
                                onChange={this.calculateSellprice}
                            />
                            <span className="unit">&euro;</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                            <input
                                type="submit"
                                className="btn btn-success"
                                value="Luo uusi tuote"
                            />
                        </Col>
                        <Col xs={4}>
                            <Link to={'/products'}>
                                <input
                                    type="submit"
                                    className="btn btn-danger"
                                    value="Peruuta"
                                />
                            </Link>
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        globalMargin: state.product.globalMargin,
        token: state.authentication.accessToken
    };
};

const mapDispatchToProps = {
    addProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
