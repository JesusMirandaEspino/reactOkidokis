import { useState } from "react";
import { createUser } from "../../services/createAccount/serviceCreate.ts";
import { useNavigate } from "react-router-dom";


interface AccountFormData {
  email: string;
  password: string;
  username: string;
  roles: string[]
}


const initialFormData: AccountFormData = {
  email: "",
  password: "",
  username: "",
  roles: ["USER", "ADMIN"],
};




function CreateAccount() {

    const [formData, setFormData] = useState<AccountFormData>(initialFormData);

    const [error, setError] = useState("");
    const [apiFail, setapiFail] = useState("");

    const navigate = useNavigate();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();


     if (!formData.email || !formData.password || !formData.username) {
       setError("Todos los campos son obligatorios");
       return;
     }

     try {
       const res = await createUser(
         formData.email,
         formData.password,
         formData.username,
         formData.roles,
       );
       console.log("Creacion de cuenta exitosa:", res.data);

       //navegar al login
       setFormData(initialFormData);
       navigate("/login");


     } catch (err: any) {
       if (err.response) {
         console.log("Error en login:", err.response.data);

         if (err.response.data.message) setapiFail(err.response.data.message);


       } else {
         console.error("Error inesperado:", err);
       }
     }

     console.log("Datos enviados:", formData);
   };





  return (
    <>
      <section>
            <h2>Crear Una Cuenta</h2>
            <h3>
            Espero que sepas lo que haces, tu di si a todo, al cabo todos tienen
            tu info
            </h3>
      </section>

      <section>
        <form onSubmit={handleSubmit}>
          <h3>Regalar mis datos</h3>
          <div>
            <label htmlFor="username">User Name:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
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

export default CreateAccount;
