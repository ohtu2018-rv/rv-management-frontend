import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import './styles/ProductAddStock.css';

class ProductAddStock extends React.Component {

    formSubmit(event) {
        event.preventDefault();
    }

    render() {
        const product = this.props.product;

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
                                defaultValue={product.product_barcode}
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
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="margin">Kate</label>
                        </Col>
                        <Col xs={6}>
                            <input id="margin" name="margin" type="text"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="sellprice">Myyntihinta (1 tuote)</label>
                        </Col>
                        <Col xs={6}>
                            <input id="sellprice" name="sellprice" type="text"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="quantity">Kappalemäärä</label>
                        </Col>
                        <Col xs={6}>
                            <input id="quantity" name="quantity" type="text"/>
                        </Col>
                    </Row>
                    <Row center="xs">
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

export default ProductAddStock;
