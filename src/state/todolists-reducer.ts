import { FilterType, TodolistType } from '../App';

export type ChangeFilterACType = ReturnType<typeof changeFilterAC>;
export type EditTodolistTitleACType = ReturnType<typeof editTodolistTitleAC>;
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;

type ActionsType = ChangeFilterACType | EditTodolistTitleACType | RemoveTodolistACType;

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'CHANGE-FILTER': {
      const p = { ...action.payload };
      return state.map(tl => (tl.id === p.id ? { ...tl, filter: p.filter } : tl));
    }
    case 'EDIT-TODOLIST-TITLE': {
      const p = { ...action.payload };
      return state.map(tl => (tl.id === p.id ? { ...tl, title: p.title } : tl));
    }
    case 'REMOVE-TODOLIST': {
      const p = { ...action.payload };
      return state.filter(tl => tl.id !== p.id);
    }
    default:
      console.error("ERROR => todolistsReducer. I don't understand this action type");
      return state;
  }
};

export const changeFilterAC = (id: string, filter: FilterType) => {
  return {
    type: 'CHANGE-FILTER',
    payload: {
      id,
      filter,
    },
  } as const;
};
export const editTodolistTitleAC = (id: string, title: string) => {
  return {
    type: 'EDIT-TODOLIST-TITLE',
    payload: {
      id,
      title,
    },
  } as const;
};
export const removeTodolistAC = (id: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      id,
    },
  } as const;
};
