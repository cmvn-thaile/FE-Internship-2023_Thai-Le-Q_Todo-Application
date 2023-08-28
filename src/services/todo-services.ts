import { Todo } from '../type';

export const completedTodo = (id: string, todos: Todo[]) => {
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );

  return updatedTodos;
};

export const deleteTodo = (id: string, todos: Todo[]) => {
  const updatedTodos = todos.filter((todo) => todo.id !== id);

  return updatedTodos;
};
