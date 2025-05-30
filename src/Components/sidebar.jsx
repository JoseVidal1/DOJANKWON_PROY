import React, { useState, useEffect, createContext, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import imagen from '../assets/UserPrin.svg';

import HomeIcon from '../assets/icons/HomeIcon.jsx';
import UserIcon from '../assets/icons/UserIcon.jsx';
import ReportIcon from '../assets/icons/ReportIcon.jsx';
import ProductIcon from '../assets/icons/ProductIcon.jsx';
import ExamIcon from '../assets/icons/ExamIcon.jsx';
import StudentsIcon from '../assets/icons/StudentsIcon.jsx';
import PrestamoIcon from '../assets/icons/PrestamoIcon.jsx';

import Opcion from './Opcion.jsx';
import { ChevronFirst, Settings, ChevronLast, ChevronDown, MoreVertical, Power } from 'lucide-react';
import { useAuth } from "../Auth/AuthContext.jsx";

export const SidebarContext = createContext();

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const menuRef = useRef(null);

  const base = "relative flex items-center py-2 px-3 my-1 font-medium rounded-full cursor-pointer transition-colors group";
  const active = "bg-[var(--sidebar-dark-hover)] text-[#e8d8c9]";
  const inactive = "bg-[var(--primary-dark-color-transparent)] text-[#e8d8c9] hover:bg-[var(--sidebar-dark-hover)] hover:text-[#e8d8c9]";

  const { logout } = useAuth();       
const navigate = useNavigate();  

const handleLogout = () => {
  logout();    
  navigate("/login", { replace: true }); 
};

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const handleChange = () => setIsMobile(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {isMobile && expanded && (
        <div className="fixed inset-0 backdrop-blur-md z-40" />
      )}

      <aside className={`${isMobile && expanded ? 'fixed z-50 inset-y-0 left-0' : 'sticky'} top-0 h-[100dvh] min-h-screen transition-all duration-300${expanded ? "w-64" : "w-16"}`}>
        <nav className="h-full flex flex-col border-0 shadow-xl" style={{ backgroundColor: "var(--secundary-dark-color)" }}>
          <div className={`p-4 pb-2 flex items-center transition-all duration-300 ${expanded ? "justify-between" : "justify-center"}`}>
            <img src={imagen} alt="Logo" className={`transition-all ${expanded ? "w-10" : "w-0"}`} />
            {expanded && (
              <div className="flex flex-col text-center ml-2">
                <h1 className="text-xl font-bold" style={{ color: "var(--text-dark-color)" }}>DOJANKWON</h1>
                <h2 className="text-sm font-josefin" style={{ color: "var(--accent-dark-color)" }}>Administrador</h2>
              </div>
            )}
            <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg" style={{ backgroundColor: "var(--terceary-dark-color)" }}>
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3 pt-11">
              <Opcion icon={<HomeIcon className="w-5 h-5 " />} title="Inicio" to="/" />
              <Opcion icon={<UserIcon className="w-5 h-5" />} title="Usuarios" to="/usuarios" />
              <Opcion icon={<ReportIcon className="w-5 h-5" />} title="Pagos" to="/pagos" />
              <li>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                    <Opcion icon={<ProductIcon className="w-5 h-5" />} title="Préstamos" to="/prestamos" />
                    {expanded && (
                      <ChevronDown className={`transition-transform duration-300 mr-4 ${showDropdown ? "rotate-180" : "rotate-0"}`} style={{ color: "var(--accent-dark-color)" }} />)}
                  </div>

                  {showDropdown && expanded && (
                    <ul className="ml-12 mt-1 space-y-1 text-sm">
                      <li>
                        <NavLink to="/listaprestamo" className="block hover:underline text-[#e8d8c9] transition-colors">Lista Prestamo</NavLink>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
              <Opcion icon={<PrestamoIcon className="w-5 h-5"/>} title="Inventario" to="/inventario" />
              <Opcion icon={<ExamIcon className="w-5 h-5" />} title="Examenes" to="/examenes" />
              <Opcion icon={<StudentsIcon className="w-5 h-5" />} title="Estudiantes" to="/Estudiantes" />
            </ul>

            <div ref={menuRef} className={`${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} transition-all duration-200 origin-bottom-right`}>  
              <div className="flex flex-col text-center ml-2">
                <button className={`${base} ${isActive ? active : inactive}`} onClick={handleLogout}>
                  <span className={`transition-all ${expanded ? "mr-3" : "mx-auto"}`}>
                    <Power size={20} />
                  </span>
                  <span className={`transition-all overflow-hidden ${expanded ? "w-52 ml-3" : "w-0 ml-0"}`}>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </SidebarContext.Provider>

          <div className={`border-t flex items-center p-3 transition-all duration-300 ${expanded ? "gap-3" : "justify-center"}`} style={{ borderTopColor: "var(--primary-dark-color)" }}>
            <img src={imagen} alt="Logo" className="w-10 h-10 rounded-md" />
            <div className={`overflow-hidden transition-all duration-300 ${expanded ? "w-52 ml-3" : "w-0"}`}>
              <div className="flex items-center justify-between leading-4">
                <div>
                  <h4 className="font-semibold" style={{ color: "#e8d8c9" }}>Alvaro Vidal Martinez</h4>
                  <span className="text-xs" style={{ color: "var(--accent-dark-color)" }}>AvidalMartinez@gmail.com</span>
                </div>
                 <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isMenuOpen} className="focus:outline-none">
                  <MoreVertical size={20} className="ml-2 shrink-0 text-accent-dark hover:text-accent transition-colors duration-200" style={{ color: "var(--accent-dark-color)" }}/>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
