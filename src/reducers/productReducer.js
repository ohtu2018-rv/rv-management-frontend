import productService from '../services/productService';
import marginService from '../services/globalMarginService';
import { errorMessage, successMessage } from './notificationReducer';

export const productActions = {
    SET_PRODUCT_SELECTED: 'SET_PRODUCT_SELECTED',
    SELECT_PRODUCT_BY_BARCODE: 'SELECT_PRODUCT_BY_BARCODE',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_GLOBAL_MARGIN: 'SET_GLOBAL_MARGIN',
    ADD_NEW_PRODUCT: 'ADD_NEW_PRODUCT',
    SET_UPGRADESTOCK: 'SET_UPGRADESTOCK',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    LOAD_FORM_DATA: 'LOAD_FORM_DATA',
    SET_SELL_PRICE: 'SET_SELL_PRICE'
};

export const initialState = {
    selectedProduct: 0,
    products: [],
    globalMargin: 0,
    upgradeStock: false,
    currentEditProduct: {}
};

export const setGlobalMargin = (newMargin, token) => {
    return async dispatch => {
        const margin = await marginService.changeMargin(newMargin, token);
        dispatch({
            type: productActions.SET_GLOBAL_MARGIN,
            globalMargin: margin.margin
        });
    };
};

export const getGlobalMargin = token => {
    return async dispatch => {
        const margin = await marginService.getMargin(token);
        dispatch({
            type: productActions.SET_GLOBAL_MARGIN,
            globalMargin: margin.margin
        });
    };
};

export const loadFormData = (product, globalMargin) => {
    return {
        type: productActions.LOAD_FORM_DATA,
        product,
        globalMargin
    };
};

export const setSellPrice = sellPrice => {
    return {
        type: productActions.SET_SELL_PRICE,
        sellPrice
    };
};

export const setProductSelected = id => {
    return {
        type: productActions.SET_PRODUCT_SELECTED,
        selectedProduct: id
    };
};

const productFilter = product => {
    return {
        product_id: product.product.itemid,
        product_name: product.product.descr,
        product_barcode: product.price.barcode,
        buyprice: product.price.buyprice,
        sellprice: product.price.sellprice,
        quantity: product.price.count
    };
};

export const addProduct = (product, token) => {
    return async dispatch => {
        try {
            const addedProduct = await productService.addProduct(
                {
                    descr: product.descr,
                    pgrpid: product.pgrpid,
                    weight: product.weight,
                    barcode: product.barcode,
                    count: product.count,
                    buyprice: product.buyprice,
                    sellprice: product.sellprice
                },
                token
            );
            dispatch({
                type: productActions.ADD_NEW_PRODUCT,
                product: productFilter(addedProduct)
            });

            dispatch(successMessage('New product added successfully'));
        } catch (ex) {
            console.log(ex);
            dispatch(errorMessage('Error adding new product'));
        }
    };
};

export const getProducts = token => {
    return async dispatch => {
        const products = await productService.getAll(token);
        //console.log(products.products);
        dispatch({
            type: productActions.SET_PRODUCTS,
            products: products.products
        });
    };
};

//redirects from addStock page to product info tab when value is true
export const setUpgradeStock = value => {
    return {
        type: productActions.SET_UPGRADESTOCK,
        redirect: value
    };
};

//fix this:now works with updating products by requesting whole productlist from backend
export const addStock = (product, token) => {
    return async dispatch => {
        try {
            await productService.addStock(token, product);
            dispatch(successMessage('Buy in completed'));
            dispatch(setUpgradeStock(true));
            dispatch(getProducts(token));
        } catch (error) {
            const errorCode = error.response
                ? error.response.data.error_code
                : null;
            switch (errorCode) {
            case 'bad_request':
                error.response.data.errors.forEach(message => {
                    dispatch(errorMessage(message));
                });
                break;
            case 'product_not_found':
                dispatch(errorMessage('product_not_found from database'));
                break;
            case 'internal_error':
                dispatch(
                    errorMessage(
                        'internal_error / Database is not running or connected'
                    )
                );
                break;
            default:
                dispatch(errorMessage('Unknown error has occuered'));
                break;
            }
        }
    };
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
    case productActions.SET_PRODUCTS:
        return Object.assign({}, state, { products: action.products });
    case productActions.SET_GLOBAL_MARGIN:
        return Object.assign({}, state, {
            globalMargin: action.globalMargin
        });
    case productActions.SET_PRODUCT_SELECTED:
        return Object.assign({}, state, {
            selectedProduct: action.selectedProduct
        });
    case productActions.ADD_NEW_PRODUCT:
        return Object.assign({}, state, {
            products: [...state.products, action.product]
        });
    case productActions.SET_UPGRADESTOCK:
        return Object.assign({}, state, {
            upgradeStock: action.redirect
        });
    case productActions.LOAD_FORM_DATA:
        return Object.assign({}, state, {
            currentEditProduct: Object.assign({}, action.product, {
                margin: action.globalMargin
            })
        });
    case productActions.SET_SELL_PRICE:
        return Object.assign({}, state, {
            currentEditProduct: Object.assign(
                {},
                state.currentEditProduct,
                {
                    sellprice: action.sellPrice
                }
            )
        });
    default:
        return state;
    }
};

export default productReducer;
