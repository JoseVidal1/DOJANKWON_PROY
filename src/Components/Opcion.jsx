import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Opcion({ icon, title, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded transition-colors ${
          isActive ? 'bg-gray-600 text-white' : 'hover:bg-gray-600'
        }`
      }
    >
      <img src={icon} className="mr-3 w-4" alt={title} />
      <span>{title}</span>
    </NavLink>
  );
}