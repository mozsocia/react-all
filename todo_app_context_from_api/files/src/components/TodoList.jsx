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
