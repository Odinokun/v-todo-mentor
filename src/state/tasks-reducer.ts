import { AllTasksType } from '../App';
import { TaskType } from '../Todolist';

export type AddTaskACType = ReturnType<typeof addTaskAC>;
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export type EditTaskNameACType = ReturnType<typeof editTaskNameAC>;
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;

type ActionsType = AddTaskACType | RemoveTaskACType | EditTaskNameACType | ChangeTaskStatusACType;

export const tasksReducer = (state: AllTasksType, action: ActionsType): AllTasksType => {
  switch (action.type) {
    case 'ADD-TASK': {
      const { todolistId, title } = action.payload;
      const newTask: TaskType = {
        id: crypto.randomUUID(),
        title,
        isDone: false,
      };
      return { ...state, [todolistId]: [newTask, ...state[todolistId]] };
    }
    case 'REMOVE-TASK': {
      const { todolistId, id } = action.payload;
      return { ...state, [todolistId]: state[todolistId].filter(t => t.id !== id) };
    }
    case 'EDIT-TASK-NAME': {
      const { todolistId, id, title } = action.payload;
      return { ...state, [todolistId]: state[todolistId].map(t => (t.id === id ? { ...t, title } : t)) };
    }
    case 'CHANGE-TASK-STATUS': {
      const { todolistId, id, taskStatus } = action.payload;
      return { ...state, [todolistId]: state[todolistId].map(t => (t.id === id ? { ...t, isDone: taskStatus } : t)) };
    }
    default:
      console.log('I don`t understand this type');
      return state;
  }
};

export const addTaskAC = (todolistId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      todolistId,
      title,
    },
  } as const;
};
export const removeTaskAC = (todolistId: string, id: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      todolistId,
      id,
    },
  } as const;
};
export const editTaskNameAC = (todolistId: string, id: string, title: string) => {
  return {
    type: 'EDIT-TASK-NAME',
    payload: {
      todolistId,
      id,
      title,
    },
  } as const;
};
export const changeTaskStatusAC = (todolistId: string, id: string, taskStatus: boolean) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: {
      todolistId,
      id,
      taskStatus,
    },
  } as const;
};
