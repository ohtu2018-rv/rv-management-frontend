import React from 'react';
import { BasicBtn, SuccessBtn, DangerBtn } from '../components/buttons/Buttons';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

it('renders buttons without crashing', () => {
    mount(<BasicBtn />);
    mount(<SuccessBtn />);
    mount(<DangerBtn />);

    // Snapshot tests
    const basicBtnTree = renderer.create(<BasicBtn />).toJSON();
    expect(basicBtnTree).toMatchSnapshot();
    const successBtnTree = renderer.create(<SuccessBtn />).toJSON();
    expect(successBtnTree).toMatchSnapshot();
    const dangerBtnTree = renderer.create(<DangerBtn />).toJSON();
    expect(dangerBtnTree).toMatchSnapshot();
});
