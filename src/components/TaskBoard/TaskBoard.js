import React, { Component } from 'react';
import './TaskBoard.scss';
import List from '../List/List';
import Modal from '../Modal/Modal'
import AddListForm from '../AddListForm/AddListForm'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

export default class TaskBoard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            lists:[
                {
                    name: 'TO DO',
                    listId: 0,
                    cards: [{
                        taskName: 'Pay Electricity Bill',
                        list: 0,
                        taskId: 0
                    },
                    {
                        taskName: 'Make Grocery List',
                        list: 0,
                        taskId: 1
                    }]
                },
                {
                    name: 'In Progress',
                    listId: 1,
                    cards: [{
                        taskName: 'Iron Cloths',
                        list: 1,
                        taskId: 0
                    },]
                },
                {
                    name: 'Done',
                    listId: 2,
                    cards: [{
                        taskName: 'Buy Running Shoes',
                        list: 2,
                        taskId: 0
                    }]
                }
            ],
            show: false,
            taskdragInfo: "",
            listdragInfo: ""
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
        
    }

    componentDidMount(){
        const localStorageData = localStorage.getItem('lists');
        if(localStorageData){
            this.setState({
                lists: JSON.parse(localStorageData)
            })
        }
        const themeColor = localStorage.getItem('themeColor');
        document.documentElement.style.setProperty('--color', JSON.parse(themeColor));
        document.addEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(event) {
        if (event.keyCode === 13) {
            document.activeElement.click();
        }
      }

    changeTheme = (color) =>{
        document.documentElement.style.setProperty('--color', color);
        localStorage.setItem('themeColor', JSON.stringify(color))
    }
    

  onTaskDragStart = (event, listID) => {
    event.stopPropagation();
    const taskdragInfo = {
      taskId: event.currentTarget.id,
      listID: listID
    }
    this.setState({
        taskdragInfo
    })
  }

  onTaskDragOver = (event) => {
    event.preventDefault();
  }

  onTaskDrop = (event, listID) => {
    event.stopPropagation();
    const { lists, taskdragInfo } = this.state
    var cardsArray = []
    for (var i = 0; i < lists.length; i++) {
        if(parseInt(taskdragInfo.listID) === lists[i].listId){
            cardsArray = lists[i].cards
        }
    }
    const taskCard = cardsArray.find(card => card.taskId === parseInt(taskdragInfo.taskId))
    const indexOfCard = cardsArray.findIndex(card => card.taskId === parseInt(taskdragInfo.taskId))
    for (var k = 0; k < lists.length; k++) {
        if(parseInt(taskdragInfo.listID) === lists[k].listId){
            lists[k].cards.splice(indexOfCard, 1)
        }
    }
    for (var j = 0; j < lists.length; j++) {
        if(parseInt(listID) === lists[j].listId){
            lists[j].cards.push({...taskCard, list: parseInt(listID), taskId: new Date().valueOf() });
        }
    }
    this.setState({
      lists
    });
    localStorage.setItem('lists', JSON.stringify(lists));
    
  }

  onListDragStart = (event, listID) => {
    const listdragInfo = {
      listID: listID
    }
    this.setState({
        listdragInfo
    })
  }

  onListDragOver = (event, listId) => {
    event.preventDefault();
  }

  onListDrop = (event, listID) =>{
    const { lists, listdragInfo } = this.state
    var updatedparsedData =  lists.filter(list => list.listId !== parseInt(listdragInfo.listID))
    const taskList = lists.find(list => list.listId === parseInt(listdragInfo.listID))
    const indexOfList = lists.findIndex(list => list.listId === parseInt(listID))
    updatedparsedData.splice(indexOfList, 0, taskList)
    this.setState({
        lists: updatedparsedData
      });
      localStorage.setItem('lists', JSON.stringify(updatedparsedData));

  }

    addList(name){
        const { lists } = this.state
        const newList = {
            name: name,
            listId: new Date().valueOf(),
            cards: []
        }
        lists.push(newList)
        this.setState({
            lists
        })
        localStorage.setItem('lists', JSON.stringify(lists))
    }

    editList(name, listId){
        const { lists } = this.state
        for (var i = 0; i < lists.length; i++) {
            if(listId === lists[i].listId){
                lists[i].name = name ;
            }
          }
          this.setState({
            lists
        })
        localStorage.setItem('lists', JSON.stringify(lists))
    }

    DeleteList(listId){
        const { lists } = this.state
        const updatedList = lists.filter(list => list.listId !== listId)
          this.setState({
            lists: updatedList
        })
        localStorage.setItem('lists', JSON.stringify(updatedList))
    }

    addTask(taskName, listId){
        const { lists } = this.state
        const newTask = {
            taskName,
            list: listId,
            taskId: new Date().valueOf()
        }
        for (var i = 0; i < lists.length; i++) {
            if(listId === lists[i].listId){
                lists[i].cards.push(newTask);
            }
        }
        this.setState({
            lists
        })
        localStorage.setItem('lists', JSON.stringify(lists))
    }

    editTask(taskName, listId, taskId){
        const { lists } = this.state
        for (var i = 0; i < lists.length; i++) {
            if(listId === lists[i].listId){
                for (var j = 0; j < lists[i].cards.length; j++) {
                    if(lists[i].cards[j].taskId === taskId){
                        lists[i].cards[j].taskName = taskName 
                    }
                }
            }
          }
          this.setState({
            lists
        })
        localStorage.setItem('lists', JSON.stringify(lists))
    }

    DeleteTask(listId, taskId){
        const { lists } = this.state
        for (var i = 0; i < lists.length; i++) {
            if(listId === lists[i].listId){
                for (var j = 0; j < lists[i].cards.length; j++) {
                    if(lists[i].cards[j].taskId === taskId){
                        lists[i].cards =  lists[i].cards.filter(card => card.taskId !== taskId)
                    }
                }
            }
          }
          this.setState({
            lists
        })
        localStorage.setItem('lists', JSON.stringify(lists))
    }

    showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ show: false });
      };

    render() {
        const lists = this.state.lists.map((list, index) => (
            <li key={index} className="wrapper" onDragOver={(event, listId)=>this.onListDragOver(event, list.listId)} onDrop={(event)=>this.onListDrop(event, list.listId)} tabIndex="0">
                <List list={list}
                lists={this.state.lists}
                addList={(name) => this.addList(name)}
                editList={(name, listId) => this.editList(name, listId)}
                DeleteList={(listId) => this.DeleteList(listId)}

                addTask={(taskName, listId) => this.addTask(taskName, listId)}
                editTask={(taskName, listId, taskId) => this.editTask(taskName, listId, taskId)}
                DeleteTask={(listId, taskId) => this.DeleteTask(listId, taskId)}

                onTaskDragStart={(event) => this.onTaskDragStart(event, list.listId)}
                onTaskDragOver={(event) => this.onTaskDragOver(event)} 
                onTaskDrop={(event) => {this.onTaskDrop(event, list.listId)}}
                
                onListDragStart={(event) => {this.onListDragStart(event, list.listId)}}
                />
            </li>
        ));

        return (
            <div className="taskBoard">
                <div className="main-header">
                    <h1>Task Management Board</h1>
                    <div className="sub-header">
                        <ul>
                            <li className="colors" id="blue" onClick={() => this.changeTheme('#227fba')} tabIndex="0"></li>
                            <li className="colors" id="yellow" onClick={()=>this.changeTheme('#f59e01')} tabIndex="0"></li>
                            <li className="colors" id="purple" onClick={()=>this.changeTheme('#540073')} tabIndex="0"></li>
                        </ul>
                        <button id="add-list" onClick={this.showModal}><FontAwesomeIcon icon={faPlusSquare}/></button>
                    </div>
                    </div>
                <ul className="lists" id="list">{lists}</ul>
                <Modal show={this.state.show} handleClose={this.hideModal} id="listModal">
                    <AddListForm lists={this.state.lists} addList={(name) => this.addList(name)} hideModal={this.hideModal}/>
                </Modal>
            </div>
        )
    }
}