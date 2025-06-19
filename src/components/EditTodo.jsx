
const EditTodo = ({editedText , setEditedText , onSave}) => {
  return (
    <form onChange={(e) => setEditedText(e.target.value)}>
      <input type="text" name="task"  value={editedText} className="p-1 m-2 w-[500px] border-2 rounded border-blue-600 focus:border-blue-600 focus:outline-none"
        />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded"
        onClick={onSave}
      >save</button>
    </form>
  )
}

export default EditTodo;
