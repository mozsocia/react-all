import axios from 'axios';

const apiUrl = 'http://localhost:8000';

const api = axios.create({
  baseURL: apiUrl,
});

export const getTodos = async () => {
  const response = await api.get('/todos');
  return response.data;
};

export const addTodo = async (newTodo) => {
  const response = await api.post('/todos', newTodo);
  return response.data;
};

export const updateTodo = async (updatedTodo) => {
  const response = await api.put(`/todos/${updatedTodo.id}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id) => {
  await api.delete(`/todos/${id}`);
};

export default api;
