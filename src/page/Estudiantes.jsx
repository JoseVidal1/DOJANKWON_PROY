import React, { useState } from 'react';
import TablaResponsiva from '../Components/TablaResponsivaEs';
import ModalEE from '../Components/ModalEE'; 
import AgregarEstudiante from '../Components/AgregarEstudiante';
import Estudiante from '../Components/Estudiante';

export default function TablaEstudiantes() {
  const [estudiantes, setEstudiantes] = useState([
    {
      id: "1001",
      nombre: "Juan",
      apellido: "Pérez",
      edad: "2000-05-15", 
      eps: "Sura",
      direccion: "Calle 123",
      telefono: "3001234567",
      correo: "juan@ejemplo.com"
    },
    {
      id: "1002",
      nombre: "María",
      apellido: "González",
      edad: "2005-10-20",
      eps: "Nueva EPS",
      direccion: "Carrera 45",
      telefono: "3107654321",
      correo: "maria@ejemplo.com"
    }
  ]);

  const [isModalEditar, setIsModalEditar] = useState(false);
  const [isModalEliminar, setIsModalEliminar] = useState(false);
  const [isModalAgregar, setIsModalAgregar] = useState(false);
  const [estudianteAEditar, setEstudianteAEditar] = useState(null);
  const [estudianteAEliminar, setEstudianteAEliminar] = useState(null);

  const columnasEstudiantes = [
    { id: 'id', header: 'CC' },
    { id: 'nombre', header: 'Nombres' },
    { id: 'apellido', header: 'Apellidos' },
    { 
      id: 'edad', 
      header: 'Edad',
      render: (estudiante) => {
        const fechaActual = new Date();
        const fechaNacimiento = new Date(estudiante.edad);
        let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
          edad--;
        }
        if (edad < 0) {
          edad = 0; 
        }
        return edad;
      }
    },
    { id: 'eps', header: 'EPS' },
    { id: 'direccion', header: 'Dirección' },
    { id: 'telefono', header: 'Teléfono' },
    { id: 'correo', header: 'Correo' }
  ];

  // Manejar edición
  const handleEditar = (estudiante) => {
    setEstudianteAEditar(estudiante);
    setIsModalEditar(true);
  };

  // Manejar eliminación
  const handleEliminar = (estudiante) => {
    setEstudianteAEliminar(estudiante);
    setIsModalEliminar(true);
  };

  // Confirmar edición
  const confirmarEditar = () => {
    if (estudianteAEditar) {
      setEstudiantes(estudiantes.map(est => 
        est.id === estudianteAEditar.id ? estudianteAEditar : est
      ));
      setIsModalEditar(false);
    }
  };

  // Confirmar eliminación
  const confirmarEliminar = () => {
    if (estudianteAEliminar) {
      setEstudiantes(estudiantes.filter(est => est.id !== estudianteAEliminar.id));
      setIsModalEliminar(false);
    }
  };

  // Manejar agregar estudiante
  const handleAgregarEstudiante = (nuevoEstudiante) => {
    setEstudiantes([...estudiantes, nuevoEstudiante]);
  };

  // Guardar cambios de campos
  const handleGuardarCambio = (id, campo, valor) => {
    setEstudiantes(prev => prev.map(est =>
      est.id === id ? { ...est, [campo]: valor } : est
    ));
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Estudiantes</h1>
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => setIsModalAgregar(true)}
        >
          Agregar Nuevo
        </button>
      </div>

      <TablaResponsiva
        columnas={columnasEstudiantes}
        datos={estudiantes}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        titulo="Estudiantes"
        onGuardarCambio={handleGuardarCambio}
      />

      {/* Modal para editar estudiante */}
      <ModalEE
        isOpen={isModalEditar}
        onClose={() => setIsModalEditar(false)}
        objeto={estudianteAEditar ? `${estudianteAEditar.nombre} ${estudianteAEditar.apellido}` : ''}
        onAccion={confirmarEditar}
        accion="editar"
      />

      {/* Modal para eliminar estudiante */}
      <ModalEE
        isOpen={isModalEliminar}
        onClose={() => setIsModalEliminar(false)}
        objeto={estudianteAEliminar ? `${estudianteAEliminar.nombre} ${estudianteAEliminar.apellido}` : ''}
        onAccion={confirmarEliminar}
        accion="eliminar"
      />

      {/* Modal para agregar estudiante */}
      <AgregarEstudiante
        isOpen={isModalAgregar}
        onClose={() => setIsModalAgregar(false)}
        onAdd={handleAgregarEstudiante}
      />
    </div>
  );
}