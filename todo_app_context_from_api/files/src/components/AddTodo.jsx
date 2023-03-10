import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../Context/TodoContext';

const AddTodo = () => {
  const { handleAddTodo: addTodo } = useContext(TodoContext);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === '') return;
    const newTodo = {
      title,
      completed: false,
    };
    await addTodo(newTodo);
    navigate('/');
  };

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <h2 className="text-center mb-4">Add Todo</h2>
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
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
