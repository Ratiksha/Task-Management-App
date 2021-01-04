import React, { Component } from 'react';
import './List.scss';
import Card from '../Card/Card';
import Modal from '../Modal/Modal'
import AddTaskForm from '../AddTaskForm/AddTaskForm'
import DeleteForm from '../DeleteForm/DeleteForm'
import AddListForm from '../AddListForm/AddListForm'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";


export default class List extends Component{
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
        else{
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
        const { list, addTask, editTask, DeleteTask, editList, DeleteList, onTaskDragStart, onTaskDragOver, onTaskDrop, onListDragStart  } = this.props;
        const cards = list.cards.map((card, index) => (
            <li key={index}>
                <Card card={card} editTask={editTask} DeleteTask={DeleteTask} listId={list.listId} onTaskDragStart={onTaskDragStart}/>
            </li>
        ));

        return (
            <div draggable="true" id={[list.listId]} onDragStart={onListDragStart}>
                <h3 className="header">{list.name}
                <div className="button-group">
                    <button onClick={() => this.showModal('edit')}><FontAwesomeIcon icon={faPencilAlt}/></button>
                    <button onClick={() => this.showModal('delete')}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </div>
                </h3>
                <ul className="list" onDragOver={onTaskDragOver} onDrop={onTaskDrop}>
                    {cards}
                    <li>
                        <AddTaskForm listId={list.listId} addTask={addTask} hideModal={this.hideModal}/>
                    </li>
                </ul>
                <Modal show={this.state.showModal} handleClose={this.hideModal}>
                    {this.state.showEditForm && <AddListForm listId={list.listId} editList={editList} name={list.name} hideModal={this.hideModal}/>}
                   {this.state.showDeleteForm && <DeleteForm listId={list.listId} DeleteList={DeleteList} name={list.name} hideModal={this.hideModal}/>}
                </Modal>
            </div>
        )
    }
}