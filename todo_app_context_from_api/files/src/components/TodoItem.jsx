import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TodoContext } from '../Context/TodoContext';

const TodoItem = ({ todo }) => {
  const { handleDeleteTodo: deleteTodo } = useContext(TodoContext);

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
