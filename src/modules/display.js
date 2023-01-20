const displayTodo = (todo, todoDiv) => {
  todoDiv.innerHTML = '';
  todoDiv.innerHTML += `
    <div id=${todo.index} class="div-flex">
        <div class="activity-flex">
            <input type="checkbox"/>
            <input placeholder= ${description} disabled></input>
        </div>
        <i  id=${todo.index} class="fa fa-ellipsis-v" aria-hidden="true"></i>
    </div>
      `;
};
export default displayTodo;
