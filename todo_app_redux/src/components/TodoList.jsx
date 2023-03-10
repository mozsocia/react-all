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