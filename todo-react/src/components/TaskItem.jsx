import React from 'react';
import { Icon } from './App';

export const TaskItem = ({ text, id, removeTask, changeTaskStatus }) => {
    return (
        <li className="todo-task">
            <label>
                <input type="checkbox" className="done-input" onChange={(e) => changeTaskStatus(e, id)}/>
                <div className="todo-task__text">{text}</div>
            </label>
            <button type="button" className="action-icon close" onClick={() => removeTask(id)}>
                <Icon/>
            </button>
        </li>
    );
};
