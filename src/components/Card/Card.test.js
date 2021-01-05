import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

let wrapped = shallow(<Card />);
let editType = 'edit';
let deleteType = 'delete';
describe('Card', () => {
  it('should render the Card Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });

  it('When edit button is clicked', () => {
    const editButton = wrapped.find('#card-edit');
    editButton.simulate('click');
    expect(editType).toBe('edit');
  });

  it('When delete button is clicked', () => {
    const deleteButton = wrapped.find('#card-delete');
    deleteButton.simulate('click');
    expect(deleteType).toBe('delete');
  });
});