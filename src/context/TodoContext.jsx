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
                    notified: false,
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
                    task.id === payload.id ? { ...task, text: payload.newText, notified: false } : task
                );

            case 'MARK_NOTIFIED':
                return state.map((task) =>
                    task.id === payload ? { ...task, notified: true } : task
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

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const addTask = (taskText, taskTime) => dispatch({ type: 'ADD_TASK', payload: { taskText, taskTime } });
    const toggleComplete = (taskId) => dispatch({ type: 'TOGGLE_COMPLETE', payload: taskId });
    const deleteTodo = (taskId) => dispatch({ type: 'DELETE_TODO', payload: taskId });
    const clearAll = () => dispatch({ type: 'CLEAR_ALL' });
    const handleSave = (taskId, newText) => {
        dispatch({ type: 'EDIT_TODO', payload: { id: taskId, newText } });
        setEditTodo(null);
    }
    const notify = (taskId) => dispatch({ type: 'MARK_NOTIFIED', payload: taskId });
    function handleAddTask(e) {
        e.preventDefault();
        if (taskText.trim() !== "") {
            addTask(taskText, taskTime);
            setTaskText("");
            setTaskTime("");
        }
    }

    function speakHindiReminder(message, taskId) {
        function loadVoicesAndSpeak() {

            const voices = window.speechSynthesis.getVoices();

            // Finding bengali like voice
            const bengaliLikeVoice = voices.find((voice) => voice.lang === 'hi-IN');

            const utterance = new SpeechSynthesisUtterance(message);

            if (bengaliLikeVoice) {
                utterance.voice = bengaliLikeVoice;
            }

            speechSynthesis.speak(utterance);
            notify(taskId);
        }

        if(window.speechSynthesis.getVoices().length === 0){
            window.speechSynthesis.onvoiceschanged = loadVoicesAndSpeak;
        } else{
            loadVoicesAndSpeak();
        }
    }

    function checkTasksForVoiceNotification() {
        const now = new Date();
        const currentTime = now
            .toTimeString()
            .slice(0, 5); // returns "HH:MM" in 24-hour format
        todoList.forEach(task => {
            if (task.time === currentTime && !task.notified) {
                const message = `  Take, ${task.text} , now `;
                speakHindiReminder(message, task.id);
            }
        });
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    }


    return (
        <TodoContext.Provider value={{ activeTab, setActiveTab, todoList, editTodo, setEditTodo, addTask, toggleComplete, deleteTodo, clearAll, handleSave, taskText, setTaskText, handleAddTask, editedText, setEditedText, taskTime, setTaskTime, checkTasksForVoiceNotification, isSidebarOpen, setIsSidebarOpen, toggleSidebar }} >
            {props.children}
        </TodoContext.Provider>
    )
}
