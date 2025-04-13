import { useState } from 'react'
import './App.css'
import Sidebar from './Components/sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // Para animaciones suaves

import Login from './page/Login';
import Home from './page/Home';
import Usuarios from './page/Usuarios';
import Reportes from './page/Reportes';
import Productos from './page/Productos';
import Examenes from './page/Examenes';

function App() {
  return (
    <BrowserRouter>
    <Login />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-60 lg:w-[77%]">
          <AnimatePresence mode="wait">
            <Routes>
               <Route path="/" element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } />
              <Route path="/usuarios" element={
                <PageTransition>
                  <Usuarios />
                </PageTransition>
              } />
              <Route path="/reportes" element={
                <PageTransition>
                  <Reportes />
                </PageTransition>
              } />
              <Route path="/productos" element={
                <PageTransition>
                  <Productos />
                </PageTransition>
              } />
              <Route path="/examenes" element={
                <PageTransition>
                  <Examenes />
                </PageTransition>
              } />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </BrowserRouter>
    
  );
}

// Componente para manejar la transición entre páginas
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default App;