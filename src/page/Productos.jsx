import React, { useState } from 'react';
import '../Components/input-style.css';
import EditIcon from '../assets/icons/EditIcon.jsx';
import DeleteIcon from '../assets/icons/DeleteIcon.jsx';
import PrestamoIcon from '../assets/icons/PrestamoIcon.jsx';
import PrestamoModal from '../Components/PrestamoModal';
//import { Delete } from 'lucide-react';

const Productos = () => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Balón', descripcion: 'Balón de fútbol', categoria: 'Deporte', disponibilidad: 'Disponible', cantidad: 5, fechaDisponibilidad: '', duracionPrestamo: 7 },
    { id: 2, nombre: 'Raqueta', descripcion: 'Raqueta de tenis', categoria: 'Deporte', disponibilidad: 'Prestado', cantidad: 2, fechaDisponibilidad: '2025-05-15', duracionPrestamo: 3 }
  ]);
  const [modalPrestamoAbierto, setModalPrestamoAbierto] = useState(false);
  const [productoParaPrestamo, setProductoParaPrestamo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleInputChange = (id, field, value) => {
    setProductos(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };
  const guardarProducto = (producto) => {/*Logica para guardar cambios*/};
  const eliminarProducto = (id) => { setProductos(prev => prev.filter(p => p.id !== id)); };
  const abrirModalPrestamo = (producto) => { setProductoParaPrestamo(producto); setModalPrestamoAbierto(true); };
  const registrarPrestamo = (prestamo) => { setModalPrestamoAbierto(false); };

  return (
    <div className='relative pt-8 pb-4' style={{ backgroundColor: "var(--primary-dark-color)" }}>

      {/* Presentacion */}
      <hr className="absolute top-1 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>GESTION DE PRESTAMO</h1>
      <hr className="absolute top-12 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-7xl font-josefin mb-2 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>AGREGAR PRODUCTO</h1>
      <hr className="w-[calc(100%+140px)] mx-[-70px] border-t border-[color:var(--secundary-dark-color)] mb-6" /> {/* Lineas decorativas verticales debajo */}
      <hr className="absolute left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <p className="font-josefin ml-2">Gestiona de forma <span style={{ color: "var(--accent-dark-color)" }}>eficiente</span> el préstamo de productos.<br />Controla el <span style={{ color: "var(--accent-dark-color)" }}>inventario</span> y asegura una entrega y devolución <span style={{ color: "var(--accent-dark-color)" }}>responsable</span>.</p>
      <hr className=" left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className=' mt-10 text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>DATOS DE PRODUCTO</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      {/* datos para agregar usuario*/}
      <form className="w-full flex flex-wrap gap-x-6 gap-y-4 mt-10 px-4">
        
        {/* Producto */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="producto" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Producto</label>
          <input type="text" id="producto" name="producto" placeholder="Producto" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        
        {/* Descripción */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="descripcion" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Descripción</label>
          <input type="text" id="descripcion" name="descripcion" placeholder="Descripción" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        
        {/* Categoría */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="categoria" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Categoría</label>
          <input type="text" id="categoria" name="categoria" placeholder="Categoría" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        
        {/* Cantidad */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="cantidad" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Cantidad</label>
          <input type="number" id="cantidad" name="cantidad" placeholder="Cantidad" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        
        {/* Duración del préstamo */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="duracion" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Duración del Préstamo</label>
          <input type="text" id="duracion" name="duracion" placeholder="Ej: 3 días" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>

        {/* boton*/}
        <div className="w-full flex justify-center mt-6">
          <button  className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md px-6 font-medium transition hover:scale-105 duration-300" style={{ backgroundColor:"var(--terceary-dark-color)", tercearyColor: "var(--terceary-dark-color)", color : "var(--text-dark-color)" }}>
            <span>Agregar Producto</span>
           <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
             <div className="relative h-full w-8 bg-white/20"></div>
           </div>
          </button>
        </div>
      </form>

      {/* Presentacion tabla */}
      <h1 className='text-sm ml-2 mt-20  font-josefin' style={{ color: "var(--accent-dark-color)" }}>taekwondo</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className="text-2xl sm:text-2xl ml-2 md:text-4xl lg:text-5xl font-josefin mb-1 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>TABLA DE PRODUCTOS</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

    {/* div principal tabla */}
    <div className="p-5 mt-10">
      {/* BUscar Producto */}
      <div className="mb-4 w-full flex flex-col md:flex-row md:items-center gap-2">
        <div className="relative w-full md:w-1/3">
          <input type="text" placeholder="Buscar Producto..." className="w-full pl-10 pr-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 text-sm" style={{ backgroundColor: "var(--sidebar-dark-hover)", borderColor: "var(--terceary-dark-color)", color: "var(--text-dark-color)", outlineColor: "var(--terceary-dark-color)" }} />
          <button type="button" className="absolute inset-y-0 left-0 px-3 flex items-center text-[#F44E1C] hover:text-[#f44e1c66]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 1 0-12 0 6 6 0 0 0 12 0z" />
            </svg>
          </button>
        </div>
      </div>


        {/* Tabla de productos */}
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full text-center shadow-lg border border-[color:var(--terceary-dark-color)]">
            <thead style={{backgroundColor: "var(--secundary-dark-color)", borderBottom: "1px solid var(--terceary-dark-color)"}}>
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Producto</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Descripción</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Categoría</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Disponibilidad</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Cantidad</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Fecha de Disponibilidad</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Duración del Préstamo</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color" }}>Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4b607f]">
              {productos.map((producto) => (
                <tr key={producto.id} style={{ backgroundColor: 'var(--sidebar-dark-hover)' }}>
                  <td className="p-2"><input type="text" value={producto.nombre} onChange={e => handleInputChange(producto.id, 'nombre', e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)"}} /></td>
                  <td className="p-2"><input type="text" value={producto.descripcion} onChange={e => handleInputChange(producto.id, 'descripcion', e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)"}} /></td>
                  <td className="p-2"><input type="text" value={producto.categoria} onChange={e => handleInputChange(producto.id, 'categoria', e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)"}}  /></td>
                  <td className="p-2"><input type="text" value={producto.disponibilidad} onChange={e => handleInputChange(producto.id, 'disponibilidad', e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center"  style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)"}}  /></td>
                  <td className="p-2"><input type="number" value={producto.cantidad} onChange={e => handleInputChange(producto.id, 'cantidad', e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center"  style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)"}} /></td>
                  <td className="p-2"><input type="date" value={producto.fechaDisponibilidad} onChange={e => handleInputChange(producto.id, 'fechaDisponibilidad', e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center"  style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)"}} /></td>
                  <td className="p-2"><input type="number" value={producto.duracionPrestamo} onChange={e => handleInputChange(producto.id, 'duracionPrestamo', e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center"  style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)"}} /></td>
                  
                  {/* Editar, Eliminar y Presstmo */}
                  <td className="p-3 flex justify-center space-x-2">
                    <button onClick={() => guardarProducto(producto)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Guardar cambios"><EditIcon alt="Editar" className="w-5 h-5" /></button>
                    <button onClick={() => eliminarProducto(producto.id)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Eliminar producto"><DeleteIcon alt="Eliminar" className="w-5 h-5" /></button>
                    <button onClick={() => abrirModalPrestamo(producto)} className="p-1 text-sm bg-blue-600 rounded hover:bg-blue-800" title="Solicitar préstamo"><PrestamoIcon className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tarjetas para movil */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {productos.map((producto) => (
            <div key={producto.id} className="bg-white space-y-3 p-4 rounded-lg shadow" style={{backgroundColor: "var(--secundary-dark-color)", color: "var(--text-dark-color)" }}>
              {["nombre", "descripcion", "categoria", "disponibilidad", "cantidad", "fechaDisponibilidad", "duracionPrestamo"].map((field) => (
                <div key={field} className="text-sm text-center">
                  <label className="block font-semibold capitalize" style={{ color: "var(--secundary-text-color)" }}>{field}:</label>
                  <input
                    type={field === "cantidad" || field === "duracionPrestamo" ? "number" : field === "fechaDisponibilidad" ? "date" : "text"}
                    value={producto[field]}
                    onChange={(e) => handleInputChange(producto.id, field, e.target.value)}
                    className="w-full rounded px-2 py-1 text-sm text-center"
                    style={{
                      backgroundColor: "var(--secundary-dark-color)",
                      borderColor: "var(--accent-dark-color)",
                      color: "var(--text-dark-color)"
                    }}
                  />
                </div>
              ))}

              {/* Acciones */}
              <div className="flex justify-center space-x-2 pt-2">
                <button onClick={() => guardarProducto(producto)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Guardar cambios">
                  <EditIcon className="w-5 h-5" />
                </button>
                <button onClick={() => eliminarProducto(producto.id)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Eliminar producto">
                  <DeleteIcon alt="Eliminar" className="w-5 h-5" />
                </button>
                
                <button onClick={() => abrirModalPrestamo(producto)} className="p-1 text-sm bg-blue-600 rounded hover:bg-blue-800" title="Solicitar préstamo">
                  <PrestamoIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Modal para gestionar el préstamo */}
        {modalPrestamoAbierto && (
          <PrestamoModal productoSeleccionado={productoParaPrestamo} onClose={() => setModalPrestamoAbierto(false)} onSubmit={registrarPrestamo} />
        )}
      </div>
    </div>
  );
};

export default Productos;