import { collection, query, where, doc, getDocs, updateDoc } from "firebase/firestore";
import { useUser } from "../contexts/UserContext";
import { db } from "../firebase-config";
import { useState } from "react";
import { useTasks } from "../contexts/TasksContext";

const useUpdateTask = () => {

    const { setShowFormMessage, setFormMessage } = useTasks();

    const { user } = useUser()
    const [title, setTitle] = useState('')
    const [descrip, setDescrip] = useState('')
    const [date, setDate] = useState('')
    const [priority, setPriority] = useState('')


    const updateTask = async (taskID) => {

        try {
            const queryTasks = query(collection(db, 'tasks'), where("taskID", "==", taskID), where("userID", "==", user.uid));
            const snapshot = await getDocs(queryTasks)
            snapshot.forEach((document) => {
                const docRef = doc(db, '/tasks', document.id)
                const updatedData = {}

                if (title !== "") updatedData.title = title;
                if (descrip !== "") updatedData.descrip = descrip;
                if (date !== "") updatedData.date = date;
                if (priority !== "") updatedData.priority = priority;

                updateDoc(docRef, updatedData).then(() => {
                    setFormMessage({type:"success",msg:"Updated successfully"});
                    setShowFormMessage(true);
                    setTimeout(() => setShowFormMessage(false), 2000);
                })
            })
        }
        catch (err) {
            setFormMessage({type:"failed",msg:"Failed to update task"});
            setShowFormMessage(true);
            setTimeout(() => setShowFormMessage(false), 2000);
        }
    };


    return { updateTask, setTitle, setDescrip, setDate, setPriority }
}

export default useUpdateTask