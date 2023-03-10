
actions/todos.js
```js
import axios from 'axios';

// Define action types
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';

export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

// Define actions
export const fetchTodos = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_TODOS_REQUEST });
      const response = await axios.get('http://localhost:8000/todos');
      dispatch({ type: FETCH_TODOS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_TODOS_FAILURE, payload: error.message });
    }
  };
};

export const addTodo = (todo) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_TODO_REQUEST });
      const response = await axios.post('http://localhost:8000/todos', todo);
      dispatch({ type: ADD_TODO_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ADD_TODO_FAILURE, payload: error.message });
    }
  };
};

export const updateTodo = (todo) => {
  console.log(todo)
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_TODO_REQUEST });
      const response = await axios.put(`http://localhost:8000/todos/${todo.id}`, todo);
      dispatch({ type: UPDATE_TODO_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: UPDATE_TODO_FAILURE, payload: error.message });
    }
  };
};

export const deleteTodo = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_TODO_REQUEST });
      await axios.delete(`http://localhost:8000/todos/${id}`);
      dispatch({ type: DELETE_TODO_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_TODO_FAILURE, payload: error.message });
    }
  };
};

```


reducers/todos.js
```js
import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
} from '../actions/todos';

// Define initial state
const initialState = {
  todos: [],
  error: null,
  isLoading: false,
};

// Define reducer
const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ADD_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        isLoading: false,
        error: null,
      };
    case ADD_TODO_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case UPDATE_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UPDATE_TODO_SUCCESS:
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      return {
        ...state,
        todos: updatedTodos,
        isLoading: false,
        error: null,
      };
    case UPDATE_TODO_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case DELETE_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_TODO_SUCCESS:
      const filteredTodos = state.todos.filter((todo) => todo.id !== action.payload);
      return {
        ...state,
        todos: filteredTodos,
        isLoading: false,
        error: null,
      };
    case DELETE_TODO_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default todosReducer;

```





components/AddTodo.js
```js
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

```

components/EditTodo.js
```js
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

```

components/TodoList.js
```js
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

```



App.js
```js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import todosReducer from './reducers/todos';

const store = createStore(todosReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <div className='container'>
            <Routes>
              <Route path='/' element={<TodoList />} />
              <Route path='/add' element={<AddTodo />} />
              <Route path='/edit/:id' element={<EditTodo />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
```

