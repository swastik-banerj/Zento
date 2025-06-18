import { useState } from "react";

const AddTodo = ({ addTask }) => {

  const [taskText, setTaskText] = useState("");

  function handleAddTask(e) {
    e.preventDefault();
    if (taskText.trim() !== "") {

      addTask(taskText);
      setTaskText("");
    }
  }

  return (
    <form className="mx-[20vw] my-10" onSubmit={handleAddTask}>
      <input type="text" name="task" value={taskText} placeholder="Enter task" className="p-1 m-2 w-[500px] border-2 rounded border-blue-600 focus:border-blue-600 focus:outline-none"
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">ADD</button>
    </form>
  )
}

export default AddTodo;
