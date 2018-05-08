import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { loadFormData, setSellPrice } from './../../reducers/productReducer';
import './styles/ProductEditForm.css';

// Validators (consider moving these to a global validation module)
const required = value => (value ? undefined : 'Kenttä ei saa olla tyhjä');
const minLength = (field, min) => value =>
    value && value.length < min
        ? `${field} on oltava pidempi kuin ${min} merkki(ä)`
        : undefined;
const maxLength = (field, max) => value =>
    value && value.length > max
        ? `${field} on oltava lyhyempi kuin ${max} merkki(ä)`
        : undefined;

const renderField = ({
    input,
    label,
    type,
    className,
    ref,
    meta: { touched, error, warning },
    ...props
}) => (
    <div>
        <label>{label}</label>
        <div>
            <input
                {...input}
                placeholder={label}
                type={type}
                {...props}
                ref={ref}
                className={className + (touched && error ? ' error-field' : '')}
            />
            {touched &&
                ((error && <span className="error-msg">{error}</span>) ||
                    (warning && (
                        <span className="warning-msg">{warning}</span>
                    )))}
        </div>
    </div>
);

const prodMapper = product =>
    Object.assign({}, product, {
        buyprice: parseFloat(product.buyprice / 100).toFixed(2),
        sellprice: parseFloat(product.sellprice / 100).toFixed(2)
    });

export class ProductEditForm extends Component {
    componentDidMount() {
        this.props.load(prodMapper(this.props.product), this.props.margin);
    }

    render() {
        const calculateSellprice = (value, previousValue, allValues) => {
            this.props.change(
                'sellprice',
                (
                    parseFloat(allValues.buyprice) *
                    ((100 + parseFloat(allValues.margin)) / 100)
                ).toFixed(2)
            );
            return value;
        };
        return (
            <form
                onSubmit={this.props.handleSubmit}
                className="product-edit-form"
            >
                <Row>
                    <Col xs={3}>
                        <label htmlFor="barcode">Viivakoodi</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component={renderField}
                            name="product_barcode"
                            type="text"
                            placeholder="Viivakoodi"
                            disabled={true}
                            validate={[required]}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="name">Nimi</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component={renderField}
                            id="name"
                            name="product_name"
                            placeholder="Tuotteen nimi"
                            type="text"
                            validate={[
                                required,
                                maxLength('Tuotteen nimen', 64)
                            ]}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="category">Kategoria</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component="select"
                            id="category"
                            name="product_group"
                        >
                            <option disabled>Valitse kategoria..</option>
                            {this.props.categories &&
                                this.props.categories.map(category => (
                                    <option
                                        key={category.category_id}
                                        value={category.category_id}
                                    >
                                        {category.category_description}
                                    </option>
                                ))}
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="weight">Paino (g)</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component={renderField}
                            id="weight"
                            name="weight"
                            type="number"
                            placeholder="Paino"
                            step="1"
                            min="0"
                            defaultValue="42"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="buyprice">
                            Sisäänostohinta (&euro;)
                        </label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component={renderField}
                            id="buyprice"
                            name="buyprice"
                            type="number"
                            placeholder="Sisäänostohinta"
                            step="0.01"
                            min="0"
                            defaultValue="0"
                            validate={[required]}
                            normalize={calculateSellprice}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="margin">Kate (%)</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component={renderField}
                            id="margin"
                            name="margin"
                            type="number"
                            step="1"
                            min="0"
                            normalize={calculateSellprice}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="sellprice">Myyntihinta (&euro;)</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component={renderField}
                            id="sellprice"
                            name="sellprice"
                            type="number"
                            step="0.01"
                            min="0"
                            normalize={calculateSellprice}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="sellprice">Varastosaldo (kpl)</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component="input"
                            id="quantity"
                            name="quantity"
                            type="number"
                            step="1"
                            defaultValue="0"
                            validate={[required]}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <Field
                            component="button"
                            type="submit"
                            name="submit"
                            className="btn btn-success"
                        >
                            Tallenna muutokset
                        </Field>
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
        );
    }
}

ProductEditForm = reduxForm({
    form: 'productEditForm',
    enableReinitialize: true
})(ProductEditForm);

const mapStateToProps = state => {
    return {
        initialValues: state.product.currentEditProduct,
        margin: state.product.globalMargin,
        categories: state.category.categories.categories
    };
};

const mapDispatchToProps = {
    load: loadFormData,
    setSellPrice
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditForm);
