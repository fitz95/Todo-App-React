import './style.css';
import NewTask from './modules/newtodo.js';

const todoActivityDiv = document.getElementById('activity-div');
const form = document.getElementById('addForm');
const todoDesc = document.getElementById('todoactivityinput');
const removebtn = document.getElementsByClassName('removebtn');
const desc = document.getElementsByClassName('desc');

class TodoList {
  constructor() {
    this.todostorage = JSON.parse(localStorage.getItem('todoList')) || [];
  }

  addBook = (description) => {
    const booked = new NewTask(description, false, this.todostorage.length);
    this.todostorage.push(booked);
    localStorage.setItem('todoList', JSON.stringify(this.todostorage));
    return this.todostorage;
  };

  descChange = (todoId) => {
    document.getElementById(`${todoId}-${todoId}`).onclick = () => {
      document.getElementById(`${todoId}-${todoId}`).style.display = 'none';
      document.getElementById(`${todoId}`).setAttribute('readonly', true);
      this.todostorage[todoId].description = document.getElementById(
        `${todoId}`
      ).value;
      localStorage.setItem('todoList', JSON.stringify(this.todostorage));
    };
  };

  remove = (todoId) => {
    const filterFunction = (todo) => {
      return todo.index !== parseInt(todoId, 10);
    };
    const filteredTodos = this.todostorage.filter(filterFunction);
    for (let i = 0; i < filteredTodos.length; i++) {
      filteredTodos[i].index = i;
    }
    this.displayBooks();
    this.todostorage = filteredTodos;
    localStorage.setItem('todoList', JSON.stringify(filteredTodos));
    return this.todostorage;
  };

  displayBooks = () => {
    todoActivityDiv.innerHTML = '';
    this.todostorage.forEach((todo) => {
      const { description, index } = todo;
      todoActivityDiv.innerHTML += `
      <div class="div-flex">
      <form>
      <div class="activity-flex" >
          <input type="checkbox"/>
          <input class ='desc' id='${index}' name= 'username'  type="text" placeholder='${description}' readonly="readonly"/>
          <button id='${index}-${index}' type='submit' class= 'activitySubmit'> <i class="fa fa-check" aria-hidden="true"></i></button>
      </div>
      </form>
      <button class= 'removebtn delbtn' id='${index}-${index}-${index}' ><i class="  fa fa-ellipsis-v" aria-hidden="true"></i></button>
     </div>
          `;
    });
    Array.from(removebtn).forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.remove(e.target.id);
        this.displayBooks();
      });
    });
    Array.from(desc).forEach((input) => {
      input.addEventListener('click', (e) => {
        e.preventDefault();
        input.removeAttribute('readonly');
        document.getElementById(`${e.target.id}-${e.target.id}`).style.display =
          'flex';
        this.descChange(e.target.id);
      });
    });
  };
}
const booked = new TodoList();

window.onload = () => {
  booked.displayBooks();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  booked.addBook(todoDesc.value);
  form.reset();
  booked.displayBooks();
});
