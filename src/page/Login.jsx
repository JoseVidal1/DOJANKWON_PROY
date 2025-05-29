import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import taekwondo from "../assets/images/HomeBackg/taekwondo.jpg";

import "../App.css";

function Login() {
  const [email, setEmail] = useState("mail@gmail.com");
  const [password, setPassword] = useState("123456");
  const nav = useNavigate();
  const autorizacion = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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
    <div className="relative w-full min-h-screen bg-[#111117] flex items-center justify-center overflow-hidden font-josefin text-white">
      {/* Fondo con imagen de taekwondo y efecto de movimiento */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${taekwondo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            animation: "panImage 30s linear infinite alternate",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111117]" />
      </div>

      {/* Efecto grain para textura */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />

      {/* Contenedor principal */}
      <div className="z-10 w-full max-w-md px-8 py-10 mx-4 bg-[color:var(--secundary-dark-color)] rounded-lg border-2 border-[color:var(--accent-dark-color)] shadow-xl backdrop-blur-sm bg-opacity-80">
        {/* Encabezado con estilos consistentes */}
        <div className="flex items-center justify-center mb-6">
          <hr className="flex-1 border-t border-[color:var(--accent-dark-color)]" />
          <div className="px-4">
            <h1
              className="text-3xl font-bold text-center"
              style={{ color: "var(--accent-dark-color)" }}
            >
              BIENVENIDO
            </h1>
            <p className="text-sm text-center mt-1 font-josefin">Dojankwon</p>
          </div>
          <hr className="flex-1 border-t border-[color:var(--accent-dark-color)]" />
        </div>

        {/* Formulario */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium mb-2">Usuario</label>
            <input
              id="email"
              required
              type="text"
              className="w-full px-4 py-3 rounded-md bg-[color:var(--background-dark-color)] border-2 border-[color:var(--accent-dark-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-dark-color)] transition duration-200 font-josefin"
              placeholder="Nombre de usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-md bg-[color:var(--background-dark-color)] border-2 border-[color:var(--accent-dark-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-dark-color)] transition duration-200 font-josefin"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[color:var(--accent-dark-color)] hover:bg-[color:var(--accent-light-color)] text-white rounded-md transition duration-200 font-semibold transform hover:scale-[1.02] active:scale-95"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="flex items-center justify-center mt-8">
          <hr className="flex-1 border-t border-[color:var(--accent-dark-color)]" />
        </div>
      </div>
    </div>
  );
}

export default Login;
