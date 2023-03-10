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
