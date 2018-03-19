import React, { Component } from 'react';
import { connect } from 'react-redux';

export class BarcodeListener extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            barcode: ''
        };
    }

    componentDidMount() {
        console.log('Mounted BarcodeListener');
        document.addEventListener('keypress', this.handleKeyPress);
    }

    componentWillUnMount() {
        console.log('Unmounted barcode component');
        document.removeEventListener('keypress', this.handleKeyPress);
    }

    handleKeyPress(event) {
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
    }

    render() {
        return (
            <div style={{ padding: 10, backgroundColor: '#C9C9C9' }}>
                Barcode: {this.state.barcode}
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BarcodeListener);
