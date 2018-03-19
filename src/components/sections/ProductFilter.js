import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/ProductFilter.css';

export class ProductFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'NAME_ASC'
        };
    }
    change(event) {
        this.setState({ value: event.target.value });
    }
    render() {
        return (
            <div className="productFilter">
                <div className="title">Sort</div>
                <div className="dropdown">
                    <select onChange={(event) => this.change(event)} value={this.state.value}>
                        <option>--</option>
                        <option value="NAME_ASC">Name (asc)</option>
                        <option value="NAME_DESC">Name (desc)</option>
                        <option value="STOCK_LOW">Stock (low to high)</option>
                        <option value="STOCK_HIGH">Stock (high to low)</option>
                        <option value="MOST_BOUGHT_HIGH">
                            Most bought (high to low)
                        </option>
                        <option value="MOST_BOUGHT_LOW">
                            Most bought (high to low)
                        </option>
                    </select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductFilter);
