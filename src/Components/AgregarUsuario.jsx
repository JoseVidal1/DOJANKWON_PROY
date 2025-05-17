import React from 'react';

//DESCOMENTAR CNTL+K+U

/*export default function AgregarUsuario({ isOpen, onClose, onAdd }) {
  if (!isOpen) return null;

  const agregarUsuario = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nuevoUsuario = {
      id: formData.get('id'),
      rol: formData.get('rol'),
      usuario: formData.get('usuario'),
      nombres: formData.get('nombres'),
      apellidos: formData.get('apellidos'),
      celular: formData.get('celular'),
      direccion: formData.get('direccion'),
      correo: formData.get('correo'),
    };
    onAdd(nuevoUsuario);
    onClose();
  };
*/
// //
// //return (
//     {}
//     <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 px-4">
//       <div className="absolute inset-0" onClick={onClose}></div>

//       <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl z-10 relative">
//         <h1 className="text-2xl font-bold mb-6 text-center">Agregar Usuario</h1>

//         <form onSubmit={agregarUsuario} className="grid grid-cols-1 md:grid-cols-2 gap-4">

//           {/*Usuario*/}
//           <input type="text" name="usuario" placeholder="Usuario" className="w-full p-2 border border-gray-300 rounded md:col-span-2" required />

//           {/* CC y Rol */}
//           <input type="text" name="id" placeholder="CC" className="w-full p-2 border border-gray-300 rounded" required />
//           <input type="text" name="rol" placeholder="Rol" className="w-full p-2 border border-gray-300 rounded" required />

//           {/*Nombres y Apellidos*/}
//           <input type="text" name="nombres" placeholder="Nombres" className="w-full p-2 border border-gray-300 rounded" required />
//           <input type="text" name="apellidos" placeholder="Apellidos" className="w-full p-2 border border-gray-300 rounded" required />

//           {/*Celular*/}
//           <input type="text" name="celular" placeholder="Celular" className="w-full p-2 border border-gray-300 rounded md:col-span-2" required />

//           {/* Correo y Direccion*/}
//           <input type="email" name="correo" placeholder="Correo" className="w-full p-2 border border-gray-300 rounded md:col-span-2" required />
//           <input type="text" name="direccion" placeholder="Dirección" className="w-full p-2 border border-gray-300 rounded md:col-span-2" required />

//           {/* Agregar*/}
//           <div className="md:col-span-2">
//             <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
//               Agregar Usuario
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }