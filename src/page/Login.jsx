import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const autorizacion = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //Lógica para iniciar sesión
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "mail@gmail.com" && password === "123456") {
      autorizacion.login("token");
      alert("Inicio de Sesión Éxitoso.");
      nav(from, { replace: true });
    } else {
      alert("Credenciales Inválidas.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Login</h1>
          </div>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
