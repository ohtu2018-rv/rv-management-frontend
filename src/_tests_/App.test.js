import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../App';
import Header from '../components/sections/Header';
import { shallow, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import './__mocks__/storageMock';

const mockStore = configureStore([])({
    authentication: {
        isAuthenticated: false
    }
});

describe('<App/>', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={mockStore}>
                <App />
            </Provider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('contains a header', () => {
        expect(
            shallow(
                <Provider store={mockStore}>
                    <App />
                </Provider>
            ).contains(<Header />)
        );
    });
});
