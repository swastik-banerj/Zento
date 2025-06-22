import { createContext, useState, useReducer } from "react";

export const TodoContext = createContext(null);

export const ContextProvider = (props) => {

    const initialState = [];

    const todoReducer = (state, action) => {
        const { type, payload } = action;

        switch (type) {

            case 'ADD_TASK':
                return [...state, {
                    id: Date.now(),
                    text: payload.taskText,
                    time: payload.taskTime,
                    completed: false,
                }];

            case 'TOGGLE_COMPLETE':
                return state.map((task) =>
                    task.id === payload ? { ...task, completed: !task.completed } : task
                );

            case 'DELETE_TODO':
                return state.filter((task) => task.id !== payload);

            case 'CLEAR_ALL':
                return [];

            case 'EDIT_TODO':
                return state.map((task) =>
                    task.id === payload.id ? { ...task, text: payload.newText } : task
                );

            default:
                return state;
        }

    };

    const [activeTab, setActiveTab] = useState("addTodo");

    const [todoList, dispatch] = useReducer(todoReducer, initialState);

    const [editTodo, setEditTodo] = useState(null);

    const [taskText, setTaskText] = useState("");

    const [editedText, setEditedText] = useState("");

    const [taskTime, setTaskTime] = useState("");

    const addTask = (taskText, taskTime) => dispatch({ type: 'ADD_TASK', payload: { taskText, taskTime } });
    const toggleComplete = (taskId) => dispatch({ type: 'TOGGLE_COMPLETE', payload: taskId });
    const deleteTodo = (taskId) => dispatch({ type: 'DELETE_TODO', payload: taskId });
    const clearAll = () => dispatch({ type: 'CLEAR_ALL' });
    const handleSave = (taskId, newText) => {
        dispatch({ type: 'EDIT_TODO', payload: { id: taskId, newText } });
        setEditTodo(null);
    }
    function handleAddTask(e) {
        e.preventDefault();
        if (taskText.trim() !== "") {
            console.log("Saving task:", { text: taskText, time: taskTime });
            addTask(taskText, taskTime);
            setTaskText("");
            setTaskTime("");
        }
    }

    function checkTasksForVoiceNotification() {
        const now = new Date();
        const currentTime = now
            .toTimeString()
            .slice(0, 5); // returns "HH:MM" in 24-hour format
        todoList.forEach(task => {
            if (task.time === currentTime) {
                const message = `সময় হয়েছে ${task.text} খাওয়ার`;
                const utterance = new SpeechSynthesisUtterance(message);
                speechSynthesis.speak(utterance);
            }

        });
    }


    return (
        <TodoContext.Provider value={{ activeTab, setActiveTab, todoList, editTodo, setEditTodo, addTask, toggleComplete, deleteTodo, clearAll, handleSave, taskText, setTaskText, handleAddTask, editedText, setEditedText, taskTime, setTaskTime, checkTasksForVoiceNotification }} >
            {props.children}
        </TodoContext.Provider>
    )
}
