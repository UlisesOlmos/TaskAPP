import { addDoc, collection } from "firebase/firestore";
import { useUser } from "../contexts/UserContext";
import { db } from "../firebase-config";
import { useState } from "react";
import useGetTasks from "./useGetTasks";
import { useTasks } from "../contexts/TasksContext";


const useAddTask = () => {

    const { setShowFormMessage, setFormMessage } = useTasks();

    const { user } = useUser()
    const { taskID } = useGetTasks()
    const [title, setTitle] = useState()
    const [descrip, setDescrip] = useState()
    const [date, setDate] = useState()
    const [priority, setPriority] = useState("High")

    const saveTask = async () => {
        try {
            await addDoc(collection(db, "/tasks"), {
                userID: user.uid,
                taskID: taskID + 1,
                title: title,
                descrip: descrip,
                date: date,
                priority: priority
            }).then(() => {
                setFormMessage({type:"success",msg:"Added successfully"});
                setShowFormMessage(true);
                setTimeout(() => setShowFormMessage(false), 2000);
            })
        }
        catch (error) {
            setFormMessage({type:"failed",msg:"Failed to add task"});
            setShowFormMessage(true);
            setTimeout(() => setShowFormMessage(false), 2000);
        }
    }

    return { saveTask, setTitle, setDescrip, setPriority, setDate }
}

export default useAddTask