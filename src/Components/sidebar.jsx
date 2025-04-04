import React from 'react';
import imagen from  '../assets/react.svg'
import home from '../assets/icons/home-icon.svg'
import user_icon from '../assets/icons/user-icon.svg'
import reports_icon from '../assets/icons/reports-icon.svg'
import product_icon from '../assets/icons/product-icon.svg'
import examen_icon from '../assets/icons/examen-icon.svg'
import power_icon from '../assets/icons/power-icon.svg'
import Opcion from './Opcion.jsx';
const Sidebar = () => {
  return (
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
            <div className="text-white-400 font-medium hover:text-blue-300 cursor-pointer transition-colors">Alvaro V.</div>
            <div className="text-sm text-gray-400">Administrator</div>
          </div>
        </div>

        {/* Main*/}
        <nav className="px-2 space-y-1">
          <Opcion icon={home} title="Inicio"/>
          <Opcion icon={user_icon} title="Usuarios"/>
          <Opcion icon={reports_icon} title="Reportes"/>
          <Opcion icon={product_icon} title="Productos"/>
          <Opcion icon={examen_icon} title="Examenes"/>
        </nav>

        <div className="mt-8 px-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">
            OTRAS CONFIG
          </h3>
          <button className='hover:text-red-600 flex'>
          <img src={power_icon} className="w-4 hover:fill-red-500" />

            Cerrar Sesion
          </button>
        </div>
      </div>
    
      <div className="p-4 space-y-2">
        
        <div className="bg-gray-900 bg-opacity-30 p-3 rounded text-sm">
          <div className="text-gray-300">03/04/2025</div>
          <div className="text-gray-500">Cesar, Colombia</div>
        </div>
        
      </div>
    </aside>
  );
};

export default Sidebar;