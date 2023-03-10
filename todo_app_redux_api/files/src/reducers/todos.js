import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
} from '../actions/todos';

// Define initial state
const initialState = {
  todos: [],
  error: null,
  isLoading: false,
};

// Define reducer
const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ADD_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        isLoading: false,
        error: null,
      };
    case ADD_TODO_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case UPDATE_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UPDATE_TODO_SUCCESS:
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      return {
        ...state,
        todos: updatedTodos,
        isLoading: false,
        error: null,
      };
    case UPDATE_TODO_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case DELETE_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_TODO_SUCCESS:
      const filteredTodos = state.todos.filter((todo) => todo.id !== action.payload);
      return {
        ...state,
        todos: filteredTodos,
        isLoading: false,
        error: null,
      };
    case DELETE_TODO_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default todosReducer;
