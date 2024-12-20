import { AllTasksType } from '../App';
import { TaskType } from '../Todolist';

type AddTaskACType = ReturnType<typeof addTaskAC>;

type ActionsType = AddTaskACType;

export const tasksReducer = (state: AllTasksType, action: ActionsType) => {
  switch (action.type) {
    case 'ADD-TASK': {
      const newTask: TaskType = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        isDone: false,
      };
      return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] };
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
