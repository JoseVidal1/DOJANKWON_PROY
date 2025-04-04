import React from 'react'

export default function Opcion({icon, title}) {
  return (
    <a href="" className="flex items-center px-4 py-2 rounded hover:bg-gray-800 transition-colors">
    <img src={icon} className="mr-3 w-4"/>
    <span>{title}</span>
   </a>
  )
}

