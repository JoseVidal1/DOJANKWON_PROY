function Card({ usuario, rol, fechaPago, estado }) {
  const estadoColor =
    estado === "Pagado"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <div className="grid grid-cols-4 p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
      <div className="font-medium text-gray-900">{usuario}</div>
      <div className="text-gray-600">{rol}</div>
      <div className="text-gray-600">{fechaPago}</div>
      <div>
        <span className={`px-3 py-1 rounded-full text-sm ${estadoColor}`}>
          {estado}
        </span>
      </div>
    </div>
  );
}

export default Card;
