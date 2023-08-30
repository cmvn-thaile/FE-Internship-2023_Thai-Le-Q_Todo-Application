import React from 'react';
import './index.css';
import TodoWrapper from './app/page/components/TodoWrapper';

function App() {
  return (
    <div className="app">
      <h1 className="app-title">
        Todo
        <span role="img" aria-label="...">
          📝
        </span>
      </h1>
      <TodoWrapper />
    </div>
  );
}

export default App;
