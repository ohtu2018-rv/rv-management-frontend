import React from 'react';
import { HeaderNav } from '../components/sections/HeaderNav';
import { mount, shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<HeaderNav/>);
});

it('contains navigation menu', () => {
    expect(
        shallow(<HeaderNav/>).find('.header-nav').length
    ).toBe(1);
});
