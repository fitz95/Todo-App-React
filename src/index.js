import './style.css';
import TodoList from './modules/todoclass.js';

const clearbtn = document.getElementById('clear');
const form = document.getElementById('addForm');
const todoDesc = document.getElementById('todoactivityinput');
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

clearbtn.addEventListener('click', (e) => {
  e.preventDefault();
  booked.clear();
  booked.displayBooks();
});
//
