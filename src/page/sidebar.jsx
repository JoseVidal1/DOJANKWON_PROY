import React from 'react';
import { CalendarIcon, BookmarkIcon, LayersIcon, TwitterIcon, HomeIcon, MessageSquareIcon, FolderIcon, DownloadIcon } from 'lucide-react';
import imagen from  '../assets/react.svg'
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
          <a href="#" className="flex items-center px-4 py-2 rounded hover:bg-gray-800 transition-colors">
            <HomeIcon size={18} className="mr-3" />
            <span>Inicio</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 rounded hover:bg-gray-800 transition-colors">
            <LayersIcon size={18} className="mr-3" />
            <span>Usuarios</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 rounded hover:bg-gray-800 transition-colors">
            <MessageSquareIcon size={18} className="mr-3" />
            <span>Reportes</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 rounded hover:bg-gray-800 transition-colors">
            <MessageSquareIcon size={18} className="mr-3" />
            <span>Prestamos</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 rounded hover:bg-gray-800 transition-colors">
            <MessageSquareIcon size={18} className="mr-3" />
            <span>Examenes</span>
          </a>
        </nav>

        <div className="mt-8 px-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">
            OTRAS CONFIG
          </h3>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="bg-gray-900 bg-opacity-30 p-3 rounded text-sm">
          <div className="text-gray-300">03/04/2025</div>
          <div className="text-gray-500">Cesar, Colombia</div>
        </div>
        <button className="w-full bg-gray-900 bg-opacity-30 p-3 rounded flex justify-center items-center text-sm text-gray-300 hover:bg-gray-800 transition-colors">
          <DownloadIcon size={18} className="mr-2" />
          Descargar CV
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;