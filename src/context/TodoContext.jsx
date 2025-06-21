import { createContext, useState, useReducer } from "react";

export const TodoContext = createContext(null);

export const ContextProvider = (props) => {

    const initialState = [];

    const todoReducer = (state, action) => {
        const { type, payload } = action;

        switch (type) {

            case 'ADD_TASK':
                return [...state , {
                    id: Date.now(),
                    text: payload,
                    completed : false,
                }];
            
            case 'TOGGLE_COMPLETE':
                return state.map((task) => 
                    task.id === payload ? {...task , completed  : !task.completed} : task
                );

            case 'DELETE_TODO':
                return state.filter((task) => task.id !== payload);

            case 'CLEAR_ALL':
                return [];

            case 'EDIT_TODO':
                return state.map((task) => 
                    task.id === payload.id ? {...task, text: payload.newText} : task
                );

            default: 
                return state;
        }

    };

    const [activeTab, setActiveTab] = useState("addTodo");

    const [todoList, dispatch] = useReducer(todoReducer,initialState);

    const [editTodo, setEditTodo] = useState(null);

    const [taskText, setTaskText] = useState("");

    const addTask = (task) => dispatch({type: 'ADD_TASK' , payload: task});
    const toggleComplete = (taskId) => dispatch({type: 'TOGGLE_COMPLETE' , payload: taskId});
    const deleteTodo = (taskId) => dispatch({type: 'DELETE_TODO' , payload: taskId});
    const clearAll = () => dispatch({type: 'CLEAR_ALL'});
    const handleSave = (taskId , newText) => dispatch({type: 'EDIT_TODO' , payload: {id:taskId, newText}});

    function handleAddTask(e) {
        e.preventDefault();
        if (taskText.trim() !== "") {

            addTask(taskText);
            setTaskText("");
        }
    }


    return (
        <TodoContext.Provider value={{ activeTab, setActiveTab, todoList, editTodo, setEditTodo, addTask, toggleComplete, deleteTodo, clearAll, handleSave, taskText, setTaskText, handleAddTask }} >
            {props.children}
        </TodoContext.Provider>
    )
}
