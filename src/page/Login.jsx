import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext"; // Asegúrate de que esta ruta sea correcta
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react";

function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const nav = useNavigate();
  const location = useLocation();
  const autorizacion = useAuth();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "123") {
        autorizacion.login("token");
        alert("Inicio de Sesión Éxitoso.");
        nav(from, { replace: true });
      } else {
        alert("Credenciales Inválidas.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden p-4">
      {/* Morphing Gradients Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-800 via-red-800 to-orange-800 opacity-70 animate-gradient-y"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-green-800 via-teal-800 to-cyan-800 opacity-50 animate-gradient-xy"></div>

        {/* Flotadores orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grain Texturaa */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, }} />

      {/* Login Container */}
      <div className="relative w-full max-w-sm sm:max-w-md">
        <div className="bg-[color:var(--primary-dark-color)]/95 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[color:var(--accent-dark-color)] rounded-2xl mb-6 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[color:var(--text-dark-color)] mb-2"> Bienvenido de vuelta </h1>
            <p className="text-[color:var(--text-dark-color)]/60 text-sm sm:text-base"> Inicia sesión en DOJANKWON </p>
          </div>

          {/* Formulario */}
          <div className="space-y-6">
            {/* Correo */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[color:var(--text-dark-color)]/80 block">Correo electrónico</label>
              <div className="relative group backdrop-blur-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-[#F44E1C]" />
                </div>
                <input type="username" value={username} onChange={(e) => setusername(e.target.value)} onFocus={() => setFocusedField('username')} onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-4 bg-[color:var(--primary-dark-color)]/60 border border-white/[0.08] rounded-2xl text-[color:var(--text-dark-color)] placeholder-[color:var(--text-dark-color)]/40 focus:outline-none focus:border-[color:var(--accent-dark-color)]/60 focus:bg-[color:var(--primary-dark-color)]/80 transition-all duration-300  text-sm"
                  placeholder="username" required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[color:var(--text-dark-color)]/80 block">Contraseña</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-[#F44E1C]" />
                </div>
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-4 bg-[color:var(--primary-dark-color)]/60 border border-white/[0.08] rounded-2xl text-[color:var(--text-dark-color)] placeholder-[color:var(--text-dark-color)]/40 focus:outline-none focus:border-[color:var(--accent-dark-color)]/60 focus:bg-[color:var(--primary-dark-color)]/80 transition-all duration-300 text-sm"
                  placeholder="Tu contraseña"required/>

                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-[color:var(--text-dark-color)]/40 hover:text-[color:var(--text-dark-color)] transition-colors duration-200">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/*{/* Recordarme 
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-[color:var(--primary-dark-color)]/60 text-[color:var(--accent-dark-color)] focus:ring-[color:var(--accent-dark-color)]/20 focus:ring-2" />
                <span className="text-[color:var(--text-dark-color)]/70 group-hover:text-[color:var(--text-dark-color)]/90 transition-colors duration-200">Recordarme</span>
              </label>
              <button className="text-[color:var(--accent-dark-color)] hover:opacity-80 transition-colors duration-200 font-medium">¿Olvidaste tu contraseña?</button>
            </div> */}

            {/* Botón iniciar sesión */}
            <button onClick={handleLogin} disabled={isLoading} 
            className="relative w-full py-4 bg-[color:var(--accent-dark-color)] hover:bg-[color:var(--accent-dark-color)]/90 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative flex items-center justify-center space-x-2">
                
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <>
                    <span>Iniciar sesión</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </span>
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.08]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[color:var(--primary-dark-color)] text-[color:var(--text-dark-color)]/40">DOJANKWON 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Goofy Ahhh animaciones*/}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            transform: translateX(0%) rotate(0deg);
          }
          50% {
            transform: translateX(100%) rotate(180deg);
          }
        }
        
        @keyframes gradient-y {
          0%, 100% {
            transform: translateY(0%) rotate(0deg);
          }
          50% {
            transform: translateY(-100%) rotate(-180deg);
          }
        }
        
        @keyframes gradient-xy {
          0%, 100% {
            transform: translateX(0%) translateY(0%) rotate(0deg);
          }
          25% {
            transform: translateX(100%) translateY(0%) rotate(90deg);
          }
          50% {
            transform: translateX(100%) translateY(-100%) rotate(180deg);
          }
          75% {
            transform: translateX(0%) translateY(-100%) rotate(270deg);
          }
        }
        
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(20px, -20px) scale(1.1) rotate(90deg);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9) rotate(180deg);
          }
          75% {
            transform: translate(-20px, -20px) scale(1.05) rotate(270deg);
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
        
        .animate-gradient-y {
          animation: gradient-y 20s ease infinite;
        }
        
        .animate-gradient-xy {
          animation: gradient-xy 25s ease infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Login;