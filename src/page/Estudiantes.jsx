import React, { use, useEffect, useState } from 'react';
//import AgregarEstudiante from '../Components/AgregarEstudiante.jsx';
import EditIcon from '../assets/icons/EditIcon.jsx';
import DeleteIcon from '../assets/icons/DeleteIcon.jsx';
import ModalConfirmacion from "../Components/ModalConfirmation.jsx";

const Estudiante = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [rangos, setRangos] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5234/api/Rango')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar los rangos');
        }
        return response.json();
      })
      .then((data) => {
        setRangos(data);
      })
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [accion, setAccion] = useState('');
  const [seleccionado, setSeleccionado] = useState(null);
  const [isModalAgregar, setIsModalAgregar] = useState(false);

  // Estado para el formulario de nuevo estudiante
  const [nuevoEst, setNuevoEst] = useState({
    id: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    eps: '',
    direccion: '',
    telefono: '',
    correo: ''
  });
useEffect(() => {
    // Cargar usuarios desde la API al montar el componente
    fetch('http://localhost:5234/api/Estudiante')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar los usuarios');
        }
        return response.json();
      })
      .then((data) => {
        setEstudiantes(data);
      })
      .catch((error) => {
        console.error('Error al cargar usuarios:', error);
      });
  }, []);

  const handleInputChange = (id, campo, valor) => {
    setEstudiantes(prev => prev.map(est => est.id === id ? { ...est, [campo]: valor } : est));
  };

const handleFormChange = (e) => {
  const { name, value } = e.target;
  const nuevoValor =
    name === 'fechaNacimiento' ? formatearFecha(value) : value;

  setNuevoEst((prev) => ({
    ...prev,
    [name]: nuevoValor
  }));
};

  function formatearFecha(fecha) {
  const d = new Date(fecha);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

  // Agregar estudiante desde el formulario
  const handleAgregarEstudiante = (e) => {
    e.preventDefault();
  const form = e.target;

  const nuevoEst = {
    id: form.id.value,
    nombres: form.nombre.value,
    apellidos: form.apellido.value,
    fechaNacimiento: form.fechaNacimiento.value,
    eps: form.eps.value,
    direccion: form.direccion.value,
    telefono: form.telefono.value,
    correo: form.correo.value,
    idRango: form.rango.value
  };
  console.log(nuevoEst);

  fetch('http://localhost:5234/api/Estudiante', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(nuevoEst),
})
  .then(async (response) => {
    if (!response.ok) {
      const errorText = await response.text(); // <-- leer texto del backend
      throw new Error(errorText || 'Error al agregar el estudiante');
    }
    return response.json();
  })
  .then((data) => {
    console.log('Estudiante agregado:', data);
    setEstudiantes((prev) => [...prev, data]);
    form.reset(); // Limpia el formulario
  })
  .catch((error) => {
    console.error('Error al agregar estudiante:', error.message);
  });
  };

  // campo de buscar
  const [busqueda, setBusqueda] = useState('');

  //modales
  const abrirModal = (tipo, estudiante) => {
    setAccion(tipo); setSeleccionado(estudiante); setModalOpen(true);
  };

  // Confirmar eliminar o editar
  const onAccionConfirmada = () => {
    if (accion === "eliminar")
      setEstudiantes((prev) =>
        prev.filter((est) => est.id !== seleccionado.id)
      );
    setModalOpen(false);
  };

   // Estado para el modal de confirmación
  const [modalConfirmacionAbierto, setModalConfirmacionAbierto] =
    useState(false);
  const [accionActual, setAccionActual] = useState(null);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);

  const manejarAccion = (accion, estudiante) => {
    setAccionActual(accion);
    setEstudianteSeleccionado(estudiante);
    setModalConfirmacionAbierto(true);
  };
const DeleteE=(id)=>{
  fetch(`http://localhost:5234/api/Estudiante/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        setEstudiantes((prev) => prev.filter((e) => e.id !== id));
      })
      .catch((error) => {
        console.error('Error al eliminar estudiante:', error);
      });
 };
 const EditE = (estudiante) => {
  fetch(`http://localhost:5234/api/Estudiante`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(estudiante),
  })
    .then((response) => {
      if (!response.ok) {
        const errorText = response.statusText || 'Error al actualizar el estudiante';
        throw new Error(errorText);
      }
      return response.json();
    })
    .then((data) => {
      setEstudiantes((prev) =>
        prev.map((est) => (est.id === estudiante.id ? { ...est, ...data } : est))
      );
      setModalConfirmacionAbierto(false);
    })
    .catch((error) => {
      console.error('Error al actualizar estudiante:', error);
    });
};
  const confirmarAccion = () => {
    if (accionActual === "delete") {
      DeleteE(estudianteSeleccionado.id);
    }else{
      EditE(estudianteSeleccionado);
    }
    setModalAbierto(false);
  };

  return (
    <div className='relative pt-8 pb-4' style={{ backgroundColor: "var(--primary-dark-color)" }}>

      {/*Presentacion*/}
      <hr className="absolute top-1 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>GESTION DE ESTUDIANTES</h1>
      <hr className="absolute top-12 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-7xl font-josefin mb-2 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>REGISTRAR ESTUDIANTES</h1>
      <hr className="w-[calc(100%+140px)] mx-[-70px] border-t border-[color:var(--secundary-dark-color)] mb-6" /> {/* Lineas decorativas verticales debajo */}
      <hr className="absolute left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <p className='ml-2 font-josefin'>Administra de forma <span style={{ color: "var(--accent-dark-color)" }}>eficiente</span> la información académica de los estudiantes.<br />Controla su <span style={{ color: "var(--accent-dark-color)" }}>progreso</span> y gestiona sus datos de forma <span style={{ color: "var(--accent-dark-color)" }}>centralizada</span>.</p>
      <hr className=" left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className=' mt-10 text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>DATOS DE USUARIO</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      
      {/* datos para agregar Estudiantes*/}
      <form className="w-full flex flex-wrap gap-x-6 gap-y-4 mt-10 px-4" onSubmit={handleAgregarEstudiante}>

        <div className="w-full flex flex-wrap gap-x-6 gap-y-4">
        {/* ID */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="id" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">ID</label>
          <input type="text" name="id" placeholder="Cédula" value={nuevoEst.id} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        {/* Nombre */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="nombre" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">NOMBRE</label>
          <input type="text" name="nombre" placeholder="Nombres" value={nuevoEst.nombre} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        {/* Apellido */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="apellido" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">APELLIDO</label>
          <input type="text" name="apellido" placeholder="Apellidos" value={nuevoEst.apellido} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        </div>

        <div className="w-full flex flex-wrap gap-x-6 gap-y-4">
        {/* Edad (fecha de nacimiento) */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="edad" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">FECHA NACIMIENTO</label>
          <input type="date" name="fechaNacimiento" value={nuevoEst.fechaNacimiento} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        {/* EPS */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="eps" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">EPS</label>
          <input type="text" name="eps" placeholder="EPS" value={nuevoEst.eps} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        {/* Direccion */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="direccion" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">DIRECCION</label>
          <input type="text" name="direccion" placeholder="Dirección" value={nuevoEst.direccion} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        </div>

        <div className="w-full flex flex-wrap gap-x-6 gap-y-4">
        {/* Telefono */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="telefono" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">TELEFONO</label>
          <input type="text" name="telefono" placeholder="Teléfono" value={nuevoEst.telefono} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        {/* Correo */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="correo" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Correo</label>
          <input type="email" name="correo" placeholder="Correo" value={nuevoEst.correo} onChange={handleFormChange} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        {/*Rango*/}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="rango" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Rango</label>
          <select name="rango" className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition">
            <option className='bg-gray-600' value="" disabled selected>Seleccione un rango</option>
            {rangos.map((rango) => (
              <option className='bg-gray-600' key={rango.id} value={rango.id}>{rango.nombre}</option>
            ))}
          </select>
        </div>
        </div>
        
        <div className="w-full flex justify-center mt-6">
          <button type="submit" className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md px-6 font-medium transition hover:scale-105 duration-300" style={{backgroundColor: "var(--terceary-dark-color)", color: "var(--text-dark-color)"}}>
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
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Grupo</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Rango</th>
              <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4b607f]">
            {/* Filtrado Est */}
            {estudiantes.filter(est => Object.values(est).some(valor => typeof valor === 'string' && valor.toLowerCase().includes(busqueda.toLowerCase()))).map(est => (
              <tr key={est.id} style={{ backgroundColor: 'var(--sidebar-dark-hover)' }}>
                <td className="p-2">{est.id}</td>
                <td className="p-2">{est.nombres}</td>
                <td className="p-2">{est.apellidos}</td>
                <td className="p-2">{est.edad}</td>
                {['eps','direccion','telefono','correo'].map(c => (
                  <td key={c} className="p-1">
                    <input type="text" value={est[c]} onChange={e => handleInputChange(est.id, c, e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)" }} />
                  </td>
                ))}
                <td className="p-2">{est.idGrupoNavigation.nombre}</td> 
                <td className="p-2">{est.idRangoNavigation.nombre}</td>
                <td className="p-3 flex justify-center space-x-2">
                  <button onClick={() => manejarAccion("edit", est)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Editar"><EditIcon className="w-5 h-5" /></button>
                  <button onClick={() => manejarAccion("delete", est)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Eliminar"><DeleteIcon className="w-5 h-5" /></button>
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
            {['id','nombres','apellidos','edad'].map(c => (
              <div key={c}><label className="block text-sm font-semibold capitalize" style={{ color: "var(--secundary-text-color)" }}>{c}:</label><div className="text-center text-sm">{est[c]}</div></div>
            ))}
            {['eps','direccion','telefono','correo'].map(c => (
              <div key={c}><label className="block text-sm font-semibold capitalize" style={{ color: "var(--secundary-text-color)" }}>{c}:</label>
              <input type="text" value={est[c]} onChange={e => handleInputChange(est.id, c, e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)" }} /></div>
            ))}
            <div>
              <label className="block text-sm font-semibold capitalize" style={{ color: "var(--secundary-text-color)" }}>Grupo:</label>
              <div className="text-center text-sm">{est.idGrupoNavigation.nombre}</div>
            </div>
            <div>
              <label className="block text-sm font-semibold capitalize" style={{ color: "var(--secundary-text-color)" }}>Rango:</label>
              <div className="text-center text-sm">{est.idRangoNavigation.nombre}</div>
            </div>
            <div className="flex justify-center space-x-2 pt-2">
              <button onClick={() => manejarAccion("edit", est)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Editar"><EditIcon className="w-5 h-5" /></button>
              <button onClick={() => manejarAccion("delete", est)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Eliminar"><DeleteIcon className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal de confirmación para editar/eliminar */}
        <ModalConfirmacion
          isOpen={modalConfirmacionAbierto}
          onClose={() => setModalConfirmacionAbierto(false)}
          onConfirm={confirmarAccion}
          actionType={accionActual}
          dataType="estudiante"/>
     </div>
   </div>
  );
};

export default Estudiante;
