import { beforeEach, expect, test } from 'vitest';
import { FilterType, TodolistType } from '../App';
import {
  addTodolistAC,
  AddTodolistACType,
  changeFilterAC,
  ChangeFilterACType,
  editTodolistTitleAC,
  EditTodolistTitleACType,
  removeTodolistAC,
  RemoveTodolistACType,
  todolistsReducer,
} from './todolists-reducer';

const state: TodolistType[] = [
  { id: '1', title: 'Apple', filter: 'all' },
  { id: '2', title: 'Linux', filter: 'completed' },
];
let initialState: TodolistType[];
beforeEach(() => {
  initialState = state;
});

test('Filter must be changed', () => {
  const newFilter: FilterType = 'active';

  const action: ChangeFilterACType = changeFilterAC('1', newFilter);
  const endState: TodolistType[] = todolistsReducer(initialState, action);

  expect(endState[0].filter).toBe(newFilter);
  expect(endState[1].filter).toBe('completed');
});

test('Target todolist title must be changed', () => {
  const action: EditTodolistTitleACType = editTodolistTitleAC('1', 'Windows');
  const endState: TodolistType[] = todolistsReducer(initialState, action);

  expect(endState[0].title).toBe('Windows');
  expect(endState[1].title).toBe('Linux');
});

test('Target todolist must be removed', () => {
  const action: RemoveTodolistACType = removeTodolistAC('1');
  const endState: TodolistType[] = todolistsReducer(initialState, action);

  expect(endState.length).toBe(1);
  expect(endState.every(tl => tl.id === '1')).toBeFalsy();
});

test('New todolist must be added', () => {
  const action: AddTodolistACType = addTodolistAC('Windows');
  const endState: TodolistType[] = todolistsReducer(initialState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe('Windows');
});
