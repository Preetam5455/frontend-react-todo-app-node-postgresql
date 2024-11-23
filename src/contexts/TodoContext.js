import {createContext,useContext} from "react";

export const TodoContext = createContext({
    todos:[{
        id:1,
        todo:"do some coding",
        complete:false
    }],

    addtodo: (todo)=>{},
    deleteTodo:(id)=>{},
    updateTodo:(id,todo)=>{},
    toggleComplete:(id)=>{}
});

export const TodoContextProvider = TodoContext.Provider

export const useTodo = () =>{
    return useContext(TodoContext);
}
