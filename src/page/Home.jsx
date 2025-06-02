import React from 'react';
import { Link } from "react-router-dom";

import ReportIcon from '../assets/icons/ReportIcon.jsx';
import ProductIcon from '../assets/icons/ProductIcon.jsx';
import ExamIcon from '../assets/icons/ExamIcon.jsx';
import StudentsIcon from '../assets/icons/StudentsIcon.jsx';
import UserIcon from '../assets/icons/UserIcon.jsx';
import PrestamoIcon from '../assets/icons/PrestamoIcon.jsx';
import P2xl from '../assets/images/HomeBackg/P2xl.png';

const nombre = "ALVARO VIDAL";

// breakpoint ESTO ES SOLO PARA EL BACKGROUND


const Home = () => {

  return (
    <div className="bg-contain bg-no-repeat bg-center min-h-screen w-full" style={{ backgroundImage: `url(${P2xl})` }}>
      {/*Presentacion*/}
      <hr className="relative top-1 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)] z-30" />
      <h1 className='text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>INICIO</h1>
      <h1 className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-7xl font-josefin mb-2 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>BIENVENIDO <span style={{ color: "var(--accent-dark-color)" }}>{nombre}</span></h1>
      <hr className="w-[calc(100%+140px)] mx-[-70px] border-t border-[color:var(--secundary-dark-color)] mb-6 z-30" />
      <hr className="absolute left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)] z-30" />
      <p className='ml-2 font-josefin'>Bienvenido al sistema de gestión académica. <br />Administra todos los módulos de forma <span style={{ color: "var(--accent-dark-color)" }}>intuitiva</span>, accede a la información <span style={{ color: "var(--accent-dark-color)" }}>en tiempo real</span> y mantén todos los datos <span style={{ color: "var(--accent-dark-color)" }}>organizados</span> desde un solo lugar.</p>
      <hr className=" left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)] z-30" />
      <hr className=" mt-10 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)] z-30" />
      <h1 className='text-sm font-bold ml-2 text-center font-josefin' style={{ color: "var(--accent-dark-color)" }}>MODULOS</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)] z-30" />

      {/* Modulos */}
      <hr className="mt-20 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)] z-30" />
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 px-4 py-8">

        <Link to="/usuarios">
          <button className="group relative flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-[color:var(--secundary-dark-color)] hover:bg-[color:var(--accent-dark-color)] text-white border-2 border-[color:var(--accent-dark-color)] rounded-2xl shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-white via-red-400 to-orange-500 bg-clip-border animate-spin" style={{ animationDuration: '3s',  }}></div>
              <div className="absolute inset-[2px] rounded-2xl bg-[color:var(--accent-dark-color)]"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            <UserIcon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-2 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-lg relative z-10" />
            <span className="text-base sm:text-lg lg:text-xl font-bold tracking-wide group-hover:text-shadow-lg relative z-10">Usuarios</span>
            <div className="bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white via-red-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left relative z-10"></div>
          </button>
        </Link>

        <Link to="/pagos">
          <button className="group relative flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-[color:var(--secundary-dark-color)] hover:bg-[color:var(--accent-dark-color)] text-white border-2 border-[color:var(--accent-dark-color)] rounded-2xl shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r  from-white via-red-400 to-orange-500 bg-clip-border animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-[2px] rounded-2xl bg-[color:var(--accent-dark-color)]"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            <ReportIcon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-2 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-lg relative z-10" />
            <span className="text-base sm:text-lg lg:text-xl font-bold tracking-wide group-hover:text-shadow-lg relative z-10">Reportes</span>
            <div className="bottom-0 left-0 right-0 h-1 bg-gradient-to-r  from-white via-red-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left relative z-10"></div>
          </button>
        </Link>

        <Link to="/prestamos">
          <button className="group relative flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-[color:var(--secundary-dark-color)] hover:bg-[color:var(--accent-dark-color)] text-white border-2 border-[color:var(--accent-dark-color)] rounded-2xl shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r  from-white via-red-400 to-orange-500 bg-clip-border animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-[2px] rounded-2xl bg-[color:var(--accent-dark-color)]"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            <ProductIcon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-2 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-lg relative z-10" />
            <span className="text-base sm:text-lg lg:text-xl font-bold tracking-wide group-hover:text-shadow-lg relative z-10">Prestamo</span>
            <div className=" bottom-0 left-0 right-0 h-1 bg-gradient-to-r  from-white via-red-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left relative z-10"></div>
          </button>
        </Link>

        <Link to="/examenes">
          <button className="group relative flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-[color:var(--secundary-dark-color)] hover:bg-[color:var(--accent-dark-color)] text-white border-2 border-[color:var(--accent-dark-color)] rounded-2xl shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r  from-white via-red-400 to-orange-500 bg-clip-border animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-[2px] rounded-2xl bg-[color:var(--accent-dark-color)]"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            <ExamIcon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-2 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-lg relative z-10" />
            <span className="text-base sm:text-lg lg:text-xl font-bold tracking-wide group-hover:text-shadow-lg relative z-10">Examenes</span>
            <div className=" bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left relative z-10"></div>
          </button>
        </Link>

        <Link to="/estudiantes">
          <button className="group relative flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-[color:var(--secundary-dark-color)] hover:bg-[color:var(--accent-dark-color)] text-white border-2 border-[color:var(--accent-dark-color)] rounded-2xl shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r  from-white via-red-400 to-orange-500 bg-clip-border animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-[2px] rounded-2xl bg-[color:var(--accent-dark-color)]"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            <StudentsIcon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-2 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-lg relative z-10" />
            <span className="text-base sm:text-lg lg:text-xl font-bold tracking-wide group-hover:text-shadow-lg relative z-10">Estudiantes</span>
            <div className=" bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left relative z-10"></div>
          </button>
        </Link>

        <Link to="/inventario">
          <button className="group relative flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-[color:var(--secundary-dark-color)] hover:bg-[color:var(--accent-dark-color)] text-white border-2 border-[color:var(--accent-dark-color)] rounded-2xl shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r  from-white via-red-400 to-orange-500 bg-clip-border animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-[2px] rounded-2xl bg-[color:var(--accent-dark-color)]"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            <PrestamoIcon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-2 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-lg relative z-10" />
            <span className="text-base sm:text-lg lg:text-xl font-bold tracking-wide group-hover:text-shadow-lg relative z-10">Inventario</span>
            <div className=" bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left relative z-10"></div>
          </button>
        </Link>

      </div>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)] z-30" />
    </div>
  );
};

export default Home;