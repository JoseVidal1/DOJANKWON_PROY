import React from 'react';
import { Link } from "react-router-dom";

import ReportIcon from '../assets/icons/ReportIcon.jsx';
import ProductIcon from '../assets/icons/ProductIcon.jsx';
import ExamIcon from '../assets/icons/ExamIcon.jsx';
import StudentsIcon from '../assets/icons/StudentsIcon.jsx';
import UserIcon from '../assets/icons/UserIcon.jsx';
import P2xl from '../assets/images/HomeBackg/P2xl.png';

const nombre = "ESPANTAVIEJAS3000";

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
      <hr className=" mt-50 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)] z-30" />
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 px-4">

        <Link to="/usuarios">
          <button className="flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-[color:var(--secundary-dark-color)] hover:bg-[color:var(--accent-dark-color)] text-white border-2 border-[color:var(--accent-dark-color)] shadow-lg transition duration-300">
            <UserIcon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-2 text-white" />
            <span className="text-base sm:text-lg lg:text-xl font-semibold">Usuarios</span>
          </button>
        </Link>

        <Link to="/reportes">
         <button className="flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-[color:var(--secundary-dark-color)] hover:bg-[color:var(--accent-dark-color)] text-white border-2 border-[color:var(--accent-dark-color)]  shadow-lg transition duration-300">
            <ReportIcon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-2 text-white" />
            <span className="text-base sm:text-lg lg:text-xl font-semibold">Reportes</span>
          </button>
        </Link>

        <Link to="/prestamos">
         <button className="flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-[color:var(--secundary-dark-color)] hover:bg-[color:var(--accent-dark-color)] text-white border-2 border-[color:var(--accent-dark-color)]  shadow-lg transition duration-300">
            <ProductIcon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-2 text-white" />
            <span className="text-base sm:text-lg lg:text-xl font-semibold">Prestamo</span>
          </button>
        </Link>

        <Link to="/examenes">
         <button className="flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-[color:var(--secundary-dark-color)] hover:bg-[color:var(--accent-dark-color)] text-white border-2 border-[color:var(--accent-dark-color)]  shadow-lg transition duration-300">
            <ExamIcon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-2 text-white" />
            <span className="text-base sm:text-lg lg:text-xl font-semibold">Examenes</span>
         </button>
        </Link>

        <Link to="/estudiantes">
         <button className="flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-[color:var(--secundary-dark-color)] hover:bg-[color:var(--accent-dark-color)] text-white border-2 border-[color:var(--accent-dark-color)]  shadow-lg transition duration-300">
            <StudentsIcon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-2 text-white" />
            <span className="text-base sm:text-lg lg:text-xl font-semibold">Estudiantes</span>
         </button>
        </Link>
      </div>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)] z-30" />

    </div>
  );
};

export default Home;