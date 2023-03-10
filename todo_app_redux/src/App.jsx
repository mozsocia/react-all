import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const App = () => {
  return (
    <div>
      <h1>My To-Do List</h1>
      <TodoList />
      <TodoForm />
    </div>
  );
};

export default App;