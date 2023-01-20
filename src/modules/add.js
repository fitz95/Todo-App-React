import { todoActivity } from "./todoClass";
import NewTask from "./newtodo";

const form = document.getElementById('addForm');
const todoactivityinput = document.getElementById('todoactivityinput')
const addbtn = document.getElementById('addbtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
//   todoActivity.addTodo(todoactivityinput.value, todoActivity.length, false);
  form.reset();
  });