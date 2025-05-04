import React, { useState } from 'react';
import Calificaciones from '../Components/Calificaciones';

const estudiantes = [
  { nombre: "Alvaro Vidal", grupo: "niños", grado: "Blanco Franja Amarilla", calentamiento: 10, tec_mano: 20, tec_patada: 20, tec_especial: 10, combate: 20, rompimiento: 10, teorica: 10 },
  { nombre: "Jose Vidal", grupo: "mayores", grado: "Blanco Franja Amarilla", calentamiento: 5, tec_mano: 20, tec_patada: 20, tec_especial: 10, combate: 20, rompimiento: 10, teorica: 10 },
  { nombre: "Damian Quintero", grupo: "niños", grado: "Blanco Franja Amarilla", calentamiento: 4, tec_mano: 20, tec_patada: 20, tec_especial: 10, combate: 20, rompimiento: 10, teorica: 10 },
  { nombre: "Alvaro Vidal", grupo: "mayores", grado: "Blanco Franja Amarilla", calentamiento: 2, tec_mano: 20, tec_patada: 20, tec_especial: 10, combate: 20, rompimiento: 10, teorica: 10 },
];

const Examenes = () => {
  const [notasFinales, setNotasFinales] = useState({});
  const [grupo, setGrupo] = useState(estudiantes);
  
  const filtroGrupo = (grupoSeleccionado) => {
    if (!grupoSeleccionado) {
      setGrupo(estudiantes);
      return;
    }
    const estudiantesFiltrados = estudiantes.filter(est => est.grupo === grupoSeleccionado);
    setGrupo(estudiantesFiltrados);
  };
  
  const handleNotaChange = (index, nota) => {
    setNotasFinales(prev => ({ ...prev, [index]: nota }));
  };

  const estudiantesConNotas = grupo.map((est, i) => ({
    ...est,
    index: i,
    notaFinal: notasFinales[i] ?? 0,
  }));

  const estudiantesOrdenados = [...estudiantesConNotas].sort((a, b) => b.notaFinal - a.notaFinal);
  
  return (
    <div className="p-5 rounded-[30px] shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] bg-gray-100 text-[#333]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Exámenes</h1>
          <p className="text-gray-500 mt-1">Gestión de exámenes y evaluaciones</p>
        </div>
        <select 
          onChange={e => filtroGrupo(e.target.value)} 
          className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        > 
          <option value="">Todos los grupos</option>
          <option value="niños">Grupo 5pm-6pm</option>
          <option value="mayores">Grupo 6pm-7pm</option>
          <option value="clase3">Grupo 7pm-8pm</option>
        </select>
      </div>
      
      <div className="lg:overflow-x-auto sm:overflow-x-scroll">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-3 py-3 text-left font-medium">Nombre</th>
              <th className="px-3 py-3 text-left font-medium">Grado</th>
              <th className="px-3 py-3 text-center font-medium">Calent.<br/>(10pts)</th>
              <th className="px-3 py-3 text-center font-medium">Tec.Mano<br/>(20pts)</th>
              <th className="px-3 py-3 text-center font-medium">Tec.Patada<br/>(20pts)</th>
              <th className="px-3 py-3 text-center font-medium">Tec.Especial<br/>(10pts)</th>
              <th className="px-3 py-3 text-center font-medium">Combate<br/>(20pts)</th>
              <th className="px-3 py-3 text-center font-medium">Rompimiento<br/>(10pts)</th>
              <th className="px-3 py-3 text-center font-medium">Teórica<br/>(10pts)</th>
              <th className="px-3 py-3 text-center font-medium">Nota<br/>Final</th>
              <th className="px-3 py-3 text-center font-medium">Puesto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {estudiantesOrdenados.map((est, orden) => (
              <Calificaciones
                key={est.index}
                index={est.index}
                nombre={est.nombre}
                grado={est.grado}
                calentamiento={est.calentamiento}
                tec_mano={est.tec_mano}
                tec_patada={est.tec_patada}
                tec_especial={est.tec_especial}
                combate={est.combate}
                rompimiento={est.rompimiento}
                teorica={est.teorica}
                onNotaFinalChange={handleNotaChange}
                puesto={orden + 1}
              />
            ))}  
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Examenes;