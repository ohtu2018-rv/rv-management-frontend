import React from 'react';
import { HeaderUser } from '../components/sections/HeaderUser';
import { mount, shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<HeaderUser/>);
});

it('contains user information', () => {
    expect(
        shallow(<HeaderUser/>).find('.header-user').length
    ).toBe(1);
});
