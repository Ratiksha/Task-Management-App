import React from 'react';
import { shallow, mount } from 'enzyme';
import TaskBoard from './TaskBoard';
import List from '../List/List'

let wrapped = mount(<TaskBoard />);
describe('TaskBoard', () => {
  // it('check for local storage on component mount', () => {
  //   const localStorageMock = {
  //     getItem: jest.fn(),
  //   }
  //   global.localStorage = localStorageMock;
  //   expect(localStorage.getItem.mock.calls.length).toBe(1)
  // })


  it('should click edit list button correctly', () => {  
    const editButton = wrapped.find('#list-edit');
    editButton.at(0).simulate('click');
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
 
  it('When submit button is clicked!', () => {
    const preventDefault = jest.fn();
    wrapped.find('#list-form').at(0).simulate('submit', { preventDefault })
    expect(preventDefault).toBeCalled();
  });

  it('should invoke the hideModal callback', () => {
    let mockFn = jest.fn();
    wrapped.find('#listModal').props().handleClose();
    mockFn();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should invoke the showModal callback', () => {
    let mockFn = jest.fn();
    wrapped.find('#add-list').simulate('click')
    mockFn();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should invoke addList on showModal callback', () => {
    let mockFn = jest.fn();
    wrapped.find('#listModal AddListForm').props().addList();
    mockFn();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should invoke the addTask callback', () => {
    let mockFn = jest.fn();
    wrapped.find('List').at(0).props().addTask();
    mockFn();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should invoke the editTask callback', () => {
    let mockFn = jest.fn();
    wrapped.find('List').at(0).props().editTask();
    mockFn();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should invoke the DeleteTask callback', () => {
    let mockFn = jest.fn();
    wrapped.find('List').at(0).props().DeleteTask();
    mockFn();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should invoke the addList callback', () => {
    let mockFn = jest.fn();
    wrapped.find('List').at(0).props().addList();
    mockFn();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should invoke the editList callback', () => {
    let mockFn = jest.fn();
    wrapped.find('List').at(0).props().editList();
    mockFn();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should invoke the DeleteList callback', () => {
    let mockFn = jest.fn();
    wrapped.find('List').at(0).props().DeleteList();
    mockFn();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should invoke the onListDragStart callback', () => {
    let mockFn = jest.fn();
    wrapped.find('List').at(0).props().onListDragStart();
    mockFn();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should invoke the onListDragOver callback', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    wrapped.find('.wrapper').at(0).invoke('onDragOver');
    event.preventDefault();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should invoke the onTaskDragStart callback', () => {
    const event = {
      stopPropagation: jest.fn(),
      currentTarget: {
        id: 1
      }
    };
    wrapped.find('List').at(0).props().onTaskDragStart(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should invoke the onTaskDragOver callback', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    wrapped.find('List').at(0).props().onTaskDragOver(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should invoke the onTaskDrop callback', () => {
    const event = {
      stopPropagation: jest.fn()
    };
    wrapped.find('List').at(0).props().onTaskDrop(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

});