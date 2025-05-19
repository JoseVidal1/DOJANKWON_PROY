import { useState } from 'react'
import './App.css'
import Sidebar from './Components/sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // Para animaciones suaves

//import Login from './page/Login';
import Home from './page/Home';
import Usuarios from './page/Usuarios';
import Reportes from './page/Reportes';
import Prestamos from './page/Prestamos';
import Examenes from './page/Examenes';
import Estudiantes from './page/Estudiantes';
import HistorialPrestamo from './page/HistorialPrestamo';
import Devoluciones from './page/Devoluciones';


function App() {
  return (
    <BrowserRouter>
    <div className="flex">
      <Sidebar className="z-50"/>
      <main className="relative flex-1 p-6 transition-all duration-300 lg:w-[77%] bg-[#111117] text-white overflow-hidden">
        
        {/* Lineas decorativas verticales */}
        <div className="hidden lg:block text-[color:var(--secundary-dark-color)] border-x border-x-[color:var(--secundary-dark-color)] bg-[size:8px_8px] bg-fixed bg-[image:repeating-linear-gradient(315deg,var(--secundary-dark-color)_0,var(--secundary-dark-color)_1px,transparent_0,transparent_50%)] absolute inset-y-0 left-10 w-4 z-0" />
        <div className="hidden lg:block text-[color:var(--secundary-dark-color)] border-x border-x-[color:var(--secundary-dark-color)] bg-[size:8px_8px] bg-fixed bg-[image:repeating-linear-gradient(315deg,var(--secundary-dark-color)_0,var(--secundary-dark-color)_1px,transparent_0,transparent_50%)] absolute inset-y-0 right-10 w-4 z-0" />
        
        {/* Contenido centrado entre las lineas verticales */}
        <div className="relative z-30 px-6 lg:px-8">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/reportes" element={<Reportes />} />
      <Route path="/prestamos" element={<Prestamos />} />
      <Route path="/historialPrestamo" element={<HistorialPrestamo />} />
      <Route path="/devoluciones" element={<Devoluciones />} />
      <Route path="/examenes" element={<Examenes />} />
      <Route path="/estudiantes" element={<Estudiantes />} />
    </Routes>
  </div>
</main>
    </div>
  </BrowserRouter>
  );
}
export default App;