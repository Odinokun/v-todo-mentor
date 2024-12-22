import { FilterType, TodolistType } from '../App';

export type ChangeFilterACType = ReturnType<typeof changeFilterAC>;
export type EditTodolistTitleACType = ReturnType<typeof editTodolistTitleAC>;
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistACType = ReturnType<typeof addTodolistAC>;

type ActionsType = ChangeFilterACType | EditTodolistTitleACType | RemoveTodolistACType | AddTodolistACType;

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'CHANGE-FILTER': {
      const { id, filter } = action.payload;
      return state.map(tl => (tl.id === id ? { ...tl, filter } : tl));
    }
    case 'EDIT-TODOLIST-TITLE': {
      const { id, title } = action.payload;
      return state.map(tl => (tl.id === id ? { ...tl, title } : tl));
    }
    case 'REMOVE-TODOLIST': {
      const { id } = action.payload;
      return state.filter(tl => tl.id !== id);
    }
    case 'ADD-TODOLIST': {
      const { id, title } = action.payload;
      return [{ id, title, filter: 'all' }, ...state];
    }
    default:
      console.error("ERROR => todolistsReducer. I don't understand this action type");
      return state;
  }
};

export const changeFilterAC = (id: string, filter: FilterType) => {
  return {
    type: 'CHANGE-FILTER',
    payload: { id, filter },
  } as const;
};
export const editTodolistTitleAC = (id: string, title: string) => {
  return {
    type: 'EDIT-TODOLIST-TITLE',
    payload: { id, title },
  } as const;
};
export const removeTodolistAC = (id: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: { id },
  } as const;
};
export const addTodolistAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: { id: crypto.randomUUID(), title },
  } as const;
};
