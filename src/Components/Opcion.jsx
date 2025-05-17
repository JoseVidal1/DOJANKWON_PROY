import { Sidebar } from 'lucide-react';
import React, { useContext } from 'react';
import { SidebarContext } from './sidebar.jsx';
import { NavLink } from 'react-router-dom';

export default function Opcion({ icon, title, to }) {
const  {expanded} = useContext(SidebarContext);
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        const base = "relative flex items-center py-2 px-3 my-1 font-medium  rounded-full cursor-pointer transition-colors group";
        const active = "bg-[var(--sidebar-dark-hover)] text-[var(--text-dark-color)]";
        const inactive = "bg-[var(--primary-dark-color-transparent)] text-[var(--text-dark-color-transparent)] hover:bg-[var(--sidebar-dark-hover)] hover:text-[var(--text-dark-color)]";

        return `${base} ${isActive ? active : inactive}`;
      }}
    >
      {({ isActive }) => (
        <>
          <span
            className={`transition-all ${expanded ? "mr-3" : "mx-auto"} ${isActive ? "text-[#F44E1C]" : "text-[rgba(244,78,28,0.4)]"}`}
            alt={title}
          >
            {icon}
          </span>
          <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0 ml-0"}`}>
            {title}
          </span>
        </>
      )}
    </NavLink>
  );
}
