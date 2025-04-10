import React from 'react';
import imagen from '../assets/react.svg';
import home from '../assets/icons/home-icon.svg';
import user_icon from '../assets/icons/user-icon.svg';
import reports_icon from '../assets/icons/reports-icon.svg';
import product_icon from '../assets/icons/product-icon.svg';
import examen_icon from '../assets/icons/examen-icon.svg';
import Opcion from './Opcion.jsx';

const Sidebar = () => {
{/*const [isOpen, setIsOpen] = useState(false);*/}

  return (
    <>

      {/* Botón Hamburguesa 
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-black p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      */}


    <aside className="flex flex-col justify-between h-screen bg-black border-r border-gray-800 w-64 text-gray-300 fixed inset-y-0 left-0">
      <div>
        {/*Perfil*/}
        <div className="p-4 mb-4 flex items-center">
          <img
            src={imagen}
            alt="Profile"
            className="w-12 h-12 rounded-full mr-3"
          />
          <div className="flex flex-col">
            <div className="text-white-400 font-medium hover:text-blue-300 cursor-pointer transition-colors">
              Alvaro V.
            </div>
            <div className="text-sm text-gray-400">Administrator</div>
          </div>
        </div>

        {/* Main*/}
        <nav className="px-2 space-y-1">
          <Opcion icon={home} title="Inicio" to="/" />
          <Opcion icon={user_icon} title="Usuarios" to="/usuarios" />
          <Opcion icon={reports_icon} title="Reportes" to="/reportes" />
          <Opcion icon={product_icon} title="Productos" to="/productos" />
          <Opcion icon={examen_icon} title="Examenes" to="/examenes" />
          </nav>

        <div className="mt-8 px-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">
            OTRAS CONFIG
          </h3>
          <button className="flex items-center space-x-2 px-2 py-2 rounded-md transition-colors duration-200 hover:bg-transparent group">
            <svg 
              className="w-4 h-4 text-gray-300 group-hover:text-red-500 transition-colors duration-200" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
            </svg>
            <span className="group-hover:text-red-500 hover:cursor-pointer transition-colors duration-200">
              Cerrar Sesión
            </span>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="bg-gray-900 bg-opacity-30 p-3 rounded text-sm">
          <div className="text-gray-300">{new Date().toDateString()}</div>
          <div className="text-gray-500">Cesar, Colombia</div>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
