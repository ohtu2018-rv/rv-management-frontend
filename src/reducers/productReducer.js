export const productActions = {
    SET_PRODUCT_SELECTED: 'SET_PRODUCT_SELECTED'
};

export const initialState = {
    selectedProduct: 0,
    products: [
        {
            id: 1,
            name: 'Twix'
        },
        {
            id: 2,
            name: 'Tupla'
        },
        {
            id: 3,
            name: 'Mars'
        },
        {
            id: 4,
            name: 'Snickers'
        },
        {
            id: 5,
            name: 'Toblerone'
        },
        {
            id: 6,
            name: 'Dacapo'
        },
        {
            id: 7,
            name: 'Jim'
        },
        {
            id: 8,
            name: 'Marianne'
        },
        {
            id: 9,
            name: 'Milka'
        },
        {
            id: 10,
            name: 'Oreo'
        }
    ]
};

export const setProductSelected = id => {
    return {
        type: productActions.SET_PRODUCT_SELECTED,
        selectedProduct: id
    };
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
    case productActions.SET_PRODUCT_SELECTED:
        return Object.assign({}, state, { selectedProduct: action.selectedProduct });
    default:
        return state;
    }
};

export default productReducer;
