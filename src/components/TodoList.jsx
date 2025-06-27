import { useContext } from "react";
import EditTodo from "./EditTodo";
import { TodoContext } from '../context/TodoContext';

const TodoList = () => {

    const { todoList, toggleComplete, deleteTodo, clearAll, editTodo, setEditTodo, handleSave, editedText, setEditedText, setEditedTime, editedTime } = useContext(TodoContext);

    return (
        <div className="bg-gray-300 w-full h-auto max-w-3xl mx-auto rounded-xl shadow-md my-9 p-6 flex flex-col">

            <div className="flex mb-7">
                <div className="mr-5">
                    <h1 className="text-2xl font-semibold">Medicine List</h1>
                </div>

                <div className="ml-1">
                    <button className="bg-red-500 text-gray-100 rounded px-3 py-1 text-sm hover:bg-red-600"
                        onClick={() => clearAll()}
                    >Clear All</button>
                </div>
            </div>

            <div>
                <div className="flex flex-col items-center">

                    {todoList.length === 0 ? (
                        <p className="text-gray-600 text-center mt-10">
                            Empty medicine list. Add medicine to start
                        </p>
                    ) : (

                        todoList.map((task) => (


                            <div className="bg-white w-auto flex items-center justify-center rounded-xl px-4 py-3 mb-4 shadow-md max-w-xl  transition hover:shadow-lg space-x-5 my-3"
                                key={task.id}>

                                {editTodo !== task.id ?

                                    <div className="flex">
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" className="mx-3 w-5 h-5"
                                                onChange={() => toggleComplete(task.id)}
                                                checked={task.completed}
                                            />

                                            <div>
                                                <div className="flex space-x-1">
                                                    <div>
                                                        <span className={task.completed ? "line-through" : "text-lg font-semibold text-gray-800"}> {task.text}</span>
                                                    </div>

                                                    <div className="mt-3 mr-3">
                                                        <span className="text-gray-500 text-sm">{task.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
                                            <button className="bg-blue-500 text-white rounded px-3 py-1 text-sm hover:bg-blue-600"
                                                onClick={() => {
                                                    setEditTodo(task.id);
                                                    setEditedText(task.text);
                                                    setEditedTime(task.time);
                                                }}
                                            >Edit</button>


                                            <button className="bg-red-500 text-white rounded px-3 py-1 text-sm hover:bg-red-600"
                                                onClick={() => deleteTodo(task.id)}
                                            >Delete</button>
                                        </div>
                                    </div>


                                    : <EditTodo editedText={editedText} setEditedText={setEditedText} 
                                    onSave={(newText, newTime) => handleSave(task.id, newText, newTime)} />}

                            </div>
                        )))
                    }
                </div>
            </div>

        </div>
    )
}

export default TodoList;
