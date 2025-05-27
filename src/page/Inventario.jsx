import React, { useEffect, useState } from 'react';
import EditIcon from '../assets/icons/EditIcon.jsx';
import DeleteIcon from '../assets/icons/DeleteIcon.jsx';
import ModalConfirmacion from "../Components/ModalConfirmation.jsx";

const Inventario = () => {

  const [productos, setProductos] = useState([/*
    { id: 1, nombre: 'Peto de combate', cantidad: 15 }, 
    { id: 2, nombre: 'Paleta de entrenamiento', cantidad: 0 }, 
    { id: 3, nombre: 'Casco protector', cantidad: 8 }*/
  ]);

  const [formulario, setFormulario] = useState({ id: '', nombre: '', cantidad: '' });
  const [modalConfirmacionAbierto, setModalConfirmacionAbierto] = useState(false);
  const [accionActual, setAccionActual] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [editando, setEditando] = useState(false);

  const handleFormularioChange = e => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    // Cargar usuarios desde la API al montar el componente
    fetch('http://localhost:5234/api/Articulo')
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.text() || 'Error al cargar articulos');
        }
        return response.json();
      })
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const registrarArticulo = e => {
    e.preventDefault();
    const nuevoProducto = {
      nombre: formulario.nombre,
      cantidad: parseInt(formulario.cantidad),
      disponibles: parseInt(formulario.cantidad) // Inicialmente, disponibles es igual a la cantidad
    };
    fetch('http://localhost:5234/api/Articulo', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(nuevoProducto), 
})
  .then(async (response) => {
    if (!response.ok) {
      const errorText = await response.text(); // <-- leer texto del backend
      throw new Error(errorText || 'Error al agregar el articulo');
    }
    return response.json();
  })
  .then((data) => {
    console.log('Articulo agregado:', data);
    setProductos((prev) => [...prev, data]);
    form.reset(); // Limpia el formulario
  })
  .catch((error) => {
    console.error('Error al agregar estudiante:', error.message);
  });
}

    //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

  const editarProducto = p => {
    setFormulario({ id: p.id.toString(), nombre: p.nombre, cantidad: p.cantidad.toString() });
    setEditando(true);
  };

  const eliminarProducto=(id) => {
    fetch(`http://localhost:5234/api/Articulo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text(); // <-- leer texto del backend
          throw new Error(errorText || 'Error al eliminar el articulo');
        }
        setProductos((prev) => prev.filter(p => p.id !== id));
        console.log('Articulo eliminado:', id);
      })
      .catch((error) => {
        console.error('Error al eliminar articulo:', error.message);
      });
  };


  const manejarAccion = (a, p) => {
    setAccionActual(a);
    setProductoSeleccionado(p);
    setModalConfirmacionAbierto(true);
  };

  const confirmarAccion = () => {
    if (accionActual === 'delete') eliminarProducto(productoSeleccionado.id);
    else if (accionActual === 'edit') editarProducto(productoSeleccionado);
    setModalConfirmacionAbierto(false);
  };

  return (
    <div className='relative pt-8 pb-4' style={{ backgroundColor: "var(--primary-dark-color)" }}>
        
        {/* Presetnacion */}
      <hr className="absolute top-1 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm font-bold ml-2 font-josefin' style={{ color: "var(--accent-dark-color)" }}>GESTION DE INVENTARIO</h1>
      <hr className="absolute top-12 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-7xl font-josefin mb-2 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>CONTROL DE INVENTARIO</h1>
      <hr className="w-[calc(100%+140px)] mx-[-70px] border-t border-[color:var(--secundary-dark-color)] mb-6" />
      <p className="font-josefin ml-2">Mantén un control <span style={{ color: "var(--accent-dark-color)" }}>preciso</span> de tu inventario.<br />Gestiona la <span style={{ color: "var(--accent-dark-color)" }}>disponibilidad</span> y <span style={{ color: "var(--accent-dark-color)" }}>cantidad</span> de todos tus productos.</p>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      
      <hr className="mt-10 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm text-center font-bold ml-2 font-josefin' style={{ color: "var(--accent-dark-color)" }}>REGISTRO DE ARTÍCULO</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      
      { /* Formulario registrar /editarr  */ }
      <form className="w-full flex flex-wrap gap-x-6 gap-y-4 mt-10 px-4" onSubmit={registrarArticulo}>

        {/* edicion = se muestra ID */}
        {editando && (
          <div className="w-full md:flex-1 flex flex-col min-w-0">
            <label htmlFor="id" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">ID</label>
            <input type="text" id="id" name="id" value={formulario.id} readOnly className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-[#757d80] p-1 focus:outline-none cursor-not-allowed" />
          </div>
        )}

        { /* Nombre del producto */ }
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="nombre" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Nombre del Producto</label>
          <input type="text" id="nombre" name="nombre" value={formulario.nombre} onChange={handleFormularioChange} placeholder="Ingresa el nombre del producto" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>

        {/* Cantidad */ }
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <label htmlFor="cantidad" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">Cantidad</label>
          <input type="number" id="cantidad" name="cantidad" value={formulario.cantidad} onChange={handleFormularioChange} placeholder="Cantidad total" min="0" required className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1 focus:outline-none focus:border-b-[3px] transition" />
        </div>

        {/* Boton de registrar / actualizar */ }
        <div className="w-full flex justify-center gap-4 mt-6">
          <button type="submit" className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md px-6 font-medium transition hover:scale-105 duration-300" style={{ backgroundColor: "var(--terceary-dark-color)", color: "var(--text-dark-color)" }}>
            <span>{editando ? 'Actualizar Artículo' : 'Registrar Artículo'}</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8" style={{ backgroundColor: "var(--accent-dark-color)" }}></div>
            </div>
          </button>
        </div>
      </form>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      {/* Presentacion de la tabla */}
      <hr className="mt-10 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm font-bold ml-2 font-josefin' style={{ color: "var(--accent-dark-color)" }}>INVENTARIO</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      <h1 className="text-2xl sm:text-2xl ml-2 md:text-4xl lg:text-5xl font-josefin mb-1 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>TABLA DE INVENTARIO</h1>
      
      {/* Tabla de productos */}	
      <div className="p-5 mt-2">
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full text-center shadow-lg border border-[color:var(--terceary-dark-color)]">
            <thead style={{ backgroundColor: "var(--secundary-dark-color)", borderBottom: "1px solid var(--terceary-dark-color)" }}>
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color)" }}>ID</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color)" }}>Nombre</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color)" }}>Cantidad</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color)" }}>Disponibles</th>
                <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--text-dark-color)" }}>Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4b607f]">
              {productos.map(p => (
                <tr key={p.id} style={{ backgroundColor: 'var(--sidebar-dark-hover)' }}>
                  <td className="p-2" style={{ color: "var(--text-dark-color)" }}>{p.id}</td>
                  <td className="p-2" style={{ color: "var(--text-dark-color)" }}>{p.nombre}</td>
                  <td className="p-2" style={{ color: "var(--text-dark-color)" }}>{p.cantidad}</td>
                  <td className="p-2" style={{ color: "var(--text-dark-color)" }}>{p.disponibles}</td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button onClick={() => manejarAccion("edit", p)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Editar producto">
                        <EditIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => manejarAccion("delete", p)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Eliminar producto">
                        <DeleteIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vista movil */}	
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {productos.map(p => (
            <div key={p.id} className="space-y-3 p-4 rounded-lg shadow" style={{ backgroundColor: "var(--secundary-dark-color)", color: "var(--text-dark-color)" }}>
              <div className="text-sm text-center"><label className="block font-semibold" style={{ color: "var(--secundary-text-color)" }}>ID:</label><span>{p.id}</span></div>
              <div className="text-sm text-center"><label className="block font-semibold" style={{ color: "var(--secundary-text-color)" }}>Nombre:</label><span>{p.nombre}</span></div>
              <div className="text-sm text-center"><label className="block font-semibold" style={{ color: "var(--secundary-text-color)" }}>Cantidad:</label><span>{p.cantidad}</span></div>
              <div className="text-sm text-center"><label className="block font-semibold" style={{ color: "var(--secundary-text-color)" }}>Disponibles:</label><span>{p.disponibles}</span></div>
              <div className="flex justify-center space-x-2 pt-2">
                <button onClick={() => manejarAccion("delete", p)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Eliminar producto">
                    <DeleteIcon className="w-5 h-5" />
                </button>
                <button onClick={() => manejarAccion("edit", p)} className="p-1 text-sm bg-gray-700 rounded hover:bg-gray-900" title="Editar producto">
                    <EditIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

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

export default Inventario;
