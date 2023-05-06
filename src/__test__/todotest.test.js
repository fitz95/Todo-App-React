/**
 * @jest-environment jsdom
 */
import TodoList from '../modules/todoclass.js';

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});
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
});

describe('remove task with specific id from list', () => {
  localStorage.removeItem('todoList');
  tasks.addBook('Laundry');
  tasks.remove('0');
  expect(localStorage.getItem('todoList')).toBe(JSON.stringify([]));
});
