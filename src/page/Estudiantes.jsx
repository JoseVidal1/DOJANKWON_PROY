import React, { useState } from 'react';
import ModalEE from '../Components/ModalEE.jsx';
//import AgregarEstudiante from '../Components/AgregarEstudiante.jsx';
import EditIcon from '../assets/icons/EditIcon.jsx';
import DeleteIcon from '../assets/icons/DeleteIcon.jsx';

const Estudiante = () => {
  const [estudiantes, setEstudiantes] = useState([
    { id: '1001', nombre: 'Juan', apellido: 'Pérez', edad: 20, eps: 'SURA', direccion: 'Calle 123', telefono: '3011234567', correo: 'juan@example.com' }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [accion, setAccion] = useState('');
  const [seleccionado, setSeleccionado] = useState(null);
  const [isModalAgregar, setIsModalAgregar] = useState(false);

  const handleInputChange = (id, campo, valor) => {
    setEstudiantes(prev => prev.map(est => est.id === id ? { ...est, [campo]: valor } : est));
  };

  // Agregar Estudiante
  /*const agregarEstudiante = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nuevoEstudiante = {
      id: formData.get('cc'),
      nombre: formData.get('nombre'),
      apellido: formData.get('apellido'),
      edad: formData.get('edad'),
      eps: formData.get('eps'),
      direccion: formData.get('direccion'),
      telefono: formData.get('telefono'),
      correo: formData.get('correo'),
    };
    onAdd(nuevoEstudiante);
  };*/

  // campo de buscar
  const [busqueda, setBusqueda] = useState('');

  //modales
  const abrirModal = (tipo, estudiante) => {
    setAccion(tipo); setSeleccionado(estudiante); setModalOpen(true);
  };

  // Confirmar eliminar o editar
  const onAccionConfirmada = () => {
    if (accion === 'eliminar') setEstudiantes(prev => prev.filter(est => est.id !== seleccionado.id));
    setModalOpen(false);
  };

  // Agregar Est con Fecha
//   const handleAgregarEstudiante = (nuevo) => {
//   const nacimiento = new Date(nuevo.edad);
//   const hoy = new Date();
//   const edadCalculada = hoy.getFullYear() - nacimiento.getFullYear();
//   const mesDiferencia = hoy.getMonth() - nacimiento.getMonth();

//   const edadFinal = mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < nacimiento.getDate()) ? edadCalculada - 1 : edadCalculada;

//   // Validaciones
//   if (nacimiento.getFullYear() >= hoy.getFullYear()) {
//     alert("La fecha de nacimiento no puede ser del año actual o posterior.");
//     return;
//   }
//   if (edadFinal > 120) {
//     alert("La edad no puede ser mayor a 120 años.");
//     return;
//   }

//   const estudiante = { ...nuevo, edad: edadFinal };
//   setEstudiantes(prev => [...prev, estudiante]);
//   setIsModalAgregar(false);
// };

  return (
    <div className='relative pt-8 pb-4' style={{ backgroundColor: "var(--primary-dark-color)" }}>

      {/*Presentacion*/}
      <hr className="absolute top-1 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>GESTION DE ESTUDIANTES</h1>
      <hr className="absolute top-12 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-7xl font-josefin mb-2 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>REGISTRAR ESTUDIANTES</h1>
      <hr className="w-[calc(100%+140px)] mx-[-70px] border-t border-[color:var(--secundary-dark-color)] mb-6" /> {/* Lineas decorativas verticales debajo */}
      <hr className="absolute left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <p>Administra de forma <span style={{ color: "var(--accent-dark-color)" }}>eficiente</span> la información académica de los estudiantes.<br />Controla su <span style={{ color: "var(--accent-dark-color)" }}>progreso</span> y gestiona sus datos de forma <span style={{ color: "var(--accent-dark-color)" }}>centralizada</span>.</p>
      <hr className=" left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className=' mt-10 text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>DATOS DE USUARIO</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      
      {/* datos para agregar Estudiantes*/}
       <form className="w-full flex flex-wrap gap-x-6 gap-y-4 mt-10 px-4">

        {/* Nombre */}
          <div className="w-full md:flex-1 flex flex-col min-w-0">
            <label htmlFor="Nombres" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">NOMBRE</label>
            <input type="text" name="nombre" placeholder="Nombres" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
          </div>

          {/* Apellido */}
          <div className="w-full md:flex-1 flex flex-col min-w-0">
            <label htmlFor="Apellidos" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">APELLIDO</label>
            <input type="text" name="apellido" placeholder="Apellidos" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
          </div>

          {/* Eadad */}
          <div className="w-full md:flex-1 flex flex-col min-w-0">
            <label htmlFor="Edad" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">EDAD</label>
            <input type="date" name="edad" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
          </div>
          
          {/* EPS */}
          <div className="w-full md:flex-1 flex flex-col min-w-0">
            <label htmlFor="Eps" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">EPS</label>
            <input type="text" name="eps" placeholder="EPS" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
          </div>

          {/* Direccion */}
          <div className="w-full md:flex-1 flex flex-col min-w-0">
            <label htmlFor="Direccion" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">DIRECCION</label>
            <input type="text" name="direccion" placeholder="Dirección" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
          </div>

          {/* Telefono */}
          <div className="w-full md:flex-1 flex flex-col min-w-0">
            <label htmlFor="Telefono" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">TELEFONO</label>
            <input type="text" name="telefono" placeholder="Teléfono" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
          </div>

          {/* Correo */}
          <div className="w-full md:flex-1 flex flex-col min-w-0">
            <label htmlFor="Correo" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Correo</label>
            <input type="email" name="correo" placeholder="Correo" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
          </div>

          <div className="w-full flex justify-center mt-6">
            <button className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md px-6 font-medium transition hover:scale-105 duration-300" style={{backgroundColor: "var(--terceary-dark-color)", color: "var(--text-dark-color)"}}>
              <span className="relative z-10">Agregar Estudiante</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
            </button>
          </div>
       </form>
       <hr className="mt-0.5 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
       {/* Presentacion tabla */}
       <h1 className='text-sm ml-2 mt-20  font-josefin' style={{ color: "var(--accent-dark-color)" }}>taekwondo</h1>
       <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
       <h1 className="text-2xl sm:text-2xl ml-2 md:text-4xl lg:text-5xl font-josefin mb-1 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>TABLA DE ESTUDIANTES</h1>
       <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      
      {/* Tabla principal div */}
      <div className="p-5 mt-10">
        {/* Buscar */}
        <div className="mb-4 w-full flex flex-col md:flex-row md:items-center gap-2">
          <div className="relative w-full md:w-1/3">
          <input type="text" placeholder="Buscar estudiante..." value={busqueda} onChange={e => setBusqueda(e.target.value)} className="w-full pl-10 pr-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 text-sm"
          style={{backgroundColor: "var(--sidebar-dark-hover)", borderColor: "var(--terceary-dark-color)", color: "var(--text-dark-color)", outlineColor: "var(--terceary-dark-color)"}}/>
          <button type="button" className="absolute inset-y-0 left-0 px-3 flex items-center text-[#F44E1C] hover:text-[#f44e1c66]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 1 0-12 0 6 6 0 0 0 12 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Vista de escritorio */}
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full text-center shadow-lg border border-[color:var(--terceary-dark-color)]">
          <thead style={{ backgroundColor: "var(--secondary-background-color)", borderBottom: "1px solid var(--terceary-dark-color)" }}>
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Id</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Nombre</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Apellido</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Edad</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>EPS</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Dirección</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Teléfono</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Correo</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Filtrado Est */}
            {estudiantes.filter(est => Object.values(est).some(valor => typeof valor === 'string' && valor.toLowerCase().includes(busqueda.toLowerCase()))).map(est => (
              <tr key={est.id} style={{ backgroundColor: 'var(--sidebar-dark-hover)' }}>
                <td className="p-2">{est.id}</td>
                <td className="p-2">{est.nombre}</td>
                <td className="p-2">{est.apellido}</td>
                <td className="p-2">{est.edad}</td>
                {['eps','direccion','telefono','correo'].map(c => (
                  <td key={c} className="p-1">
                    <input type="text" value={est[c]} onChange={e => handleInputChange(est.id, c, e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)" }} />
                  </td>
                ))}
                <td className="p-3 flex justify-center space-x-2">
                  <button onClick={() => abrirModal('editar', est)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Editar"><EditIcon className="w-5 h-5" /></button>
                  <button onClick={() => abrirModal('eliminar', est)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Eliminar"><DeleteIcon className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista móvil */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {/*filtrado Est*/}
        {estudiantes.filter(est => Object.values(est).some(valor => typeof valor === 'string' && valor.toLowerCase().includes(busqueda.toLowerCase()))).map(est => (
          <div key={est.id} className="space-y-2 p-4 rounded-lg shadow" style={{ backgroundColor: "var(--secundary-dark-color)", color: "var(--text-dark-color)" }}>
            {['id','nombre','apellido','edad'].map(c => (
              <div key={c}><label className="block text-sm font-semibold capitalize" style={{ color: "var(--secundary-text-color)" }}>{c}:</label><div className="text-center text-sm">{est[c]}</div></div>
            ))}
            {['eps','direccion','telefono','correo'].map(c => (
              <div key={c}><label className="block text-sm font-semibold capitalize" style={{ color: "var(--secundary-text-color)" }}>{c}:</label>
              <input type="text" value={est[c]} onChange={e => handleInputChange(est.id, c, e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)" }} /></div>
            ))}
            <div className="flex justify-center space-x-2 pt-2">
              <button onClick={() => abrirModal('editar', est)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Editar"><EditIcon className="w-5 h-5" /></button>
              <button onClick={() => abrirModal('eliminar', est)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Eliminar"><DeleteIcon className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
      </div>

      <ModalEE isOpen={modalOpen} onClose={() => setModalOpen(false)} 
      objeto={seleccionado?.nombre} 
      onAccion={onAccionConfirmada} accion={accion}/>

    </div>
  </div>
  );
};

export default Estudiante;
