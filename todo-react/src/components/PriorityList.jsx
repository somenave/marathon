import { TaskItem } from './TaskItem';

export const PriorityList = ({ priority, tasks, removeTask, changeTaskStatus }) => {
    const priorityTasks = tasks.filter(task => task.priority === priority);
    return (
        <ul className={"todo-list " + priority + "-list"}>
            {priorityTasks.length
                ? priorityTasks.map(task => <TaskItem key={task.id} id={task.id} text={task.text} status={task.status} removeTask={removeTask} changeTaskStatus={changeTaskStatus}/>)
                : <li className="todo-empty">No tasks</li>}
        </ul>
    );
};
