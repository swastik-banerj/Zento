
const EditTodo = ({editedText , setEditedText , onSave}) => {

  const handleSubmit = (e) =>{
    e.preventDefault();
    onSave();
  }

  return (
    <form onSubmit={handleSubmit} >
      <input type="text" name="task"  value={editedText} className="p-1 m-2 w-[500px] border-2 rounded border-blue-600 focus:border-blue-600 focus:outline-none"
          onChange={(e) => setEditedText(e.target.value)}
        />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Save</button>
    </form>
  )
}

export default EditTodo;
