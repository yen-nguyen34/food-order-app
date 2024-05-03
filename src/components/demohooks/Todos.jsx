import { useState, useEffect } from "react";

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      if (!response.ok) {
        throw new Error(`HTTP Response Status ${response.status}`);
      } else {
        const resData = await response.json();
        setTodos(resData);
        console.log("sucessfully", resData);
      }
    };
    // Call the function
    loadTodos();
  }, []);
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <p key={todo.id}>
            <li>User ID: {todo.userId}</li>
            <li>Title: {todo.title}</li>
            <li>Completed ? {todo.completed}</li>
          </p>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
