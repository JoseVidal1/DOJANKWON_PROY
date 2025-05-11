import React, { useState } from 'react';
import EditIcon from '../assets/icons/EditIcon.jsx';
import DeleteIcon from '../assets/icons/DeleteIcon.jsx';
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
   <h1 className="text-2xl mb-2 font-bold text-left" style={{ color: "var(--primary-text-color)" }}>Gestión de usuarios de Usuarios</h1>
   <p className= "" style={{ color: "var(--secundary-text-color)" }} >Administración y control de usuarios registrados y sus permisos.</p>
   <div className="p-5 mt-10 rounded-[30px] shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff]" style={{ backgroundColor: "var(--secundary-background-color)", color: "var(--primary-text-color)"}}>
    <h1 className="text-xl font-bold mb-4 text-left">Usuarios</h1>

    <div className="mb-4 w-full flex flex-col md:flex-row md:items-center gap-2">
      <div className="relative w-full md:w-1/3">
        <input type="text" placeholder="Buscar usuario..." className="w-full pl-10 pr-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 text-sm"
          style={{backgroundColor: "var(--primary-background-color)", borderColor: "var(--input-border-color)", color: "var(--primary-text-color)", outlineColor: "var(--sidebar-active-text)"}}/>
        <button
          type="button"
          className="absolute inset-y-0 left-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 1 0-12 0 6 6 0 0 0 12 0z" />
          </svg>
        </button>
      </div>

      <button onClick={() => ModalOp(true)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Agregar Usuario
      </button>
    </div>

    <div className="overflow-auto rounded-lg shadow hidden md:block">
      <table className="w-full text-center">
        <thead
          style={{
            backgroundColor: "var(--primary-background-color)",
            borderBottom: "2px solid var(--custom-border-color)"
          }}
        >
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>CC</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Rol</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Usuario</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Nombres</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Apellidos</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Celular</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Dirección</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Correo</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Edición</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {usuarios.map((u, idx) => (
            <tr key={u.id} className={idx % 2 === 0 ? '' : ''} style={{ backgroundColor: idx % 2 === 0 ? 'var(--primary-background-color)' : 'var(--secundary-background-color)' }}>
              {['id', 'rol', 'usuario', 'nombres', 'apellidos', 'celular', 'direccion', 'correo'].map((field) => (
                <td key={field} className="p-2">
                  <input
                    type="text"
                    value={u[field]}
                    onChange={(e) => InputCambios(u.id, field, e.target.value)}
                    className="w-full rounded px-2 py-1 text-sm text-center"
                    style={{
                      backgroundColor: "var(--primary-background-color)",
                      borderColor: "var(--input-border-color)",
                      color: "var(--primary-text-color)"
                    }}
                  />
                </td>
              ))}

               {/* Editar y eliminar */}
              <td className="p-3 flex justify-center space-x-2">
                <button onClick={() => GuardarU(u)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900">
                  <EditIcon alt="Editar" className="w-5 h-5" />
                </button>
                <button onClick={() => DeleteU(u.id)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900">
                  <DeleteIcon alt="Eliminar" className="w-5 h-5" />
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
        <div key={u.id} className="bg-white space-y-3 p-4 rounded-lg shadow" style={{ backgroundColor: "var(--primary-background-color)", color: "var(--primary-text-color)" }}>
          {['id', 'rol', 'usuario', 'nombres', 'apellidos', 'celular', 'direccion', 'correo'].map((field) => (
            <div key={field} className="text-sm text-center">
              <label className="block font-semibold capitalize" style={{ color: "var(--secundary-text-color)" }}>{field}:</label>
              <input
                type="text"
                value={u[field]}
                onChange={(e) => InputCambios(u.id, field, e.target.value)}
                className="w-full rounded px-2 py-1 text-sm text-center"
                style={{
                  backgroundColor: "var(--primary-background-color)",
                  borderColor: "var(--input-border-color)",
                  color: "var(--primary-text-color)"
                }}
              />
            </div>
          ))}

           {/*Editar y eliminar*/}
          <div className="flex justify-center space-x-4 pt-2">
            <button onClick={() => GuardarU(u)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900">
              <EditIcon alt="Editar" className="w-5 h-5" />
            </button>
            <button onClick={() => DeleteU(u.id)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900">
              <DeleteIcon alt="Eliminar" className="w-5 h-5" />
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
