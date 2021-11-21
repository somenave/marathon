const list = [{
        id: 1,
        name: 'create a post',
        status: 'To Do',
        priority: 'low'
    },
    {
        id: 2,
        name: 'test',
        status: 'Done',
        priority: 'high'
    }
];

const todo = "To Do";
const doing = "Doing";
const done = 'Done';
const low = 'low';
const high = 'high';

const addTask = (taskName, taskStatus = todo, priority = low) => {
    if (taskName) {
        list.push({
            id: list.length + 1,
            name: taskName,
            status: taskStatus,
            priority: priority
        });
    } else {
        console.log('Type task name');
    }
};

const changeStatus =(taskName, newStatus) => {
    if (taskName) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].name == taskName) {
                list[i].status = newStatus;
            }
        }
    }
};

const deleteTask = (taskName) => {
    if (taskName) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].name == taskName) {
                list.splice(i, 1);
            }
        }
    }
};

const getTaskBy = (property, value) => {
    return list.filter(item => item[property] === value);
};

const showTask = (item) => {
    console.log(`id = ${item.id}, name = ${item.name}`);
};

const showByPriority = (property) => {
    for (let key of ['low', 'high']) {
        console.log(key + ':');
        getTaskBy(property, key).forEach(item => {showTask(item);});
        console.log('\n');
    }
};

const showByStatus = (property) => {
    for (let key of ['To Do', 'Doing', 'Done']) {
        console.log(key + ':');
        getTaskBy(property, key).forEach(item => {showTask(item);});
        console.log('\n');
    }
};

const showListBy = (property) => {
    if (property == 'priority') {
        showByPriority(property);
    } 
    if (property == 'status') {
        showByStatus(property);
    }
};



showListBy('priority');
addTask('newTask');

changeStatus('newTask', doing);

deleteTask('create a post');