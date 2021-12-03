// Variables
let todoList = document.querySelector('#todo-list'),
    todoForm = document.querySelector('#todo-form'),
    newTodoInput = document.querySelector('#newTodo'),
    todoSearch = document.querySelector('#todo-search');

// Event Listeners
document.addEventListener('DOMContentLoaded', loadTodos);
todoForm.addEventListener('submit', addNewtodo);
todoList.addEventListener('click', removeTodoItem);
todoSearch.addEventListener('keyup', searchTodo);

// handles adding of new todo from form.
function addNewtodo(e) {
    e.preventDefault();
    const newTodo = newTodoInput.value;
    if (newTodo) {
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
    li.className = 'list-group-item';
    li.textContent = newTodo;

    // Add a button to close the todo
    let xBtn = document.createElement('button');
    xBtn.className = 'btn btn-success btn-sm float-end';
    xBtn.innerHTML = '&check;'

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
    if (e.target.classList.contains('btn')) {
        let todo = e.target.parentElement;
        removeFromLocalStorage(todo);
        todo.remove();
    }

}

function removeFromLocalStorage(todo) {
    let item = todo.firstChild.textContent;
    let todosArr = getTodosFromLocalStorage();
    todosArr.forEach((todo, index) => {
        if (todo === item) {
            todosArr.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todosArr));
        }
    })
}

function searchTodo() {
    let q = todoSearch.value.toLowerCase();
    let todoItems = todoList.getElementsByTagName('li');
    for (i = 0; i < todoItems.length; i++) {
        let val = todoItems[i].textContent.toLowerCase();
        if (val.indexOf(q) != -1) {
            todoItems[i].style.display = 'block';
        } else {
            todoItems[i].style.display = 'none';
        }
    }
}

// Load todos from localStorage for the first time
function loadTodos() {
    let todos = getTodosFromLocalStorage();
    if (todos) {
        todos.forEach((todo) => {
            let li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = todo;
            let xBtn = document.createElement('button');
            xBtn.className = 'btn btn-success btn-sm float-end';
            xBtn.innerHTML = '&check;'
            li.appendChild(xBtn);
            todoList.appendChild(li);
        })
    }
}