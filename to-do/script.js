const list = [{
        id: 1,
        name: 'create a post',
        status: 'TODO',
        priority: 'low'
    },
    {
        id: 2,
        name: 'test',
        status: 'Done',
        priority: 'high'
    }
];

function addTask(taskName, taskStatus = 'TODO', priority = 'low') {
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
}

function changeStatus(taskName, newStatus) {
    if (taskName) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].name == taskName) {
                list[i].status = newStatus;
            }
        }
    }
}

function deleteTask(taskName) {
    if (taskName) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].name == taskName) {
                list.splice(i, 1);
            }
        }
    }
}

addTask('newTask');

changeStatus('newTask', 'Doing');

deleteTask('create a post');


//НЕ РАБОТАЕТ

// function showBy(param = 'priority') {
//     let answer = {};
//     for (let i = 0; i < list.length; i++) {
//         if (param == 'priority') {
//             answer = {
//                 high: '',
//                 low: ''
//             };
            
//             if (list[i].priority == 'high') {
//                 answer.high += (list[i].name);
//             } else if (list[i].priority == 'low') {
//                 answer.low += (list[i].name);
//             }
//         }

//         if (param == 'status') {
//             answer = {
//                 todo: [],
//                 done: [],
//                 doing: []
//             };
//             if (list[i].status == 'TODO') {
//                 answer.todo.push(list[i].name);
//                 console.log('todo');
//             } else if (list[i].status == 'Done') {
//                 answer.done.push(list[i].name);
//             } else if (list[i].status == 'Doing') {
//                 answer.doing.push(list[i].name);
//             }
//         }
//     }
//     console.log(answer);
// }

// showBy('priority');

console.log(list);