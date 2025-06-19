import { useState } from "react";
import EditTodo from "./EditTodo";

const TodoList = ({ todoList, toggleComplete, deleteTodo, clearAll, editTodo, setEditTodo, handleSave}) => {

    const [editedText , setEditedText] = useState("");

    return (
        <div className="bg-amber-400 w-[50vw] h-[60vh] mx-50 my-9 flex flex-col">

                <div className="flex justify-center my-5">
                    <h1 className="text-3xl font-bold  ">Your Todo List</h1>
                    <button className="mx-20 p-2 bg-red-500 rounded"
                        onClick={() => clearAll()}
                    >Clear All</button>
                </div>

            <div>
                <div className="flex flex-col items-center">
                    {todoList.map((task) => (


                        <div className="m-6 p-1 text-2xl flex" key={task.id}>
                           
                            <input type="checkbox" className="mx-3 w-5 h-5 rounded"
                                onChange={() => toggleComplete(task.id)}
                                checked={task.completed}
                            />

                            <div>
                                {editTodo !== task.id ? <span className={task.completed ? "line-through" : ""}> {task.text}</span> : <EditTodo editedText={editedText} setEditedText={setEditedText} onSave={() => handleSave(task.id, editedText)} /> }
                            </div>
                                    
                            <button className="mx-10 bg-red-500 w-8 h-8 rounded"
                                onClick={() => deleteTodo(task.id)}
                            >x</button> 
                            
                            <button className="mx-10 bg-blue-500 w-12 h-10 rounded"
                                onClick={() => {
                                    setEditTodo(task.id);
                                    setEditedText(task.text);
                                }}
                            >Edit</button>
                        </div>
                            
                    ))}
                </div>
            </div>

        </div>
    )
}

export default TodoList;
