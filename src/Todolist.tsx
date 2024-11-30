import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { FilterType } from './App';
import { Button } from './components/Button';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  filter: FilterType;
  changeFilter: (todolistId: string, filter: FilterType) => void;
};

export const Todolist: FC<PropsType> = ({ todolistId, title, tasks, addTask, removeTask, filter, changeFilter }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const tasksList: JSX.Element[] = tasks.map(task => {
    const removeTaskHandler = () => removeTask(task.id);

    return (
      <li className={task.isDone ? 'is-done' : ''} key={task.id}>
        <Button name='del' onClick={removeTaskHandler} />
        <input type='checkbox' checked={task.isDone} />
        <span>{task.title}</span>
      </li>
    );
  });
  const setAll = () => changeFilter(todolistId, 'all');
  const setActive = () => changeFilter(todolistId, 'active');
  const setCompleted = () => changeFilter(todolistId, 'completed');

  const addTaskHandler = () => {
    if (!inputValue.trim()) {
      errorHandler();
      return;
    }
    addTask(inputValue.trim());
    setInputValue('');
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError('');
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler();

  const errorHandler = () => setError('Field is required!');

  return (
    <div className='todolist'>
      <h3>{title}</h3>
      <div>
        <input
          value={inputValue}
          onChange={inputChangeHandler}
          onKeyDown={onKeyPressHandler}
          style={{ marginRight: '5px' }}
          className={error ? 'error-input' : ''}
        />
        <Button name='add task' onClick={addTaskHandler} />
        {error && <div className='error'>{error}</div>}
      </div>
      <br />

      <div>
        <Button className={filter === 'all' ? 'active-btn' : ''} name='All' onClick={setAll} />
        <Button className={filter === 'active' ? 'active-btn' : ''} name='Active' onClick={setActive} />
        <Button className={filter === 'completed' ? 'active-btn' : ''} name='Completed' onClick={setCompleted} />
      </div>

      {tasks.length ? <ul>{tasksList}</ul> : <div>You have no tasks</div>}
    </div>
  );
};
