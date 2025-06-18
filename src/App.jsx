import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css'
import { useState } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {

  const [todoList, setTodoList] = useState([]);
  const [activeTab, setActiveTab] = useState("addTodo");
  function addTask(task) {
    const updatedList = [...todoList, task];
    setTodoList(updatedList);
  }


  return (
    <div className='flex flex-col'>
      <Header></Header>
      <div className='flex'>
        <Sidebar setActiveTab={setActiveTab} ></Sidebar>
        <div className='flex-1'>
          {activeTab === "addTodo" && <AddTodo addTask={addTask}></AddTodo>}
          {activeTab === "todoList" && <TodoList todoList={todoList} ></TodoList>}
        </div>
      </div>
    </div>
  )
}

export default App;
