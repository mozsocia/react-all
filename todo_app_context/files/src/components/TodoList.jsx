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
