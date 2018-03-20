import React, { Component } from 'react';
import { connect } from 'react-redux';

export class BarcodeListener extends Component {
    constructor(props) {
        super(props);

        this.state = {
            barcode: ''
        };

        // this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    /*componentDidMount() {
        document.addEventListener('keypress', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress);
    }*/

    /* handleKeyPress(event) {
        // Valid keys: 48-57 (0-9) and 13 (Enter)
        if (
            (event.keyCode >= 48 && event.keyCode <= 57) ||
            event.keyCode === 13
        ) {
            console.log('Pressed key: %s', event.key);
            if (event.keyCode === 13) {
                // Temporary
                console.log('INPUT: %s', this.state.barcode);
                this.setState({ barcode: '' });
                console.log('HANDLE BARCODE SUBMIT');
            } else {
                this.setState({ barcode: this.state.barcode + event.key });
            }
        }
    }*/

    handleInputEvent(event) {
        this.setState({ barcode: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ barcode: '' });

        // VIIVAKOODIN MUKAAN TEHTÄVÄ TUOTTEEN VALINTA TÄNNE
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <input
                        style={{
                            paddingLeft: 16,
                            paddingRight: 16,
                            paddingTop: 11,
                            paddingBottom: 11,
                            fontSize: 16,
                            textAlign: 'center'
                        }}
                        ref={input => {
                            input && input.focus();
                        }}
                        value={this.state.barcode}
                        placeholder="Lue viivakoodi"
                        onChange={event => this.handleInputEvent(event)}
                    />
                </form>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BarcodeListener);
