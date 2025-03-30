import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
  
    useEffect(() => {
      fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('https://render-0b7b.onrender.com/todos');
        setTodos(response.data);
      };
    
      const addTodo = async () => {
        const response = await axios.post('https://render-0b7b.onrender.com/todos', { task, completed: false });
        setTodos([...todos, response.data]);
        setTask('');
      };
    
      const updateTodo = async (id, completed) => {
        const response = await axios.put(`https://render-0b7b.onrender.com/todos/${id}`, { completed });
        setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
      };
    
      const deleteTodo = async (id) => {
        await axios.delete(`https://render-0b7b.onrender.com/todos/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
      };

 

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.task}
            </span>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => updateTodo(todo._id, e.target.checked)}
            />
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
