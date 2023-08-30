import React, { useState } from 'react';
import { Todo } from '../../../../type';
import icTodo from '../../../../assets/ic-todo.svg';
import { nanoid } from 'nanoid';

interface TodoHeaderProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoHeader = ({ todos, setTodos }: TodoHeaderProps) => {
  const [inputValue, setInputValue] = useState<string>('');
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
