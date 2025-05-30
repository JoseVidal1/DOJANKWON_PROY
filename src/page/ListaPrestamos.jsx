import React, { useEffect, useState } from 'react';

const ListaPrestamos = () => {
  const [prestamos, setPrestamos] = useState([
  ]);

  useEffect(() => {
   fetch("http://localhost:5234/api/Prestamo")
      .then(response => response.json())
      .then(data => {
        setPrestamos(data);
      })
      .catch(error => {
        console.error("Error fetching prestamos:", error);
      } );
   }
  , []);
const reportarDevolucion = (prestamoId) => {
  fetch(`http://localhost:5234/api/Prestamo/devolver/${prestamoId}`, {
    method: 'PUT',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al reportar la devolución');
      }
      return response.text(); // la API responde con texto
    })
    .then(() => {
      setPrestamos(prestamos.map(p => p.id === prestamoId ? { ...p, estado: "Devuelto" } : p));
      alert("Devolución reportada correctamente");
    })
    .catch(error => {
      console.error("Error reporting return:", error);
      alert("Error al reportar la devolución");
    });
};


  return (
    <div className='relative pt-8 pb-4' style={{ backgroundColor: "var(--primary-dark-color)" }}>
      <hr className="absolute top-1 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm font-bold ml-2 font-josefin' style={{ color: "var(--accent-dark-color)" }}>REGISTRO DE PRESTAMOS</h1>
      <hr className="absolute top-12 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-7xl font-josefin mb-2 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>LISTA DE PRESTAMOS</h1>
      <hr className="w-[calc(100%+140px)] mx-[-70px] border-t border-[color:var(--secundary-dark-color)] mb-6" />
      <p className="font-josefin ml-2">Consulta y gestiona los <span style={{ color: "var(--accent-dark-color)" }}>préstamos</span> realizados a estudiantes.</p>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      {/* Presentacion tabla */}
      <hr className="left-[-70px] mt-10 right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm ml-2  font-bold font-josefin' style={{ color: "var(--accent-dark-color)" }}>taekwondo</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className="text-2xl sm:text-2xl ml-2 md:text-4xl lg:text-5xl font-josefin mb-1 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>TABLA LISTA - PRESTAMOS</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      <div className="p-5 mt-2">
        {/* Tabla para escritorio */}
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full text-center shadow-lg border border-[color:var(--terceary-dark-color)]">
            <thead style={{ backgroundColor: "var(--secundary-dark-color)" }}>
              <tr>
                <th className="p-3 text-sm font-semibold text-[var(--text-dark-color)]">ID Alquiler</th>
                <th className="p-3 text-sm font-semibold text-[var(--text-dark-color)]">Estudiante</th>
                <th className="p-3 text-sm font-semibold text-[var(--text-dark-color)]">Fecha Prestamo</th>
                <th className="p-3 text-sm font-semibold text-[var(--text-dark-color)]">Fecha Devolución</th>
                <th className="p-3 text-sm font-semibold text-[var(--text-dark-color)]">Productos Prestados</th>
                <th className="p-3 text-sm font-semibold text-[var(--text-dark-color)]">Estado</th>
                <th className="p-3 text-sm font-semibold text-[var(--text-dark-color)]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4b607f]">
              {prestamos.map(p => (
                <tr key={p.id} style={{ backgroundColor: 'var(--sidebar-dark-hover)' }}>
                  <td className="p-2 text-[var(--primary-background-color)]">{p.id}</td>
                  <td className="p-2 text-[var(--primary-background-color)]">{p.estudiante.nombres+" "+p.estudiante.apellidos}</td>
                  <td className="p-2 text-[var(--primary-background-color)]">{p.fechaPrestamo}</td>
                  <td className="p-2 text-[var(--primary-background-color)]">{p.fechaDevolucion}</td>
                  <td className="p-2 text-[var(--primary-background-color)]">
                    <ul className="list-disc pl-5 text-left">
                      {p.detalles.map((d => (
                    <li key={d.id}>{d.cantidad} × {d.articulo.nombre}</li>
                  )))}
                    </ul>
                  </td>
                  <td className="p-2 text-[var(--primary-background-color)]">{p.estado}</td>
                  <td className="p-2">
                    {p.estado === "En prestamo"  && (
                      <button onClick={() => reportarDevolucion(p.id)} className="px-3 py-1 bg-[#F44E1C] hover:bg-[#F44E1C66] text-white rounded transition">Reportar Devolución</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vista móvil */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {prestamos.map(p => (
            <div key={p.id} className="space-y-2 p-4 rounded-lg shadow" style={{ backgroundColor: "var(--secundary-dark-color)", color: "var(--text-dark-color)" }}>
              <div><strong className="text-[var(--secundary-text-color)]">ID:</strong> {p.id}</div>
              <div><strong className="text-[var(--secundary-text-color)]">Estudiante:</strong> {p.estudiante.nombres+" "+p.estudiante.apellidos}</div>
              <div><strong className="text-[var(--secundary-text-color)]">Entrega:</strong> {p.fechaEntrega}</div>
              <div><strong className="text-[var(--secundary-text-color)]">Devolución:</strong> {p.fechaDevolucion}</div>
              <div>
                <strong className="text-[var(--secundary-text-color)]">Productos:</strong>
                <ul className="list-disc pl-5">
                  {p.detalles.map((d => (
                    <li key={d.id}>{d.cantidad} × {d.articulo.nombre}</li>
                  )))}
                </ul>
              </div>
              <div><strong className="text-[var(--secundary-text-color)]">Estado:</strong> {p.estado}</div>
              {p.estado === "En prestamo"&& (
                <div className="pt-2 text-center">
                  <button onClick={() => reportarDevolucion(p)} className="px-3 py-1 bg-green-700 hover:bg-green-900 text-white rounded transition">Reportar Devolución</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListaPrestamos;
