import React, { useState } from 'react';
import ModalEE from '../Components/ModalEE'; 
import AgregarEstudiante from '../Components/AgregarEstudiante';
import Estudiante from '../Components/Estudiante';
const Estudiantes = () => {
 const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: "02-10-2005", eps: 'EPS1', direccion: 'Calle 1', telefono: '1234567890', correo: 'jjshjs@jsjsjs' },
    /*{ id: 2, nombre: 'María', apellido: 'Gómez', edad: 22, eps: 'EPS2', direccion: 'Calle 2', telefono: '0987654321', correo: ',' },
    { id: 3, nombre: 'Pedro', apellido: 'López', edad: 21, eps: 'EPS3', direccion: 'Calle 3', telefono: '1122334455', correo: ',' },*/
  ]);
  const [isModalEliminar, setIsModalEliminar] = useState(false);
  const [isModalEditar, setIsModalEditar] = useState(false);
  const [estudianteAEditar, setEstudianteAEditar] = useState(null);
  const [estudianteAEliminar, setEstudianteAEliminar] = useState(null);
  const [isModalAgregar, setIsModalAgregar] = useState(false);

  function EditarEstudiante(estudiante) {
    const nuevosEstudiantes = estudiantes.map((est) => {
      if (est.id === estudiante.id) {
        return {...estudiante};
      }
      return est;
    });
    setEstudiantes(nuevosEstudiantes);
    console.log(nuevosEstudiantes);
  }
  function EliminarEstudiante(id) {
    const nuevoEstudiantes = estudiantes.filter((estudiante) => estudiante.id !== id);
    setEstudiantes(nuevoEstudiantes);
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Estudiantes</h1>
        <p className="text-gray-600">Bienvenido al panel de Estudiantes.</p>
        
        <div className="overflow-x-auto mt-4">
          <button className='p-2 rounded-2xl bg-blue-600 text-blue-50 hover:cursor-pointer hover:bg-blue-400' onClick={() => {
                        setIsModalAgregar(true);
                      }}>Agregar Estudiante</button>
          <table className="border-2 border-black-300 rounded-lg shadow-md mt-4 w-full table-fixed  border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className='p-2'>ID</th>
                <th className='p-2'>Nombre</th>
                <th className='p-2'>Apellido</th>
                <th className='p-2'>Edad</th>
                <th className='p-2'>EPS</th>
                <th className='p-2'>Dirección</th>
                <th className='p-2'>Teléfono</th>
                <th className='p-2'>Correo</th>
                <th className='p-2'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((estudiante) => (
                <Estudiante
                  key={estudiante.id}
                  estudiante={estudiante}
                  setEstudianteAEliminar={setEstudianteAEliminar}
                  setIsModalEliminar={setIsModalEliminar}
                  setEstudianteAEditar={setEstudianteAEditar}
                  setIsModalEditar={setIsModalEditar}
                />
              ))}
            </tbody>
          </table>
        </div>
        {/* ModalAgregarEstudiante */}
        <AgregarEstudiante
          isOpen={isModalAgregar}
          onClose={() => setIsModalAgregar(false)}
          onAdd={(nuevoEstudiante) => {
            setEstudiantes([...estudiantes, nuevoEstudiante]);
            setIsModalAgregar(false);
          }}/>
        {/* ModalEliminar */}
        <ModalEE
          isOpen={isModalEliminar}
          onClose={() => setIsModalEliminar(false)}
          objeto={estudianteAEliminar ? `${estudianteAEliminar.nombre} ${estudianteAEliminar.apellido}` : ''}
          onAccion={() => {
            if (estudianteAEliminar) {
              EliminarEstudiante(estudianteAEliminar.id);
              setIsModalEliminar(false);
            }
          }}
          accion="eliminar"
        />
          <ModalEE
          isOpen={isModalEditar}
          onClose={() => setIsModalEditar(false)}
          objeto={estudianteAEditar ? `${estudianteAEditar.nombre} ${estudianteAEditar.apellido}` : ''}
          onAccion={() => {
            if (estudianteAEditar) {
              EditarEstudiante(estudianteAEditar);
              setIsModalEditar(false);
            }
          }}
          accion="editar"
          />
      </div>
    </>
  );
};

export default Estudiantes;