// let tasks = [{ description: "task1-dfeggks asd sdf", editable: false },{ description: "task2-abc", editable: false }];
// let doneTasks = [{ description: "task1-done", editable: false },{ description: "task2-done", editable: false }];
 let tasks = [];
 let doneTasks = [];

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
    if (confirm("This will remove all tasks. Are you sure ?")){
        tasks = [];
        doneTasks = [];
        updateTodoList();
        updateDoneList();    
    }
}


function editTask(index) {
    tasks[index].editable = true;
    updateTodoList();
}

function saveTask(index) {
    let task_id = "task-number-" + index;
    let newTaskDescription = document.getElementById(task_id).value;
    
    if (newTaskDescription.trim() !== "") {
        tasks[index].description = newTaskDescription;
        tasks[index].editable = false;        
        updateTodoList();
    } else {
        alert("No empty string is allowed");
    }     
}
function cancelTask(index) {     
    tasks[index].editable = false;
    updateTodoList();
 
}

function deleteTask(index) {
    if (confirm("This will remove the task from To Do list. Are you sure ?")){
        tasks.splice(index, 1);
        updateTodoList();
    }
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
                    <input type="text" class="task-ds" id="task-number-${index}" value="${task.description}" >
                    <button onclick="saveTask(${index})">Save</button>
                    <button onclick="cancelTask(${index})">Cancel</button>
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
                <input type="text" class="task-ds" id="done-task-number-${index}" value="${doneTask.description}" >
                <button onclick="saveDoneTask(${index})">Save</button>
                <button onclick="cancelDoneTask(${index})">Cancel</button>
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
    let doneTaskId = "done-task-number-" + index;
    let newTaskDescription = document.getElementById(doneTaskId).value;
    
    if (newTaskDescription.trim() !== "") {
        doneTasks[index].description = newTaskDescription;
        doneTasks[index].editable = false;
        updateDoneList();
    } else {
        alert("No empty string is allowed");
    }      
}
function cancelDoneTask(index) {     
    doneTasks[index].editable = false;
    updateDoneList(); 
}
function deleteDoneTask(index) {
    if (confirm("This will remove the task from Done list. Are you sure ?")){
        doneTasks.splice(index, 1);
        updateDoneList();
    }
}

// Update lists on initial load
updateTodoList();
updateDoneList();
