import axios from "axios";


interface User {
  id: number;
}

interface TaskParams {
  name: string;
  status: string;
  user: User;
}



const api = axios.create({
  baseURL: "http://localhost:8080/task",
});




export const createTask = (taskParams: TaskParams) => {
    const {name, status, user} = taskParams;

  return api.post("/create", { name, status, user }, { withCredentials: true });
};
