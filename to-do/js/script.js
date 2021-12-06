import { UI_ELEMENTS } from "./view.js";


const TO_DO = "To Do";
const DONE = 'Done';

let list = [];

UI_ELEMENTS.todoForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

let taskContent = `
    <label>
        <input type="checkbox" class="done-input">
        <div class="todo-task__text"></div>
    </label>
    <button class="action-icon close">
        <svg class="icon">
            <use xlink:href="#action-icon"></use>
          </svg>
    </button>
`;

function createTaskLi(priorityContainer) {
    let currentTaskContent = document.createElement('li');
    currentTaskContent.setAttribute('data-id', list.length);
    currentTaskContent.classList.add('todo-task');
    currentTaskContent.innerHTML = taskContent;
    priorityContainer.append(currentTaskContent);
    UI_ELEMENTS.currentTaskText = currentTaskContent.querySelector('.todo-task__text');
    let taskName;
    list.forEach(task => {
        if (task.id == currentTaskContent.getAttribute('data-id')) {
            taskName = task.name;
        }
    });
    UI_ELEMENTS.currentTaskText.textContent = taskName;
}

function addTask(priorityContainer) {
    priorityContainer.querySelector('.add-task-icon').addEventListener('click', () => {
        UI_ELEMENTS.addTaskInput = priorityContainer.querySelector('.todo-add .add-task-input');
        try {
            if (UI_ELEMENTS.addTaskInput.value.trim() !== '') {
                list.push({
                    id: list.length + 1,
                    name: UI_ELEMENTS.addTaskInput.value,
                    status: TO_DO,
                    priority: priorityContainer.getAttribute('data-priority'),
                });
    
                createTaskLi(priorityContainer);
            } else {
                throw new Error("You cannot add an empty task");
            }
        } catch (e) {
            alert(e.message);
        }
        removeTask();
        isDone();
        UI_ELEMENTS.todoForms.forEach(form => form.reset());
    });
}

addTask(UI_ELEMENTS.highTasksContainer);
addTask(UI_ELEMENTS.lowTasksContainer);

function isDone() {
    document.querySelectorAll('.done-input').forEach(item => {
        item.addEventListener('change', () => {
            let status = TO_DO;
            list.forEach(task => {
                if (task.id == item.parentElement.parentElement.getAttribute('data-id')) {
                    task.status = status;
                }
            }); 
            if (item.checked) {
                status = DONE;
                item.closest('.todo-task').classList.add('done');
            } else {
                item.closest('.todo-task').classList.remove('done');
            }
        });
    });
}
isDone();

function removeTask() {
    document.querySelectorAll('.close').forEach(item => {
        let removedTask = item.closest('.todo-task');
        item.addEventListener('click', () => {
            if (list.length >= 1) {
                list.forEach(task => {
                    if (task.id == removedTask.getAttribute('data-id')) {
                        list.splice(task.id - 1, 1);
                    }
                });
    
                removedTask.remove();
            } else {
                list = [];
            }
        });
    });
}
removeTask();
