import { useContext } from "react";
import EditTodo from "./EditTodo";
import { TodoContext } from '../context/TodoContext';

const TodoList = () => {

    const { todoList, toggleComplete, deleteTodo, clearAll, editTodo, setEditTodo, handleSave, editedText, setEditedText } = useContext(TodoContext);

    return (
        <div className="bg-amber-400 w-[50vw] h-[60vh] mx-50 my-9 flex flex-col">

            <div className="flex justify-center my-5">
                <h1 className="text-3xl font-bold  ">Medicine List</h1>
                <button className="mx-20 p-2 bg-red-500 rounded"
                    onClick={() => clearAll()}
                >Clear All</button>
            </div>

            <div>
                <div className="flex flex-col items-center">

                    {todoList.length === 0 ? (
                        <p className="text-gray-600 text-center mt-10">
                            Empty medicine list. Add medicine to start
                        </p>
                    ) : (

                        todoList.map((task) => (


                            <div className="bg-white w-full flex items-center justify-center rounded-xl px-4 py-3 mb-4 shadow-md max-w-xl transition hover:shadow-lg space-x-5"
                                key={task.id}>

                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" className="mx-3 w-5 h-5"
                                        onChange={() => toggleComplete(task.id)}
                                        checked={task.completed}
                                    />

                                    <div>
                                        {editTodo !== task.id ?
                                            <div className="flex space-x-1">
                                                <div>
                                                    <span className={task.completed ? "line-through" : "text-lg font-semibold text-gray-800"}> {task.text}</span>
                                                </div>

                                                <div className="mt-2">
                                                    <span className="text-gray-500 text-sm">{task.time}</span>
                                                </div>
                                            </div>

                                            : <EditTodo editedText={editedText} setEditedText={setEditedText} onSave={() => handleSave(task.id, editedText)} />}
                                    </div>
                                </div>

                                <div className="flex space-x-2">
                                    <button className="bg-blue-500 text-white rounded px-3 py-1 text-sm hover:bg-blue-600"
                                        onClick={() => {
                                            setEditTodo(task.id);
                                            setEditedText(task.text);
                                        }}
                                    >Edit</button>


                                    <button className="bg-red-500 text-white rounded px-3 py-1 text-sm hover:bg-red-600"
                                        onClick={() => deleteTodo(task.id)}
                                    >Delete</button>

                                </div>


                            </div>
                        )))
                    }
                </div>
            </div>

        </div>
    )
}

export default TodoList;
