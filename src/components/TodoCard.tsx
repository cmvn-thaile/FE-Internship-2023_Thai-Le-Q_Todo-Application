import React, { useState, useEffect, useRef } from 'react';
import { Todo } from '../type';
import icActive from '../assets/ic-active.svg';
import icCompleted from '../assets/ic-completed.svg';
import icDelete from '../assets/ic-delete.svg';

interface Props {
  todo: Todo;
  editText: string;
  editing: string | null;
  setEditing: React.Dispatch<React.SetStateAction<string | null>>;
  handleCompleted: (id: string) => void;
  handleDelete: (id: string) => void;
  handleDoubleClick: (id: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleEdit: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TodoCard = ({
  todo,
  editText,
  editing,
  handleCompleted,
  handleDelete,
  handleDoubleClick,
  handleKeyDown,
  handleEdit,
  setEditing,
}: Props) => {
  const [showDelete, setShowDelete] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setEditing(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditing(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleMouseEnter = () => {
    setShowDelete(true);
  };

  const handleMouseLeave = () => {
    setShowDelete(false);
  };

  return (
    <>
      <li
        className='todo-item'
        key={todo.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <>
          <div>
            <span
              className='active-icon'
              onClick={() => handleCompleted(todo.id)}
            >
              <img
                src={todo.isCompleted ? icCompleted : icActive}
                alt='todo status'
              />
            </span>
            {editing === todo.id ? (
              <input
                type='text'
                value={editText}
                onChange={handleEdit}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                autoFocus
              />
            ) : (
              <span
                className='todo-content'
                onDoubleClick={() => handleDoubleClick(todo.id)}
              >
                {todo.todoContent}
              </span>
            )}
          </div>
          {showDelete && (
            <span className='active-icon' onClick={() => handleDelete(todo.id)}>
              <img src={icDelete} alt='cancel icon' />
            </span>
          )}
        </>
      </li>
    </>
  );
};

export default TodoCard;
