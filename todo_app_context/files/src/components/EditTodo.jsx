import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TodoContext } from '../context/TodoContext';

const EditTodo = () => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const { id } = useParams();
  const { todos, updateTodo } = useContext(TodoContext);
  const navigate = useNavigate();

  useEffect(() => {
    const todo = todos.find((todo) => todo.id === id);
    setTitle(todo.title);
    setCompleted(todo.completed);
  }, [id, todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo(id, { title, completed });
    navigate('/');
  };

  return (
    <div>
      <h1>Edit ToDo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          Completed
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditTodo;
