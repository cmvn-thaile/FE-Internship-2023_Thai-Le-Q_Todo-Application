import { createStore, applyMiddleware } from 'redux';
import { todoReducer } from './reducer';
import { loggerMiddleware } from './middleware';

export const store = createStore(todoReducer, applyMiddleware(loggerMiddleware));
