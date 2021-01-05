import React, { Component } from 'react';
import './AddListForm.scss';

export default class AddListForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
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
        const { addList, listId, editList, hideModal } = this.props
        const { value } = this.state
        event.preventDefault();
        if(!this.checkDuplicate(value)){
            if(value && editList){
                editList(value, listId);
                hideModal();
            }
            else if (value && addList) {
                addList(value);
                hideModal();
            }
            else{
                this.setState({
                    errorRequired: true
                })
            }
        }
        
    }

    checkDuplicate(name){
        const { lists } = this.props
        for (var i = 0; i < lists && lists.length; i++) {
            if(name.toUpperCase() === lists[i].name.toUpperCase()){
                this.setState({
                    errorDuplicate: true
                })
                return true
            }
          }
          
    }

    
    render() {
        const { value, errorRequired, errorDuplicate, disableSubmit } = this.state;
        const { addList, editList, name } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                {addList ? <h3>Add Task List</h3> : <h3>Edit Task List</h3> }
                <input type="text" defaultValue={name? name : value} onChange={this.handleChange} className={`${errorRequired || errorDuplicate? 'highlight': ''}`} />
                <input type="submit" value="Submit" className="button green" disabled={editList ? disableSubmit : false} />
                {errorRequired && <p className="error">Please enter the name</p>}
                {errorDuplicate && <p className="error">Task List already exists</p>}
            </form>
        )
    }
}