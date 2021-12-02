// Variables
let todoList = document.querySelector('#todo-list');
let todoForm = document.querySelector('#todo-form');
let newTodoInput = document.querySelector('#newTodo');

// Event Listeners
document.addEventListener('DOMContentLoaded', loadTodos);
todoForm.addEventListener('submit', addNewtodo);
todoList.addEventListener('click', removeTodoItem);

// handles adding of new todo from form.
function addNewtodo(e) {
    e.preventDefault();
    const newTodo = newTodoInput.value;
    if(newTodo) {
        addToLocalStorage(newTodo)
    }
}

// Add new todo into localStorage
function addToLocalStorage(newTodo) {
    let todos = getTodosFromLocalStorage();
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    
    // Create new todo element
    let li = document.createElement('li');
    li.textContent = newTodo;
    
    // Add a button to close the todo
    let xBtn = document.createElement('button');
    xBtn.textContent = 'X'
    li.appendChild(xBtn);
    todoList.appendChild(li);
}

// Load todos from localStorage
function getTodosFromLocalStorage() {  
    let items = localStorage.getItem('todos');  
    if (items === null) {
        items = [];
    } else {
        items = JSON.parse(items);
    }
    return items;
}

function removeTodoItem(e) {
   let todo = e.target.parentElement;
   removeFromLocalStorage(todo);
   todo.remove();

}

function removeFromLocalStorage(todo) {
    let item = todo.firstChild.textContent;
    let todosArr = getTodosFromLocalStorage();
    todosArr.forEach((todo,index) => {
        if(todo === item) {
            todosArr.splice(index,1);
            localStorage.setItem('todos', JSON.stringify(todosArr));
        }
    })
}

// Load todos from localStorage for the first time
function loadTodos() {
    let todos = getTodosFromLocalStorage();
    if (todos) {
        todos.forEach((todo) => {
            let li = document.createElement('li');
            li.textContent = todo;
            let xBtn = document.createElement('button');
            xBtn.textContent = 'X'
            li.appendChild(xBtn);
            todoList.appendChild(li);
        })
    }
}