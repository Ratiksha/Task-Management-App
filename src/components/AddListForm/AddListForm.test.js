import React from 'react';
import { shallow } from 'enzyme';
import AddListForm from './AddListForm';

let wrapped = shallow(<AddListForm />);
describe('AddListForm', () => {
  it('should render the AddListForm Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });

  it('When submit button is clicked!', () => {
    const preventDefault = jest.fn();
    wrapped.find('form').simulate('submit', { preventDefault })
    expect(preventDefault).toBeCalled();
  });

  it('When input is clicked', () => {
    const mockedEvent = { target: { value: "foo"} }
    const spy = jest.spyOn(wrapped.instance(), 'handleChange')
    wrapped.instance().forceUpdate();
    wrapped.find('input[type="text"]').simulate('change', mockedEvent)
    expect(spy).toHaveBeenCalledTimes(1);
  })
});