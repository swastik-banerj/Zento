import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const EditTodo = ({onSave}) => {

  const { editedText, setEditedText, editedTime, setEditedTime } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedText, editedTime);
  }

  return (
    <form onSubmit={handleSubmit} >
      <div className="flex items-center">

        <div className="flex flex-col">
          <input
            type="text"
            name="task"
            value={editedText}
            className="p-1 m-2 w-auto border-2 rounded border-blue-600 focus:border-blue-600 focus:outline-none"
            onChange={(e) => setEditedText(e.target.value)}
          />

          <input
            type="time"
            name="time"
            value={editedTime}
            className="px-2 py-1 m-2 w-auto border-2 rounded border-blue-600 focus:border-blue-600 focus:outline-none"
            onChange={(e) => setEditedTime(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-gray-100 p-1 rounded"
          >Save</button>
        </div>

      </div>
    </form>
  )
}

export default EditTodo;
