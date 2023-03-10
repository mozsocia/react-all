import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTodos, deleteTodo } from '../actions/todos';

const TodoList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const { todos, error, isLoading } = useSelector((state) => state);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      dispatch(deleteTodo(id));
    }
  };

  return (
    <div>

      <h1>Todo List</h1>

      {error && <h3>{error}</h3>}


      <Link to='/add' className='btn btn-primary my-4'>
        Add Todo
      </Link>

      {isLoading && <h3>Loading</h3>}

      {!isLoading &&
        <table className='table table-striped mt-3' >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>
                  <Link to={`/edit/${todo.id}`} className='btn btn-primary mr-2'>
                    Edit
                  </Link>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }

    </div>
  );
};

export default TodoList;
