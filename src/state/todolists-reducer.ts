import { FilterType, TodolistType } from '../App';

type ChangeFilterACType = ReturnType<typeof changeFilterAC>;

type ActionType = ChangeFilterACType;

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
  switch (action.type) {
    case 'CHANGE-FILTER':
      return state.map(tl => (tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.value } : tl));
    default:
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
