import { ChangeEvent, FC } from 'react';
import { FilterType } from './App';
import { AddItemForm } from './components/AddItemForm';
import { EditableSpan } from './components/EditableSpan';
import Delete from '@mui/icons-material/Delete';
import { Box, Button, Checkbox, IconButton, Typography } from '@mui/material';

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

  const onEditTodolistTitleHandler = (title: string) => onEditTodolistTitle(todolistId, title);

  const tasksList: JSX.Element[] = filteredTasks.map(task => {
    const removeTaskHandler = () => removeTask(todolistId, task.id);

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
      onChangeStatus(todolistId, task.id, e.currentTarget.checked);

    const onEditTaskNameHandler = (title: string) => onEditTaskName(todolistId, task.id, title);

    return (
      // <Box className={task.isDone ? 'is-done' : ''} key={task.id}>
      <Box key={task.id} display='flex' alignItems='center'>
        <IconButton onClick={removeTaskHandler} color='error' size='small'>
          <Delete />
        </IconButton>
        <Checkbox checked={task.isDone} onChange={onChangeStatusHandler} />
        <Typography variant='body1' component='span'>
          <EditableSpan title={task.title} callback={onEditTaskNameHandler} />
        </Typography>
      </Box>
    );
  });

  return (
    <div className='todolist'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h5' component='h2'>
          <EditableSpan title={title} callback={onEditTodolistTitleHandler} />
        </Typography>
        <IconButton onClick={removeTodolistHandler} color='error' size='small'>
          <Delete />
        </IconButton>
      </Box>

      <AddItemForm onClick={addTaskCallback} />
      <br />

      <div>
        <Button
          variant={filter === 'all' ? 'contained' : 'outlined'}
          color='primary'
          onClick={setAll}
          size='small'
          style={{ marginRight: '5px' }}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'contained' : 'outlined'}
          color='secondary'
          onClick={setActive}
          size='small'
          style={{ marginRight: '5px' }}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'contained' : 'outlined'}
          color='success'
          onClick={setCompleted}
          size='small'
          style={{ marginRight: '5px' }}
        >
          Completed
        </Button>
      </div>

      {tasks.length ? <Box>{tasksList}</Box> : <Box>You have no tasks</Box>}
    </div>
  );
};
