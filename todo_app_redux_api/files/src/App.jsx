import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import todosReducer from './reducers/todos';

const store = createStore(todosReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <div className='container'>
            <Routes>
              <Route path='/' element={<TodoList />} />
              <Route path='/add' element={<AddTodo />} />
              <Route path='/edit/:id' element={<EditTodo />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;