import React, { useEffect, useState } from "react";
import {TodoContextProvider} from "./contexts/TodoContext";
import TodoForm from "./components/todoForm";
import TodoItem from "./components/todoItemsList";

function App() {
  const [todos,setTodos] = useState([]);

  const addtodo = ((todo)=>{
    setTodos((prev)=> {return [{id:Date.now(),...todo},...prev]})
  })

 const deleteTodo = ((id)=>{
    setTodos((prev) => prev.filter((todo)=> todo.id !== id ));
  })
  const updateTodo = ((id,todo)=>{
    setTodos((prevtodos)=>prevtodos.map((prevtodo)=> (prevtodo.id === id ? todo:prevtodo)))
  })
  const toggleComplete = ((id)=>
  setTodos((prevtodos)=>prevtodos.map((prevtodo)=> prevtodo.id === id ? {...prevtodo,complete:!prevtodo.complete} :prevtodo))
  )

  useEffect(()=>{
    const todos  =  JSON.parse(localStorage.getItem("todos"));
    if(todos && todos.length > 0) return;
    setTodos(todos)
  },[]);

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  return (
    <TodoContextProvider value={{todos,addtodo,deleteTodo,updateTodo,toggleComplete}}>
    <div className="bg-[#000000] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
          {/* Todo form goes here */}
          <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {/*Loop and Add TodoItem here */}
          {todos.map((todo)=>(
            <div key={todo.id} className='w-full'>
            <TodoItem todo={todo}/>
            </div>
          ))}
        </div>
        <footer>Database is not connected. App is live with the basic Desigen
        new version is WIP 
        <p><a className="git-link"target="_blank" href="https://github.com/Preetam5455/React-todo-app-node-postgresql"> You can view the source code.</a>
        </p></footer>
      </div>
    </div>
    </TodoContextProvider>
  );
}

export default App;
