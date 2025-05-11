import React, { useState } from 'react';
import ModalEE from '../Components/ModalEE.jsx';
import AgregarEstudiante from '../Components/AgregarEstudiante.jsx';
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
  const handleAgregarEstudiante = (nuevo) => {
  const nacimiento = new Date(nuevo.edad);
  const hoy = new Date();
  const edadCalculada = hoy.getFullYear() - nacimiento.getFullYear();
  const mesDiferencia = hoy.getMonth() - nacimiento.getMonth();

  const edadFinal = mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < nacimiento.getDate()) ? edadCalculada - 1 : edadCalculada;

  // Validaciones
  if (nacimiento.getFullYear() >= hoy.getFullYear()) {
    alert("La fecha de nacimiento no puede ser del año actual o posterior.");
    return;
  }
  if (edadFinal > 120) {
    alert("La edad no puede ser mayor a 120 años.");
    return;
  }

  const estudiante = { ...nuevo, edad: edadFinal };
  setEstudiantes(prev => [...prev, estudiante]);
  setIsModalAgregar(false);
};

  return (
    <div className="mt-4 p-5 rounded-[30px] shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff]" style={{ backgroundColor: "var(--secundary-background-color)", color: "var(--primary-text-color)" }}>
      <h1 className="text-xl font-bold mb-4 text-left">Estudiantes</h1>
      <div className="mb-4 w-full flex flex-col md:flex-row md:items-center gap-2">

        {/* Buscar */}
        <div className="relative w-full md:w-1/3">
          <input type="text" placeholder="Buscar estudiante..." value={busqueda} onChange={e => setBusqueda(e.target.value)} className="w-full pl-10 pr-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 text-sm" style={{ backgroundColor: "var(--primary-background-color)", borderColor: "var(--input-border-color)", color: "var(--primary-text-color)", outlineColor: "var(--sidebar-active-text)" }} />
          <button type="button" className="absolute inset-y-0 left-0 px-3 flex items-center text-gray-500 hover:text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 1 0-12 0 6 6 0 0 0 12 0z" /></svg>
          </button>
        </div>
        <button onClick={() => setIsModalAgregar(true)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Agregar Estudiante</button>
      </div>

      {/* Vista de escritorio */}
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full text-center">
          <thead style={{ backgroundColor: "var(--primary-background-color)", borderBottom: "2px solid var(--custom-border-color)" }}>
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Id</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Nombre</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Apellido</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Edad</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>EPS</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Dirección</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Teléfono</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Correo</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Filtrado Est */}
            {estudiantes.filter(est => Object.values(est).some(valor => typeof valor === 'string' && valor.toLowerCase().includes(busqueda.toLowerCase()))).map(est => (
              <tr key={est.id} style={{ backgroundColor: 'var(--primary-background-color)' }}>
                <td className="p-2">{est.id}</td>
                <td className="p-2">{est.nombre}</td>
                <td className="p-2">{est.apellido}</td>
                <td className="p-2">{est.edad}</td>
                {['eps','direccion','telefono','correo'].map(c => (
                  <td key={c} className="p-1">
                    <input type="text" value={est[c]} onChange={e => handleInputChange(est.id, c, e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--primary-background-color)", borderColor: "var(--input-border-color)", color: "var(--primary-text-color)" }} />
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
          <div key={est.id} className="space-y-2 p-4 rounded-lg shadow" style={{ backgroundColor: "var(--primary-background-color)", color: "var(--primary-text-color)" }}>
            {['id','nombre','apellido','edad'].map(c => (
              <div key={c}><label className="block text-sm font-semibold capitalize" style={{ color: "var(--secundary-text-color)" }}>{c}:</label><div className="text-center text-sm">{est[c]}</div></div>
            ))}
            {['eps','direccion','telefono','correo'].map(c => (
              <div key={c}><label className="block text-sm font-semibold capitalize" style={{ color: "var(--secundary-text-color)" }}>{c}:</label><input type="text" value={est[c]} onChange={e => handleInputChange(est.id, c, e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--primary-background-color)", borderColor: "var(--input-border-color)", color: "var(--primary-text-color)" }} /></div>
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

      <AgregarEstudiante isOpen={isModalAgregar} onClose={() => setIsModalAgregar(false)} 
      onAdd={handleAgregarEstudiante}/>
    </div>
  );
};

export default Estudiante;
