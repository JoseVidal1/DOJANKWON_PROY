import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';




// Efecto hacker pro
const HackerTitle = () => {
    const finalText1 = "DOJAN";
    const finalText2 = "KWON";
    const chars = "@#$%^&*";
    const [displayText1, setDisplayText1] = useState("");
    const [displayText2, setDisplayText2] = useState("");
  
    useEffect(() => {
      const runEffect = () => {
        let iteration = 0;
        const maxIterations = 20;
        const length1 = finalText1.length;
        const length2 = finalText2.length;
  
        const interval = setInterval(() => {
          let result1 = "";
          let result2 = "";
  
          for (let i = 0; i < length1; i++) {
            if (i < iteration / 2) {
              result1 += finalText1[i];
            } else {
              result1 += chars[Math.floor(Math.random() * chars.length)];
            }
          }
  
          for (let i = 0; i < length2; i++) {
            if (i < iteration / 2) {
              result2 += finalText2[i];
            } else {
              result2 += chars[Math.floor(Math.random() * chars.length)];
            }
          }
  
          setDisplayText1(result1);
          setDisplayText2(result2);
          iteration++;
  
          if (iteration > maxIterations) {
            clearInterval(interval);
            setDisplayText1(finalText1);
            setDisplayText2(finalText2);
          }
        }, 100);
      };
  
      runEffect();
      const loop = setInterval(runEffect, 3000);
      return () => clearInterval(loop);
    }, []);

  return (
    <motion.h1
      className="text-[#0804fc] text-5xl sm:text-6xl md:text-8xl font-bold mb-8 sm:mb-5 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      <span className="block tracking-[0.10em]">{displayText1}</span>
      <span className="block tracking-[0.20em]">{displayText2}</span>
    </motion.h1>
  );
};

// Componente principallllll
const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (credentials.username === validCredentials.username &&
        credentials.password === validCredentials.password) {
      setIsLoggingIn(true);

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setError('Credenciales incorrectas. Por favor intente nuevamente.');
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-[#171716] flex flex-col items-center justify-center z-50 overflow-hidden"
      animate={isLoggingIn ? { y: '-100vh' } : { y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Logo */}
      <div className="absolute top-4 left-4">
        <img src="" alt="Logo" className="h-12 sm:h-16 w-auto" />
      </div>

      <div className="absolute top-5 left-25 text-[#0804fc] text-sm">
        VERSION 1.0
      </div>


      {/*Form*/}
      <motion.div
        className="w-full max-w-md px-4 sm:px-4.2 mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center">
          {/* Hacker Title */}
          <HackerTitle />

          <motion.p
            className="text-white text-left mb-8 sm:mb-10 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Bienvenido al sistema de gestión Dojankwon, dedicado a la administración
            de exámenes, estudiantes y evaluaciones de taekwondo.
          </motion.p>


          <motion.form
            onSubmit={handleSubmit}
            className="w-full space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="USUARIO"
                className="w-full bg-[#171716] border border-[#0804fc]  text-white p-3 sm:p-4 rounded focus:outline-none focus:ring-2 focus:ring-[#0804fc]"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="CONTRASEÑA"
                className="w-full bg-[#171716] border border-[#0804fc] text-white p-3 sm:p-4 rounded focus:outline-none focus:ring-2 focus:ring-[#0804fc]"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm mt-2">
                {error}
              </div>
            )}

            <motion.button
              type="submit"
              className="w-full bg-[#0804fc] hover:bg-blue-900 text-white font-bold py-3 sm:py-4 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#0804fc] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              INGRESAR
            </motion.button>

            <motion.p
              className="text-gray-400 text-xs sm:text-sm text-left mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Portal de acceso seguro. El acceso a nuestros sistemas está estrictamente controlado.
              Cualquier entrada no autorizada viola nuestras políticas de seguridad.
            </motion.p>
          </motion.form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
