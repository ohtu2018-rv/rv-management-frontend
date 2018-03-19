import productService from '../services/productService';
import marginService from '../services/globalMarginService';

export const productActions = {
    SET_PRODUCT_SELECTED: 'SET_PRODUCT_SELECTED',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_GLOBAL_MARGIN: 'SET_GLOBAL_MARGIN'
};

export const initialState = {
    selectedProduct: 0,
    products: {
        products: [] // lol
    },
    globalMargin: 0
};

// Needs an API-call
export const setGlobalMargin = (newMargin, token) => {
    return async dispatch => {
        const margin = await marginService.changeMargin(newMargin, token);
        dispatch({
            type: productActions.SET_GLOBAL_MARGIN,
            globalMargin: margin.margin
        });
    };
};

export const setProductSelected = id => {
    return {
        type: productActions.SET_PRODUCT_SELECTED,
        selectedProduct: id
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

export const getProducts = token => {
    return async dispatch => {
        const products = await productService.getAll(token);
        dispatch({
            type: productActions.SET_PRODUCTS,
            products: products
        });
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
    default:
        return state;
    }
};

export default productReducer;
