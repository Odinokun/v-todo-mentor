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

const todolist_1 = crypto.randomUUID();
const todolist_2 = crypto.randomUUID();
const todolist_3 = crypto.randomUUID();

const initialState: TodolistType[] = [
  { id: todolist_1, title: 'Learning', filter: 'all' },
  { id: todolist_2, title: 'Reading', filter: 'active' },
  { id: todolist_3, title: 'Watching', filter: 'completed' },
];

test('Filter must be changed', () => {
  const newFilter: FilterType = 'active';
  const action: ChangeFilterACType = changeFilterAC(todolist_1, newFilter);
  const endState = todolistsReducer(initialState, action);

  expect(endState[0].filter).toEqual(newFilter);
});
test('Target todolist title must be changed', () => {
  const newTitle = 'New todolist title';
  const action: EditTodolistTitleACType = editTodolistTitleAC(todolist_1, newTitle);
  const endState = todolistsReducer(initialState, action);

  expect(endState[0].title).toEqual(newTitle);
});
test('Target todolist must be removed', () => {
  const action: RemoveTodolistACType = removeTodolistAC(todolist_1);
  const endState = todolistsReducer(initialState, action);

  expect(endState.length).toBe(2);
  expect(endState[0].id).toEqual(todolist_2);
});
test('New todolist must be added', () => {
  const id = crypto.randomUUID();
  const newTitle = 'New todolist title';
  const action: AddTodolistACType = addTodolistAC(id, newTitle);
  const endState = todolistsReducer(initialState, action);

  expect(endState.length).toBe(4);
  expect(endState[0].title).toEqual(newTitle);
});
