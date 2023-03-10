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
