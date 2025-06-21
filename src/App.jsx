import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css'
import { useContext } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import {TodoContext} from './context/TodoContext';

function App() {

  const {activeTab} = useContext(TodoContext);


  return (
    <div className='flex flex-col'>
      <Header></Header>
      <div className='flex'>
        <Sidebar></Sidebar>
        <div className='flex-1'>
          {activeTab === "addTodo" && <AddTodo></AddTodo>}
          {activeTab === "todoList" && <TodoList></TodoList>}
        </div>
      </div>
    </div>
  )
}

export default App;
