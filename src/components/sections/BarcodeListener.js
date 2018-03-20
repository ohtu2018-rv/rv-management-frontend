import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DangerBtn, SuccessBtn } from './../buttons/Buttons';

export class BarcodeListener extends Component {
    constructor(props) {
        super(props);

        this.state = {
            barcode: '',
            open: false
        };
    }

    handleInputEvent(event) {
        this.setState({ barcode: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ barcode: '' });
        // VIIVAKOODIN MUKAAN TEHTÄVÄ TUOTTEEN VALINTA TÄNNE
        this.props.selectProductByBarcode(this.state.barcode);
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BarcodeListener);
