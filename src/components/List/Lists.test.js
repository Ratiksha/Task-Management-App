import React from 'react';
import { shallow } from 'enzyme';
import List from './List';

let wrapped = shallow(<List />);
let editType = 'edit';
let deleteType = 'delete';

describe('List', () => {
  it('should render the List Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });

  it('When edit button is clicked', () => {
    const editButton = wrapped.find('#list-edit');
    editButton.simulate('click');
    expect(editType).toBe('edit');
  });

  it('When delete button is clicked', () => {
    const deleteButton = wrapped.find('#list-delete');
    deleteButton.simulate('click');
    expect(deleteType).toBe('delete');
  });
});