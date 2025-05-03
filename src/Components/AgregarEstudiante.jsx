import React from 'react'

export default function AgregarEstudiante({isOpen, onClose, onAdd}) {
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
      correo: formData.get('correo')
    };
    onAdd(nuevoEstudiante);
    onClose();
  }
  return (
    <div className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center z-50 " >
        <div
      className="absolute inset-0"
      onClick={onClose}
    ></div>
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 z-10 relative" >
        <h1 className='text-3xl font-bold'>Agregar Estudiante</h1>
        <form className='flex flex-col gap-4 mt-4' onSubmit={agregarEstudiante}>
            <input type="text" name='cc' placeholder='CC' className='p-2 border rounded'required />
            <input type="text" name='nombre' placeholder='Nombres' className='p-2 border rounded'required />
            <input type="text" name='apellido' placeholder='Apellidos' className='p-2 border rounded' required/>
            <input type="date" name='edad' className='p-2 border rounded' required />
            <input type="text" name='eps' placeholder='EPS' className='p-2 border rounded' required />
            <input type="text" name='direccion' placeholder='Dirección' className='p-2 border rounded' required />
            <input type="text" name='telefono' placeholder='Teléfono' className='p-2 border rounded' required />
            <input type="email" name='correo' placeholder='Correo' className='p-2 border rounded' required />
            <button type="submit" className='bg-blue-500 text-white p-2 rounded' >Agregar Estudiante</button>
        </form>
        </div>
        
    </div>
  )
}
