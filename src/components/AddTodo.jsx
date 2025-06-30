import { useContext } from "react";
import { TodoContext } from '../context/TodoContext';

const AddTodo = () => {

  const { taskText, setTaskText, handleAddTask, taskTime, setTaskTime, repeatDaily, setRepeatDaily } = useContext(TodoContext);

  return (
    <div>

      <form className="mx-auto my-5" onSubmit={handleAddTask}>

        <div className="flex gap-1">

          <input
            type="text"
            name="task"
            value={taskText}
            placeholder="Enter medicine"
            className="w-auto mx-auto p-2 text-white border-2 rounded border-blue-600 focus:border-blue-600 focus:outline-none"
            onChange={(e) => setTaskText(e.target.value)}
            required
          />

          <button type="submit" className="bg-blue-600 text-white p-2 rounded">ADD</button>

        </div>

        <input
          type="time"
          name="time"
          value={taskTime}
          className="w-auto my-3 p-2 text-white border-2 rounded border-blue-600 focus:border-blue-600 focus:outline-none"
          onChange={(e) => setTaskTime(e.target.value)}
          required
        />

        <div className="bg-blue-500 text-white rounded px-3 py-1 text-lg space-x-3">
          <input
            type="checkbox"
            checked={repeatDaily}
            onChange={(e) => setRepeatDaily(e.target.checked)}
          />
          <label>
            Repeat : Everyday
          </label>
        </div>

      </form>

    </div>
  )
}

export default AddTodo;
