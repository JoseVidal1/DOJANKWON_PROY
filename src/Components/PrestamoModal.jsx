import React, { useState } from 'react';

const PrestamoModal = ({ productoSeleccionado, onClose, onSubmit }) => {
  const [solicitante, setSolicitante] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    correo: '',
    telefono: '',
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaDevolucion: '',
    motivo: ''
  });

  const ManejoCambio = (e) => {
    const { name, value } = e.target;
    setSolicitante(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const Submit = (e) => {
    e.preventDefault();
    onSubmit({
      producto: productoSeleccionado,
      solicitante: solicitante
    });
  };

  const calcularFechaDevolucion = () => {
    if (productoSeleccionado?.duracionPrestamo) {
      const fechaInicio = new Date(solicitante.fechaInicio);
      const fechaDevolucion = new Date(fechaInicio);
      fechaDevolucion.setDate(fechaInicio.getDate() + parseInt(productoSeleccionado.duracionPrestamo));
      return fechaDevolucion.toISOString().split('T')[0];
    }
    return '';
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg z-10 relative">
        <h1 className="text-2xl font-bold mb-4 text-center">Solicitar Préstamo de {productoSeleccionado?.nombre}</h1>
        
        <form onSubmit={Submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="nombre" value={solicitante.nombre} onChange={ManejoCambio} placeholder="Nombre" className="w-full p-2 border border-gray-300 rounded" required />
          <input type="text" name="apellido" value={solicitante.apellido} onChange={ManejoCambio} placeholder="Apellido" className="w-full p-2 border border-gray-300 rounded" required />
          <input type="text" name="documento" value={solicitante.documento} onChange={ManejoCambio} placeholder="Documento de Identidad" className="w-full p-2 border border-gray-300 rounded md:col-span-2" required />
          <input type="email" name="correo" value={solicitante.correo} onChange={ManejoCambio} placeholder="Correo Electrónico" className="w-full p-2 border border-gray-300 rounded" required />
          <input type="tel" name="telefono" value={solicitante.telefono} onChange={ManejoCambio} placeholder="Teléfono" className="w-full p-2 border border-gray-300 rounded" required />
          
          {/*Fecha de Inicio y Devolucion*/}
          <div className="flex flex-col w-full">
            <label className="text-sm font-semibold mb-1">Fecha de Inicio</label>
            <input type="date" name="fechaInicio" value={solicitante.fechaInicio} onChange={ManejoCambio} className="p-2 border border-gray-300 rounded" required />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-semibold mb-1">Fecha de Devolución</label>
            <input type="date" name="fechaDevolucion" value={solicitante.fechaDevolucion || calcularFechaDevolucion()} onChange={ManejoCambio} className="w-full p-2 border border-gray-300 rounded" required />         
          </div>
          <textarea name="motivo" value={solicitante.motivo} onChange={ManejoCambio} placeholder="Motivo del Préstamo" rows="3" className="w-full p-2 border border-gray-300 rounded md:col-span-2" required></textarea>
      
      {/* Botones de Cancelar y Solicitar Prestamo */}
      <div className="md:col-span-2 flex flex-col md:flex-row gap-4 mt-2">
        <button type="button" onClick={onClose} className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition">Cancelar</button>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">Solicitar Préstamo</button>
      </div>
    </form>
  </div>
</div>
  );
};

export default PrestamoModal;