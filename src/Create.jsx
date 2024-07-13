import { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

export default function Create({ onAdd }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim() === "") return;
    axios
      .post("https://node-mongodb-api-pearl.vercel.app/add", { task: task })
      .then((response) => {
        onAdd(response.data);
        setTask("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Insira uma tarefa"
        value={task}
        onChange={(ev) => setTask(ev.target.value)}
      />
      <button onClick={handleAdd}>
        <FaPlus />
      </button>
    </div>
  );
}
