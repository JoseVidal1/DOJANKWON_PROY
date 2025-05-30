import { useState, useEffect, useRef } from "react";
import '../Components/input-style.css';
import { Plus } from "lucide-react";
import EditIcon from '../assets/icons/EditIcon.jsx';
import DeleteIcon from '../assets/icons/DeleteIcon.jsx';
import ModalConfirmacion from "../Components/ModalConfirmation.jsx";

const Prestamos = () => {
  const [productos, setProductos] = useState([
    /*{ id: 1, descripcion: 'Peto de combate', cantidad: 1 },
    { id: 2, descripcion: 'Paleta de entrenamiento', cantidad: 2 },
     */
  ]);
  const [detalles, setDetalles] = useState([]);

  // Cargar estudiantes desde API
  const [estudiantes, setEstudiantes] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5234/api/Estudiante')
      .then((response) => {
        if (!response.ok) throw new Error('Error al cargar los estudiantes');
        return response.json();
      })
      .then(data => setEstudiantes(data))
      .catch(err => console.error('Error al cargar estudiantes:', err));
  }, []);

  // Convertir estudiantes a formato para autocompletar
  const listaEstudiantes = estudiantes.map(est => ({
    id: est.id,
    nombreCompleto: est.nombres + " " + est.apellidos
  }));

  const listaArticulos = productos.map(prod =>({ 
    nombre: prod.nombre,
    id: prod.id
    }));
    useEffect(() => {
      fetch('http://localhost:5234/api/Articulo')
        .then((response) => {
          if (!response.ok) throw new Error('Error al cargar los artículos');
          return response.json();
        })
        .then(data => setProductos(data))
        .catch(err => console.error('Error al cargar artículos:', err));
    },[]);
  const [estudiante, setEstudiante] = useState(null);
  const [inputEstudiante, setInputEstudiante] = useState("");
  const [articulo, setArticulo] = useState("");
  const [sugerenciasEstudiante, setSugerenciasEstudiante] = useState([]);
  const [sugerenciasArticulo, setSugerenciasArticulo] = useState([]);
  const [indiceEstudiante, setIndiceEstudiante] = useState(-1);
  const [indiceArticulo, setIndiceArticulo] = useState(-1);

  const estudianteRef = useRef();
  const articuloRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (estudianteRef.current && !estudianteRef.current.contains(e.target)) {
        setSugerenciasEstudiante([]);
      }
      if (articuloRef.current && !articuloRef.current.contains(e.target)) {
        setSugerenciasArticulo([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Función para filtrar y mostrar sugerencias (para estudiantes)
  const handleInputAutoEstudiante = (valor) => {
    setInputEstudiante(valor);
    setEstudiante(null); // resetear estudiante seleccionado al escribir nuevo texto
    if (!valor) {
      setSugerenciasEstudiante([]);
      return;
    }
    const filtrados = listaEstudiantes.filter(item =>
      item.nombreCompleto.toLowerCase().includes(valor.toLowerCase())
    );
    setSugerenciasEstudiante(filtrados.slice(0, 6));
    setIndiceEstudiante(-1);
  };

  // Seleccionar estudiante desde sugerencias
  const seleccionarEstudiante = (est) => {
    setEstudiante(est);
    setInputEstudiante(est.nombreCompleto);
    setSugerenciasEstudiante([]);
    setIndiceEstudiante(-1);
  };

  // Mismo para artículos (solo nombres simples)
  const handleInputAutoArticulo = (valor) => {
    setArticulo(valor);
    if (!valor) {
      setSugerenciasArticulo([]);
      return;
    }
    const filtrados = listaArticulos.filter(item =>
      item.nombre.toLowerCase().includes(valor.toLowerCase())
    );
    setSugerenciasArticulo(filtrados.slice(0, 6));
    setIndiceArticulo(-1);
  };

  const seleccionarArticulo = (art) => {
    setArticulo(art);
    setSugerenciasArticulo([]);
    setIndiceArticulo(-1);
  };

  // Manejo de teclado para estudiantes
  const handleKeyDownEstudiante = (e) => {
    if (e.key === 'ArrowDown') {
      setIndiceEstudiante(i => Math.min(i + 1, sugerenciasEstudiante.length - 1));
    } else if (e.key === 'ArrowUp') {
      setIndiceEstudiante(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && indiceEstudiante >= 0) {
      e.preventDefault();
      seleccionarEstudiante(sugerenciasEstudiante[indiceEstudiante]);
    }
  };

  // Manejo de teclado para artículos
  const handleKeyDownArticulo = (e) => {
    if (e.key === 'ArrowDown') {
      setIndiceArticulo(i => Math.min(i + 1, sugerenciasArticulo.length - 1));
    } else if (e.key === 'ArrowUp') {
      setIndiceArticulo(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && indiceArticulo >= 0) {
      e.preventDefault();
      seleccionarArticulo(sugerenciasArticulo[indiceArticulo]);
    }
  };

  const [cantidad, setCantidad] = useState("");
  const [fechaDevolucion, setFechaDevolucion] = useState("");

  const handleRegistrar = () => {

    const nuevoDetalle = {
      id: Date.now(),
      idArticulo : articulo.id,
      descripcion: articulo.nombre,
      cantidad: parseInt(cantidad),
    };
    setDetalles(prev => [...prev, nuevoDetalle]);

    setArticulo(prev => ({ ...prev, nombre: "" }));
    setCantidad("");
    setSugerenciasEstudiante([]);
    setSugerenciasArticulo([]);
  };
const RegistrarPrestamo = () => {
  const hoy = new Date();
  const fechaPrestamoStr = formatDateOnly(hoy);
  const fechaDevolucionStr = formatDateOnly(new Date(fechaDevolucion)); // Asegúrate que `fechaDevolucion` es un Date válido

  const nuevoPrestamo = {
    estudianteId: estudiante.id,
    fechaPrestamo: fechaPrestamoStr,
    fechaDevolucion: fechaDevolucionStr,
    estado: "En prestamo",
    detallePrestamos: detalles.map(d => ({
      idArticulo: d.idArticulo,
      cantidad: d.cantidad
    }))
  };
  console.log(nuevoPrestamo);

  fetch('http://localhost:5234/api/Prestamo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( nuevoPrestamo ) // 👈 Esto depende de tu backend
  })
    .then(response => {
      if (!response.ok) throw new Error('Error al registrar el préstamo');
      return response.json();
    })
    .then(data => {
      console.log('Préstamo registrado:', data);
      setDetalles([]); // Limpiar detalles después de registrar
      setEstudiante(null); // Limpiar estudiante seleccionado
      setInputEstudiante("");
      setFechaDevolucion("");
      setArticulo("");
      setCantidad("");
    })
    .catch(err => console.error('Error al registrar préstamo:', err));
};

const formatDateOnly = (date) => {
  return date.toISOString().split('T')[0];
};
  // Editar, eliminar productos
  const handleInputChange = (id, field, value) => {
    setDetalles(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };
  const guardarProducto = (producto) => {};
  const eliminarProducto = (id) => {
    setDetalles(prev => prev.filter(p => p.id !== id));
  };

  // Modal y confirmación
  const [modalConfirmacionAbierto, setModalConfirmacionAbierto] = useState(false);
  const [accionActual, setAccionActual] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const manejarAccion = (accion, producto) => {
    setAccionActual(accion);
    setProductoSeleccionado(producto);
    setModalConfirmacionAbierto(true);
  };

  const confirmarAccion = () => {
    if (accionActual === "delete") {
      eliminarProducto(productoSeleccionado.id);
    } else if (accionActual === "edit") {
      guardarProducto(productoSeleccionado);
    }
    setModalConfirmacionAbierto(false);
  };

  return (
    <div className='relative pt-8 pb-4' style={{ backgroundColor: "var(--primary-dark-color)" }}>
      {/* Presentación */}
      <hr className="absolute top-1 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm font-bold ml-2 font-josefin' style={{ color: "var(--accent-dark-color)" }}>GESTION DE PRESTAMO</h1>
      <hr className="absolute top-12 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-7xl font-josefin mb-2 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>REGISTRO DE PRESTAMOS</h1>
      <hr className="w-[calc(100%+140px)] mx-[-70px] border-t border-[color:var(--secundary-dark-color)] mb-6" />
      <hr className="absolute left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <p className="font-josefin ml-2">Gestiona de forma <span style={{ color: "var(--accent-dark-color)" }}>eficiente</span> el préstamo de productos.<br />Controla el <span style={{ color: "var(--accent-dark-color)" }}>inventario</span> y asegura una entrega y devolución <span style={{ color: "var(--accent-dark-color)" }}>responsable</span>.</p>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='mt-10 text-sm font-bold ml-2 font-josefin' style={{ color: "var(--accent-dark-color)" }}>DATOS DE estudiante A PRESTAR</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      {/* Formulario */}
      <form className="w-full flex flex-wrap gap-x-6 gap-y-4 mt-10 px-4">

        {/* Estudiante */}
        <div className="w-full md:flex-1 flex flex-col min-w-0 relative" ref={estudianteRef}>
          <label htmlFor="estudiante" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">estudiante a Prestar</label>
          <input
            type="text"
            id="estudiante"
            name="estudiante"
            value={inputEstudiante}
            autocomplete="off"
            onChange={e => handleInputAutoEstudiante(e.target.value)}
            onKeyDown={handleKeyDownEstudiante}
            placeholder="Buscar estudiante..."
            required
            className="w-full bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition"
          />
          {sugerenciasEstudiante.length > 0 && (
            <ul className="absolute z-10 top-full mt-1 max-h-40 overflow-y-auto w-full bg-[var(--secundary-dark-color)] border border-gray-500 rounded text-white">
              {sugerenciasEstudiante.map((sug, idx) => (
                <li
                  key={sug.id}
                  onClick={() => seleccionarEstudiante(sug)}
                  className={`px-3 py-1 cursor-pointer hover:bg-[var(--accent-dark-color)] ${idx === indiceEstudiante ? "bg-[var(--accent-dark-color)]" : ""}`}
                >
                  {sug.nombreCompleto}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Fecha devolución */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="FechaDevolucion" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Fecha de Devolucion</label>
          <input
            type="date"
            id="FechaDevolucion"
            name="FechaDevolucion"
            value={fechaDevolucion}
            onChange={e => setFechaDevolucion(e.target.value)}
            required
            className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-[#757d80] p-1 focus:outline-none focus:border-b-[3px] transition"
          />
        </div>

        {/* Artículo */}
        <div className="w-full md:flex-1 flex flex-col min-w-0 relative" ref={articuloRef}>
          <label htmlFor="articulo" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Articulo</label>
          <input
            type="text"
            id="articulo"
            name="articulo"
            value={articulo.nombre}
            autocomplete="off"
            onChange={e => handleInputAutoArticulo(e.target.value)}
            onKeyDown={handleKeyDownArticulo}
            placeholder="Buscar artículo..."
            required
            className="w-full bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition"
          />
          {sugerenciasArticulo.length > 0 && (
            <ul className="absolute z-10 top-full mt-1 max-h-40 overflow-y-auto w-full bg-[var(--secundary-dark-color)] border border-gray-500 rounded text-white">
              {sugerenciasArticulo.map((sug, idx) => (
                <li
                  key={sug}
                  onClick={() => seleccionarArticulo(sug)}
                  className={`px-3 py-1 cursor-pointer hover:bg-[var(--accent-dark-color)] ${idx === indiceArticulo ? "bg-[var(--accent-dark-color)]" : ""}`}
                >
                  {sug.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cantidad */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="cantidad" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Cantidad</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            value={cantidad}
            onChange={e => setCantidad(e.target.value)}
            placeholder="Cantidad"
            required
            min={1}
            className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-[#757d80] p-1 focus:outline-none focus:border-b-[3px] transition"
          />
        </div>

        {/* Botón registrar */}
        <button
          type="button"
          onClick={handleRegistrar}
          className="btn flex items-center gap-1 mt-6 px-6"
        >
          <Plus size={16} /> Registrar
        </button>

      </form>
      {/*Presentacion tabla*/}
      <h1 className='text-sm ml-2 mt-10 font-bold font-josefin' style={{ color: "var(--accent-dark-color)" }}>taekwondo</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className="text-2xl sm:text-2xl ml-2 md:text-4xl lg:text-5xl font-josefin mb-1 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>TABLA DE PRESTAMOS</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      {/*Div Principal Tabl*/}
      <div className="p-5 mt-1">
        <div className="w-full flex justify-end mt-1 mb-5">
          <button onClick={RegistrarPrestamo} className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md px-6 font-medium transition hover:scale-105 duration-300" style={{ backgroundColor: "var(--terceary-dark-color)", color: "var(--text-dark-color)" }}>
            <span>Registrar Prestamo</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8" style={{ backgroundColor: "var(--accent-dark-color" }}></div>
            </div>
          </button>
        </div>

        {/*Tabla Pantalla*/}
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full text-center shadow-lg border border-[color:var(--terceary-dark-color)]">
            <thead style={{ backgroundColor: "var(--secundary-dark-color)", borderBottom: "1px solid var(--terceary-dark-color)" }}>
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color)" }}>Descripción</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color)" }}>Cantidad</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color)" }}>Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4b607f]">
              {detalles.map((detalle) => (
                <tr key={detalle.id} style={{ backgroundColor: 'var(--sidebar-dark-hover)' }}>
                  <td className="p-2">{detalle.descripcion}</td>
                  <td className="p-2"><input type="number" value={detalle.cantidad} onChange={e => handleInputChange(detalle.id, 'cantidad', e.target.value)} className="w-24 rounded px-1 py-0.5 text-sm text-center" style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)" }} /></td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button onClick={() => manejarAccion("delete",detalle)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Eliminar producto"><DeleteIcon className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*Tabla Movil / Tarketa*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {detalles.map((detalle) => (
            <div key={detalle.id} className="bg-white space-y-3 p-4 rounded-lg shadow" style={{ backgroundColor: "var(--secundary-dark-color)", color: "var(--text-dark-color)" }}>
              {["descripcion", "cantidad"].map((field) => {
                const isEditable = field === "cantidad";
                const fieldValue = detalle[field] ?? "";
                return (
                  <div key={field} className="text-sm text-center">
                    <label className="block font-semibold capitalize" style={{ color: "var(--secundary-text-color)" }}>{field}:</label>
                    {isEditable ? (
                      <input type="number" value={fieldValue} onChange={(e) => handleInputChange(detalle.id, field, e.target.value)}
                        className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)" }} />
                    ) : (
                      <span className="text-right">{fieldValue || "-"}</span>
                    )}
                  </div>
                );
              })}
              <div className="flex justify-center space-x-2 pt-2">
                <button onClick={() => manejarAccion("edit",detalle)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Guardar cambios">
                  <EditIcon className="w-5 h-5" />
                </button>
                <button onClick={() => manejarAccion("delete",detalle)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Eliminar producto">
                  <DeleteIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/*modal*/}
        <ModalConfirmacion
          isOpen={modalConfirmacionAbierto}
          onClose={() => setModalConfirmacionAbierto(false)}
          onConfirm={confirmarAccion}
          actionType={accionActual}
          dataType="detalle"
        />
      </div>
    </div>
  );
};

export default Prestamos;
