import { expect, test } from 'vitest';
import { FilterType, TodolistType } from '../App';
import { changeFilterAC, todolistsReducer } from './todolists-reducer';

const todolist_1 = crypto.randomUUID();
const todolist_2 = crypto.randomUUID();
const todolist_3 = crypto.randomUUID();

const initialState: TodolistType[] = [
  { id: todolist_1, title: 'Learning', filter: 'all' },
  { id: todolist_2, title: 'Reading', filter: 'active' },
  { id: todolist_3, title: 'Watching', filter: 'completed' },
];

test('Filter must be change', () => {
  const newFilterVal: FilterType = 'active';
  const action = changeFilterAC(todolist_1, newFilterVal);
  const endState = todolistsReducer(initialState, action);

  expect(endState[0].filter).toEqual(newFilterVal);
});
