import React, { useState, useEffect, createContext } from "react";
import { Link } from "react-router-dom";
import imagen from "../assets/react.svg";

import HomeIcon from "../assets/icons/HomeIcon.jsx";
import UserIcon from "../assets/icons/UserIcon.jsx";
import ReportIcon from "../assets/icons/ReportIcon.jsx";
import ProductIcon from "../assets/icons/ProductIcon.jsx";
import ExamIcon from "../assets/icons/ExamIcon.jsx";
import StudentsIcon from "../assets/icons/StudentsIcon.jsx";

import Opcion from "./Opcion.jsx";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { useAuth } from "../Auth/AuthContext.jsx";

export const SidebarContext = createContext();

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const { isAuth, logout } = useAuth();
  return (
    <>
      <aside
        className={`sticky top-0 h-[100dvh] min-h-screen transition-all duration-300 ${
          expanded ? "w-70" : "w-16"
        }`}
      >
        <nav
          className="h-full flex flex-col border-0 shadow-xl"
          style={{
            backgroundColor: "var(--primary-background-color)",
            borderColor: "var(--primary-border-color)",
          }}
        >
          <div
            className={`p-4 pb-2 flex items-center transition-all duration-300 ${
              expanded ? "justify-between" : "justify-center"
            }`}
          >
            <img
              src={imagen}
              alt="Logo"
              className={`transition-all ${expanded ? "w-10" : "w-0"}`}
            />
            {expanded && (
              <div className="flex flex-col text-center ml-2">
                <h1
                  className="text-xl font-bold"
                  style={{ color: "var(--primary-text-color)" }}
                >
                  Alvaro Vidal M.
                </h1>
                <h2
                  className="text-sm font-josefin"
                  style={{ color: "var(--secundary-text-color)" }}
                >
                  Administrador
                </h2>
              </div>
            )}
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg"
              style={{ backgroundColor: "var(--secundary-background-color)" }}
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            {/*Opciones*/}
            <ul className="flex-1 px-3 space-y-2">
              <Opcion
                icon={<HomeIcon className="w-5 h-5" />}
                title="Inicio"
                to="/"
              />
              <Opcion
                icon={<UserIcon className="w-5 h-5" />}
                title="Usuarios"
                to="/usuarios"
              />
              <Opcion
                icon={<ReportIcon className="w-5 h-5" />}
                title="Reportes"
                to="/reportes"
              />
              <Opcion
                icon={<ProductIcon className="w-5 h-5" />}
                title="Productos"
                to="/productos"
              />
              <Opcion
                icon={<ExamIcon className="w-5 h-5" />}
                title="Examenes"
                to="/examenes"
              />
              <Opcion
                icon={<StudentsIcon className="w-5 h-5" />}
                title="Estudiantes"
                to="/Estudiantes"
              />
              <Opcion
                icon={<StudentsIcon className="w-5 h-5" />}
                title="Pagos"
                to="/Pago"
              />
              <Opcion
                icon={<StudentsIcon className="w-5 h-5" />}
                title="Ingresar"
                to="/login"
              />
              {isAuth && (
                <button
                  onClick={logout}
                  className={({ isActive }) =>
                    `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
                      isActive
                        ? "bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]"
                        : "hover:bg-[var(--sidebar-hover-bg)] text-[var(--secundary-text-color)]"
                    }`
                  }
                >
                  Cerrar Sesión
                </button>
              )}
            </ul>
          </SidebarContext.Provider>

          <div
            className={`border-t flex items-center p-3 transition-all duration-300 ${
              expanded ? "gap-3" : "justify-center"
            }`}
            style={{ borderTopColor: "var(--custom-border-color)" }}
          >
            <img src={imagen} alt="Logo" className="w-10 h-10 rounded-md" />
            <div
              className={`overflow-hidden transition-all duration-300 ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="flex items-center justify-between leading-4">
                <div>
                  <h4 className="font-semibold">Alvaro Vidal Martinez</h4>
                  <span
                    className="text-xs"
                    style={{ color: "var(--secundary-text-color)" }}
                  >
                    AvidalMartinez@gmail.com
                  </span>
                </div>
                <MoreVertical size={20} className="ml-2 shrink-0" />
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
