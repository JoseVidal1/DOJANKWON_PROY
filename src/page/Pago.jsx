import { useState } from "react";

function Pago() {
  // Aqupi va la lógica de los usuarios.
  const [datos, setDatos] = useState([
    {
      usuario: "PEPE MOLINA",
      rol: "Estudiante",
      fechaPago: "20/04/2025",
      estado: "Pendiente",
    },
    {
      usuario: "Juanceto01",
      rol: "Estudiante",
      fechaPago: "20/04/2025",
      estado: "Pendiente",
    },
    {
      usuario: "Maria",
      rol: "Estudiante",
      fechaPago: "20/04/2025",
      estado: "Pagado",
    },
  ]);

  const [filtro, setFiltro] = useState("Todos");

  const cambiarEstado = (usuario) => {
    setDatos(
      datos.map((item) =>
        item.usuario === usuario
          ? {
              ...item,
              estado: item.estado === "Pendiente" ? "Pagado" : "Pendiente",
            }
          : item
      )
    );
  };

  const datosFiltrados = datos.filter((item) => {
    if (filtro === "Todos") return true;
    return item.estado === filtro;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">TABLA - PAGO</h2>

        {/* Filtros */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFiltro("Todos")}
            className={`px-4 py-2 rounded ${
              filtro === "Todos" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFiltro("Pagado")}
            className={`px-4 py-2 rounded ${
              filtro === "Pagado" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Pagados
          </button>
          <button
            onClick={() => setFiltro("Pendiente")}
            className={`px-4 py-2 rounded ${
              filtro === "Pendiente" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Pendientes
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Encabezados de la tabla */}
          <div className="grid grid-cols-5 bg-gray-100 p-4 font-medium text-gray-700">
            <div>Usuario</div>
            <div>Rol</div>
            <div>Fecha de Pago</div>
            <div>Estado</div>
            <div>Acción</div>
          </div>

          {/* Filas de la tabla */}
          {datosFiltrados.map((dato, index) => (
            <div
              key={index}
              className="grid grid-cols-5 p-4 border-b border-gray-200 items-center"
            >
              <div>{dato.usuario}</div>
              <div>{dato.rol}</div>
              <div>{dato.fechaPago}</div>
              <div
                className={`font-medium ${
                  dato.estado === "Pagado"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {dato.estado}
              </div>
              <div>
                <button
                  onClick={() => cambiarEstado(dato.usuario)}
                  className={`px-3 py-1 rounded text-white ${
                    dato.estado === "Pendiente"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {dato.estado === "Pendiente"
                    ? "Marcar como Pagado"
                    : "Marcar como Pendiente"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pago;
