import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '../../../../type';
import icTodo from '../../../../assets/ic-todo.svg';
import { nanoid } from 'nanoid';
import { counterAdd } from '../../../../shared/redux/action';
import {
  StorageKey,
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../../../shared/services/localStorageServices';

interface TodoHeaderProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoHeader = () => {
  const todos = useSelector((state: any) => state.todos);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState<string>('');
  //submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newTodo = {
        todoContent: inputValue,
      };

      dispatch(counterAdd(newTodo));
    }
    setInputValue('');
  };

  useEffect(() => {
    saveToLocalStorage(StorageKey.Todos, todos);
  }, [todos]);

  return (
    <>
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
    </>
  );
};

export default TodoHeader;
