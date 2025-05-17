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
      <div className="relative w-full h-screen bg-[#111117] flex items-center justify-center overflow-hidden text-[#e8d8c9]">
        {/* Fondo con gradiente circular */}
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-[#4b607f] via-[#111117] to-[#4b607f] rounded-full filter blur-3xl opacity-30 animate-pulse-slow" />

        {/* Textura "grainy" opcional */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] z-0" />

        {/* Formulario de login */}
        <div className="z-10 w-full max-w-md px-10 py-12 bg-[#111117]/80 rounded-2xl shadow-2xl backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-center mb-2">DOJANKWON</h1>
          <p className="text-sm text-center mb-8">
            The art of digital illusion.
          </p>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium mb-1">Usuario</label>
              <input
                id="email"
                required
                type="text"
                className="w-full px-4 py-2 rounded-md bg-[#1a1a22] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#F44E1C] transition duration-200"
                placeholder="Nombre de usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-2 rounded-md bg-[#1a1a22] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#F44E1C] transition duration-200"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#4b607f] hover:bg-[#3a4a65] text-white rounded-md transition duration-200"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
