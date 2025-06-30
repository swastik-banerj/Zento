import { useContext } from "react";
import { TodoContext } from '../context/TodoContext';

const Sidebar = () => {

    const { activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen } = useContext(TodoContext);

    return (
        <div className={`fixed top-0 left-0 h-full w-60 bg-white shadow-lg p-4 z-50 transform transition-transform duration-300 ${isSidebarOpen? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`} >
            <aside className="flex flex-col w-64  bg-zinc-200 h-[100vh] shadow-md">
                <div className="flex items-center justify-center h-16 ">
                    <button className={`text-gray-800 font-bold  hover:text-blue-400 rounded p-1 transition ${activeTab === 'addTodo' ? "bg-amber-200 font-semibold" : ""} `}
                        onClick={() => setActiveTab("addTodo")}
                    >Add Medicine</button>
                </div>

                <div className="flex items-center justify-center h-16">
                    <button className={`text-gray-800 font-bold  hover:text-blue-400 rounded p-1 transition ${activeTab === 'todoList' ? "bg-amber-200 font-semibold" : ""} `}
                        onClick={() => setActiveTab("todoList")}
                    >Medicine List</button>
                </div>

            </aside>
        </div>
    )
}

export default Sidebar;

