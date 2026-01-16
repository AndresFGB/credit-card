import { useState } from "react";
import type { LoginRequest } from "../interfaces/authInterface";
import { login } from "../api/auth.api";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function validateForm(username: string, password: string): boolean {
    return (
      username.trim().length >= 3 &&
      /^[a-zA-Z]+$/.test(username) &&
      password.trim().length > 0
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isValid = validateForm(username, password);

    if (!isValid) {
      setError(
        "Usuario inválido. Debe tener al menos 3 letras y solo contener letras."
      );
      return;
    }

    setError("");
    const payload: LoginRequest = {
      username,
      password,
    };
    console.log(payload);
    try {
      const response = await login(payload);
      console.log("response", response);
      authService.login(response);
      navigate("/dashboard");
    } catch (error) {
      setError("No se pudo iniciar sesión");
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex w-[720px] max-w-full">
        <div className="hidden md:flex w-1/2 bg-red-600 items-center justify-center">
          <img src="./assets/login.png" alt="Login" className="w-48" />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2 ">
            Bienvenido
          </h2>

          <p className="text-slate-500 mb-6">
            Ingresa tus credenciales para continuar
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Usuario
              </label>
              <input
                type="text"
                placeholder="nombre"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="*******"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
