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
