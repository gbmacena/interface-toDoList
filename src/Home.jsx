import { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { FaRegCircle, FaCheckCircle, FaTrash } from "react-icons/fa";

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("https://api-to-do-list-nine.vercel.app/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAdd = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleEdit = (id) => {
    axios
      .put(`https://api-to-do-list-nine.vercel.app/update/${id}`)
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://api-to-do-list-nine.vercel.app/delete/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h1 style={{ marginBottom: "15px" }}>Lista de tarefas</h1>
      <Create onAdd={handleAdd} />
      {todos.length === 0 ? (
        <div>
          <h2 style={{ marginTop: "15px" }}>Adicione tarefas!</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <FaCheckCircle className="icon" />
              ) : (
                <FaRegCircle className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <FaTrash
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
