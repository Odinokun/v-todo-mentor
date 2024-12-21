import { AllTasksType } from '../App';
import { TaskType } from '../Todolist';

export type AddTaskACType = ReturnType<typeof addTaskAC>;
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export type EditTaskNameACType = ReturnType<typeof editTaskNameAC>;
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
export type AddTasksACType = ReturnType<typeof addTasksAC>;

type ActionsType = AddTaskACType | RemoveTaskACType | EditTaskNameACType | ChangeTaskStatusACType | AddTasksACType;

export const tasksReducer = (state: AllTasksType, action: ActionsType): AllTasksType => {
  switch (action.type) {
    case 'ADD-TASK': {
      const { todoId, title } = action.payload;
      const newTask: TaskType = {
        id: crypto.randomUUID(),
        title,
        isDone: false,
      };
      return { ...state, [todoId]: [newTask, ...state[todoId]] };
    }
    case 'REMOVE-TASK': {
      const { todoId, id } = action.payload;
      return { ...state, [todoId]: state[todoId].filter(t => t.id !== id) };
    }
    case 'EDIT-TASK-NAME': {
      const { todoId, id, title } = action.payload;
      return { ...state, [todoId]: state[todoId].map(t => (t.id === id ? { ...t, title } : t)) };
    }
    case 'CHANGE-TASK-STATUS': {
      const { todoId, id, taskStatus } = action.payload;
      return { ...state, [todoId]: state[todoId].map(t => (t.id === id ? { ...t, isDone: taskStatus } : t)) };
    }
    case 'ADD-TASKS': {
      const { todoId } = action.payload;
      return { [todoId]: [], ...state };
    }
    default:
      console.log('I don`t understand this type');
      return state;
  }
};

export const addTaskAC = (todoId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      todoId,
      title,
    },
  } as const;
};
export const removeTaskAC = (todoId: string, id: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      todoId,
      id,
    },
  } as const;
};
export const editTaskNameAC = (todoId: string, id: string, title: string) => {
  return {
    type: 'EDIT-TASK-NAME',
    payload: {
      todoId,
      id,
      title,
    },
  } as const;
};
export const changeTaskStatusAC = (todoId: string, id: string, taskStatus: boolean) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: {
      todoId,
      id,
      taskStatus,
    },
  } as const;
};
export const addTasksAC = (todoId: string) => {
  return {
    type: 'ADD-TASKS',
    payload: { todoId },
  } as const;
};
