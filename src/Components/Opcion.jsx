import { Sidebar } from 'lucide-react';
import React, { useContext } from 'react';
import { SidebarContext } from './sidebar.jsx';
import { NavLink } from 'react-router-dom';

export default function Opcion({ icon, title, to }) {
const  {expanded} = useContext(SidebarContext);
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          isActive
            ? 'bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]'
            : 'hover:bg-[var(--sidebar-hover-bg)] text-[var(--secundary-text-color)]'
        }`
      }
    >
      <span className={`transition-all ${expanded ? "mr-3" : "mx-auto"}`} alt={title}>
        {icon}
      </span>
      <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0 ml-0"}`}>{title}</span>
    </NavLink>
  );
}
