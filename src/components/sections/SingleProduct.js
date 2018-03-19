import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/SingleProduct.css';
import twix from './../../images/twix.png';

export class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sisaanostoClicked: false
        };
    }

    sisaanOsto() {
        this.setState({ sisaanostoClicked: !this.state.sisaanostoClicked });
    }

    render() {
        if (!this.props.product) {
            return <div className="product-info">Valitse tuote tai lue viivakoodi.</div>;
        }
        return (
            <div className="product-info">
                <div className="product-image">
                    <img src={twix} alt="Twix" />
                </div>
                <div className="row title">Tuotteen tiedot</div>
                <div className="row">
                    <div className="label">Nimi</div>
                    <div className="data">
                        {this.props.product && this.props.product.name}
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
                {this.state.sisaanostoClicked ? (
                    <React.Fragment>
                        <div className="row title">Sisäänosto</div>
                        <div className="row">
                            <div className="label">Sisäänostohinta</div>
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
                                    value="8.00"
                                    min="0"
                                />{' '}
                                %
                            </div>
                        </div>
                        <div className="row">
                            <div className="label">Myyntihinta</div>
                            <div className="data">
                                <input type="number" step=".01" value="1.08" />{' '}
                                €
                            </div>
                        </div>
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
                        <div className="row btn-row">
                            <button className="cancel-btn" onClick={() => this.sisaanOsto()}>Peruuta</button>
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
                            onClick={() => this.sisaanOsto()}
                        >
                            Tee sisäänosto
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

const mapDispatchToProps = {};

const mapStateToProps = (state, props) => {
    return {
        product: state.product.products.find(
            product => product.id === props.productId
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
