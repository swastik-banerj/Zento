import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css'
import { useContext, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { TodoContext } from './context/TodoContext';
import { Toaster } from 'react-hot-toast';

function App() {

  const { activeTab, checkTasksForVoiceNotification, todoList, resetDailyTasks } = useContext(TodoContext);

  useEffect(() => {
    const interval = setInterval(() => {
      checkTasksForVoiceNotification();
    }, 1000);

    return () => clearInterval(interval);
  }, [todoList]);

  useEffect(() => {
    resetDailyTasks();
  }, []);



  return (
    <div>
      <div className='flex flex-col min-h-screen bg-gray-800' >
        <Header></Header>
        <div className='flex md:flex-row flex-1 max-w-6xl mx-auto px-4 py-4'>
          <Sidebar></Sidebar>
          <div className='p-4 md:p8 mx-auto max-w-3xl rounded-2xl mt-6'>
            {activeTab === "addTodo" && <AddTodo></AddTodo>}
            {activeTab === "todoList" && <TodoList></TodoList>}
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>

  )
}

export default App;
