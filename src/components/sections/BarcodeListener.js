import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DangerBtn, SuccessBtn } from './../buttons/Buttons';
import { setProductSelected } from '../../reducers/productReducer';
import { errorMessage } from '../../reducers/notificationReducer';
import { withRouter } from 'react-router-dom';

export class BarcodeListener extends Component {
    constructor(props) {
        super(props);

        this.state = {
            barcode: '',
            open: true
        };
    }
    handleInputEvent(event) {
        this.setState({ barcode: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.barcode.match('(^[0-9]{13})+$')) {
            var product = this.props.products.find(
                prod => prod.product_barcode === this.state.barcode
            );
            if (product) {
                this.props.setProductSelected(product.product_id);
                this.props.history.push(
                    `/products/${product.product_id}/stock`
                );
            } else {
                this.props.errorMessage('Product not found');
            }
        } else {
            this.props.errorMessage('Invalid barcode');
        }

        this.setState({ barcode: '' });
    }

    handleOpenClose(event) {
        this.setState({ barcode: '' });
        this.setState({ open: !this.state.open });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.open && (
                    <form onSubmit={event => this.handleSubmit(event)}>
                        <input
                            id="barcodeInput"
                            style={{
                                paddingLeft: 16,
                                paddingRight: 16,
                                paddingTop: 11,
                                paddingBottom: 11,
                                fontSize: 16,
                                textAlign: 'center',
                                display: 'inlineBlock'
                            }}
                            ref={input => {
                                input && input.focus();
                            }}
                            value={this.state.barcode}
                            placeholder="Lue viivakoodi"
                            pattern="\d*"
                            onChange={event => this.handleInputEvent(event)}
                        />
                        <DangerBtn
                            onClick={event => this.handleOpenClose(event)}
                            type="button"
                        >
                            Sulje
                        </DangerBtn>
                    </form>
                )}
                {this.state.open || (
                    <SuccessBtn onClick={event => this.handleOpenClose(event)}>
                        Lue viivakoodi
                    </SuccessBtn>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.product.products
    };
};

const mapDispatchToProps = {
    setProductSelected,
    errorMessage
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BarcodeListener));
