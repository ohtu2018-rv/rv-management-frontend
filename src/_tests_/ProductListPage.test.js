import React from 'react';
import { ProductListPage } from '../components/pages/ProductListPage';
import { mount, shallow } from 'enzyme';

it('renders without crashing', () => {
    mount(<ProductListPage/>);
});