export const addTask = (listId, lists)=>{
  for (var i = 0; i < lists.length; i++) {
    if(listId === lists[i].listId){
       return lists[i].cards.push(newTask);
    }
}
}