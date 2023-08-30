import { nanoid } from 'nanoid';
import { Todo } from '../../type';
import {
  SET_COMPLETED,
  TODOS_ADD,
  TODOS_REMOVE,
  TODOS_REMOVE_ALL_COMPLETED,
} from './type';
import { get } from 'http';
import {
  StorageKey,
  getFromLocalStorage,
} from '../services/localStorageServices';

interface Action {
  type: string;
  payload: Todo;
}

interface State {
  todos: Todo[];
}

const initialState: State = {
  todos: getFromLocalStorage(StorageKey.Todos),
};

export const todoReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case TODOS_ADD:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: nanoid(),
            todoContent: action.payload.todoContent,
            isCompleted: false,
          },
        ],
      };
    case SET_COMPLETED:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              isCompleted: !todo.isCompleted,
            };
          }
          return todo;
        }),
      };
    case TODOS_REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case TODOS_REMOVE_ALL_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.isCompleted),
      };
    // case COUNTER_MINUS:
    //   return {
    //     ...state,
    //     count: state.count - 1,
    //   };

    default:
      return state;
  }
};
