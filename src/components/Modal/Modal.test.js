import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

let wrapped = shallow(<Modal />);
describe('Modal', () => {
  it('should render the Modal Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });
});