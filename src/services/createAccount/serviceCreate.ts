import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/users",
});

export const createUser = (
  email: string,
  password: string,
  username: string,
  roles: string[]
) => {
  return api.post("/create", { email, password, username, roles });
};
