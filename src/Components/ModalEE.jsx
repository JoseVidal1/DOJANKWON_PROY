import React from 'react';

export default function ModalEE({ isOpen, onClose, objeto, onAccion, accion }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
    <div
      className="absolute inset-0"
      onClick={onClose}
    ></div>

    {/* Contenido del modal */}
    <div className="bg-white rounded-lg shadow-lg p-6 w-96 z-10 relative">
      <h2 className="text-xl font-semibold mb-4">Confirmar {accion}</h2>
      <p className="text-gray-700">¿Estás seguro de que deseas {accion} <strong>{objeto}</strong>?</p>

      <div className="flex justify-end mt-6">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 hover:cursor-pointer"
          onClick={onAccion}
        >
          Aceptar
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 hover:cursor-pointer"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
  );
}
