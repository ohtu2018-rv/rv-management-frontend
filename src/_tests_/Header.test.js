import React from 'react';
import { Header } from '../components/sections/Header';
import { mount, shallow } from 'enzyme';
import { HeaderNav } from '../components/sections/HeaderNav';
import HeaderUser from '../components/sections/HeaderUser';

it('renders without crashing', () => {
    mount(<Header/>);
});

it('does not render navigation and user info when not logged in', () => {
    const header = mount(<Header/>);
    expect(header.find(HeaderNav).length).toBe(0);
    expect(header.find(HeaderUser).length).toBe(0);
});

it('renders navigation and user info when logged in', () => {
    const header = shallow(<Header isAuthenticated={true} />);
    expect(header.find(HeaderNav).length).toBe(1);
    expect(header.find(HeaderUser).length).toBe(1);
});