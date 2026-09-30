import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TaskDetails from "./taskDetail.tsx";
import CreateTask from "./createTask.tsx";

interface Task {
  id: number;
  name: string;
  status: string;
}


interface ListTask{
    taks: Task[];
}

interface RootState {
  session: {
    bearer: string;
    active: boolean;
    roles: string[];
  };
  user: {
    email: string;
    id: number;
    username: string;
    tasks: ListTask;
  };
}


function Task(){

    const [listOfTask, setListOfTask] = useState<ListTask>([]);
    const [openAdd, setOpenAdd] = useState(false)



    const { id } = useParams<{ id: string }>();
    const { email, username, tasks } = useSelector( (state: RootState) => state.user);

    useEffect(() => {
            setListOfTask(tasks);
      }, []);


      const handleClick = () => {
        setOpenAdd(true)
      };


    return (
      <>
        <h2>Lista de Task Usuario</h2>
        <ul>
          {listOfTask.map((task) => (
            <li key={task.id}>
              <TaskDetails name={task.name} status={task.status}></TaskDetails>
            </li>
          ))}
        </ul>
        <button onClick={handleClick}>Add Task</button>

        {openAdd && <CreateTask idUser={id}> </CreateTask>}
      </>
    );
}


export default Task;