import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import TodoCard from './TodoCard';
import { Todo } from '../../../../type';
import {
  completedTodo,
  removeAllCompleted,
} from '../../../../shared/redux/action';
// import {
//   completedTodo,
//   deleteTodo,
// } from '../../../../shared/services/todo-services';

const TodoWrapper = () => {
  //create state for todos and input
  const todos = useSelector((state: any) => state.todos);
  const dispatch = useDispatch();
  //create state for editing
  const [editing, setEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  //create state for filter
  const [filter, setFilter] = useState('all');



  useEffect(() => {
    //save data to local storage when todos change
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const countUncompleted = useMemo(() => {
    return todos.filter((todo: Todo) => !todo.isCompleted).length;
  }, [todos]);

  //double click to edit
  const handleDoubleClick = (id: string) => {
    setEditing(id);
    setEditText(todos.find((todo: Todo) => todo.id === id)?.todoContent || '');
  };

  //check if enter key is pressed, update todos
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const updatedTodos = todos.map((todo: Todo) =>
        todo.id === editing ? { ...todo, todoContent: editText } : todo
      );
      
      // setTodos(updatedTodos);
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

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === 'active') {
      return !todo.isCompleted;
    } else if (filter === 'completed') {
      return todo.isCompleted;
    } else {
      return true;
    }
  });
  return (
    <>
      <div className="todo-content">
        <ul className="todo-list">
          {filteredTodos.map((todo: Todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              editText={editText}
              editing={editing}
              handleEdit={handleEdit}
              setEditing={setEditing}
              // handleDelete={handleDelete}
              // handleCompleted={handleCompleted}
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
        <span
          className="todo-clear-completed"
          onClick={() => dispatch(removeAllCompleted())}
        >
          Clear Completed
        </span>
      </div>
    </>
  );
};

export default TodoWrapper;
