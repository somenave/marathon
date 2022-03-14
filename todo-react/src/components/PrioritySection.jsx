import { useState } from 'react';
import { DONE, Icon, TO_DO } from './App';
import { PriorityList } from './PriorityList';

export const PrioritySection = ({ priority }) => {
    const [tasks, setTasks] = useState([]);
    const [taskValue, setTaskValue] = useState('');

    const handleInput = (e) => {
        setTaskValue(e.target.value);
    };
    const addTask = (e, taskValue) => {
        e.preventDefault();
        e.target.reset();
        setTaskValue('');
        try {
            if (taskValue !== '') {
                const task = {
                    id: tasks.length + 1,
                    text: taskValue,
                    status: TO_DO,
                    priority: priority
                };
                setTasks((prevState) => [...prevState, task]);
            } else {
                throw new Error('You cannot add an empty task');
            }
        } catch (e) {
            alert(e.message);
        }
    };

    const changeTaskStatus = (e, id) => {
        setTasks(tasks.filter(task => {
            if (task.id === id) {
                task.status = e.target.checked ? DONE : TO_DO;
            }
            return task;
        }));
    };

    const removeTask = (id) => {
        setTasks(tasks.filter(todo => todo.id !== id));
    };

    return (
        <div className={"todo__priority" + " priority-" + priority}>
            <h3 className="priority__title">{priority.toUpperCase()}</h3>
            <form className="todo-form todo-list__add todo-add" onSubmit={(e) => addTask(e, taskValue)}>
                <input type="text" className="todo-add__text add-task-input" placeholder="Добавить" value={taskValue} onChange={handleInput} />
                <button className="action-icon add-task-icon"><Icon/></button>
            </form>
            <PriorityList tasks={tasks} priority={priority} removeTask={removeTask} changeTaskStatus={changeTaskStatus}/>
        </div>
    );
};
