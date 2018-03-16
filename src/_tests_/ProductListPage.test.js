import React from 'react';
import { ProductListPage } from '../components/pages/ProductListPage';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { ProductList } from '../components/sections/ProductList';

const mockStore = configureStore([])({});

describe('Product list page', () => {
    it('renders without crashing', () => {
        mount(<Provider store={mockStore}><ProductListPage /></Provider>);
    });
    
    it('renders product list', () => {
        const page = mount(<Provider store={mockStore}><ProductListPage /></Provider>);
        expect(page.find(ProductList).length).toBe(1);
    });
});
