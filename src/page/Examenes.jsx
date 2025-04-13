import React,{useState} from 'react';
import Calificaciones from '../Components/Calificaciones';

const estudiantes = [
  { nombre: "Alvaro Vidal",grupo:"niños", grado: "Blanco Franja Amarilla", calentamiento: 10, tec_mano: 20, tec_patada: 20, tec_especial: 10, combate: 20, rompimiento: 10, teorica: 10},
  { nombre: "Jose Vidal",grupo:"mayores", grado: "Blanco Franja Amarilla", calentamiento: 5, tec_mano: 20, tec_patada: 20, tec_especial: 10, combate: 20, rompimiento: 10, teorica: 10 },
  {nombre: "Damian Quintero",grupo:"niños", grado: "Blanco Franja Amarilla", calentamiento: 4, tec_mano: 20, tec_patada: 20, tec_especial: 10, combate: 20, rompimiento: 10, teorica: 10},
  { nombre: "Alvaro Vidal",grupo:"mayores", grado: "Blanco Franja Amarilla", calentamiento: 2, tec_mano: 20, tec_patada: 20, tec_especial: 10, combate: 20, rompimiento: 10, teorica: 10 },
];

const Examenes = () => {
    const [notasFinales, setNotasFinales] = useState({});
    const [grupo, setGrupo] = useState(estudiantes); // Estado para el grupo seleccionado
    // Manejador que actualiza las notas desde los componentes hijos
    const filtroGrupo = (grupoSeleccionado) => {
      if(!grupoSeleccionado) {
        setGrupo(estudiantes); // Si no hay filtro, mostramos todos los estudiantes
        return;
      }
      const estudiantesFiltrados = estudiantes.filter(est => est.grupo === grupoSeleccionado);
      setGrupo(estudiantesFiltrados);
    }
  const handleNotaChange = (index, nota) => {
    setNotasFinales(prev => ({ ...prev, [index]: nota }));
  };

  // Convertimos a arreglo y ordenamos por nota final
  const estudiantesConNotas = grupo.map((est, i) => ({
    ...est,
    index: i,
    notaFinal: notasFinales[i] ?? 0,
  }));

  const estudiantesOrdenados = [...estudiantesConNotas].sort((a, b) => b.notaFinal - a.notaFinal);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-3 ">
      <h1 className="text-2xl font-bold mb-4">Exámenes</h1>
      <p className="text-gray-600">Gestión de exámenes y evaluaciones.</p>
      <select onChange={e=>filtroGrupo(e.target.value)} name="" id="" className='absolute right-20 top-20 text-[12px] border rounded-md p-1'> 
        <option value="" >Seleccione</option>
        <option value="niños">Grupo 5pm-6pm</option>
        <option value="mayores">Grupo 6m-7pm</option>
      </select>
      <table className='lg:text-[13px] lg:w-[80%]'>
        <thead>
          <tr className="bg-gray-200">
            <th className="px-2 py-2  ">Nombre</th>
            <th className="px-1 py-2  ">Grado al que aspira</th>
            <th className="px-1 py-2  ">Calentamiento (10 Puntos)</th>
            <th className="px-1 py-2  ">Tec.Mano (20 Puntos)</th>
            <th className="px-1 py-2  ">Tec.Patada (20 Puntos)</th>
            <th className="px-1 py-2  ">Tec.Especial (10 Puntos)</th>
            <th className="px-1 py-2  ">Combate (20 Puntos)</th>
            <th className="px-1 py-2">Rompimiento (10 Puntos)</th>
            <th className="px-1 py-2">Teórica (10 Puntos)</th>
            <th className="px-1 py-2">Nota Final</th>
            <th className="px-1 py-2">Puesto</th>
          </tr>
        </thead>
        <tbody>
          
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
  );
};

export default Examenes;