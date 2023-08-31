import {
  SET_ALL_COMPLETED,
  SET_COMPLETED,
  TODOS_ADD,
  TODOS_REMOVE,
  TODOS_REMOVE_ALL_COMPLETED,
  UPDATE_TODO,
} from './type';

interface Props {
  id?: string;
  todoContent?: string;
  isCompleted?: boolean;
}

export const counterAdd = ({ todoContent }: Props) => {
  return {
    type: TODOS_ADD,
    payload: { todoContent },
  };
};

export const completedTodo = (id: string) => {
  return {
    type: SET_COMPLETED,
    payload: { id },
  };
};

export const removeTodo = (id: string) => {
  return {
    type: TODOS_REMOVE,
    payload: { id },
  };
};

export const removeAllCompleted = () => {
  return {
    type: TODOS_REMOVE_ALL_COMPLETED,
  };
};

export const updateTodo = (id: string | null, todoContent: string) => {
  return {
    type: UPDATE_TODO,
    payload: { id, todoContent },
  };
};

export const completedAllTodo = () => {
  return {
    type: SET_ALL_COMPLETED,
  };
}
