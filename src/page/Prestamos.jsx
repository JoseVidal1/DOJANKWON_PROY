import { useState, useEffect, useRef } from "react";
import '../Components/input-style.css';
import { Plus } from "lucide-react";
import EditIcon from '../assets/icons/EditIcon.jsx';
import DeleteIcon from '../assets/icons/DeleteIcon.jsx';
import ModalConfirmacion from "../Components/ModalConfirmation.jsx";

const Prestamos = () => {
  const [productos, setProductos] = useState([
    { id: 1, descripcion: 'Peto de combate', cantidad: 1 },
    { id: 2, descripcion: 'Paleta de entrenamiento', cantidad: 2 },
  ]);

  //Filtros Buscador en los inputs 
  const listaClientes = [
    "Carlos Ramírez", "Laura Pérez", "Andrea Gómez", "José Martínez",
  "Mariana López", "Diego Fernández", "Sofía Herrera", "Luis Castro",
  "Valeria Morales", "Juan Torres", "Camila Mendoza", "Sebastián Rivas",
  "Daniela Salazar", "Gabriel Ortega", "Isabela Núñez", "Felipe Vargas",
  "Lucía Cordero", "Alejandro Paredes", "Paula Navarro", "Emilio Duarte",
  "Natalia Peña"
];

  const listaArticulos = [
    "Peto de proteccion", "Paletas de Entrenamiento", "Guantes", "Cascos", "Gorras", "Balones"
  ];

  const [cliente, setCliente] = useState("");
  const [articulo, setArticulo] = useState("");
  const [sugerenciasCliente, setSugerenciasCliente] = useState([]);
  const [sugerenciasArticulo, setSugerenciasArticulo] = useState([]);
  const [indiceCliente, setIndiceCliente] = useState(-1);
  const [indiceArticulo, setIndiceArticulo] = useState(-1);

   const clienteRef = useRef();
  const articuloRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (clienteRef.current && !clienteRef.current.contains(e.target)) {
        setSugerenciasCliente([]);
      }
      if (articuloRef.current && !articuloRef.current.contains(e.target)) {
        setSugerenciasArticulo([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputAuto = (valor, setValor, lista, setSugerencias, setIndice) => {
    setValor(valor);
    const filtrados = lista.filter((item) => item.toLowerCase().includes(valor.toLowerCase()));
    setSugerencias(filtrados.slice(0, 6));
    setIndice(-1);
  };

  const handleKeyDownAuto = (e, sugerencias, indice, setIndice, setValor, setSugerencias) => {
    if (e.key === 'ArrowDown') setIndice(prev => Math.min(prev + 1, sugerencias.length - 1));
    else if (e.key === 'ArrowUp') setIndice(prev => Math.max(prev - 1, 0));
    else if (e.key === 'Enter' && indice >= 0) {
      e.preventDefault();
      setValor(sugerencias[indice]);
      setSugerencias([]);
    }
  };

  
const [cantidad, setCantidad] = useState("");
const [fechaDevolucion, setFechaDevolucion] = useState("");

const handleRegistrar = () => {
  if (!cliente || !articulo || !cantidad || !fechaDevolucion) {
    alert("Completa todos los campos antes de registrar.");
    return;
  }

  const nuevoPrestamo = {
    id: Date.now(),
    descripcion: `${articulo} - ${cliente}`,
    cantidad: parseInt(cantidad),
    fechaDevolucion
  };

  setProductos(prev => [...prev, nuevoPrestamo]);

  // Limpiar campos
  setCliente("");
  setArticulo("");
  setCantidad("");
  setFechaDevolucion("");
  setSugerenciasCliente([]);
  setSugerenciasArticulo([]);
};

const [modalPrestamoAbierto, setModalPrestamoAbierto] = useState(false);
  const [productoParaPrestamo, setProductoParaPrestamo] = useState(null);

  const handleInputChange = (id, field, value) => {
    setProductos(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };
  const guardarProducto = (producto) => {};
  const eliminarProducto = (id) => { setProductos((prev) => prev.filter((p) => p.id !== id)); };
  const registrarPrestamo = (prestamo) => { setModalPrestamoAbierto(false); };

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

      {/*Presentacion*/}
      <hr className="absolute top-1 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>GESTION DE PRESTAMO</h1>
      <hr className="absolute top-12 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-7xl font-josefin mb-2 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>REGISTRO DE PRESTAMOS</h1>
      <hr className="w-[calc(100%+140px)] mx-[-70px] border-t border-[color:var(--secundary-dark-color)] mb-6" />
      <hr className="absolute left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <p className="font-josefin ml-2">Gestiona de forma <span style={{ color: "var(--accent-dark-color)" }}>eficiente</span> el préstamo de productos.<br />Controla el <span style={{ color: "var(--accent-dark-color)" }}>inventario</span> y asegura una entrega y devolución <span style={{ color: "var(--accent-dark-color)" }}>responsable</span>.</p>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className=' mt-10 text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>DATOS DE CLIENTE A PRESTAR</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      {/*Form*/}
        <form className="w-full flex flex-wrap gap-x-6 gap-y-4 mt-10 px-4">

        {/*Cliente*/}
        <div className="w-full md:flex-1 flex flex-col min-w-0 relative" ref={clienteRef}>
          <label htmlFor="cliente" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Cliente a Prestar</label>
          <input type="text" id="cliente" name="cliente" value={cliente}
            onChange={(e) => handleInputAuto(e.target.value, setCliente, listaClientes, setSugerenciasCliente, setIndiceCliente)}
            onKeyDown={(e) => handleKeyDownAuto(e, sugerenciasCliente, indiceCliente, setIndiceCliente, setCliente, setSugerenciasCliente)}
            placeholder="Buscar cliente..." required className="w-full bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
          {sugerenciasCliente.length > 0 && (
            <ul className="absolute z-10 top-full mt-1 max-h-40 overflow-y-auto w-full bg-[var(--secundary-dark-color)] border border-gray-500 rounded text-white">
              {sugerenciasCliente.map((sug, idx) => (
                <li key={idx} onClick={() => { setCliente(sug); setSugerenciasCliente([]); }} className={`px-3 py-1 cursor-pointer hover:bg-[var(--accent-dark-color)] ${idx === indiceCliente ? "bg-[var(--accent-dark-color)]" : ""}`}>
                  {sug}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/*Fecha devolución*/}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="FechaDevolucion" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Fecha de Devolucion</label>
          <input type="date" id="FechaDevolucion" name="FechaDevolucion" value={fechaDevolucion} onChange={(e) => setFechaDevolucion(e.target.value)} required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-[#757d80] p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>

        {/*Articulo*/}
        <div className="w-full md:flex-1 flex flex-col min-w-0 relative" ref={articuloRef}>
          <label htmlFor="articulo" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Artículo</label>
          <input type="text" id="articulo" name="articulo" value={articulo}
            onChange={(e) => handleInputAuto(e.target.value, setArticulo, listaArticulos, setSugerenciasArticulo, setIndiceArticulo)}
            onKeyDown={(e) => handleKeyDownAuto(e, sugerenciasArticulo, indiceArticulo, setIndiceArticulo, setArticulo, setSugerenciasArticulo)}
            placeholder="Buscar artículo..." required className="w-full bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
          {sugerenciasArticulo.length > 0 && (
            <ul className="absolute z-10 top-full mt-1 max-h-40 overflow-y-auto w-full bg-[var(--secundary-dark-color)] border border-gray-500 rounded text-white">
              {sugerenciasArticulo.map((sug, idx) => (
                <li key={idx} onClick={() => { setArticulo(sug); setSugerenciasArticulo([]); }} className={`px-3 py-1 cursor-pointer hover:bg-[var(--accent-dark-color)] ${idx === indiceArticulo ? "bg-[var(--accent-dark-color)]" : ""}`}>
                  {sug}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/*Cantidad*/}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="cantidad" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">cantidad</label>
          <input type="text" id="cantidad" name="cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} placeholder="Cantidad a Prestar" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>

        {/* Btin registrar prstamo INPUTS*/}
        <div className="flex items-end">
          <button type="button" onClick={handleRegistrar} className="flex items-center gap-2 px-4 py-2 rounded-md transition hover:scale-105 duration-300" style={{ backgroundColor: "var(--terceary-dark-color)", color: "var(--text-dark-color)" }}>
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>


      {/*Presentacion tabla*/}
      <h1 className='text-sm ml-2 mt-10 font-bold font-josefin' style={{ color: "var(--accent-dark-color)" }}>taekwondo</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className="text-2xl sm:text-2xl ml-2 md:text-4xl lg:text-5xl font-josefin mb-1 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>TABLA DE PRESTAMOS</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      {/*Div Principal Tabl*/}
      <div className="p-5 mt-1">
        <div className="w-full flex justify-end mt-1 mb-5">
          <button className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md px-6 font-medium transition hover:scale-105 duration-300" style={{ backgroundColor: "var(--terceary-dark-color)", color: "var(--text-dark-color)" }}>
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
              {productos.map((producto) => (
                <tr key={producto.id} style={{ backgroundColor: 'var(--sidebar-dark-hover)' }}>
                  <td className="p-2">{producto.descripcion}</td>
                  <td className="p-2"><input type="number" value={producto.cantidad} onChange={e => handleInputChange(producto.id, 'cantidad', e.target.value)} className="w-24 rounded px-1 py-0.5 text-sm text-center" style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)" }} /></td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button onClick={() => manejarAccion("delete",producto)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Eliminar producto"><DeleteIcon className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*Tabla Movil / Tarketa*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {productos.map((producto) => (
            <div key={producto.id} className="bg-white space-y-3 p-4 rounded-lg shadow" style={{ backgroundColor: "var(--secundary-dark-color)", color: "var(--text-dark-color)" }}>
              {["descripcion", "cantidad"].map((field) => {
                const isEditable = field === "cantidad";
                const fieldValue = producto[field] ?? "";
                return (
                  <div key={field} className="text-sm text-center">
                    <label className="block font-semibold capitalize" style={{ color: "var(--secundary-text-color)" }}>{field}:</label>
                    {isEditable ? (
                      <input type="number" value={fieldValue} onChange={(e) => handleInputChange(producto.id, field, e.target.value)}
                        className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)" }} />
                    ) : (
                      <span className="text-right">{fieldValue || "-"}</span>
                    )}
                  </div>
                );
              })}
              <div className="flex justify-center space-x-2 pt-2">
                <button onClick={() => manejarAccion("edit",producto)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Guardar cambios">
                  <EditIcon className="w-5 h-5" />
                </button>
                <button onClick={() => manejarAccion("delete",producto)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Eliminar producto">
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
          dataType="producto"
        />
      </div>
    </div>
  );
};

export default Prestamos;
