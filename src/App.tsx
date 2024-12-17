import { useState } from 'react';
import { TaskType, Todolist } from './Todolist';
import { AddItemForm } from './components/AddItemForm';
import './App.css';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export type FilterType = 'all' | 'active' | 'completed';

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};

type AllTasksType = {
  [key: string]: TaskType[];
};

function App() {
  const todolist_1 = crypto.randomUUID();
  const todolist_2 = crypto.randomUUID();
  const todolist_3 = crypto.randomUUID();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolist_1, title: 'Learning', filter: 'all' },
    { id: todolist_2, title: 'Reading', filter: 'active' },
    { id: todolist_3, title: 'Watching', filter: 'completed' },
  ]);
  const [allTasks, setAllTasks] = useState<AllTasksType>({
    [todolist_1]: [
      { id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true },
      { id: crypto.randomUUID(), title: 'JS', isDone: true },
      { id: crypto.randomUUID(), title: 'React', isDone: false },
      { id: crypto.randomUUID(), title: 'GraphQL', isDone: false },
      { id: crypto.randomUUID(), title: 'Rest API', isDone: false },
      { id: crypto.randomUUID(), title: 'Graph API', isDone: false },
    ],
    [todolist_2]: [
      { id: crypto.randomUUID(), title: 'Harry Potter', isDone: false },
      { id: crypto.randomUUID(), title: 'Sherlock Holmes', isDone: false },
      { id: crypto.randomUUID(), title: 'The Lord of the Rings', isDone: true },
    ],
    [todolist_3]: [
      { id: crypto.randomUUID(), title: 'The Godfather', isDone: true },
      { id: crypto.randomUUID(), title: 'Mr. Robot', isDone: true },
      { id: crypto.randomUUID(), title: 'The Dark Knight', isDone: true },
    ],
  });

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));
    delete allTasks[todolistId];
  };

  const addTask = (todolistId: string, title: string) => {
    const newTask: TaskType = {
      id: crypto.randomUUID(),
      title,
      isDone: false,
    };
    setAllTasks({
      ...allTasks,
      [todolistId]: [newTask, ...allTasks[todolistId]],
    });
  };

  const removeTask = (todolistId: string, id: string) =>
    setAllTasks({
      ...allTasks,
      [todolistId]: allTasks[todolistId].filter(t => t.id !== id),
    });

  const onEditTaskName = (todolistId: string, id: string, title: string) => {
    setAllTasks({
      ...allTasks,
      [todolistId]: allTasks[todolistId].map(t => (t.id === id ? { ...t, title } : t)),
    });
  };

  const onChangeStatus = (todolistId: string, id: string, taskStatus: boolean) => {
    setAllTasks({
      ...allTasks,
      [todolistId]: allTasks[todolistId].map(t => (t.id === id ? { ...t, isDone: taskStatus } : t)),
    });
  };

  const changeFilter = (todolistId: string, value: FilterType) => {
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter: value } : tl)));
  };

  const addTodolist = (title: string) => {
    const newId = crypto.randomUUID();
    const newTodo: TodolistType = {
      id: newId,
      title,
      filter: 'all',
    };
    setTodolists([newTodo, ...todolists]);
    setAllTasks({ [newId]: [], ...allTasks });
  };

  const onEditTodolistTitle = (todolistId: string, title: string) => {
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, title } : tl)));
  };

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>

      <Box>
        <h3>Add new todolist</h3>
        <AddItemForm onClick={addTodolist} />
      </Box>

      {todolists.map(tl => {
        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={allTasks[tl.id]}
            addTask={addTask}
            removeTask={removeTask}
            onEditTaskName={onEditTaskName}
            filter={tl.filter}
            changeFilter={changeFilter}
            onChangeStatus={onChangeStatus}
            removeTodolist={removeTodolist}
            onEditTodolistTitle={onEditTodolistTitle}
          />
        );
      })}
    </Box>
  );
}

export default App;
