import productService from '../services/productService';

export const productActions = {
    SET_PRODUCT_SELECTED: 'SET_PRODUCT_SELECTED',
    SET_PRODUCTS: 'SET_PRODUCTS'
};

export const initialState = {
    selectedProduct: 0,
    products: []
};

export const setProductSelected = id => {
    return {
        type: productActions.SET_PRODUCT_SELECTED,
        selectedProduct: id
    };
};

export const getProducts = (token) => {
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
    case productActions.SET_PRODUCT_SELECTED:
        return Object.assign({}, state, { selectedProduct: action.selectedProduct });
    default:
        return state;
    }
};

export default productReducer;
