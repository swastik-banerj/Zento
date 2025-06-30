import { createContext, useState, useReducer, useEffect } from "react";
import toast from 'react-hot-toast';

export const TodoContext = createContext(null);

export const ContextProvider = (props) => {

    const localTodos = localStorage.getItem("zento-todos");

    const initialState = localTodos ? JSON.parse(localTodos) : [];

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
                    repeatDaily: payload.repeatDaily,
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
                    task.id === payload.id ? { ...task, text: payload.newText, time: payload.newTime, notified: false } : task
                );

            case 'MARK_NOTIFIED':
                return state.map((task) =>
                    task.id === payload ? { ...task, notified: true } : task
                );

            case 'RESET_NOTIFIED':
                return state.map(task =>
                    task.repeatDaily ? { ...task, notified: false } : task
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
    const [editedTime, setEditedTime] = useState("");
    const [repeatDaily, setRepeatDaily] = useState(false);

    const [taskTime, setTaskTime] = useState("");

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // save to localStorage whenever todoList changes
    useEffect(() => {
        localStorage.setItem("zento-todos", JSON.stringify(todoList));
    }, [todoList]);


    const addTask = (taskText, taskTime, repeatDaily) => dispatch({ type: 'ADD_TASK', payload: { taskText, taskTime, repeatDaily } });
    const toggleComplete = (taskId) => dispatch({ type: 'TOGGLE_COMPLETE', payload: taskId });
    const deleteTodo = (taskId) => dispatch({ type: 'DELETE_TODO', payload: taskId });
    const clearAll = () => dispatch({ type: 'CLEAR_ALL' });

    const handleSave = (taskId, newText, newTime) => {
        dispatch({
            type: 'EDIT_TODO',
            payload: { id: taskId, newText, newTime }
        });
        setEditTodo(null);
    }
    const notify = (taskId) => dispatch({ type: 'MARK_NOTIFIED', payload: taskId });

    function handleAddTask(e) {
        e.preventDefault();
        if (taskText.trim() !== "") {
            addTask(taskText, taskTime, repeatDaily);
            setTaskText("");
            setTaskTime("");
            setRepeatDaily(false);
        }
    }

    useEffect(() => {
        dispatch({ type: 'RESET_NOTIFIED' });
    }, []);

    function notifyUser(task) {
        toast.custom((t) => (
            <div className="bg-white shadow-lg p-4 rounded flex items-center justify-between w-[300px]">
                <span className="text-lg font-semibold">⏰ Take {task.text} now</span>
                <button
                    className="ml-4 bg-blue-600 text-white px-3 py-1 rounded text-lg"
                    onClick={() => {
                        speechSynthesis.cancel();
                        clearInterval(voiceInterval); // stop the loop
                        notify(task.id);         // mark task as notified
                        toast.dismiss(t.id);     // dismiss the toast manually
                    }}
                >
                    Taken
                </button>
            </div>
        ), { duration: Infinity, position: "top-center" });
    }


    let voiceInterval = null;
    function speakHindiReminder(message, taskId) {
        if (voiceInterval) clearInterval(voiceInterval);
        speechSynthesis.cancel();
        function loadVoicesAndSpeak() {

            const voices = window.speechSynthesis.getVoices();

            // Finding bengali like voice
            const bengaliLikeVoice = voices.find((voice) => voice.lang === 'hi-IN');

            const utterance = new SpeechSynthesisUtterance(message);

            if (bengaliLikeVoice) {
                utterance.voice = bengaliLikeVoice;
            }

            // Repeat voice every 6 seconds until stopped
            voiceInterval = setInterval(() => {
                const stillPending = todoList.find((t) => t.id === taskId && !t.notified)

                if (stillPending) {
                    speechSynthesis.cancel(); // cancel previous utterance
                    speechSynthesis.speak(utterance);
                }
            }, 5000);
        }

        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = loadVoicesAndSpeak;
        } else {
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
                notifyUser(task);
                speakHindiReminder(message, task.id);

                if (!task.repeatDaily) {
                    notify(task.id);
                }
            }
        });
    }

    function resetDailyTasks() {
        const today = new Date().toDateString();
        const lastReset = localStorage.getItem("zento-last-reset");

        if (lastReset !== today) {
            const updated = todoList.map(task =>
                task.repeatDaily ? { ...task, notified: false } : task
            );
            localStorage.setItem("zento-todos", JSON.stringify(updated));
            localStorage.setItem("zento-last-reset", today);
            window.location.reload(); // reload to apply reset
        }
    }


    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    }



    return (
        <TodoContext.Provider value={{ activeTab, setActiveTab, todoList, editTodo, setEditTodo, addTask, toggleComplete, deleteTodo, clearAll, handleSave, taskText, setTaskText, handleAddTask, editedText, setEditedText, taskTime, setTaskTime, checkTasksForVoiceNotification, isSidebarOpen, setIsSidebarOpen, toggleSidebar, editedTime, setEditedTime, repeatDaily, setRepeatDaily, resetDailyTasks }} >
            {props.children}
        </TodoContext.Provider>
    )
}
