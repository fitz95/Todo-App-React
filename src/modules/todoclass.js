class TodoList {
  addTodo = (item) => {
    let storage = JSON.parse(localStorage.getItem('todoList')) || [];
    storage = storage.push({hh: 'hjg'});
    console.log(localStorage);
    localStorage.setItem('todoList', JSON.stringify(storage));
  };
}

export default TodoList;
