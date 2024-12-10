import { ChangeEvent, FC } from 'react';
import { FilterType } from './App';
import { Button } from './components/Button';
import { AddItemForm } from './components/AddItemForm';
import { EditableSpan } from './components/EditableSpan';

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
  onEditTaskName: (todolistId: string, id: string, title: string) => void;
  filter: FilterType;
  changeFilter: (todolistId: string, filter: FilterType) => void;
  onChangeStatus: (todolistId: string, id: string, taskStatus: boolean) => void;
  removeTodolist: (todolistId: string) => void;
  onEditTodolistTitle: (todolistId: string, title: string) => void;
};

export const Todolist: FC<PropsType> = ({
  todolistId,
  title,
  tasks,
  addTask,
  removeTask,
  onEditTaskName,
  filter,
  changeFilter,
  onChangeStatus,
  removeTodolist,
  onEditTodolistTitle,
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

  const setAll = () => changeFilter(todolistId, 'all');
  const setActive = () => changeFilter(todolistId, 'active');
  const setCompleted = () => changeFilter(todolistId, 'completed');

  const removeTodolistHandler = () => removeTodolist(todolistId);

  const addTaskCallback = (title: string) => addTask(todolistId, title);

  const onEditTodolistTitleHandler = (title: string) =>
    onEditTodolistTitle(todolistId, title);

  const tasksList: JSX.Element[] = filteredTasks.map(task => {
    const removeTaskHandler = () => removeTask(todolistId, task.id);

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeStatus(todolistId, task.id, e.currentTarget.checked);
    };

    const onEditTaskNameHandler = (title: string) =>
      onEditTaskName(todolistId, task.id, title);

    return (
      <li className={task.isDone ? 'is-done' : ''} key={task.id}>
        <Button name='del' onClick={removeTaskHandler} />
        <input
          type='checkbox'
          checked={task.isDone}
          onChange={onChangeStatusHandler}
        />
        <EditableSpan title={task.title} callback={onEditTaskNameHandler} />
      </li>
    );
  });

  return (
    <div className='todolist'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ marginRight: '10px' }}>
          <EditableSpan title={title} callback={onEditTodolistTitleHandler} />
        </h3>
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
