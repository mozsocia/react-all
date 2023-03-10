import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTodo } from '../actions/todos';

const AddTodo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const { title, description } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(formData));
    navigate('/');
  };

  return (
    <div>
      <h1>Add Todo</h1>
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
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
