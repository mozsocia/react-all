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
