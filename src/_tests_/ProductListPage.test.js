import React from 'react';
import { ProductListPage } from '../components/pages/ProductListPage';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([])({
    authentication: {
        isAuthenticated: false
    },
    product: {
        products: []
    },
    productMargin: {
        productMargin: 1
    }
});

it('renders without crashing', () => {
    mount(
        <Provider store={mockStore}>
            <ProductListPage />
        </Provider>
    );
});
