let tasks = [{ description: "task1-dfeggks asd sdf", editable: false },{ description: "task2-abc", editable: false }];
let doneTasks = [{ description: "task1-done", editable: false },{ description: "task2-done", editable: false }];
//  let tasks = [];
//  let doneTasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDescription = taskInput.value;

    if (taskDescription.trim() !== "") {
        tasks.push({ description: taskDescription, editable: false });
        taskInput.value = "";
        updateTodoList();
    } else {
        alert("No empty string is allowed");
    }
}

function resetTask() {
    tasks = [];
    doneTasks = [];
    updateTodoList();
    updateDoneList();
}


function editTask(index) {
    tasks[index].editable = true;
    updateTodoList();
}

function saveTask(index) {     
    if (tasks[index].description.trim() !== "") {
        tasks[index].editable = false;
        updateTodoList();
    } else {
        alert("No empty string is allowed");
    }     
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTodoList();
}

function markAsDone(index) {
    const task = tasks.splice(index, 1)[0];
    doneTasks.push(task);
    updateTodoList();
    updateDoneList();
}

function updateTodoList() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = `
            
            ${task.editable ?
                `<div class="items">
                    <input type="text" class="task-ds" value="${task.description}" onchange="tasks[${index}].description = this.value">
                    <button onclick="saveTask(${index})">Save</button>
                </div>` :
                `<div class="items">
                    <label class="task-ds">${task.description}</label>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="markAsDone(${index})">Done</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>` 
            }
        `;
        todoList.appendChild(taskElement);
    });
}
 
function updateDoneList() {
    const doneList = document.getElementById('doneList');
    doneList.innerHTML = "";

    doneTasks.forEach((doneTask, index) => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = `
            
        ${doneTask.editable ?
            `<div class="items">
                <input type="text" class="task-ds" value="${doneTask.description}" onchange="doneTasks[${index}].description = this.value">
                <button onclick="saveDoneTask(${index})">Save</button>
            </div>` :
            `<div class="items">
                <label class="task-ds">${doneTask.description}</label>
                <button onclick="editDoneTask(${index})">Edit</button>
                <button onclick="deleteDoneTask(${index})">Delete</button>
            </div>` 
        }
    `;
        doneList.appendChild(taskElement);
    });
}

function editDoneTask(index) {
    doneTasks[index].editable = true;
    updateDoneList();
}
function saveDoneTask(index) {
    if (doneTasks[index].description.trim() !== "") {
        doneTasks[index].editable = false;
        updateDoneList();
    } else {
        alert("No empty string is allowed");
    }      
}
function deleteDoneTask(index) {
    doneTasks.splice(index, 1);
    updateDoneList();
}

// Update lists on initial load
updateTodoList();
updateDoneList();
