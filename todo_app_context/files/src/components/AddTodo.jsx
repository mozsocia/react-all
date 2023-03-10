import React, { useState, useContext } from 'react';
import { useNavigate  } from 'react-router-dom';
import { TodoContext } from '../context/TodoContext';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const { addTodo } = useContext(TodoContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(title);
    setTitle('');
    navigate('/');
  };

  return (
    <div>
      <h1>Add ToDo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTodo;
