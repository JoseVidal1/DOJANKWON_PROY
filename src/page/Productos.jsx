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
    <>
      <h1 className="text-2xl mb-2 font-bold text-left" style={{ color: "var(--primary-text-color)" }}>Gestión de Prestamo</h1>
      <p className="" style={{ color: "var(--secundary-text-color)" }}>Administración de productos e inventario.</p>
      <div className="mt-4 p-5 rounded-[30px] shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff]" style={{ backgroundColor: "var(--secundary-background-color)", color: "var(--primary-text-color)" }}>
        <h1 className="text-xl font-bold mb-4 text-left">Productos</h1>
        
        <div className="mb-4 w-full flex flex-col md:flex-row md:items-center gap-2"> 
          <div className="relative w-full md:w-1/3">
            <input type="text" placeholder="Buscar Producto..." className="w-full pl-10 pr-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 text-sm" style={{ backgroundColor: "var(--primary-background-color)", borderColor: "var(--input-border-color)", color: "var(--primary-text-color)", outlineColor: "var(--sidebar-active-text)" }} />
            <button type="button" className="absolute inset-y-0 left-0 px-3 flex items-center text-gray-500 hover:text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 1 0-12 0 6 6 0 0 0 12 0z" /></svg>
            </button>
          </div>

          {/*Registrar prestamo producto*/}
          <button onClick={() => setModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Agregar Producto</button>
        </div>

        {/* Tabla de productos */}
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full text-center">
            <thead style={{ backgroundColor: "var(--primary-background-color)", borderBottom: "2px solid var(--custom-border-color)" }}>
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Producto</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Descripción</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Categoría</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Disponibilidad</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Cantidad</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Fecha de Disponibilidad</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Duración del Préstamo</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {productos.map((producto) => (
                <tr key={producto.id} style={{ backgroundColor: 'var(--primary-background-color)' }}>
                  <td className="p-2"><input type="text" value={producto.nombre} onChange={e => handleInputChange(producto.id, 'nombre', e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--primary-background-color)", borderColor: "var(--input-border-color)", color: "var(--primary-text-color)" }} /></td>
                  <td className="p-2"><input type="text" value={producto.descripcion} onChange={e => handleInputChange(producto.id, 'descripcion', e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--primary-background-color)", borderColor: "var(--input-border-color)", color: "var(--primary-text-color)" }} /></td>
                  <td className="p-2"><input type="text" value={producto.categoria} onChange={e => handleInputChange(producto.id, 'categoria', e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--primary-background-color)", borderColor: "var(--input-border-color)", color: "var(--primary-text-color)" }} /></td>
                  <td className="p-2"><input type="text" value={producto.disponibilidad} onChange={e => handleInputChange(producto.id, 'disponibilidad', e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--primary-background-color)", borderColor: "var(--input-border-color)", color: "var(--primary-text-color)" }} /></td>
                  <td className="p-2"><input type="number" value={producto.cantidad} onChange={e => handleInputChange(producto.id, 'cantidad', e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--primary-background-color)", borderColor: "var(--input-border-color)", color: "var(--primary-text-color)" }} /></td>
                  <td className="p-2"><input type="date" value={producto.fechaDisponibilidad} onChange={e => handleInputChange(producto.id, 'fechaDisponibilidad', e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--primary-background-color)", borderColor: "var(--input-border-color)", color: "var(--primary-text-color)" }} /></td>
                  <td className="p-2"><input type="number" value={producto.duracionPrestamo} onChange={e => handleInputChange(producto.id, 'duracionPrestamo', e.target.value)} className="w-full rounded px-2 py-1 text-sm text-center" style={{ backgroundColor: "var(--primary-background-color)", borderColor: "var(--input-border-color)", color: "var(--primary-text-color)" }} /></td>
                  
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
            <div key={producto.id} className="bg-white space-y-3 p-4 rounded-lg shadow" style={{ backgroundColor: "var(--primary-background-color)", color: "var(--primary-text-color)" }}>
              {["nombre", "descripcion", "categoria", "disponibilidad", "cantidad", "fechaDisponibilidad", "duracionPrestamo"].map((field) => (
                <div key={field} className="text-sm text-center">
                  <label className="block font-semibold capitalize" style={{ color: "var(--secundary-text-color)" }}>{field}:</label>
                  <input
                    type={field === "cantidad" || field === "duracionPrestamo" ? "number" : field === "fechaDisponibilidad" ? "date" : "text"}
                    value={producto[field]}
                    onChange={(e) => handleInputChange(producto.id, field, e.target.value)}
                    className="w-full rounded px-2 py-1 text-sm text-center"
                    style={{
                      backgroundColor: "var(--primary-background-color)",
                      borderColor: "var(--input-border-color)",
                      color: "var(--primary-text-color)"
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
    </>
  );
};

export default Productos;