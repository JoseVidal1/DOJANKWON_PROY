import React from 'react'

export default function AgregarEstudiante({ isOpen, onClose, onAdd }) {
  if (!isOpen) return null;

  const agregarEstudiante = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nuevoEstudiante = {
      id: formData.get('cc'),
      nombre: formData.get('nombre'),
      apellido: formData.get('apellido'),
      edad: formData.get('edad'),
      eps: formData.get('eps'),
      direccion: formData.get('direccion'),
      telefono: formData.get('telefono'),
      correo: formData.get('correo'),
    };
    onAdd(nuevoEstudiante);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg z-10 relative">
        <h1 className="text-2xl font-bold mb-4 text-center">Agregar Estudiante</h1>

        <form onSubmit={agregarEstudiante} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <input type="text" name="cc" placeholder="CC" className="w-full p-2 border border-gray-300 rounded" required/>
          </div>

          <input type="text" name="nombre" placeholder="Nombres" className="w-full p-2 border border-gray-300 rounded" required/>
          <input type="text" name="apellido" placeholder="Apellidos" className="w-full p-2 border border-gray-300 rounded" required/>
          <input type="date" name="edad" className="w-full p-2 border border-gray-300 rounded md:col-span-2" required/>
          <input type="text" name="eps" placeholder="EPS" className="w-full p-2 border border-gray-300 rounded md:col-span-2" required/>
          <input type="text" name="direccion" placeholder="Dirección" className="w-full p-2 border border-gray-300 rounded md:col-span-2" required/>
          <input type="text" name="telefono" placeholder="Teléfono" className="w-full p-2 border border-gray-300 rounded" required/>
          <input type="email" name="correo" placeholder="Correo" className="w-full p-2 border border-gray-300 rounded" required/>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
              Agregar Estudiante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
