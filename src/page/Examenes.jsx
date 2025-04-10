import React from 'react';
import Calificaciones from '../Components/Calificaciones';

const estudiantes = [
  { nombre: "Alvaro Vidal", grado: "Blanco Franja Amarilla", calentamiento: 10, tec_mano: 20, tec_patada: 20, tec_especial: 10, combate: 20, rompimiento: 10, teorica: 10, nota_final: 100, puesto_ocupado: 1 },
  { nombre: "Jose Vidal", grado: "Blanco Franja Amarilla", calentamiento: 10, tec_mano: 20, tec_patada: 20, tec_especial: 10, combate: 20, rompimiento: 10, teorica: 10, nota_final: 100, puesto_ocupado: 2 },
  {nombre: "Damian Quintero", grado: "Blanco Franja Amarilla", calentamiento: 10, tec_mano: 20, tec_patada: 20, tec_especial: 10, combate: 20, rompimiento: 10, teorica: 10, nota_final: 100, puesto_ocupado: 3 },
  { nombre: "Alvaro Vidal", grado: "Blanco Franja Amarilla", calentamiento: 10, tec_mano: 20, tec_patada: 20, tec_especial: 10, combate: 20, rompimiento: 10, teorica: 10, nota_final: 100, puesto_ocupado: 1 },
  { nombre: "Jose Vidal", grado: "Blanco Franja Amarilla", calentamiento: 10, tec_mano: 20, tec_patada: 20, tec_especial: 10, combate: 20, rompimiento: 10, teorica: 10, nota_final: 100, puesto_ocupado: 2 },
  {nombre: "Damian Quintero", grado: "Blanco Franja Amarilla", calentamiento: 10, tec_mano: 20, tec_patada: 20, tec_especial: 10, combate: 20, rompimiento: 10, teorica: 10, nota_final: 100, puesto_ocupado: 3 },
];


const Examenes = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Exámenes</h1>
      <p className="text-gray-600">Gestión de exámenes y evaluaciones.</p>
      <table>
        <thead>
          <tr className="bg-gray-200">
            <th className="px-2 py-2">Nombre</th>
            <th className="px-1 py-2">Grado al que aspira</th>
            <th className="px-1 py-2">Calentamiento (10 Puntos)</th>
            <th className="px-1 py-2">Tec.Mano (20 Puntos)</th>
            <th className="px-1 py-2">Tec.Patada (20 Puntos)</th>
            <th className="px-1 py-2">Tec.Especial (10 Puntos)</th>
            <th className="px-1 py-2">Combate (20 Puntos)</th>
            <th className="px-1 py-2">Rompimiento (10 Puntos)</th>
            <th className="px-1 py-2">Teórica (10 Puntos)</th>
            <th className="px-1 py-2">Nota Final</th>
            <th className="px-1 py-2">Puesto Ocupado</th>
          </tr>
        </thead>
        <tbody>
          
          {estudiantes.map((estudiante, index) => (
            <Calificaciones key={index} nombre={estudiante.nombre} grado={estudiante.grado} calentamiento={estudiante.calentamiento} tec_mano={estudiante.tec_mano} tec_patada={estudiante.tec_patada} tec_especial={estudiante.tec_especial} combate={estudiante.combate} rompimiento={estudiante.rompimiento} teorica={estudiante.teorica} nota_final={estudiante.nota_final} puesto_ocupado={estudiante.puesto_ocupado}/>
          ))}
          
          
          
          
        </tbody>
      </table>
    </div>
  );
};

export default Examenes;