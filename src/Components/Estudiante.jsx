import React, { useState } from 'react'

export default function Estudiante({estudiante, setEstudianteAEliminar, setIsModalEliminar,setEstudianteAEditar, setIsModalEditar}) {
    /*
    de 4 a 6 5pm-6pm
    de 7 a 10 6pm-7pm 
    mayores 10 7pm -8pm
     */
    const [eps, setEps] = useState(estudiante.eps);
    const [direccion, setDireccion] = useState(estudiante.direccion);
    const [telefono, setTelefono] = useState(estudiante.telefono);
    const [correo, setCorreo] = useState(estudiante.correo);
  return (
    <tr key={estudiante.id} className="hover:bg-gray-100">
                  <td className='p-2 text-center'>{estudiante.id}</td>
                  <td className='p-2 text-center'>{estudiante.nombre}</td>
                  <td className='p-2 text-center'>{estudiante.apellido}</td>
                  <td className="p-2 text-center">{(() => {
                  const fechaActual = new Date();
                  const fechaNacimiento = new Date(estudiante.edad);
                  let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                  const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
                  if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
                      edad--;
                  }
                  if (edad < 0) {
                      edad = 0; 
                  }
                   return edad;
                  })()}
                  </td>
                  <td><input className='w-full p-1 border rounded'  type="text" value={eps} onChange={e=> setEps( e.target.value)} /></td>
                  <td><input className='w-full p-1 border rounded' type="text" value={direccion} onChange={e=> setDireccion(e.target.value)}  /></td>
                  <td><input className='w-full p-1 border rounded' type="text" value={telefono} onChange={e=> setTelefono(e.target.value)} /></td>
                  <td><input className='w-full p-1 border rounded' type="text" value={correo} onChange={e=> setCorreo(e.target.value)} /></td>
                  <td className="flex justify-center items-center">
                    <button className="bg-blue-500 w-[40%]  text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-blue-400"
                    onClick={() => {
                        const estudianteActualizado = {
                          ...estudiante,
                          eps: eps,
                          direccion: direccion,
                          telefono: telefono,
                          correo: correo
                        };
                        setEstudianteAEditar(estudianteActualizado);
                        setIsModalEditar(true);
                      }}
                    >
                      ✏️ 
                    </button>
                    <button
                      className="bg-red-500 w-[40%] text-white px-4 py-2 rounded ml-2 hover:cursor-pointer hover:bg-red-400"
                      onClick={() => {
                        setEstudianteAEliminar(estudiante);
                        setIsModalEliminar(true);
                      }}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
  )
}
