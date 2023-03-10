import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTodos, updateTodo } from '../actions/todos';

const EditTodo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const { title, description } = formData;

  const todo = useSelector((state) =>
    state.todos.find((todo) => todo.id === Number(id))
  );

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description,
      });
    }
  }, [dispatch, id, todo]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTodo({
      id: Number(id),
      title,
      description,
    }));
    navigate('/');
  };

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Todo</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            type='text'
            className='form-control'
            id='title'
            name='title'
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <textarea
            className='form-control'
            id='description'
            name='description'
            value={description}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
