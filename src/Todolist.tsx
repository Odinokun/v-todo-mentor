import { ChangeEvent, FC } from 'react';
import { FilterType } from './App';
import { AddItemForm } from './components/AddItemForm';
import { EditableSpan } from './components/EditableSpan';
import Delete from '@mui/icons-material/Delete';
import { Box, Button, Checkbox, IconButton, Paper, Typography } from '@mui/material';

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
  editTaskName: (todolistId: string, id: string, title: string) => void;
  filter: FilterType;
  changeFilter: (todolistId: string, filter: FilterType) => void;
  changeTaskStatus: (todolistId: string, id: string, taskStatus: boolean) => void;
  removeTodolist: (todolistId: string) => void;
  editTodolistTitle: (todolistId: string, title: string) => void;
};

export const Todolist: FC<PropsType> = ({
  todolistId,
  title,
  tasks,
  addTask,
  removeTask,
  editTaskName,
  filter,
  changeFilter,
  changeTaskStatus,
  removeTodolist,
  editTodolistTitle,
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

  const editTodolistTitleHandler = (title: string) => editTodolistTitle(todolistId, title);

  const tasksList: JSX.Element[] = filteredTasks.map(task => {
    const removeTaskHandler = () => removeTask(todolistId, task.id);

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
      changeTaskStatus(todolistId, task.id, e.currentTarget.checked);

    const editTaskNameHandler = (title: string) => editTaskName(todolistId, task.id, title);

    return (
      <Box key={task.id} display='flex' alignItems='center' style={task.isDone ? { opacity: 0.5 } : {}}>
        <IconButton onClick={removeTaskHandler} color='error' size='small'>
          <Delete />
        </IconButton>
        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
        <Typography variant='body1' component='span'>
          <EditableSpan title={task.title} callback={editTaskNameHandler} />
        </Typography>
      </Box>
    );
  });

  return (
    <Box>
      <Paper elevation={3} style={{ padding: '24px' }}>
        <Box display='flex' justifyContent='space-between' alignItems='center' mb={1}>
          <Typography variant='h5' component='h2'>
            <EditableSpan title={title} callback={editTodolistTitleHandler} />
          </Typography>
          <IconButton onClick={removeTodolistHandler} color='error' size='small'>
            <Delete />
          </IconButton>
        </Box>

        <AddItemForm onClick={addTaskCallback} />
        <br />

        <Box>
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
        </Box>

        {tasks.length ? (
          <Box>{tasksList}</Box>
        ) : (
          <Typography variant='h6' component='div' mt={2}>
            You have no tasks yet =(
          </Typography>
        )}
      </Paper>
    </Box>
  );
};
