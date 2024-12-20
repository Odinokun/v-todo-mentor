import { AllTasksType } from '../App';
import { TaskType } from '../Todolist';

export type AddTaskACType = ReturnType<typeof addTaskAC>;
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export type EditTaskNameACType = ReturnType<typeof editTaskNameAC>;

type ActionsType = AddTaskACType | RemoveTaskACType | EditTaskNameACType;

export const tasksReducer = (state: AllTasksType, action: ActionsType): AllTasksType => {
  switch (action.type) {
    case 'ADD-TASK': {
      const newTask: TaskType = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        isDone: false,
      };
      return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] };
    }
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id),
      };
    case 'EDIT-TASK-NAME':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
          t.id === action.payload.id ? { ...t, title: action.payload.title } : t
        ),
      };
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
