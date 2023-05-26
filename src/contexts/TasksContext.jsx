import { useState,createContext,useContext } from "react";

const TasksContentx = createContext()

const TasksProvider = ({children})=>{
    const [showFormMessage, setShowFormMessage] = useState(false);
    const [formMessage,setFormMessage] = useState()


    return(
        <TasksContentx.Provider value={{ showFormMessage, setShowFormMessage,formMessage, setFormMessage}}>
            {children}
        </TasksContentx.Provider>
    )
}

const useTasks = ()=> useContext(TasksContentx)

export {TasksProvider,useTasks}