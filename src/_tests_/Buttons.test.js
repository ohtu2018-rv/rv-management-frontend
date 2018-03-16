import React from 'react';
import { 
    BasicBtn, SuccessBtn, DangerBtn
} from '../components/buttons/Buttons';
import { mount } from 'enzyme';

it('renders buttons without crashing', () => {
    mount(<BasicBtn/>);
    mount(<SuccessBtn/>);
    mount(<DangerBtn/>);
});
