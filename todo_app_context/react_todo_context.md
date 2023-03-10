Sure, here's an example React ToDo CRUD app using Context API:

First, create a new React app using create-react-app:

```
npx create-react-app todo-app
cd todo-app

```

Then, install the following packages:

```
npm install uuid react-router-dom

```

`uuid` is a package to generate unique ids for each ToDo item, and `react-router-dom` is used to handle routing in the app.

Next, create a new file `/context/TodoContext.js` in the `src` folder. This file will contain the Context API:

```js
import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id, updatedTodo) => {
    const newupdateTodo = {
      id: uuidv4(),
      ...updatedTodo
    };
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? newupdateTodo : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleCompleted = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, toggleCompleted }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;


```

This Context API has five methods: `addTodo`, `updateTodo`, `deleteTodo`, `toggleCompleted`, and `todos`. These methods will be used to create, read, update, and delete ToDo items.

Next, update `App.js` to use the Context API:

```js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import TodoContextProvider from './context/TodoContext';

function App() {
  return (
    <div className="App">
      <Router>
        <TodoContextProvider>
          <Routes>
            <Route path="/" element={<TodoList/>} />
            <Route path="/add" element={<AddTodo/>} />
            <Route path="/edit/:id" element={<EditTodo/>} />
          </Routes>
        </TodoContextProvider>
      </Router>
    </div>
  );
}

export default App;


```

In this code, we wrapped the `Router` and all of its components in the `TodoContextProvider` component to provide access to the Context API.

Next, create the `TodoList` component, which will display a list of all the ToDo items:

```js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TodoContext } from '../context/TodoContext';

const TodoList = () => {
  const { todos, toggleCompleted, deleteTodo } = useContext(TodoContext);

  return (
    <div>
      <h1>ToDo List</h1>
      <Link to="/add">Add ToDo</Link>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
              />
              <Link to={`/edit/${todo.id}`}>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.title}
                </span>
              </Link>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
        
      </div>
    );
  };
  
  export default TodoList;


```

In this code, we used the `useContext` hook to get access to the `todos` array, `toggleCompleted`, and `deleteTodo` methods from the Context API. We also used `Link` from `react-router-dom` to create links to the EditTodo and AddTodo components.

Next, create the `AddTodo` component, which will allow users to add a new ToDo item:

```js
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


```

In this code, we used the `useState` hook to manage the input field value, `useContext` to access the `addTodo` method from the Context API, and `useHistory` from `react-router-dom` to redirect to the TodoList component after adding a new ToDo item.

Finally, create the `EditTodo` component, which will allow users to edit an existing ToDo item:

```js
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


```

In this code, we used the `useState` hook to manage the input field values, `useParams` from `react-router-dom` to get the `id` of the ToDo item being edited, `useContext` to access the \`
