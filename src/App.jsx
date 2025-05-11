import { useState } from 'react'
import './App.css'
import Sidebar from './Components/sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // Para animaciones suaves

//import Login from './page/Login';
import Home from './page/Home';
import Usuarios from './page/Usuarios';
import Reportes from './page/Reportes';
import Productos from './page/Productos';
import Examenes from './page/Examenes';
import Estudiantes from './page/Estudiantes';


function App() {
  return (
    <BrowserRouter>
    <div className="flex">
      <Sidebar />
      <main className='flex-1 p-6 transition-all duration-300 lg:w-[77%]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/examenes" element={<Examenes />} />
          <Route path="/Estudiantes" element={<Estudiantes />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
  );
}
export default App;