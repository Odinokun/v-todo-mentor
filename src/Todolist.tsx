import { ChangeEvent, FC } from 'react';
import { FilterType } from './App';
import { Button } from './components/Button';
import { AddItemForm } from './components/AddItemForm';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  addTask: (todolistId: string, title: string) => void;
  removeTask: (todolistId: string, id: string) => void;
  filter: FilterType;
  changeFilter: (todolistId: string, filter: FilterType) => void;
  onChangeStatus: (todolistId: string, id: string, taskStatus: boolean) => void;
  removeTodolist: (todolistId: string) => void;
};

export const Todolist: FC<PropsType> = ({
  todolistId,
  title,
  tasks,
  addTask,
  removeTask,
  filter,
  changeFilter,
  onChangeStatus,
  removeTodolist,
}) => {
  const tasksFilter = (state: TaskType[]): TaskType[] => {
    switch (filter) {
      case 'active':
        return state.filter(t => !t.isDone);
      case 'completed':
        return state.filter(t => t.isDone);
      default:
        return state;
    }
  };
  const filteredTasks = tasksFilter(tasks);

  const tasksList: JSX.Element[] = filteredTasks.map(task => {
    const removeTaskHandler = () => removeTask(todolistId, task.id);

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeStatus(todolistId, task.id, e.currentTarget.checked);
    };

    return (
      <li className={task.isDone ? 'is-done' : ''} key={task.id}>
        <Button name='del' onClick={removeTaskHandler} />
        <label>
          <input
            type='checkbox'
            checked={task.isDone}
            onChange={onChangeStatusHandler}
          />
          <span>{task.title}</span>
        </label>
      </li>
    );
  });

  const setAll = () => changeFilter(todolistId, 'all');
  const setActive = () => changeFilter(todolistId, 'active');
  const setCompleted = () => changeFilter(todolistId, 'completed');

  const removeTodolistHandler = () => removeTodolist(todolistId);

  const addTaskCallback = (title: string) => addTask(todolistId, title);

  return (
    <div className='todolist'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ marginRight: '10px' }}>{title}</h3>
        <Button name='del' onClick={removeTodolistHandler} />
      </div>

      <AddItemForm onClick={addTaskCallback} />
      <br />

      <div>
        <Button
          className={filter === 'all' ? 'active-btn' : ''}
          name='All'
          onClick={setAll}
        />
        <Button
          className={filter === 'active' ? 'active-btn' : ''}
          name='Active'
          onClick={setActive}
        />
        <Button
          className={filter === 'completed' ? 'active-btn' : ''}
          name='Completed'
          onClick={setCompleted}
        />
      </div>

      {tasks.length ? <ul>{tasksList}</ul> : <div>You have no tasks</div>}
    </div>
  );
};
