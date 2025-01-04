import { addTodolistAC, AddTodolistACType, removeTodolistAC, RemoveTodolistACType } from './todolists-reducer';
import { beforeEach, expect, test } from 'vitest';
import { AllTasksType } from '../App';
import {
	addTaskAC,
	AddTaskACType,
	changeTaskStatusAC,
	ChangeTaskStatusACType,
	editTaskNameAC,
	EditTaskNameACType,
	removeTaskAC,
	RemoveTaskACType,
	tasksReducer,
} from './tasks-reducer';

const todolist_1 = crypto.randomUUID();
const todolist_2 = crypto.randomUUID();
const state: AllTasksType = {
	[todolist_1]: [
		{ id: '1', title: 'Apple', isDone: true },
		{ id: '2', title: 'Linux', isDone: false },
	],
	[todolist_2]: [
		{ id: '1', title: 'Audi', isDone: true },
		{ id: '2', title: 'BMW', isDone: false },
	],
};
let initialState: AllTasksType;
beforeEach(() => {
	initialState = state;
});

test('New task must be add', () => {
	const action: AddTaskACType = addTaskAC(todolist_1, 'Windows');
	const endState = tasksReducer(initialState, action);

	expect(endState[todolist_1].length).toBe(3);
	expect(endState[todolist_1][0].title).toBe('Windows');
	expect(endState[todolist_1][0].isDone).toBeFalsy();
});

test('Target task must be remove', () => {
	const action: RemoveTaskACType = removeTaskAC(todolist_1, '1');
	const endState = tasksReducer(initialState, action);

	expect(endState[todolist_1].length).toBe(1);
	expect(endState[todolist_1][0].title).toBe('Linux');
	expect(endState[todolist_2][0].title).toBe('Audi');
});

test('Change task name', () => {
	const action: EditTaskNameACType = editTaskNameAC(todolist_1, '1', 'Windows');
	const endState = tasksReducer(initialState, action);

	expect(endState[todolist_1][0].title).toBe('Windows');
	expect(endState[todolist_2][0].title).toBe('Audi');
});

test('Task status must be change', () => {
	const action: ChangeTaskStatusACType = changeTaskStatusAC(todolist_1, '1', false);
	const endState = tasksReducer(initialState, action);

	expect(endState[todolist_1][0].isDone).toBeFalsy();
	expect(endState[todolist_2][0].isDone).toBeTruthy();
});

test('New object key and tasks array must be added when we added new todolist', () => {
	const action: AddTodolistACType = addTodolistAC('Title does`t matter');
	const endState: AllTasksType = tasksReducer(initialState, action);

	const keys = Object.keys(endState);
	const newKey = keys.find(k => k !== todolist_1 && k !== todolist_2);
	if (!newKey) {
		throw Error('New key must be added!');
	}

	expect(keys.length).toBe(3);
	expect(endState[newKey]).toEqual([]);
});

test('Key and task`s array must be deleted when we deleting todolist', () => {
	const action: RemoveTodolistACType = removeTodolistAC(todolist_1);
	const endState: AllTasksType = tasksReducer(initialState, action);

	const keys = Object.keys(endState);

	expect(keys.length).toBe(1);
	expect(endState[todolist_1]).toBeUndefined();
});
