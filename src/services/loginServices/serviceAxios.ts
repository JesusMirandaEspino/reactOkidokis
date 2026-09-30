import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/login"
});

export const loginUser = (email: string, password: string, userName: string) => {
  return api.post("/login", { email, password, userName }, { withCredentials: true });
};
