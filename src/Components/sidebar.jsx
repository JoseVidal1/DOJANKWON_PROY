import React, { useState, useEffect, createContext } from 'react';
import { Link } from 'react-router-dom';
import imagen from '../assets/react.svg';


import HomeIcon from '../assets/icons/HomeIcon.jsx';
import UserIcon from '../assets/icons/UserIcon.jsx';
import ReportIcon from '../assets/icons/ReportIcon.jsx';
import ProductIcon from '../assets/icons/ProductIcon.jsx';
import ExamIcon from '../assets/icons/ExamIcon.jsx';
import StudentsIcon from '../assets/icons/StudentsIcon.jsx';


import Opcion from './Opcion.jsx';
import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react';


export const SidebarContext = createContext();

const Sidebar = () => {

  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(true);

  {/* Media query para detectar si es celular*/}
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)'); // lg breakpoint
    const handleChange = () => setIsMobile(mediaQuery.matches);
    handleChange(); // set inicial
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
    {isMobile && expanded && (
      <div className="fixed inset-0 backdrop-blur-md z-40" />
      )}
      {/* Sidebar */}
      <aside className={`${isMobile && expanded ? 'fixed z-50 inset-y-0 left-0' : 'sticky'} top-0 h-[100dvh] min-h-screen transition-all duration-300${expanded ? "w-64" : "w-16"}`}>
        <nav className="h-full flex flex-col border-0 shadow-xl" style={{ backgroundColor: "var(--secundary-dark-color)" }}>
          <div className={`p-4 pb-2 flex items-center transition-all duration-300 ${expanded ? "justify-between" : "justify-center"}`}>
            <img src={imagen} alt="Logo" className={`transition-all ${expanded ? "w-10" : "w-0"}`} />
            {expanded && (
             <div className="flex flex-col text-center ml-2">
               <h1 className="text-xl font-bold" style={{ color: "var(--text-dark-color)" }}>Alvaro Vidal M.</h1>
               <h2 className="text-sm font-josefin" style={{ color: "var(--accent-dark-color)" }}>Administrador</h2>
               </div>
            )}
            <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg" style={{ backgroundColor: "var(--terceary-dark-color)" }}>
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>
          
          <SidebarContext.Provider value={{expanded}}>
            {/*Opciones*/}
            <ul className="flex-1 px-3 pt-10 space-y-5">
              <Opcion icon={<HomeIcon className="w-5 h-5 " />} title="Inicio" to="/" />
              <Opcion icon={<UserIcon className="w-5 h-5"/>} title="Usuarios" to="/usuarios" />
              <Opcion icon={<ReportIcon className="w-5 h-5"/>} title="Reportes" to="/reportes" />
              <Opcion icon={<ProductIcon className="w-5 h-5"/>} title="Productos" to="/productos" />
              <Opcion icon={<ExamIcon className="w-5 h-5"/>} title="Examenes" to="/examenes" />
              <Opcion icon={<StudentsIcon className="w-5 h-5"/>} title="Estudiantes" to="/Estudiantes" />
            </ul>
          </SidebarContext.Provider>

    <div className={`border-t flex items-center p-3 transition-all duration-300 ${expanded ? "gap-3" : "justify-center"}`} style={{ borderTopColor: "var(--primary-dark-color)" }}>
      <img src={imagen} alt="Logo" className="w-10 h-10 rounded-md" />
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? "w-52 ml-3" : "w-0"}`}>
        <div className="flex items-center justify-between leading-4">
          <div>
            <h4 className="font-semibold" style={{ color: "var(--text-dark-color)" }}>Alvaro Vidal Martinez</h4>
            <span className="text-xs" style={{ color: "var(--accent-dark-color)" }}>AvidalMartinez@gmail.com</span>
          </div>
          <MoreVertical size={20} className="ml-2 shrink-0" style={{ color: "var(--accent-dark-color)" }} />
        </div>
      </div>
    </div>
  </nav>
  </aside>
  </>
  );
};

export default Sidebar;