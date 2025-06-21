import { useContext } from "react";
import {TodoContext} from '../context/TodoContext';

const Sidebar = () => {

    const {setActiveTab} = useContext(TodoContext);

    return (
        <aside className="flex flex-col w-64 bg-orange-300 h-[100vh] shadow-md">
            <div className="flex items-center justify-center h-16 ">
                <button className="text-blue-700 font-bold  hover:text-blue-400"
                    onClick={() => setActiveTab("addTodo")}
                >Add Todo</button>
            </div>

            <div className="flex items-center justify-center h-16">
                <button className="text-blue-700 font-bold  hover:text-blue-400"
                    onClick={() => setActiveTab("todoList")}
                >Todo List</button>
            </div>

            <div className="flex items-center justify-center h-16 hover:text-blue-400 font-medium">
                <button className="text-blue-700 font-bold  hover:text-blue-400"
                    onClick={() => setActiveTab("history")}
                >History</button>
            </div>
        </aside>

    )
}

export default Sidebar;

