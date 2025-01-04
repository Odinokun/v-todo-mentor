import { useReducer } from 'react';
import {
	addTodolistAC,
	changeFilterAC,
	editTodolistTitleAC,
	removeTodolistAC,
	todolistsReducer,
} from './state/todolists-reducer';

import { TaskType, Todolist } from './Todolist';
import { AddItemForm } from './components/AddItemForm';
import { ButtonAppBar } from './components/ButtonAppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import './App.css';
import { addTaskAC, changeTaskStatusAC, editTaskNameAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';

export type FilterType = 'all' | 'active' | 'completed';

export type TodolistType = {
	id: string;
	title: string;
	filter: FilterType;
};

export type AllTasksType = {
	[key: string]: TaskType[];
};

function App() {
	const todolist_1 = crypto.randomUUID();
	const todolist_2 = crypto.randomUUID();
	const todolist_3 = crypto.randomUUID();

	const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
		{ id: todolist_1, title: 'Learning', filter: 'all' },
		{ id: todolist_2, title: 'Reading', filter: 'active' },
		{ id: todolist_3, title: 'Watching', filter: 'completed' },
	]);
	const [allTasks, dispatchTasks] = useReducer(tasksReducer, {
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

	const changeFilter = (todolistId: string, value: FilterType) => dispatchTodolists(changeFilterAC(todolistId, value));

	const editTodolistTitle = (todolistId: string, title: string) =>
		dispatchTodolists(editTodolistTitleAC(todolistId, title));

	// FIX removeTodolist isn't working
	const removeTodolist = (todolistId: string) => {
		dispatchTodolists(removeTodolistAC(todolistId));
		// delete allTasks[todolistId];
	};

	const addTask = (todolistId: string, title: string) => dispatchTasks(addTaskAC(todolistId, title));

	const removeTask = (todolistId: string, id: string) => dispatchTasks(removeTaskAC(todolistId, id));

	const editTaskName = (todolistId: string, id: string, title: string) =>
		dispatchTasks(editTaskNameAC(todolistId, id, title));

	const changeTaskStatus = (todolistId: string, id: string, taskStatus: boolean) =>
		dispatchTasks(changeTaskStatusAC(todolistId, id, taskStatus));

	// FIX addTodolist isn't working
	const addTodolist = (title: string) => {
		dispatchTodolists(addTodolistAC(title));
		// dispatchTasks(addTodolistAC(title));
	};

	return (
		<Box>
			<ButtonAppBar />

			<Container maxWidth='lg'>
				<Box mt={2} mb={3}>
					<Typography variant='h5' component='h2'>
						Add new todolist
					</Typography>
					<AddItemForm onClick={addTodolist} />
				</Box>
			</Container>

			<Container maxWidth='lg'>
				<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
					{todolists.map(tl => {
						return (
							<Todolist
								key={tl.id}
								todolistId={tl.id}
								title={tl.title}
								tasks={allTasks[tl.id]}
								addTask={addTask}
								removeTask={removeTask}
								editTaskName={editTaskName}
								filter={tl.filter}
								changeFilter={changeFilter}
								changeTaskStatus={changeTaskStatus}
								removeTodolist={removeTodolist}
								editTodolistTitle={editTodolistTitle}
							/>
						);
					})}
				</Box>
			</Container>
		</Box>
	);
}

export default App;
