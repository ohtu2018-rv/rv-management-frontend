export const productActions = {
    SET_PRODUCT_SELECTED: 'SET_PRODUCT_SELECTED'
};

export const initialState = {
    selectedProduct: 0,
    products: [
        {
            id: 1,
            name: 'Twix',
            amount: 1,
            stock: 100
        },
        {
            id: 2,
            name: 'Tupla',
            amount: 1,
            stock: 10
        },
        {
            id: 3,
            name: 'Mars',
            amount: 10,
            stock: -5000
        },
        {
            id: 4,
            name: 'Snickers',
            amount: 1,
            stock: 1000
        },
        {
            id: 5,
            name: 'Toblerone',
            amount: 1,
            stock: 10
        },
        {
            id: 6,
            name: 'Dacapo',
            amount: 1,
            stock: 100
        },
        {
            id: 7,
            name: 'Jim',
            amount: 1,
            stock: 100
        },
        {
            id: 8,
            name: 'Marianne',
            amount: 1,
            stock: 100
        },
        {
            id: 9,
            name: 'Milka',
            amount: 1,
            stock: 100
        },
        {
            id: 10,
            name: 'Oreo',
            amount: 1,
            stock: 100
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
        return Object.assign({}, state, {
            selectedProduct: action.selectedProduct
        });
    default:
        return state;
    }
};

export default productReducer;
