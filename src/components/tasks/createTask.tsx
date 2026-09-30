import { useState } from "react";
import { createTask } from "../../services/tasksServices/taskServices.ts";

interface TaskForm {
  name: string;
  status: string;
}


interface User{
    id: number;
}

interface TaskParams {
    name: string;
    status: string;
    user: User;
}



const initTaskForm: TaskForm = {
    name: "",
    status: "",
}

const CreateTask: React.FC<TaskProps> = ({idUser}) => {

    const [formData, setFormData] = useState<TaskForm>(initTaskForm);
    const [error, setError] = useState("");
    const [apiFail, setapiFail] = useState("");



   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };




const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

     if (!formData.name || !formData.status) {
       setError("Todos los campos son obligatorios");
       return;
     }

     try {

        const userParams: User = {
            id: idUser
        }


        const taskParams:TaskParams = {
            name: formData.name,
            status: formData.status,
            user: userParams
        }


        console.log(taskParams);

        const res = await createTask(taskParams);

        console.log(res)
        



     } catch (err: any) {
        if (err.response) {
          console.log("Error en login:", err.response);

          if (err.response.data.message) 
            setapiFail(err.response.data.message);

        } else {
          console.error("Error inesperado:", err);
        }
     }

     console.log("Datos enviados:", formData);
   };




  return (
    <>
      <section>
        <h2>Agregar Task</h2>
      </section>

      <section>
            <form onSubmit={handleSubmit}>
            <h3>Task</h3>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="status">Status</label>
                <input
                type="status"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {apiFail && <p style={{ color: "red" }}>{apiFail}</p>}

            <button type="submit">Entrar</button>
            </form>
      </section>
    </>
  );
};

export default CreateTask;
