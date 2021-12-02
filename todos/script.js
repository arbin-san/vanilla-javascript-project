// Variables
let taskList = document.querySelector('#task-list');

// EventListener
window.addEventListener('DOMContentLoaded', function() {

});

document.getElementById('addTask').addEventListener('click', function() {
    addNewTask()
});
document.getElementById('task-list').addEventListener('click', function() {
    markCompleted()
});

function addNewTask() {
    const newTask = document.querySelector('#newTask').value;

    if (localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', localStorage.getItem('tasks') + ','+ newTask);
    } else {
        localStorage.setItem('tasks', newTask);
    }
    updateTaskList(newTask);
}

function generateTaskList(task) {
    let li = document.createElement('li');
    li.innerText = task;
    taskList.append(li);
}

function markCompleted() {
    console.log('clicked', document.querySelectorAll('li'));
    // let allTasks = localStorage.getItem('tasks').split(',');
    // allTasks.delete(completed);
}

function getTasksFromLocalStorage() {  
    let items = localStorage.getItem('todos');  
    if (items === null) {
        items = [];
    } else {
        items = JSON.parse(items);
    }
    return items;
}


function loadTasks() {
    const allTasks = getTasksFromLocalStorage();
    if (allTasks) {
        allTasks.forEach((task) => {
            generateTaskList(task);
        })
    }
}
startApp();