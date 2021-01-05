import React from 'react';
import { shallow } from 'enzyme';
import DeleteForm from './DeleteForm';

let wrapped = shallow(<DeleteForm />);
describe('DeleteForm', () => {
  it('should render the DeleteForm Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });

});