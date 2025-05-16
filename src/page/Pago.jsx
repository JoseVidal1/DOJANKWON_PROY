import Card from "../Components/Cartas";

function Pago() {
  const datos = [
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
  ];

  return (
    <>
      <div className="mt-8">
        <h2 className="text-center font-bold text-lg mb-4">TABLA - PAGO</h2>
        {datos.map((dato, index) => (
          <Card
            key={index}
            usuario={dato.usuario}
            rol={dato.rol}
            fechaPago={dato.fechaPago}
            estado={dato.estado}
          />
        ))}
      </div>
    </>
  );
}

export default Pago;
