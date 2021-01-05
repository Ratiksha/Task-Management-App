import React, { Component } from 'react';
import './Card.scss';
import Modal from '../Modal/Modal'
import AddTaskForm from '../AddTaskForm/AddTaskForm'
import DeleteForm from '../DeleteForm/DeleteForm'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export default class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            showEditForm: false,
            showDeleteForm: false
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount(){
        document.addEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(event) {
        if (event.keyCode === 13) {
            document.activeElement.click();
        }
      }

    showModal = (formType) => {
        this.toggleModal();
        if(formType === 'edit'){
            this.setState({ 
                showEditForm: true,
                showDeleteForm: false
            });
        }
        else if(formType === 'delete'){
            this.setState({ 
                showDeleteForm: true,
                showEditForm: false
            });
        }
    }
    
    hideModal = () => {
        this.toggleModal();
    }

    toggleModal = () => {
        this.setState({ 
            showModal: !this.state.showModal,
            showDeleteForm: false,
            showEditForm: false
         });
    }

    render() {
        const { card, lists, editTask, DeleteTask, listId, onTaskDragStart } = this.props
        return (
            <div className="card" draggable="true" id={[card && card.taskId]} onDragStart={onTaskDragStart} onClick={(event)=> event.stopPropagation()}>
                {card && card.taskName}
                <div className="button-group">
                    <button id="card-edit" onClick={() => this.showModal('edit')}><FontAwesomeIcon icon={faPencilAlt}/></button>
                    <button id="card-delete" onClick={() => this.showModal('delete')}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </div>
                <Modal show={this.state.showModal} handleClose={this.hideModal}>
                {this.state.showEditForm && <AddTaskForm lists={lists} listId={listId} name={card && card.taskName} taskId={card && card.taskId} editTask={editTask} hideModal={this.hideModal}/>}
                {this.state.showDeleteForm && <DeleteForm listId={listId} name={card && card.taskName} taskId={card && card.taskId} DeleteTask={DeleteTask} hideModal={this.hideModal}/>}
                </Modal>
            </div>
        )
    }
}