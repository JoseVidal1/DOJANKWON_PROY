import React, { useState } from 'react';
import EditIcon from '../assets/icons/edit.svg';
import deleteIcon from '../assets/icons/delete.svg';
import AgregarUsuario from '../Components/AgregarUsuario';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([
    {
      id: '1001',
      rol: 'Recep',
      usuario: 'JUANCETO01',
      nombres: 'Juan',
      apellidos: 'PEPEFORTUNA',
      celular: '123',
      direccion: 'Calle 12444',
      correo: 'juanceto01@gmail.com',
    },
  ]);

  const [isModalOpen, ModalOp] = useState(false);

  const InputCambios = (id, field, value) => {
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, [field]: value } : u))
    );
  };

  const DeleteU = (id) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  const GuardarU = (user) => {
    console.log('Guardando usuario:', user);
  };

  const AgregarU = (nuevoUsuario) => {
    setUsuarios((prev) => [...prev, nuevoUsuario]);
  };

  return (
  <>
      <h1 className="text-2xl mb-2 font-bold text-left">Gestión de usuarios de Usuarios</h1>

    <div className="p-5 rounded-[30px] shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] bg-gray-100 text-[#333]">
      <h1 className="text-xl font-bold mb-4 text-left">Usuarios</h1>

      {/* Botón para agregar usuario */}
    <div className="mb-4 w-full flex flex-col md:flex-row md:items-center gap-2">
      <div className="relative w-full md:w-1/3">
        <input type="text" placeholder="Buscar usuario..." className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <button type="button" className="absolute inset-y-0 left-0 px-3 flex items-center text-gray-500 hover:text-gray-700">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 1 0-12 0 6 6 0 0 0 12 0z" />
          </svg>
        </button>
      </div>

      <button onClick={() => ModalOp(true)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" > Agregar Usuario</button>
    </div>

      {/* Tabla para escritorio */}
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full text-center">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide">CC</th>
              <th className="p-3 text-sm font-semibold tracking-wide">Rol</th>
              <th className="p-3 text-sm font-semibold tracking-wide">Usuario</th>
              <th className="p-3 text-sm font-semibold tracking-wide">Nombres</th>
              <th className="p-3 text-sm font-semibold tracking-wide">Apellidos</th>
              <th className="p-3 text-sm font-semibold tracking-wide">Celular</th>
              <th className="p-3 text-sm font-semibold tracking-wide">Dirección</th>
              <th className="p-3 text-sm font-semibold tracking-wide">Correo</th>
              <th className="p-3 text-sm font-semibold tracking-wide">Edición</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {usuarios.map((u, idx) => (
              <tr key={u.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {['id', 'rol', 'usuario', 'nombres', 'apellidos', 'celular', 'direccion', 'correo'].map((field) => (

                  <td key={field} className="p-2">
                    <input type="text" value={u[field]} onChange={(e) => InputCambios(u.id, field, e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-center"/>
                  </td>

                ))}

                {/* Editar y eliminar */}
                <td className="p-3 flex justify-center space-x-2">
                  <button onClick={() => GuardarU(u)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" >
                  <img src={EditIcon} alt="Editar" className="w-5 h-5" />
                  </button>

                  <button onClick={() => DeleteU(u.id)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900">
                  <img src={deleteIcon} alt="Eliminar" className="w-5 h-5" />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tarjetas para móvil */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {usuarios.map((u) => (
          <div key={u.id} className="bg-white space-y-3 p-4 rounded-lg shadow">
            {['id', 'rol', 'usuario', 'nombres', 'apellidos', 'celular', 'direccion', 'correo'].map((field) => (
              <div key={field} className="text-sm text-center">
                <label className="block font-semibold text-gray-600 capitalize">{field}:</label>
                <input
                  type="text"
                  value={u[field]}
                  onChange={(e) => InputCambios(u.id, field, e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-center"
                />
              </div>
            ))}

            {/*Editar y eliminar*/}
            <div className="flex justify-center space-x-4 pt-2">
              <button onClick={() => GuardarU(u)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900">
                  <img src={EditIcon} alt="Editar" className="w-5 h-5" />
              </button>

              <button onClick={() => DeleteU(u.id)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900">
                <img src={deleteIcon} alt="Eliminar" className="w-5 h-5" />
                </button>
            </div>

            
          </div>
        ))}
      </div>

      {/* Modal */}
      <AgregarUsuario
        isOpen={isModalOpen}
        onClose={() => ModalOp(false)}
        onAdd={AgregarU}
      />
    </div>
  </>);
};

export default Usuarios;
