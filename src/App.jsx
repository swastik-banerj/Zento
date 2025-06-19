import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css'
import { useState } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {

  const [todoList, setTodoList] = useState([]);
  const [activeTab, setActiveTab] = useState("addTodo");
  const [editTodo, setEditTodo] = useState(null);
  function addTask(task) {

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    const updatedList = [...todoList, newTask];
    setTodoList(updatedList);
  }

  function toggleComplete(taskId){
      const updatedList = todoList.map((task) => {
         return task.id === taskId ? {...task , completed: !task.completed} : task
      });
      setTodoList(updatedList);
  } 

  function deleteTodo(taskId){
      const updatedList = todoList.filter((task) => (
        task.id !== taskId
      ));

      setTodoList(updatedList);
  }

  function clearAll(){
    setTodoList([]);
  }

  function handleSave(taskId , newText){
      const updatedList = todoList.map((task) => (
        task.id === taskId ? {...task , text : newText} : task
      ));
      setTodoList(updatedList);
      setEditTodo(null);
  }


  return (
    <div className='flex flex-col'>
      <Header></Header>
      <div className='flex'>
        <Sidebar setActiveTab={setActiveTab} ></Sidebar>
        <div className='flex-1'>
          {activeTab === "addTodo" && <AddTodo addTask={addTask}></AddTodo>}
          {activeTab === "todoList" && <TodoList todoList={todoList} toggleComplete={toggleComplete} deleteTodo={deleteTodo} clearAll={clearAll} editTodo={editTodo} setEditTodo={setEditTodo} handleSave={handleSave} ></TodoList>}
        </div>
      </div>
    </div>
  )
}

export default App;
