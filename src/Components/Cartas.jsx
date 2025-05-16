const Card = ({ usuario, rol, fechaPago, estado }) => {
  return (
    <div className="border-4 border-black rounded-2xl p-4 mb-4 max-w-xl mx-auto">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold">
            Usuario : <span className="font-normal">{usuario}</span>
          </p>
          <p>Rol: {rol}</p>
        </div>
        <div className="text-right">
          <p>Fecha de pago: {fechaPago}</p>
          <p>Estado : {estado}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
