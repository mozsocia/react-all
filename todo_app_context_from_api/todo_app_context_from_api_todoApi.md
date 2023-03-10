api/todoApi.js
```js
import axios from 'axios';

const apiUrl = 'http://localhost:8000';

const api = axios.create({
  baseURL: apiUrl,
});

export const getTodos = async () => {
  const response = await api.get('/todos');
  return response.data;
};

export const addTodo = async (newTodo) => {
  const response = await api.post('/todos', newTodo);
  return response.data;
};

export const updateTodo = async (updatedTodo) => {
  const response = await api.put(`/todos/${updatedTodo.id}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id) => {
  await api.delete(`/todos/${id}`);
};

export default api;

```

context/TodoContext.jsx
```js 
import React, { createContext, useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../api/todoApi';

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getTodos();
        setTodos(todosData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (newTodo) => {
    try {
      const todoData = await addTodo(newTodo);
      setTodos([...todos, todoData]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTodo = async (updatedTodo) => {
    try {
      const todoData = await updateTodo(updatedTodo);
      const index = todos.findIndex((todo) => todo.id === todoData.id);
      const newTodos = [...todos];
      newTodos[index] = todoData;
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, handleAddTodo, handleUpdateTodo, handleDeleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;


```


components/App.js
```js 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoContextProvider from './Context/TodoContext';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';

const App = () => {
  return (
    <Router>
      <TodoContextProvider>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/add" element={<AddTodo />} />
            <Route path="/edit/:id" element={<EditTodo />} />
          </Routes>
        </div>
      </TodoContextProvider>
    </Router>
  );
};

export default App;

```


components/TodoList.js
```js 
import React, { useContext } from 'react';
import { TodoContext } from '../Context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="row">
      <div className="col-md-8 mx-auto">
        <h2 className="text-center mb-4">Todo List</h2>
        <ul className="list-group">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;

```

components/TodoItem.js
```js 
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TodoContext } from '../Context/TodoContext';

const TodoItem = ({ todo }) => {
  const { deleteTodo } = useContext(TodoContext);

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {todo.title}
      <div>
        <Link to={`/edit/${todo.id}`} className="btn btn-primary mr-2">
          Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

```

components/EditTodo.js
```js 
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TodoContext } from '../Context/TodoContext';

const EditTodo = () => {
  const { id } = useParams();
  const { todos, updateTodo } = useContext(TodoContext);
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


```

components/AddTodo.js
```js 
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../Context/TodoContext';

const AddTodo = () => {
  const { addTodo } = useContext(TodoContext);
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

```

components/Navbar.js
```js 
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Todo App
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/add" className="nav-link">
              Add Todo
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

```




```
npm install react react-dom react-router-dom axios
```