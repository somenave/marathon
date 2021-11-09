const list = {
    "create a task": "In progress",
    "make a bed": "Done",
    "write a post": "To Do"
};

function changeStatus(task, status="To Do") {
    if (task && task in list) {
        list[task] = status;
    } else {
        console.log('You do not have this task yet');
    }
}

function addTask(task, status="To Do") {
    if (task) {
        list[task] = status;
    } else {
        console.log('You do not add task-name');
    }
}

function deleteTask(task) {
    if (task && task in list) {
        delete list[task];
    } else {
        console.log("You do not add task-name or there is no such task in yout todo-list");
    }
}

console.log(list);