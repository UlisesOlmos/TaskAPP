import { collection, onSnapshot, query ,where} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { useUser } from "../contexts/UserContext";

const useGetTasks = () => {
    const [tasks, setTasks] = useState([]);
    const {user} = useUser()
    const [taskID,setTaskID] = useState(0)

    const getTasks = () => {

        const queryTasks = query(collection(db,'tasks'),where("userID","==",user.uid));

        return onSnapshot(queryTasks, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data() }))
            if(data.length > 0) setTaskID(data.sort((a,b)=> b.taskID - a.taskID)[0].taskID )
            setTasks(data)
        });
    }

    useEffect(() => {
        getTasks()
    },[])


    return {tasks,taskID} 
}



export default useGetTasks