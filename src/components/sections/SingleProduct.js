import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/SingleProduct.css';
import twix from './../../images/twix.png';
import { fetchProductMargin } from './../../reducers/productMarginReducer';

export class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyInClicked: false
        };
    }

    componentWillMount() {
        this.props.fetchProductMargin();
    }

    buyIn() {
        this.setState({ buyInClicked: !this.state.buyInClicked });
    }

    isBox() {
        return this.props.product && this.props.product.quantity > 1;
    }

    render() {
        if (!this.props.product) {
            return <div className="product-info">Valitse tuote tai lue viivakoodi.</div>;
        }
        return (
            <div className="product-info">
                <div
                    className={
                        !this.isBox() ? 'product-image' : 'product-image is-box'
                    }
                >
                    <img src={twix} alt="Twix" />
                </div>
                {this.isBox() && (
                    <React.Fragment>
                        <div className="row title">Laatikon tiedot</div>
                        <div className="row">
                            <div className="label">Laatikon sisäänosto</div>
                            <div className="data">
                                <input type="number" step=".01" value="40.00" />{' '}
                                €
                            </div>
                        </div>
                        <div className="row">
                            <div className="label">Tuotteita / laatikko</div>
                            <div className="data">
                                <input
                                    type="number"
                                    step="1"
                                    value="40"
                                    min="1"
                                    disabled
                                />{' '}
                                kpl
                            </div>
                        </div>
                        <div className="row">
                            <div className="label">Laatikkojen lkm</div>
                            <div className="data">
                                <input
                                    type="number"
                                    step="1"
                                    value="1"
                                    min="1"
                                />{' '}
                                kpl
                            </div>
                        </div>
                    </React.Fragment>
                )}
                <div className="row title">Tuotteen tiedot</div>
                <div className="row">
                    <div className="label">Nimi</div>
                    <div className="data">
                        {this.props.product && this.props.product.product_name}{' '}
                        {this.isBox() && ' (laatikko)'}
                    </div>
                </div>
                <div className="row">
                    <div className="label">Kategoria</div>
                    <div className="data">Makeiset</div>
                </div>
                <div className="row">
                    <div className="label">Kuvaus</div>
                    <div className="data desc">
                        Kullanvärisellä kuorella varustettu makuelämys.
                    </div>
                </div>
                {this.state.buyInClicked || this.isBox() ? (
                    <React.Fragment>
                        <div className="row title">Sisäänosto</div>
                        <div className="row">
                            <div className="label">
                                Sisäänostohinta {this.isBox() && ' (1 tuote)'}
                            </div>
                            <div className="data">
                                <input type="number" step=".01" value="1.00" />{' '}
                                €
                            </div>
                        </div>
                        <div className="row">
                            <div className="label">Marginaali</div>
                            <div className="data">
                                <input
                                    type="number"
                                    step=".01"
                                    value={"" + this.props.globalMargin + ".00"}
                                    min="0"
                                />{' '}
                                %
                            </div>
                        </div>
                        <div className="row">
                            <div className="label">
                                Myyntihinta {this.isBox() && ' (1 tuote)'}
                            </div>
                            <div className="data">
                                <input type="number" step=".01" value="1.08" />{' '}
                                €
                            </div>
                        </div>
                        {this.isBox() || (
                            <div className="row">
                                <div className="label">Lukumäärä</div>
                                <div className="data">
                                    <input
                                        type="number"
                                        step="1"
                                        value="1"
                                        min="1"
                                    />{' '}
                                    kpl
                                </div>
                            </div>
                        )}
                        <div className="row btn-row">
                            {this.isBox() || (
                                <button
                                    className="cancel-btn"
                                    onClick={() => this.buyIn()}
                                >
                                    Peruuta
                                </button>
                            )}
                            <button className="purchase-btn">
                                Osta sisään
                            </button>
                        </div>
                    </React.Fragment>
                ) : (
                    <div className="row btn-row">
                        <button className="cancel-btn">Muokkaa</button>
                        <button
                            className="purchase-btn"
                            onClick={() => this.buyIn()}
                        >
                            Tee sisäänosto
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

const mapDispatchToProps = {
    fetchProductMargin
};

const mapStateToProps = (state, props) => {
    return {
        product: state.product.products.find(
            product => product.product_id === props.productId
        ),
        productMargin: state.productMargin.productMargin,
        globalMargin: state.product.globalMargin
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
