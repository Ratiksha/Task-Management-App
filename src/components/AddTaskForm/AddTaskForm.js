import React, { Component } from 'react';
import './AddTaskForm.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default class AddTaskForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            data: '',
            isAdding: false,
            errorRequired: false,
            errorDuplicate: false,
            disableSubmit: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value, 
            errorRequired:false, 
            errorDuplicate: false,
            disableSubmit: false
        });
    }

    handleSubmit = (event) => {
        const { addTask, listId, editTask, hideModal, taskId } = this.props
        const { value } = this.state
        event.preventDefault();
        if(!this.checkDuplicate(value)){
        if(value && addTask){
            addTask(value, listId);
            this.setEditing(false);
        }
        else if(value && editTask){
            editTask(value, listId, taskId);
            hideModal();
        }
        else{
            this.setState({
                errorRequired: true
            })
        }
    }
    }

    checkDuplicate = (name) => {
        const lists = this.props.lists ? this.props.lists : ''
        for (var i = 0; i < lists.length; i++) {
                for (var j = 0; j < lists[i].cards.length; j++) {
                    if(lists[i].cards[j].taskName.toUpperCase() === name.toUpperCase()){
                        this.setState({
                            errorDuplicate: true
                        })
                        return true
                    }
                }
          }
          
    }

    setEditing = (isAdding) => {
        this.setState({
            isAdding,
            errorRequired:false, 
            errorDuplicate: false,
            value: ''
        });
      }
    
    render() {
        const { isAdding, value, errorRequired, errorDuplicate, disableSubmit } = this.state;
        const { addTask, editTask, name } = this.props;
        if(!isAdding && addTask){
            return(
                <div className="add-button">
                     <button onClick={() => this.setEditing(true)}> <FontAwesomeIcon icon={faPlus}/> Add Task</button>
                </div>
            )
           
        }
        return (
            <form onSubmit={this.handleSubmit}>
                {editTask && <h3>Edit Task</h3>}
                <input type="text" defaultValue={name? name : value} onChange={this.handleChange} className={`${errorRequired || errorDuplicate? 'highlight': ''}`} />
                <input type="submit" value="Submit" className="button green" disabled={editTask ? disableSubmit : false} />
                {errorRequired && <p className="error">Please enter the name</p>}
                {errorDuplicate && <p className="error">Task already exists</p>}
                {!editTask && <button onClick={() => this.setEditing(false)} className="grey">Cancle</button>}
            </form>
        )
    }
}