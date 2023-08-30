import React from 'react';
import './index.css';
import TodoWrapper from './app/page/Home/components/TodoWrapper';
import Home  from './app/page/Home';

function App() {
  return (
    <div className="app">
      <h1 className="app-title">
        Todo
        <span role="img" aria-label="...">
          📝
        </span>
      </h1>
      <Home />
    </div>
  );
}

export default App;
