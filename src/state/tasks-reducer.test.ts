import { expect, test } from 'vitest';
import { AllTasksType } from '../App';
import { addTaskAC, tasksReducer } from './tasks-reducer';
import { TaskType } from '../Todolist';

const todolist_1 = crypto.randomUUID();
const todolist_2 = crypto.randomUUID();
const todolist_3 = crypto.randomUUID();

const initialState: AllTasksType = {
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
};

test('New task must be add', () => {
  const newTitle = 'New task';
  const action = addTaskAC(todolist_1, newTitle);
  const endState = tasksReducer(initialState, action);

  expect(endState[todolist_1].length).toBe(7);
  expect(endState[todolist_1][0].title).toEqual(newTitle);
  expect(endState[todolist_1][0].isDone).toEqual(false);
});
