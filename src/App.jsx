import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './Components/sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // Para animaciones suaves

//import Login from './page/Login';
import Login from "./page/Login";
import Home from './page/Home';
import Usuarios from './page/Usuarios';
import Pagos from './page/Pagos';
import Prestamos from './page/Prestamos';
import Examenes from './page/Examenes';
import Estudiantes from './page/Estudiantes';
import ListaPrestamo from './page/ListaPrestamos';
import Invenario from './page/Inventario';
import ProtectedRoute from "./Auth/ProtectedRoute";
import { useAuth } from "./Auth/AuthContext";
import Error404 from "./page/Error";


function App() {
 /* useEffect(() => {
  fetch('http://localhost:5234/api/Pago/generarPagos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error al cargar los datos iniciales:', error);
    });
}, []);*/
useEffect(() => {
  fetch('http://localhost:5234/api/Prestamo/enMora', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error al cargar los datos iniciales:', error);
    });
}, []);
  const { isAuth, loading } = useAuth();
    if (loading) {
    return <div className="text-white p-10">Cargando autenticación...</div>;
  }
  return (
    <BrowserRouter>
      {isAuth ? (
        <div className="flex">
          <Sidebar className="z-50" />
          <main className="relative flex-1 p-6 transition-all duration-300 lg:w-[77%] bg-[#111117] text-white overflow-hidden">
            {/* Líneas decorativas verticales */}
            <div className="hidden lg:block text-[color:var(--secundary-dark-color)] border-x border-x-[color:var(--secundary-dark-color)] bg-[size:8px_8px] bg-fixed bg-[image:repeating-linear-gradient(315deg,var(--secundary-dark-color)_0,var(--secundary-dark-color)_1px,transparent_0,transparent_50%)] absolute inset-y-0 left-10 w-4 z-0" />
            <div className="hidden lg:block text-[color:var(--secundary-dark-color)] border-x border-x-[color:var(--secundary-dark-color)] bg-[size:8px_8px] bg-fixed bg-[image:repeating-linear-gradient(315deg,var(--secundary-dark-color)_0,var(--secundary-dark-color)_1px,transparent_0,transparent_50%)] absolute inset-y-0 right-10 w-4 z-0" />
            
            {/* Contenido centrado entre las líneas */}
            <div className="relative z-30 px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
                <Route path="/pagos" element={<ProtectedRoute><Pagos /></ProtectedRoute>} />
                <Route path="/prestamos" element={<ProtectedRoute><Prestamos /></ProtectedRoute>} />
                <Route path="/inventario" element={<ProtectedRoute><Invenario /></ProtectedRoute>} />
                <Route path="/listaprestamo" element={<ProtectedRoute><ListaPrestamo /></ProtectedRoute>} />
                <Route path="/examenes" element={<ProtectedRoute><Examenes /></ProtectedRoute>} />
                <Route path="/estudiantes" element={<ProtectedRoute><Estudiantes /></ProtectedRoute>} />
                <Route path="*" element={<Error404 />} />
              </Routes>
            </div>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
export default App;