import { FilterType, TodolistType } from '../App';

type ChangeFilterACType = ReturnType<typeof changeFilterAC>;
type EditTodolistTitleACType = ReturnType<typeof editTodolistTitleAC>;
type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;

type ActionType = ChangeFilterACType | EditTodolistTitleACType | RemoveTodolistACType;

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
  switch (action.type) {
    case 'CHANGE-FILTER':
      return state.map(tl => (tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.value } : tl));
    case 'EDIT-TODOLIST-TITLE':
      return state.map(tl => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl));
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.payload.todolistId);
    default:
      console.error("ERROR => todolistsReducer. I don't understand this action type");
      return state;
  }
};

export const changeFilterAC = (todolistId: string, value: FilterType) => {
  return {
    type: 'CHANGE-FILTER',
    payload: {
      todolistId,
      value,
    },
  } as const;
};
export const editTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: 'EDIT-TODOLIST-TITLE',
    payload: {
      todolistId,
      title,
    },
  } as const;
};
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      todolistId,
    },
  } as const;
};