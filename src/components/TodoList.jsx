
const TodoList = ({todoList}) => {
  return (
        <div className="bg-amber-400 w-[50vw] h-[60vh] mx-50 my-9 flex flex-col">
            <div className="flex justify-center my-5 text-3xl font-bold">
                <h1>Your Todo List</h1>
            </div>
            <div>
                <div className="flex flex-col items-center">
                    {todoList.map((task , index) => (
                        <div className="m-6 p-1 text-2xl" key={index}>
                        <input type="checkbox" name="marked" className="mx-3 w-5 h-5 rounded"/> 
                         {task}</div>
                    ))}
                </div>
            </div>
            
        </div>
  )
}

export default TodoList;
