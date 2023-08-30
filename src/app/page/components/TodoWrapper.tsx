import React, { useEffect, useState, useRef, useMemo } from 'react';
import icTodo from '../../../assets/ic-todo.svg';
import { nanoid } from 'nanoid';
import TodoCard from './TodoCard';
import { Todo } from '../../../type';
import { completedTodo, deleteTodo } from '../../../shared/services/todo-services';

const TodoWrapper = () => {
  //create state for todos and input
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [inputValue, setInputValue] = React.useState<string>('');
  //create state for editing
  const [editing, setEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  //create state for filter
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    //get data from local storage
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    //save data to local storage when todos change
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  //submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: nanoid(),
        todoContent: inputValue,
        isCompleted: false,
      };

      setTodos([...todos, newTodo]);
    }
    setInputValue('');
  };

  //handle completed when click, function take id and return updated todos
  //have isCompleted = true if id match
  const handleCompleted = (id: string) => {
    setTodos(completedTodo(id, todos));
  };
  //handle completed when click, function take id and return delete todo
  //if id match
  const handleDelete = (id: string) => {
    setTodos(deleteTodo(id, todos));
  };
  //count uncompleted todos
  const countUncompleted = useMemo(() => {
    return todos.filter((todo) => !todo.isCompleted).length;
  }, [todos]);

  //clear completed todos
  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.isCompleted);
    setTodos(updatedTodos);
  };
  //double click to edit
  const handleDoubleClick = (id: string) => {
    setEditing(id);
    setEditText(todos.find((todo) => todo.id === id)?.todoContent || '');
  };

  //check if enter key is pressed, update todos
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const updatedTodos = todos.map((todo) =>
        todo.id === editing ? { ...todo, todoContent: editText } : todo
      );
      setTodos(updatedTodos);
      setEditing(null);
    }
  };
  //handle edit text
  const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(event.target.value);
  };
  //handle filter
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.isCompleted;
    } else if (filter === 'completed') {
      return todo.isCompleted;
    } else {
      return true;
    }
  });
  return (
    <div className="wrapper">
      <div className="todo-header">
        <span>
          <img src={icTodo} alt="Todo" />
        </span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What need to be done?"
          />
        </form>
      </div>

      <div className="todo-content">
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoCard
              todo={todo}
              editText={editText}
              editing={editing}
              handleEdit={handleEdit}
              setEditing={setEditing}
              handleDelete={handleDelete}
              handleCompleted={handleCompleted}
              handleDoubleClick={handleDoubleClick}
              handleKeyDown={handleKeyDown}
            />
          ))}
        </ul>
      </div>
      <div className="todo-footer">
        <span>
          {countUncompleted > 1
            ? `${countUncompleted} items left`
            : `${countUncompleted} item left`}
        </span>
        <ul className="todo-filter">
          <li
            className={filter === 'all' ? 'filter active' : 'filter'}
            onClick={() => handleFilterChange('all')}
          >
            All
          </li>
          <li
            className={filter === 'active' ? 'filter active' : 'filter'}
            onClick={() => handleFilterChange('active')}
          >
            Active
          </li>
          <li
            className={filter === 'completed' ? 'filter active' : 'filter'}
            onClick={() => handleFilterChange('completed')}
          >
            Completed
          </li>
        </ul>
        <span className="todo-clear-completed" onClick={clearCompleted}>
          Clear Completed
        </span>
      </div>
    </div>
  );
};

export default TodoWrapper;
