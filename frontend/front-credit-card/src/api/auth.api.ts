import type { LoginRequest, LoginResponse } from "../interfaces/authInterface";
import { API_URL } from "./config";



export async function login(request: LoginRequest):Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Error al iniciar sesión");
  }

  return response.json();
}