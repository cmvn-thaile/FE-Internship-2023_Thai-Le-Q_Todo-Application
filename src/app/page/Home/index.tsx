import React, { useState } from 'react';
import { Todo } from '../../../type';
import TodoHeader from './components/TodoHeader';
import TodoWrapper from './components/TodoWrapper';
const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div className="wrapper">
      <TodoHeader todos={todos} setTodos={setTodos} />
      <TodoWrapper todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default Index;
