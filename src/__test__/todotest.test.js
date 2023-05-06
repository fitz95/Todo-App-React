/**
 * @jest-environment jsdom
 */
import TodoList from '../modules/todoclass.js';

const tasks = new TodoList();

describe('add a task to list', () => {
  test("add a task 'Laundry' to the local storage and check if it exists on the local storage ", () => {
    localStorage.clear();
    tasks.addBook('Do Laundry');
    expect(localStorage.getItem('todoList')).toBe(
      JSON.stringify([{ description: 'Do Laundry', complete: false, index: 0 }]),
    );
  });

  test("add a task 'Cooking' to the local storage and check if it exists on the local storage ", () => {
    tasks.addBook('Cooking');
    expect(localStorage.getItem('todoList')).toBe(
      JSON.stringify([
        { description: 'Laundry', complete: false, index: 0 },
        { description: 'Cooking', complete: false, index: 1 },
      ]),
    );
  });
  test("add a task 'Cooking' to the local storage and check if it exists on the local storage ", () => {
    tasks.addBook('Cooking');
    expect(localStorage.getItem('todoList')).toBe(
      JSON.stringify([
        { description: 'Laundry', complete: false, index: 0 },
        { description: 'Cooking', complete: false, index: 1 },
        { description: 'Cooking', complete: false, index: 2 },
      ]),
    );
  });
});

describe('remove task from the todo list ', () => {
  test('remove  a task with id 2  from  the local storage and check if it exists on the local storage ', () => {
    tasks.remove('2');
    expect(localStorage.getItem('todoList')).toBe(
      JSON.stringify([
        { description: 'Laundry', complete: false, index: 0 },
        { description: 'Cooking', complete: false, index: 1 },
      ]),
    );
  });
  test('remove  a task with id 1  from  the local storage and check if it exists on the local storage', () => {
    tasks.remove('1');
    expect(localStorage.getItem('todoList')).toBe(
      JSON.stringify([{ description: 'Laundry', complete: false, index: 0 }]),
    );
  });
});

describe('edit complete status and change complete value from false to true', () => {
  test('should return complete property  of object with id 0 to be true ', () => {
    tasks.checkbox('0');
    expect(localStorage.getItem('todoList')).toBe(
      JSON.stringify([{ description: 'Laundry', complete: true, index: 0 }]),
    );
  });
});

describe('clear completed tasks from the to do list by filtering through the todostorage and removing all objects with complete property set to false ', () => {
  test('clear all objects with todo property false ', () => {
    tasks.clear();
    expect(localStorage.getItem('todoList')).toBe(JSON.stringify([]));
  });
});

describe('updating the task description functionailty ', () => {
  test('updating the  description value with the value newly inputed in the input form', () => {
    tasks.addBook('Swimming');
    tasks.descChange('0', 'Driving');
    expect(localStorage.getItem('todoList')).toBe(
      JSON.stringify([{ description: 'Driving', complete: false, index: 0 }]),
    );
  });
});

describe('Testing Dom Manipulation functionalities', () => {
  test('testing to see if the length of the div under the main todoativity div corresponds to the length of the array', () => {
    const displayList = jest.fn(() => {
      const todoActivityDiv = document.createElement('div');
      tasks.todostorage.forEach((todo) => {
        const { description, index } = todo;
        todoActivityDiv.innerHTML += `
        <div class="div-flex">
        <form>
        <div class="activity-flex" >
            <input class='checkbox' name='${index}'  type="checkbox"/>
            <input class ='desc' id='${index}' name= 'username'  type="text" placeholder='${description}' readonly="readonly"/>
            <button id='${index}-${index}' type='submit' class= 'activitySubmit'> <i class="fa fa-check" aria-hidden="true"></i></button>
        </div>
        </form>
        <button class= 'removebtn delbtn' id='${index}-${index}-${index}' ><i class="  fa fa-ellipsis-v" aria-hidden="true"></i></button>
       </div>
            `;
      });
      const todoArr = Array.from(
        todoActivityDiv.getElementsByClassName('div-flex'),
      );
      return todoArr.length;
    });
    expect(displayList()).toBe(1);
  });
});

describe('remove task with specific id from list', () => {
  localStorage.removeItem('todoList');
  tasks.addBook('Laundry');
  tasks.remove('0');
  expect(localStorage.getItem('todoList')).toBe(JSON.stringify([]));
});
