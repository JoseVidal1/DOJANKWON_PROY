import React, { useState } from 'react';
import '../Components/input-style.css';
import EditIcon from '../assets/icons/EditIcon.jsx';
import DeleteIcon from '../assets/icons/DeleteIcon.jsx';
import PrestamoIcon from '../assets/icons/PrestamoIcon.jsx';
import PrestamoModal from '../Components/PrestamoModal.jsx';
//import { Delete } from 'lucide-react';

const Prestamos = () => {
  const [productos, setProductos] = useState([
    { id: 1, categoria: 'Equipo de combate', descripcion: 'Peto de combate', cantidad: 1},
    { id: 2, categoria: 'Equipo de entrenamiento', descripcion: 'Paleta de entrenamiento', cantidad: 2},
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
      <h1 className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-7xl font-josefin mb-2 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>REGISTRO DE PRESTAMOS</h1>
      <hr className="w-[calc(100%+140px)] mx-[-70px] border-t border-[color:var(--secundary-dark-color)] mb-6" /> {/* Lineas decorativas verticales debajo */}
      <hr className="absolute left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <p className="font-josefin ml-2">Gestiona de forma <span style={{ color: "var(--accent-dark-color)" }}>eficiente</span> el préstamo de productos.<br />Controla el <span style={{ color: "var(--accent-dark-color)" }}>inventario</span> y asegura una entrega y devolución <span style={{ color: "var(--accent-dark-color)" }}>responsable</span>.</p>
      <hr className=" left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className=' mt-10 text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>DATOS DE CLIENTE A PRESTAR</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      {/* datos para Cliente*/}
      <form className="w-full flex flex-wrap gap-x-6 gap-y-4 mt-10 px-4">
        
        {/* Fecha de Entrega */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="FechaEntrega" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Fecha de Entrega</label>
          <input type="date" id="FechaEntrega" name="FechaEntrega" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-[#757d80] p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
        
        {/* Buscar Cliente */}
        <div className="w-full md:flex-1 flex flex-col min-w-0 relative">
          <label htmlFor="cliente" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Cliente a Prestar</label>
          <div className="relative w-full">
            <input type="text" id="cliente" name="cliente" placeholder="Buscar cliente..." required className="w-full bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
            <button type="button" className="absolute inset-y-0 right-0 px-3 flex items-center text-[#F44E1C] hover:text-[#f44e1c66]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 1 0-12 0 6 6 0 0 0 12 0z" /></svg>
            </button>
          </div>
        </div>
        
        {/* Fecha de Devolucion */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="FechaDevolucion" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Fecha de Devolucion</label>
          <input type="date" id="FechaDevolucion" name="FechaDevolucion" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-[#757d80] p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>
      </form>

      {/* Datos Producto*/}
      <hr className=" mt-20 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className=' text-sm font-bold ml-2 text-center font-josefin' style={{ color: "var(--accent-dark-color)" }}>DATOS DEL PRODUCTO</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      <form className="w-full flex flex-wrap gap-x-6 gap-y-4 mt-10 px-4">
        
        {/* Categoria */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="categoria" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">CATEGORIA</label>
          <select id="categoria" name="categoria" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-[#757d80] p-1 focus:outline-none focus:border-b-[3px] transition appearance-none">
            <option value="">Seleccionar una Categoria...</option>
            <option value="combate">Equipo de Combate</option>
            <option value="entrenamiento">Equipo de Entrenamiento</option>
          </select>
        </div>

        {/* Articulo */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="articulo" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">ARTICULO</label>
          <select id="articulo" name="articulo" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-[#757d80] p-1 focus:outline-none focus:border-b-[3px] transition appearance-none">
            <option value="">Seleccionar articulo...</option>
            <option value="combate">Peto de proteccion</option>
            <option value="entrenamiento">Paletas de Entrenamiento</option>
          </select>
        </div>

        {/* Cantidad */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="cantidad" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">cantidad</label>
          <input type="text" id="cantidad" name="cantidad" placeholder="Cantidad a Prestar" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>

        {/* Boton */}
        <div className="w-full flex justify-center mt-6">
          <button className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md px-6 font-medium transition hover:scale-105 duration-300" style={{ backgroundColor:"var(--terceary-dark-color)", color : "var(--text-dark-color)" }}>
            <span>Registrar Prestamo</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8" style={{ backgroundColor: "var(--accent-dark-color" }}></div>
            </div>
          </button>
        </div>
      </form>

      {/* Presentacion tabla */}
      <h1 className='text-sm ml-2 mt-20  font-josefin' style={{ color: "var(--accent-dark-color)" }}>taekwondo</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className="text-2xl sm:text-2xl ml-2 md:text-4xl lg:text-5xl font-josefin mb-1 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>TABLA DE PRESTAMOS</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

    {/* div principal tabla */}
    <div className="p-5 mt-10">

        {/* Tabla de productos */}
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full text-center shadow-lg border border-[color:var(--terceary-dark-color)]">
            <thead style={{backgroundColor: "var(--secundary-dark-color)", borderBottom: "1px solid var(--terceary-dark-color)"}}>
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color)" }}>Categoria</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color)" }}>Descripción</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color)" }}>Cantidad</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color)" }}>Acciones</th>
              </tr>
            </thead>
           <tbody className="divide-y divide-[#4b607f]">
               {productos.map((producto) => (
               <tr key={producto.id} style={{ backgroundColor: 'var(--sidebar-dark-hover)' }}>
                 <td className="p-2">{producto.categoria}</td>
                 <td className="p-2">{producto.descripcion}</td>
                 <td className="p-2"><input type="number" value={producto.cantidad} onChange={e => handleInputChange(producto.id, 'cantidad', e.target.value)} className="w-24 rounded px-1 py-0.5 text-sm text-center" style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)" }} /></td>
                 <td className="p-3 flex justify-center space-x-2">
                   <button onClick={() => guardarProducto(producto)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Guardar cambios"><EditIcon className="w-5 h-5" /></button>
                   <button onClick={() => eliminarProducto(producto.id)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Eliminar producto"><DeleteIcon className="w-5 h-5" /></button>
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
            <div key={producto.id} className="bg-white space-y-3 p-4 rounded-lg shadow" style={{ backgroundColor: "var(--secundary-dark-color)", color: "var(--text-dark-color)",}}>
              {[ "categoria", "descripcion","cantidad",].map((field) => {
                const isEditable = field === "cantidad";
                const fieldValue = producto[field] ?? "";
              return (
              <div key={field} className="text-sm text-center">
                <label className="block font-semibold capitalize" style={{ color: "var(--secundary-text-color)" }}>{field}:</label>
                
                {isEditable ? (
                  <input type="number" value={fieldValue} onChange={(e) =>handleInputChange(producto.id, field, e.target.value)}
                  className="w-full rounded px-2 py-1 text-sm text-center" style={{backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--accent-dark-color)", color: "var(--text-dark-color)",}}/>
                ) : (
                 <span className="text-right">{fieldValue || "-"}</span>
                )}
              </div>
              );
             })}
              {/* Acciones */}
              <div className="flex justify-center space-x-2 pt-2">

                <button onClick={() => guardarProducto(producto)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Guardar cambios">
                  <EditIcon className="w-5 h-5" />
                </button>
                
                <button onClick={() => eliminarProducto(producto.id)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Eliminar producto">
                  <DeleteIcon className="w-5 h-5" />
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

export default Prestamos;