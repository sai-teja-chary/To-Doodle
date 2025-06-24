import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }
  const handleEdit = (e, id) => {
    let newTodo = todos.filter(item => { return item.id === id })
    setTodo(newTodo[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };


  const toggleFinish = () => {
    setShowFinished(!showFinished)

  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id
    })

    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }
  return (
    <>
      <Navbar />
      <div className="md:container md:w-1/2 bg-[#CC313D] min-h-[80vh] h-auto md:mx-auto m-2 mt-6 pb-4 text-[#FFFFFF] rounded-4xl" >
        <h1 className='text-center m-2 p-2 text-2xl font-bold'>Sketch your tasks, Doodle your day</h1>
        <h2 className='mx-5 my-2 text-lg font-bold'>Add you Task</h2>
        <div className="addtasks flex mx-4 gap-4 ">
          <input id='addtodo' onChange={handleChange} value={todo} className='outline-none border w-full h-9 rounded-full border-[#CC313D] bg-[#FFFFFF] pl-4 text-[15px] text-black' type="text" />
          <button onClick={handleAdd} disabled={todo.length <= 3} className=' text-[#CC313D] bg-[#FFFFFF] hover:bg-[#F7C5CC] cursor-pointer rounded-full text-sm w-20 font-bold'>Save</button>
        </div>
        <input id='' onChange={toggleFinish} className='ml-5 my-5 mr-2 accent-[#F7C5CC]' type="checkbox" checked={showFinished} />
        <label className='font-bold' htmlFor="show">Show Finished</label>
        <h2 className='mx-5 my-2 text-lg font-bold'>Your Tasks</h2>
        <p className={todos.length == 0 ? "No Todos to show" : ""}></p>
        {todos.map(todo => {
          return (showFinished || !todo.isCompleted) && <div key={todo.id} className='flex'>
            <input id='' name={todo.id} onChange={handleCheckbox} className='ml-5 accent-[#F7C5CC]' type="checkbox" checked={todo.isCompleted} />
            <div className="task flex justify-between m-2 w-full">
              <p className={todo.isCompleted ? "line-through" : todo.todo}>{todo.todo}</p>
              <div className="buttons flex gap-3">
                <button onClick={(e) => handleEdit(e, todo.id)} className='text-[#CC313D] bg-[#FFFFFF] hover:bg-[#F7C5CC] cursor-pointer rounded-full w-10 font-bold flex justify-center items-center'><FaEdit /></button>
                <button onClick={(e) => handleDelete(e, todo.id)} className='text-[#CC313D] bg-[#FFFFFF] hover:bg-[#F7C5CC] cursor-pointer rounded-full w-10 font-bold flex justify-center items-center'><RiDeleteBin6Fill /></button>
              </div>
            </div>


          </div>
        })}


      </div>
    </>
  )
}

export default App
