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
  <div className="p-5 rounded-[30px] shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff]" style={{ backgroundColor: "var(--secundary-background-color)", color: "var(--primary-text-color)"}}>
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold" style={{ color: "var(--primary-text-color)" }}>Exámenes</h1>
        <p className="text-gray-500 mt-1" style={{ color: "var(--secundary-text-color)" }}> Gestión de exámenes y evaluaciones</p>
      </div>
    
    <select onChange={e => filtroGrupo(e.target.value)} className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2" style={{ backgroundColor: "var(--primary-background-color)", border: "1px solid var(--custom-border-color)", color: "var(--primary-text-color)", outlineColor: "var(--sidebar-active-text)"}}>
      <option value="">Todos los grupos</option>
      <option value="niños">Grupo 5pm-6pm</option>
      <option value="mayores">Grupo 6pm-7pm</option>
      <option value="clase3">Grupo 7pm-8pm</option>
    </select>
    </div>

  <div className="overflow-auto rounded-lg shadow hidden md:block">
    <table className="w-full text-center">
      <thead style={{backgroundColor: "var(--primary-background-color)", borderBottom: "2px solid var(--custom-border-color)"}}>
        <tr>
          <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Nombre</th>
          <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Grado</th>
          <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Calent.<br />(10pts)</th>
          <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Tec.Mano<br />(20pts)</th>
          <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Tec.Patada<br />(20pts)</th>
          <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Tec.Especial<br />(10pts)</th>
          <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Combate<br />(20pts)</th>
          <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Rompimiento<br />(10pts)</th>
          <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Teórica<br />(10pts)</th>
          <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Nota<br />Final</th>
          <th className="p-3 text-sm font-semibold tracking-wide" style={{ color: "var(--primary-text-color)" }}>Puesto</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
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