import React from 'react';
import { shallow, mount } from 'enzyme';
import TaskBoard from './TaskBoard';
import List from '../List/List'

jest.mock('../List/List', () => 'List');

let wrapped = shallow(<TaskBoard />);
describe('TaskBoard', () => {
  it('should render the TaskBoard Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });

  it('When blue theme button is clicked', () => {
    const color = '#227fba'
    const blueButton = wrapped.find('#blue');
    blueButton.simulate('click');
    expect(color).toBe('#227fba');
  });

  it('When yellow theme button is clicked', () => {
    const color = '#f59e01'
    const yellowButton = wrapped.find('#yellow');
    yellowButton.simulate('click');
    expect(color).toBe('#f59e01');
  });

  it('When purple theme button is clicked', () => {
    const color = '#540073'
    const purpleButton = wrapped.find('#purple');
    purpleButton.simulate('click');
    expect(color).toBe('#540073');
  });

  it('When add list button is clicked', () => {
    const showModal = jest.fn();
    showModal();
    wrapped.find('#add-list').simulate('click')
    expect(showModal).toHaveBeenCalled();
  });

});