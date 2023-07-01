import { useState, useEffect } from "react";
import { useGetTasksQuery } from "../../store";

function TaskBoard () {
    const [tasks, setTasks] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    const {data, isLoading, err} = useGetTasksQuery();
    
    if(err) setErrMsg(err);
    // useEffect(() => {
    //     setTasks(queryTasks);
    //     console.log(tasks);
    // });

    return (
        <div>
            {isLoading ? (<div>Loading...</div>) : (
                <ul>
                    {console.log(data)}
                    {data?.map((task, index) => (
                <div key={task.id}>{index} - {task.taskName}</div>
            ))}
                </ul>
            )}
        </div>
    );
}

export default TaskBoard;