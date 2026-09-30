export interface LoginFormData {
  email: string;
  password: string;
}

export async function loginUser(data: LoginFormData) {
  const response = await fetch("http://localhost:8080/login/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error en login");
  }

  return response.json(); // aquí recibes el token o datos del usuario
}
