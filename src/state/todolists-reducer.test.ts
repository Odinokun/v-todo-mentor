import { expect, test } from 'vitest';
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

const initialState: TodolistType[] = [
  { id: '1', title: 'Apple', filter: 'all' },
  { id: '2', title: 'Linux', filter: 'completed' },
];

test('Filter must be changed', () => {
  const newFilter: FilterType = 'active';

  const action: ChangeFilterACType = changeFilterAC('1', newFilter);
  const endState = todolistsReducer(initialState, action);

  expect(endState[0].filter).toBe(newFilter);
  expect(endState[1].filter).toBe('completed');
});

test('Target todolist title must be changed', () => {
  const newTitle = 'Windows';

  const action: EditTodolistTitleACType = editTodolistTitleAC('1', newTitle);
  const endState = todolistsReducer(initialState, action);

  expect(endState[0].title).toBe(newTitle);
  expect(endState[1].title).toBe('Linux');
});

test('Target todolist must be removed', () => {
  const action: RemoveTodolistACType = removeTodolistAC('1');
  const endState = todolistsReducer(initialState, action);

  expect(endState.length).toBe(1);
  expect(endState.every(tl => tl.id === '1')).toBeFalsy();
});

test('New todolist must be added', () => {
  const newTitle = 'Windows';

  const action: AddTodolistACType = addTodolistAC('3', newTitle);
  const endState = todolistsReducer(initialState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTitle);
});
