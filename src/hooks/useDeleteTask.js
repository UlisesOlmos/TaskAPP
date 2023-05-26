import { collection, query, where, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useUser } from "../contexts/UserContext";
import { db } from "../firebase-config";
import { useTasks } from "../contexts/TasksContext";

const useDeleteTask = () => {
    const { setFormMessage, setShowFormMessage } = useTasks();
    const { user } = useUser()
    const deleteTask = async (taskID) => {

        try {
            const queryTasks = query(collection(db, 'tasks'), where("taskID", "==", taskID), where("userID", "==", user.uid));
            const snapshot = await getDocs(queryTasks)
            snapshot.forEach((document) => {
                deleteDoc(doc(db, '/tasks', document.id)).then(() => {
                    setFormMessage({type:"success",msg:"Deleted successfully"});
                    setShowFormMessage(true);
                    setTimeout(() => setShowFormMessage(false), 2000);
                })
            })
        }
        catch (err) {
            setFormMessage({type:"failed",msg:"Failed to delete task"});
            setShowFormMessage(true);
            setTimeout(() => setShowFormMessage(false), 2000);
        }
    };


    return { deleteTask }
}

export default useDeleteTask