import React from 'react';

const Estudiantes = () => {
  let estudiantes = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 20, eps: 'EPS1', direccion: 'Calle 1', telefono: '1234567890', correo: ','},
    { id: 2, nombre: 'María', apellido: 'Gómez', edad: 22, eps: 'EPS2', direccion: 'Calle 2', telefono: '0987654321', correo: ','},
    { id: 3, nombre: 'Pedro', apellido: 'López', edad: 21, eps: 'EPS3', direccion: 'Calle 3', telefono: '1122334455', correo: ','}, 
  ]

  return (
    <>
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Estudiantes</h1>
      <p className="text-gray-600">Bienvenido al panel de Estudiantes.</p>
    </div>
    <div className="overflow-x-auto mt-4">
    <table className='border-2 border-black-300 rounded-lg shadow-md mt-4 w-full '>
      <thead>
        <tr className="bg-gray-200 ">
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Edad</th>
          <th>EPS</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {estudiantes.map((estudiante) => (
          <tr key={estudiante.id} className="hover:bg-gray-100">
            <td>{estudiante.id}</td>
            <td>{estudiante.nombre}</td>
            <td>{estudiante.apellido}</td>
            <td>{estudiante.edad}</td>
            <td> <input type="text" value={estudiante.eps}/> </td>
            <td> <input type="text" value={estudiante.direccion}/ > </td>
            <td> <input type="text" value={estudiante.telefono}/></td>
            <td> <input type="text" value={estudiante.correo} /></td>
            <td className="flex justify-center items-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Editar</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded ml-2">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    
    </>
  );
};

export default Estudiantes;