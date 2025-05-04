import React, { useState } from 'react';
import Estudiante from './Estudiante';
export default function TablaResponsiva({
    columnas = [],
    datos = [],
    onEditar,
    onEliminar,
    onGuardarCambio,
    titulo = 'Datos',
    mostrarBotones = true,
    mostrarIndice = false,
    keyField = 'id',
    setEstudianteAEditar,
    setIsModalEditar,
    setEstudianteAEliminar,
    setIsModalEliminar
  }) {
    const [datosEditados, setDatosEditados] = useState({});
    const hayDatos = datos && datos.length > 0;

    const handleCampoChange = (itemId, campo, valor) => {
      setDatosEditados(prev => ({
        ...prev,
        [itemId]: {
          ...(prev[itemId] || {}),
          [campo]: valor
        }
      }));
    };
  
    const handleGuardarCambio = (item, campo) => {
      if (datosEditados[item[keyField]] && onGuardarCambio) {
        onGuardarCambio(
          item[keyField], 
          campo, 
          datosEditados[item[keyField]][campo]
        );
        const nuevosDatosEditados = { ...datosEditados };
        delete nuevosDatosEditados[item[keyField]][campo];
        if (Object.keys(nuevosDatosEditados[item[keyField]]).length === 0) {
          delete nuevosDatosEditados[item[keyField]];
        }
        setDatosEditados(nuevosDatosEditados);
      }
    };
    const renderizarCampo = (item, columna) => {
      if (columna.render && !columna.editable) {
        return columna.render(item);
      }
      if (columna.editable) {
        if (columna.renderEditable) {
          return columna.renderEditable(
            item, 
            datosEditados[item[keyField]]?.[columna.id] !== undefined 
              ? datosEditados[item[keyField]][columna.id] 
              : item[columna.id],
            (valor) => handleCampoChange(item[keyField], columna.id, valor),
            () => handleGuardarCambio(item, columna.id)
          );
        }
        const valorActual = datosEditados[item[keyField]]?.[columna.id] !== undefined 
          ? datosEditados[item[keyField]][columna.id] 
          : item[columna.id];
          
        return (
          <div className="flex items-center">
            <input
              type="text"
              className="w-full p-1 border rounded"
              value={valorActual || ''}
              onChange={(e) => handleCampoChange(item[keyField], columna.id, e.target.value)}
              onBlur={() => handleGuardarCambio(item, columna.id)}
            />
          </div>
        );
      }
      return item[columna.id];
    };
  
    return (
      <div className="p-5 rounded-[30px] shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] bg-gray-100 text-[#333]">
        {/*titulo Estudiante*/}
        <h1 className="text-xl mb-2 font-bold">{titulo}</h1>

        {/* Buscar estudiante */}
        <div className="mb-4 relative w-full md:w-1/3">
        <input type="text" placeholder="Buscar estudiante..." className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        <button type="button" className="absolute inset-y-0 left-0 px-3 flex items-center text-gray-500 hover:text-gray-700">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 1 0-12 0 6 6 0 0 0 12 0z" />
          </svg>
          </button>
          </div>

        {/* Tabla de escritorio  */}
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                {mostrarIndice && (
                  <th className="w-16 p-3 text-sm font-semibold tracking-wide text-center">No.</th>
                )}
                {columnas.map((columna) => (
                  <th
                    key={columna.id}
                    className={
                      [
                        'id', 'nombre', 'apellido', 'edad', 'eps', 'direccion', 'telefono', 'correo'
                      ].includes(columna.id)
                        ? 'p-3 text-sm font-semibold tracking-wide text-center'
                        : 'p-3 text-sm font-semibold tracking-wide text-left'
                    }
                    style={columna.width ? { width: columna.width } : {}}
                  >
                    {columna.header}
                  </th>
                ))}
                {mostrarBotones && (
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {hayDatos ? (
                datos.map((estudiante, index) => (
                  <Estudiante
                    key={estudiante[keyField]}
                    estudiante={estudiante}
                    onEditar={onEditar}
                    onEliminar={onEliminar}
                  />
                ))
              ) : (
                <tr className="bg-white">
                  <td
                    colSpan={columnas.length + (mostrarIndice ? 1 : 0) + (mostrarBotones ? 1 : 0)}
                    className="p-3 text-sm text-gray-700 text-center"
                  >
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Vista celular*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {hayDatos ? (
            datos.map((item, index) => (
              <div key={item[keyField]} className="bg-white space-y-3 p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    {mostrarIndice && <div className="font-bold">#{index + 1}</div>}
                    <div className="font-bold text-blue-500">
                      {item[keyField] ? `#${item[keyField]}` : ''}
                    </div>
                  </div>
                  {mostrarBotones && (
                    <div className="flex space-x-2">
                      {onEditar && (
                        <button
                          onClick={() => onEditar(item)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 hover:cursor-pointer"
                          title="Editar"
                        >
                          ✏️
                        </button>
                      )}
                      {onEliminar && (
                        <button
                          onClick={() => onEliminar(item)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 hover:cursor-pointer"
                          title="Eliminar"
                        >
                          ❌
                        </button>
                      )}
                    </div>
                  )}
                </div>
                {columnas.map((columna) => (
                  <div key={`mobile-${item[keyField]}-${columna.id}`} className="text-sm text-gray-700">
                    <div className="flex flex-col">
                      <span className="font-medium mb-1">{columna.header}: </span>
                      {['eps','direccion','telefono','correo'].includes(columna.id) ? (
                        <input
                          type={columna.id === 'correo' ? 'email' : 'text'}
                          className="w-full p-1 border rounded"
                          value={item[columna.id] || ''}
                          onChange={e => onGuardarCambio && onGuardarCambio(item[keyField], columna.id, e.target.value)}
                        />
                      ) : (
                        <span>{columna.render ? columna.render(item) : item[columna.id]}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="bg-white p-4 rounded-lg shadow text-center">
              No hay datos disponibles
            </div>
          )}
        </div>
      </div>
    );
  }