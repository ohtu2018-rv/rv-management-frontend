import React from 'react';
import { shallow } from 'enzyme';
import PurchaseNotification from './PurchaseNotification';
import renderer from 'react-test-renderer';

describe.only('<PurchaseNotification />', () => {
    it('renders correctly', () => {
        const cmpnt = renderer.create(<PurchaseNotification />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
