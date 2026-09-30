import { useState } from "react";
import { loginUser } from "../../services/loginServices/serviceAxios.ts";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store.ts";
import { login, logout } from "../../session/sessionStore.ts";
import { start, end } from "../../user/userStore.ts";


interface SessionStore {
  bearer: string;
  active: boolean;
  roles: string[];
}


interface UserStore {
  email: string;
  id: number;
  tasks: [];
  username: string;
}


interface LoginFormData {
  email: string;
  password: string;
  userName: string;
}


const initialLogin: LoginFormData = {
  email: "",
  password: "",
  userName: "",
}


function Login() {

    const [formData, setFormData] = useState<LoginFormData>(initialLogin);

    const [error, setError] = useState("");
    const [apiFail, setapiFail] = useState("");


    const navigate = useNavigate();

      const dispatch = useDispatch<AppDispatch>();


   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };




   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

     if (!formData.email || !formData.password || !formData.userName) {
       setError("Todos los campos son obligatorios");
       return;
     }

     try {
       const res = await loginUser(
         formData.email,
         formData.password,
         formData.userName,
       );



       const sessionStore:SessionStore  =  {
            bearer:"",
            active: true,
            roles: res.data.user.roles
        }


        const userStore: UserStore = {
          email: res.data.user.email,
          id: res.data.user.id,
          tasks: res.data.user.tasks,
          username: res.data.user.username,
        }



      setFormData(initialLogin); 
      dispatch(login(sessionStore));
      dispatch(start(userStore));

      const currentsRoles = res.data.user.roles;


      if (currentsRoles.includes("ADMIN"))
        navigate(`/admin`);
      else  navigate(`/tasks/${res.data.user.id}`);


     } catch (err: any) {
        if (err.response) {
          console.log("Error en login:", err.response.data);

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
        <h2>Logueate o saca los tokens, bato loco</h2>
      </section>

      <section>
        <form onSubmit={handleSubmit}>
          <h3>Iniciar sesión</h3>
          <div>
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
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
}

export default Login;