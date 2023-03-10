import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TodoContext } from '../Context/TodoContext';

const EditTodo = () => {
  const { id } = useParams();
  const { todos, handleUpdateTodo: updateTodo } = useContext(TodoContext);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const todo = todos.find((todo) => todo.id === parseInt(id));
    setTitle(todo.title);
  }, [id, todos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === '') return;
    const updatedTodo = {
      id: parseInt(id),
      title,
      completed: false,
    }
    await updateTodo(updatedTodo);
    navigate('/');
  };

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <h2 className="text-center mb-4">Edit Todo</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;

