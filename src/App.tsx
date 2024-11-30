import { useState } from 'react';
import { TaskType, Todolist } from './Todolist';
import './App.css';

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
      { id: crypto.randomUUID(), title: 'Poirot', isDone: false },
    ],
    [todolist_3]: [
      { id: crypto.randomUUID(), title: 'The Godfather', isDone: true },
      { id: crypto.randomUUID(), title: 'Mr. Robot', isDone: true },
      { id: crypto.randomUUID(), title: 'The Dark Knight', isDone: true },
    ],
  });

  const [state, setState] = useState<TaskType[]>([
    { id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true },
    { id: crypto.randomUUID(), title: 'JS', isDone: true },
    { id: crypto.randomUUID(), title: 'React', isDone: false },
    { id: crypto.randomUUID(), title: 'GraphQL', isDone: false },
    { id: crypto.randomUUID(), title: 'Rest API', isDone: false },
    { id: crypto.randomUUID(), title: 'Graph API', isDone: false },
  ]);

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: crypto.randomUUID(),
      title,
      isDone: false,
    };
    setState([newTask, ...state]);
  };

  const removeTask = (id: string) => setState(state.filter(t => t.id !== id));

  function changeFilter(todolistId: string, value: FilterType) {
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter: value } : tl)));
  }

  return (
    <div className='App'>
      {todolists.map(tl => {
        return <Todolist key={tl.id} todolistId={tl.id} title={tl.title} tasks={state} addTask={addTask} removeTask={removeTask} filter={tl.filter} changeFilter={changeFilter} />;
      })}
    </div>
  );
}

export default App;
