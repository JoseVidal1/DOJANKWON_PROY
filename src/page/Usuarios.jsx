import React, { useState } from 'react';
import EditIcon from '../assets/icons/EditIcon.jsx';
import DeleteIcon from '../assets/icons/DeleteIcon.jsx';

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
  
   <div className='relative pt-8 pb-4' style={{ backgroundColor: "var(--primary-dark-color)" }}>
    {/* Presentacion */}
    <hr className="absolute top-1 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
    <h1 className='text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>GESTION DE USUARIO</h1>
    <hr className="absolute top-12 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
   <h1 className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-7xl font-josefin mb-2 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>REGISTRAR USUARIOS</h1>
   <hr className="w-[calc(100%+140px)] mx-[-70px] border-t border-[color:var(--secundary-dark-color)] mb-6" /> {/* Lineas decorativas verticales debajo */}
   <hr className="absolute left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
   <p className= "font-josefin text-sm ml-2" style={{ color: "var(--text-dark-color)" }} >Gestiona de forma <span style={{ color: "var(--accent-dark-color)" }}>segura</span> a los usuarios del sistema.<br />controla sus permisos de <span style={{ color: "var(--accent-dark-color)" }}>acceso</span>de forma eficiente</p>
   <hr className=" left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
   
    <h1 className=' mt-10 text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>DATOS DE USUARIO</h1>
   <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
   
   {/* datos para agregar usuario*/}
   <form className="w-full flex flex-wrap gap-x-6 gap-y-4 mt-10 px-4">
  {/*usuario*/}
  <div className="w-full md:flex-1 flex flex-col min-w-0">
    <label htmlFor="usuario" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Usuario</label>
    <input type="text" id="usuario" name="usuario" placeholder="Usuario" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
  </div>

  {/*CC */}
  <div className="w-full md:flex-1 flex flex-col min-w-0">
    <label htmlFor="id" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">CC</label>
    <input type="text" id="id" name="id" placeholder="CC" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
  </div>

  {/*Rol */}
  <div className="w-full md:flex-1 flex flex-col min-w-0">
    <label htmlFor="rol" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Rol</label>
    <input type="text" id="rol" name="rol" placeholder="Rol" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
  </div>

  {/*Nombres */}
 <div className="w-full md:flex-1 flex flex-col min-w-0">
    <label htmlFor="nombres" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Nombres</label>
    <input type="text" id="nombres" name="nombres" placeholder="Nombres" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
  </div>

  {/*Apellidos */}
  <div className="w-full md:flex-1 flex flex-col min-w-0">
    <label htmlFor="apellidos" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Apellidos</label>
    <input type="text" id="apellidos" name="apellidos" placeholder="Apellidos" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
  </div>

  {/*Celular */}  
 <div className="w-full md:flex-1 flex flex-col min-w-0">
    <label htmlFor="celular" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Celular</label>
    <input type="text" id="celular" name="celular" placeholder="Celular" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
  </div>

  {/*Correo */}
  <div className="w-full md:flex-1 flex flex-col min-w-0">
    <label htmlFor="correo" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Correo</label>
    <input type="email" id="correo" name="correo" placeholder="Correo" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
  </div>

  {/*Direccion */}
 <div className="w-full md:flex-1 flex flex-col min-w-0">
    <label htmlFor="direccion" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Dirección</label>
    <input type="text" id="direccion" name="direccion" placeholder="Dirección" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
  </div>

  {/** Boton */}
    <div className="w-full flex justify-center mt-6">
      <button  className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md px-6 font-medium transition hover:scale-105 duration-300" style={{ backgroundColor:"var(--terceary-dark-color)", tercearyColor: "var(--terceary-dark-color)", color : "var(--text-dark-color)" }}>
        <span>Agregar Usuario</span>
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
          <div className="relative h-full w-8 bg-white/20"></div>
        </div>
      </button>
  </div>
</form>
 <hr className="mt-0.5 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
 
 {/* Presentacion tabla */}
 <h1 className='text-sm ml-2 mt-20  font-josefin' style={{ color: "var(--accent-dark-color)" }}>taekwondo</h1>
 <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
 <h1 className="text-2xl sm:text-2xl ml-2 md:text-4xl lg:text-5xl font-josefin mb-1 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>TABLA DE USUARIOS</h1>
 <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

 {/* div principal tabla */}
   <div className="p-5 mt-10">

    {/* Buscador */}
    <div className="mb-4 w-full flex flex-col md:flex-row md:items-center gap-2">
      <div className="relative w-full md:w-1/3">
        <input type="text" placeholder="Buscar usuario..." className="w-full pl-10 pr-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 text-sm"
          style={{backgroundColor: "var(--sidebar-dark-hover)", borderColor: "var(--terceary-dark-color)", color: "var(--text-dark-color)", outlineColor: "var(--terceary-dark-color)"}}/>
        <button type="button" className="absolute inset-y-0 left-0 px-3 flex items-center text-[#F44E1C] hover:text-[#f44e1c66]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 1 0-12 0 6 6 0 0 0 12 0z" />
          </svg>
        </button>
      </div>
    </div>

    <div className="overflow-auto rounded-lg shadow hidden md:block">
      <table className="w-full text-center shadow-lg border border-[color:var(--terceary-dark-color)]">
        <thead
          style={{
            backgroundColor: "var(--secundary-dark-color)",
            borderBottom: "1px solid var(--terceary-dark-color)"
          }}
        >
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>CC</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Rol</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Usuario</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Nombres</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Apellidos</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Celular</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Dirección</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Correo</th>
            <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Edición</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {usuarios.map((u, idx) => (
            <tr key={u.id} className={idx % 2 === 0 ? '' : ''} style={{ backgroundColor: idx % 2 === 0 ? 'var(--sidebar-dark-hover)' : 'var(--text-dark-color)' }}>
              {['id', 'rol', 'usuario', 'nombres', 'apellidos', 'celular', 'direccion', 'correo'].map((field) => (
                <td key={field} className="p-2">
                  <input
                    type="text"
                    value={u[field]}
                    onChange={(e) => InputCambios(u.id, field, e.target.value)}
                    className="w-full rounded px-2 py-1 text-sm text-center"
                    style={{
                      backgroundColor: "var(--secundary-dark-color)",
                      borderColor: "var(--accent-dark-color)",
                      color: "var(--text-dark-color)"
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
        <div key={u.id} className="space-y-3 p-4 rounded-lg shadow" style={{ backgroundColor: "var(--secundary-dark-color)", color: "var(--text-dark-color)" }}>
          {['id', 'rol', 'usuario', 'nombres', 'apellidos', 'celular', 'direccion', 'correo'].map((field) => (
            <div key={field} className="text-sm text-center">
              <label className="block font-semibold capitalize" style={{ color: "var(--secundary-text-color)" }}>{field}:</label>
              <input
                type="text"
                value={u[field]}
                onChange={(e) => InputCambios(u.id, field, e.target.value)}
                className="w-full rounded px-2 py-1 text-sm text-center"
                style={{
                  backgroundColor: "var(--secundary-dark-color)",
                  borderColor: "var(--accent-dark-color)",
                  color: "var(--text-dark-color)"
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
    </div>
  </div>);
};

export default Usuarios;
