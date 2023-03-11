src\actions\todoActions.js
```js
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

export const addTodo = (title, description) => ({
  type: ADD_TODO,
  payload: { title, description },
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: { id },
});

export const updateTodo = (id, title, description) => 
({
  type: UPDATE_TODO,
  payload: { id, title, description },
});

```

src\components\TodoEditForm.jsx
```js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../actions/todoActions';

const TodoEditForm = ({ todo, onCancel }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTodo(todo.id, title, description));
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default TodoEditForm;

```

src\components\TodoForm.jsx
```js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../actions/todoActions';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(title, description));
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
```

src\components\TodoList.jsx
```js
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo } from '../actions/todoActions';
import TodoEditForm from './TodoEditForm';

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const [editTodoId, setEditTodoId] = useState(null);

  const handleEdit = (id) => {
    setEditTodoId(id);
  };

  const handleCancelEdit = () => {
    setEditTodoId(null);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {editTodoId === todo.id ? (
            <TodoEditForm todo={todo} onCancel={handleCancelEdit} />
          ) : (
            <div>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
              <button onClick={() => handleEdit(todo.id)}>Edit</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
```


src\reducers\todoReducer.js

```js
import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from '../actions/todoActions';

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            title: action.payload.title,
            description: action.payload.description,
          },
        ],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                title: action.payload.title,
                description: action.payload.description,
              }
            : todo
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;

```
src\App.jsx
```js
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const App = () => {
  return (
    <div>
      <h1>My To-Do List</h1>
      <TodoList />
      <TodoForm />
    </div>
  );
};

export default App;
```

```js
```