import React, { Component } from 'react';
import './DeleteForm.scss';

export default class DeleteForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = () => {
        const { listId, taskId, DeleteList, DeleteTask, hideModal } = this.props
        if(DeleteList){
            DeleteList(listId);
        }
        else{
            DeleteTask(listId, taskId)
        }
        hideModal();
    }
    
    render() {
        const { name, DeleteList } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Delete {DeleteList ? 'List' : 'Task'}</h3>
                <h4>Are you sure you want to delete <span>{name}</span> ?</h4>
                <input type="submit" value="Yes" className="button green delete"/>
            </form>
        )
    }
}