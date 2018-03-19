import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/ProductFilter.css';
import {
    sortByValue,
    productFilterType
} from '../../reducers/productFilterReducer';

export class ProductFilter extends Component {
    change(event) {
        this.props.sortByValue(event.target.value);
    }
    render() {
        return (
            <div className="productFilter">
                <div className="title">Sort</div>
                <div className="dropdown">
                    <select
                        onChange={event => this.change(event)}
                        value={this.props.sortedBy}
                    >
                        <option value={productFilterType.NONE}>--</option>
                        <option value={productFilterType.NAME_ASC}>
                            Name (asc)
                        </option>
                        <option value={productFilterType.NAME_DESC}>
                            Name (desc)
                        </option>
                        <option value={productFilterType.STOCK_LOW}>
                            Stock (low to high)
                        </option>
                        <option value={productFilterType.STOCK_HIGH}>
                            Stock (high to low)
                        </option>
                        <option value={productFilterType.MOST_BOUGHT_LOW}>
                            Most bought (high to low)
                        </option>
                        <option value={productFilterType.MOST_BOUGHT_HIGH}>
                            Most bought (high to low)
                        </option>
                    </select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    sortedBy: state.productFilter.sortedBy
});

const mapDispatchToProps = {
    sortByValue
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductFilter);
