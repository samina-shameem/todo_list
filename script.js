const taskManager = {
    //tasks : [{ description: "task1-dfeggks asd sdf", editable: false },{ description: "task2-abc", editable: false }],
    // doneTasks : [{ description: "task1-done", editable: false },{ description: "task2-done", editable: false }],
    tasks: [],
    doneTasks: [],

    addTask: function() {
        const taskInput = document.getElementById('taskInput');
        const taskDescription = taskInput.value;

        if (taskDescription.trim() !== "") {
            this.tasks.push({ description: taskDescription, editable: false });
            taskInput.value = "";
            this.updateTodoList();
        } else {
            // alert("No empty string is allowed");
            const msg = document.getElementById('addTask-msg');
            msg.innerHTML = `<label>*Task description is empty</label>`;    
        }
    },
    clearMsg: function(id){
        const msg = document.getElementById(id);
        msg.innerHTML = "";  
    },
    
    resetTask: function() {        
        // if (confirm("This will remove all tasks. Are you sure ?")) {
            this.tasks = [];
            this.doneTasks = [];
            this.updateTodoList();
            this.updateDoneList();
        // };
    },


    editTask: function (index) {
        this.tasks[index].editable = true;
        this.updateTodoList();
    },

    saveTask: function (index) {
        let task_id = "task-number-" + index;
        let newTaskDescription = document.getElementById(task_id).value;

        if (newTaskDescription.trim() !== "") {
            this.tasks[index].description = newTaskDescription;
            this.tasks[index].editable = false;
            this.updateTodoList();
        } else {
            // alert("No empty string is allowed");
            const msg = document.getElementById("task-number-"+index+"-msg");
            msg.innerHTML = `<label>*Task description is empty</label>`;    
        }
    },

    cancelTask: function (index) {
        this.tasks[index].editable = false;
        this.updateTodoList();
    },

    deleteTask: function (index) {
        // if (confirm("This will remove the task from To Do list. Are you sure ?")) {
            this.tasks.splice(index, 1);
            this.updateTodoList();
        // }
    },

    markAsDone: function (index) {
        const task = this.tasks.splice(index, 1)[0];
        this.doneTasks.push(task);
        this.updateTodoList();
        this.updateDoneList();
    },

    updateTodoList: function () {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = "";

        this.tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.innerHTML = `
            
                ${task.editable ?
                    `<div class="items">
                        <input type="text" class="task-ds" id="task-number-${index}" value="${task.description}" oninput="taskManager.clearMsg('task-number-${index}-msg')">
                        <button onclick="taskManager.saveTask(${index})">Save</button>
                        <button onclick="taskManager.cancelTask(${index})">Cancel</button>
                    </div>
                    <div id="task-number-${index}-msg" class="msg">
                    </div>` :
                    `<div class="items">
                        <label class="task-ds">${task.description}</label>
                        <button onclick="taskManager.editTask(${index})">Edit</button>
                        <button onclick="taskManager.markAsDone(${index})">Done</button>
                        <button onclick="taskManager.deleteTask(${index})">Delete</button>
                    </div>`
                    }
            `;
            todoList.appendChild(taskElement);
        });
    },

    updateDoneList: function () {
        const doneList = document.getElementById('doneList');
        doneList.innerHTML = "";

        this.doneTasks.forEach((doneTask, index) => {
            const taskElement = document.createElement('div');
            taskElement.innerHTML = `
            
                ${doneTask.editable ?
                    `<div class="items">
                        <input type="text" class="task-ds" id="done-task-number-${index}" value="${doneTask.description}" oninput="taskManager.clearMsg('done-task-number-${index}-msg')">
                        <button onclick="taskManager.saveDoneTask(${index})">Save</button>
                        <button onclick="taskManager.cancelDoneTask(${index})">Cancel</button>
                    </div>
                    <div id="done-task-number-${index}-msg" class="msg">
                    </div>` :
                            `<div class="items">
                        <label class="task-ds">${doneTask.description}</label>
                        <button onclick="taskManager.editDoneTask(${index})">Edit</button>
                        <button onclick="taskManager.deleteDoneTask(${index})">Delete</button>
                    </div>`
                        }
            `;
            doneList.appendChild(taskElement);
        });
    },

    editDoneTask: function (index) {
        this.doneTasks[index].editable = true;
        this.updateDoneList();
    },
    saveDoneTask: function (index) {
        let doneTaskId = "done-task-number-" + index;
        let newTaskDescription = document.getElementById(doneTaskId).value;

        if (newTaskDescription.trim() !== "") {
            this.doneTasks[index].description = newTaskDescription;
            this.doneTasks[index].editable = false;
            this.updateDoneList();
        } else {
            // alert("No empty string is allowed");
            const msg = document.getElementById("done-task-number-"+index+"-msg");
            msg.innerHTML = `<label>*Task description is empty</label>`;    
        }
    },
    cancelDoneTask: function (index) {
        this.doneTasks[index].editable = false;
        this.updateDoneList();
    },
    deleteDoneTask: function (index) {
        // if (confirm("This will remove the task from Done list. Are you sure ?")) {
            this.doneTasks.splice(index, 1);
            this.updateDoneList();
        // }
    }
};
// Update lists on initial load
taskManager.updateTodoList();
taskManager.updateDoneList();
