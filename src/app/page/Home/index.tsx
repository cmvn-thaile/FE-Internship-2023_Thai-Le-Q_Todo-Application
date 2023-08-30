import React, { useState } from 'react';
import { Todo } from '../../../type';
import TodoHeader from './components/TodoHeader';
import TodoWrapper from './components/TodoWrapper';
const Index = () => {

  return (
    <div className="wrapper">
      <TodoHeader  />
      <TodoWrapper   />
    </div>
  );
};

export default Index;
