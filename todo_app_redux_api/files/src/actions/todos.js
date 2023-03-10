import axios from 'axios';

// Define action types
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';

export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

// Define actions
export const fetchTodos = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_TODOS_REQUEST });
      const response = await axios.get('http://localhost:8000/todos');
      dispatch({ type: FETCH_TODOS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_TODOS_FAILURE, payload: error.message });
    }
  };
};

export const addTodo = (todo) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_TODO_REQUEST });
      const response = await axios.post('http://localhost:8000/todos', todo);
      dispatch({ type: ADD_TODO_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ADD_TODO_FAILURE, payload: error.message });
    }
  };
};

export const updateTodo = (todo) => {
  console.log(todo)
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_TODO_REQUEST });
      const response = await axios.put(`http://localhost:8000/todos/${todo.id}`, todo);
      dispatch({ type: UPDATE_TODO_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: UPDATE_TODO_FAILURE, payload: error.message });
    }
  };
};

export const deleteTodo = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_TODO_REQUEST });
      await axios.delete(`http://localhost:8000/todos/${id}`);
      dispatch({ type: DELETE_TODO_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_TODO_FAILURE, payload: error.message });
    }
  };
};
