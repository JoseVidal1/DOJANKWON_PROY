import React, { useEffect, useState } from 'react';
import EditIcon from '../assets/icons/EditIcon.jsx';
import DeleteIcon from '../assets/icons/DeleteIcon.jsx';
import ModalConfirmacion from "../Components/ModalConfirmation.jsx";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosOriginales, setUsuariosOriginales] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [nuevoUsuario, setNuevoUsuario] = useState({
    cc: '',
    rol: '',
    userName: '',
    contraseña: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    direccion: '',
    correo: ''
  });
  
  const [modalAbierto, setModalAbierto] = useState(false);
  const [accionActual, setAccionActual] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5234/api/Usuario')
      .then((response) => {
        if (!response.ok) throw new Error('Error al cargar los usuarios');
        return response.json();
      })
      .then((data) => {
        setUsuarios(data);
        setUsuariosOriginales(data);
      })
      .catch((error) => console.error('Error al cargar usuarios:', error));
  }, []);

  useEffect(() => {
    const filtrados = usuariosOriginales.filter((u) =>
      u.cc.toString().includes(busqueda)
    );
    setUsuarios(filtrados);
  }, [busqueda, usuariosOriginales]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgregarUsuario = (e) => {
    e.preventDefault();
    fetch('http://localhost:5234/api/Usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al agregar el usuario');
        return response.json();
      })
      .then((data) => {
        setUsuarios((prev) => [...prev, data]);
        setUsuariosOriginales((prev) => [...prev, data]);
        setNuevoUsuario({
          cc: '',
          rol: '',
          userName: '',
          contraseña: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          correo: ''
        });
      })
      .catch((error) => console.error('Error al agregar usuario:', error));
  };

  const InputCambios = (cc, field, value) => {
    setUsuarios((prev) =>
      prev.map((u) => (u.cc === cc ? { ...u, [field]: value } : u))
    );
  };

  const DeleteU = (cc) => {
    fetch(`http://localhost:5234/api/Usuario/${cc}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        setUsuarios((prev) => prev.filter((u) => u.cc !== cc));
        setUsuariosOriginales((prev) => prev.filter((u) => u.cc !== cc));
      })
      .catch((error) => console.error('Error al eliminar usuario:', error));
  };

  const ActualizarU = (user) => {
    fetch('http://localhost:5234/api/Usuario', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setUsuarios((prev) => prev.map((u) => (u.cc === user.cc ? data : u)));
        setUsuariosOriginales((prev) => prev.map((u) => (u.cc === user.cc ? data : u)));
      })
      .catch((error) => console.error('Error al actualizar usuario:', error));
  };

  const manejarAccion = (accion, usuario) => {
    setAccionActual(accion);
    setUsuarioSeleccionado(usuario);
    setModalAbierto(true);
  };

  const confirmarAccion = () => {
    if (accionActual === 'delete') {
      DeleteU(usuarioSeleccionado.cc);
    } else {
      ActualizarU(usuarioSeleccionado);
    }
    setModalAbierto(false);
  };

  return (
    <div className='relative pt-8 pb-4' style={{ backgroundColor: "var(--primary-dark-color)" }}>
      {/* Presentacion */}
      <hr className="absolute top-1 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>GESTION DE USUARIO</h1>
      <hr className="absolute top-12 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-7xl font-josefin mb-2 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>REGISTRAR USUARIOS</h1>
      <hr className="w-[calc(100%+140px)] mx-[-70px] border-t border-[color:var(--secundary-dark-color)] mb-6" />
      <hr className="absolute left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <p className="font-josefin ml-2"> Gestiona de forma <span style={{ color: "var(--accent-dark-color)" }}>segura</span> a los usuarios del sistema.<br />controla sus permisos de <span style={{ color: "var(--accent-dark-color)" }}>acceso </span>de forma eficiente</p>
      <hr className=" left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      <h1 className=' mt-10 text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>DATOS DE USUARIO</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      {/* datos para agregar usuario*/}
      <form className="w-full flex flex-wrap gap-x-6 gap-y-4 mt-10 px-4" onSubmit={handleAgregarUsuario}>

        <div className="w-full flex flex-wrap gap-x-6 gap-y-4">
        {/*usuario*/}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="userName" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Usuario</label>
          <input type="text" id="userName" name="userName" placeholder="Usuario" value={nuevoUsuario.usuario} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        {/* Contraseña */}	
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="contraseña" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Contraseña</label>
          <input type="password" id="contraseña" name="contraseña" placeholder="Contraseña" value={nuevoUsuario.contrasena} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>

        {/*CC */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="cc" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">CC</label>
          <input type="text" id="cc" name="cc" placeholder="CC" value={nuevoUsuario.id} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        </div>

        <div className="w-full flex flex-wrap gap-x-6 gap-y-4">
        {/*Rol */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="rol" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Rol</label>
          <select id="rol" name="rol" value={nuevoUsuario.rol} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition">
            <option className='bg-gray-600' value="" disabled>Seleccione</option>
            <option className='bg-gray-600' value="Administrador">Administrador</option>
            <option className='bg-gray-600' value="Instructor">Instructor</option>
            <option className='bg-gray-600' value="Recepcionista">Recepcionista</option>
          </select>
        </div>

        {/*Nombres */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="nombres" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Nombres</label>
          <input type="text" id="nombres" name="nombres" placeholder="Nombres" value={nuevoUsuario.nombres} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>

        {/*Apellidos */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="apellidos" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Apellidos</label>
          <input type="text" id="apellidos" name="apellidos" placeholder="Apellidos" value={nuevoUsuario.apellidos} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        </div>
        
        <div className="w-full flex flex-wrap gap-x-6 gap-y-4">
        {/*Celular */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="telefono" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Celular</label>
          <input type="text" id="telefono" name="telefono" placeholder="Celular" value={nuevoUsuario.celular} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>

        {/*Correo */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="correo" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Correo</label>
          <input type="email" id="correo" name="correo" placeholder="Correo" value={nuevoUsuario.correo} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>

        {/*Direccion */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="direccion" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Dirección</label>
          <input type="text" id="direccion" name="direccion" placeholder="Dirección" value={nuevoUsuario.direccion} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        </div>

        {/** Boton */}
        <div className="w-full flex justify-center mt-6">
          <button type="submit" className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md px-6 font-medium transition hover:scale-105 duration-300" style={{ backgroundColor: "var(--terceary-dark-color)", tercearyColor: "var(--terceary-dark-color)", color: "var(--text-dark-color)" }}>
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
            <input type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar usuario..." className="w-full pl-10 pr-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 text-sm"
              style={{ backgroundColor: "var(--sidebar-dark-hover)", borderColor: "var(--terceary-dark-color)", color: "var(--text-dark-color)", outlineColor: "var(--terceary-dark-color)" }} />
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
            <tbody className="divide-y divide-[#4b607f]">
              {usuarios.map((u, idx) => (
                <tr key={u.cc} className={idx % 2 === 0 ? '' : ''} style={{ backgroundColor: idx % 2 === 0 ? 'var(--sidebar-dark-hover)' : 'var(--secundary-dark-color)' }}>
                  {['cc', 'rol', 'userName', 'nombres', 'apellidos', 'telefono', 'direccion', 'correo'].map((field) => (
                    <td key={field} className="p-2">
                      <input
                        type="text"
                        value={u[field]}
                        onChange={(e) => InputCambios(u.cc, field, e.target.value)}
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
                    <button onClick={() => manejarAccion("edit", u)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900">
                      <EditIcon alt="Editar" className="w-5 h-5" />
                    </button>
                    <button onClick={() => manejarAccion("delete",u)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900">
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
            <div key={u.cc} className="space-y-3 p-4 rounded-lg shadow" style={{ backgroundColor: "var(--secundary-dark-color)", color: "var(--text-dark-color)" }}>
              {['cc', 'rol', 'userName', 'nombres', 'apellidos', 'telefono', 'direccion', 'correo'].map((field) => (
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
                <button onClick={() => manejarAccion("edit", u)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900">
                  <EditIcon alt="Editar" className="w-5 h-5" />
                </button>
                <button onClick={() => manejarAccion("delete", u)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900">
                  <DeleteIcon alt="Eliminar" className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal de confirmación */}
      <ModalConfirmacion
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onConfirm={confirmarAccion}
        actionType={accionActual}
        dataType="usuario"/>
    </div>
  );
};

export default Usuarios;
