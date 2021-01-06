import React from 'react';
import { shallow } from 'enzyme';
import DeleteForm from './DeleteForm';

let wrapped = shallow(<DeleteForm />);
describe('DeleteForm', () => {
  it('should render the DeleteForm Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });

  it('When submit button is clicked', () => {
    let mockFn = jest.fn();
    wrapped.find('form').simulate('click')
    mockFn();
    expect(mockFn).toHaveBeenCalled();
  })

});