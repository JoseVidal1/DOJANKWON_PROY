import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import imagen from '../assets/react.svg';
import home from '../assets/icons/home-icon.svg';
import user_icon from '../assets/icons/user-icon.svg';
import reports_icon from '../assets/icons/reports-icon.svg';
import product_icon from '../assets/icons/product-icon.svg';
import examen_icon from '../assets/icons/examen-icon.svg';
import Estudiantes_icon from '../assets/icons/Estudiantes-icon.svg';
import Opcion from './Opcion.jsx';

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsMobile(!isMobile);
  };

  const MobileIcon = ({ icon, to, alt }) => (
    <Link to={to} className="block w-full">
      <div className="flex justify-center py-3 cursor-pointer hover:bg-gray-800 rounded-md">
        <img src={icon} alt={alt} className="w-6 h-6" />
      </div>
    </Link>
  );

  return (
    <>
      <aside className={`flex flex-col justify-between min-h-screen h-full bg-[#171716] border-r border-gray-800 text-gray-300 fixed inset-y-0 left-0 transition-all duration-300 ease-in-out ${isMobile ? 'w-14' : 'w-64'}`}>
        <div>
          <div className="p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <img src={imagen} alt="Profile" className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} rounded-full ${isMobile ? 'mx-auto' : 'mr-3'}`} />
              {!isMobile && (
                <div className="flex flex-col">
                  <div className="text-white-400 font-medium hover:text-blue-300 cursor-pointer transition-colors">Alvaro V.</div>
                  <div className="text-sm text-gray-400">Administrator</div>
                </div>
              )}
            </div>
            <button
              onClick={toggleSidebar}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <nav className={`${isMobile ? 'px-1' : 'px-2'} space-y-1`}>
            {!isMobile ? (
              <>
                <Opcion icon={home} title="Inicio" to="/" />
                <Opcion icon={user_icon} title="Usuarios" to="/usuarios" />
                <Opcion icon={reports_icon} title="Reportes" to="/reportes" />
                <Opcion icon={product_icon} title="Productos" to="/productos" />
                <Opcion icon={examen_icon} title="Examenes" to="/examenes" />
                <Opcion icon={Estudiantes_icon} title="Estudiantes" to="/Estudiantes" />
              </>
            ) : (
              <>
                <MobileIcon icon={home} to="/" alt="Inicio" />
                <MobileIcon icon={user_icon} to="/usuarios" alt="Usuarios" />
                <MobileIcon icon={reports_icon} to="/reportes" alt="Reportes" />
                <MobileIcon icon={product_icon} to="/productos" alt="Productos" />
                <MobileIcon icon={examen_icon} to="/examenes" alt="Examenes" />
                <MobileIcon icon={Estudiantes_icon} to="/Estudiantes" alt="Estudiantes" />
              </>
            )}
          </nav>
          <div className={`mt-6 ${isMobile ? 'px-1' : 'px-4'}`}>
            {!isMobile && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">OTRAS CONFIG</h3>
            )}
            <button className={`flex items-center ${isMobile ? 'justify-center w-full' : 'space-x-2 px-2'} py-2 rounded-md transition-colors duration-200 hover:bg-transparent group`}>
              <svg className="w-5 h-5 text-gray-300 group-hover:text-red-500 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg">
                <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
              </svg>
              {!isMobile && (
                <span className="group-hover:text-red-500 hover:cursor-pointer transition-colors duration-200">Cerrar Sesión</span>
              )}
            </button>
          </div>
        </div>
        <div className={`${isMobile ? 'p-2' : 'p-4'} space-y-2`}>
          {!isMobile ? (
            <div className="bg-[#171716] shadow-sm bg-opacity-30 p-3 rounded text-sm">
              <div className="text-gray-300">{new Date().toDateString()}</div>
              <div className="text-gray-500">Cesar, Colombia</div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="text-gray-500 text-xs">
                {new Date().getDate()}/{new Date().getMonth() + 1}
              </div>
            </div>
          )}
        </div>
      </aside>
      <main className={`transition-all duration-300 ${isMobile ? 'ml-14' : 'ml-64'}`}></main>
    </>
  );
};

export default Sidebar;
