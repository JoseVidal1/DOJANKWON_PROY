import React, { useState } from 'react';
import { DeleteIcon } from 'lucide-react';

const Examenes = () => {
  const [examenes, setExamenes] = useState([]);
  const [formData, setFormData] = useState({
    estudianteE: '',
    rangoA: '',
    rangoN: '',
    calentamiento: '',
    tecMano: '',
    tecPatada: '',
    tecEspe: '',
    combate: '',
    rompimiento: '',
    teorico: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calcularNotaFinal = (datos) => {
    const valores = [
      datos.calentamiento,
      datos.tecMano,
      datos.tecPatada,
      datos.tecEspe,
      datos.combate,
      datos.rompimiento,
      datos.teorico
    ];
    return valores.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const notaFinal = calcularNotaFinal(formData);
    const nuevoExamen = {
      ...formData,
      notaFinal,
      puesto: 0
    };

    const nuevosExamenes = [...examenes, nuevoExamen];

    nuevosExamenes.sort((a, b) => b.notaFinal - a.notaFinal);
    nuevosExamenes.forEach((examen, i) => {
      examen.puesto = i + 1;
    });

    setExamenes(nuevosExamenes);
    setFormData({
      estudianteE: '',
      rangoA: '',
      rangoN: '',
      calentamiento: '',
      tecMano: '',
      tecPatada: '',
      tecEspe: '',
      combate: '',
      rompimiento: '',
      teorico: ''
    });
  };

  const eliminarExamen = (index) => {
    const actualizados = examenes.filter((_, i) => i !== index);
    actualizados.sort((a, b) => b.notaFinal - a.notaFinal);
    actualizados.forEach((examen, i) => {
      examen.puesto = i + 1;
    });
    setExamenes(actualizados);
  };

  return (
    <div className='relative pt-8 pb-4' style={{ backgroundColor: "var(--primary-dark-color)" }}>
      {/* Presentación */}
      <hr className="absolute top-1 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>EXÁMENES</h1>
      <h1 className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-7xl font-josefin mb-2 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>GESTIONAR EXÁMENES</h1>
      <p className="font-josefin ml-2">Administra <span style={{ color: "var(--accent-dark-color)" }}>fácilmente</span> los exámenes y calificaciones. Controla la evaluación de forma <span style={{ color: "var(--accent-dark-color)" }}>precisa</span> y segura.</p>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="w-full space-y-10 mt-10 px-4">
        {/* DATOS DE ESTUDIANTE */}
        <div>
          <hr className="border-t border-[color:var(--secundary-dark-color)]" />
          <h1 className='text-sm text-center font-bold ml-2 font-josefin' style={{ color: "var(--accent-dark-color)" }}>DATOS DE ESTUDIANTE</h1>
          <hr className="border-t border-[color:var(--secundary-dark-color)]" />
          <div className="flex flex-wrap gap-x-6 gap-y-4 mt-4">
            {[
              { id: 'estudianteE', label: 'Estudiante' },
              { id: 'rangoA', label: 'Rango Actual' },
              { id: 'rangoN', label: 'Nuevo Rango' }
            ].map(({ id, label }) => (
              <div key={id} className="w-full md:flex-1 flex flex-col min-w-0">
                <label htmlFor={id} className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">{label}</label>
                <input
                  type="text"
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  placeholder={label}
                  required
                  className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1"/>
              </div>
            ))}
          </div>
        </div>

        {/* DESEMPEÑO DE ESTUDIANTE */}
        <div>
          <hr className="border-t border-[color:var(--secundary-dark-color)]" />
          <h1 className='text-sm text-center font-bold ml-2 font-josefin' style={{ color: "var(--accent-dark-color)" }}>DESEMPEÑO DE ESTUDIANTE</h1>
          <hr className="border-t border-[color:var(--secundary-dark-color)]" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-4 mt-2">
            {[
              { id: 'calentamiento', label: 'Calentamiento', pts: 10 },
              { id: 'tecMano', label: 'Técnica de Mano', pts: 20 },
              { id: 'tecPatada', label: 'Técnica de Patada', pts: 20 },
              { id: 'tecEspe', label: 'Técnica Especial', pts: 10 },
              { id: 'combate', label: 'Combate', pts: 20 },
              { id: 'rompimiento', label: 'Rompimiento', pts: 10 },
              { id: 'teorico', label: 'Teoría', pts: 10 }
            ].map(({ id, label, pts }) => (
              <div key={id} className="col-span-1 mt-5 flex flex-col">
                <label htmlFor={id} className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">{label} <span style={{ color: "var(--accent-dark-color)" }}>({pts}pts)</span></label>
                <input
                  type="number"
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  placeholder={label}
                  required
                  className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1"/>
              </div>
            ))}

            {/*Registrar*/}
            <div className="mt-8 col-span-1 flex flex-col">
              <button type="submit" className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md px-6 font-medium transition hover:scale-105 duration-300" style={{ backgroundColor: "var(--terceary-dark-color)", color: "var(--text-dark-color)" }}>
                <span>Registrar</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                  <div className="relative h-full w-8 bg-white/20"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Tabla de Exámenes */}
      <div className="p-5 mt-10">
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full text-center shadow-lg border border-[color:var(--terceary-dark-color)]">
            <thead style={{ backgroundColor: "var(--secundary-dark-color)", borderBottom: "1px solid var(--terceary-dark-color)" }}>
              <tr>
                {['Estudiante', 'Rango Actual', 'Nuevo Rango', 'Calentamiento', 'Mano', 'Patada', 'Especial', 'Combate', 'Rompimiento', 'Teoría', 'Nota Final', 'Puesto', 'Acción'].map((col) => (
                  <th key={col} className="p-3 text-sm font-semibold" style={{ color: "var(--text-dark-color)" }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4b607f]">
              {examenes.map((item, index) => {
                {/*Reprueba?*/}
                const reprobado = item.notaFinal < 60;
                return (
                  <tr key={index} style={{ backgroundColor: 'var(--sidebar-dark-hover)' }}>
                    {[item.estudianteE,
                    item.rangoA,
                    item.rangoN,
                    item.calentamiento,
                    item.tecMano,
                    item.tecPatada,
                    item.tecEspe,
                    item.combate,
                    item.rompimiento,
                    item.teorico,
                    item.notaFinal].map((val, i) => (
                      <td key={i} className={`p-2 ${reprobado && i === 10 ? 'text-red-500 font-bold' : ''}`}>
                        {val}
                      </td>
                    ))}
                    <td className={`p-2 font-bold ${reprobado ? 'text-red-500' : ''}`}>
                      {reprobado ? 'NP' : item.puesto}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => eliminarExamen(index)}
                        className="p-1 text-sm bg-gray-700 rounded hover:bg-red-700"
                        title="Eliminar examen"
                      >
                        <DeleteIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Responsive cards para móvil */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mt-4">
          {examenes.map((item, index) => {
            {/*Reprueba?*/}
            const reprobado = item.notaFinal < 60;
            return (
              <div key={index} className="p-4 rounded-lg shadow" style={{ backgroundColor: "var(--secundary-dark-color)", color: "var(--text-dark-color)" }}>
                {Object.entries({
                  Estudiante: item.estudianteE,
                  'Rango Actual': item.rangoA,
                  'Nuevo Rango': item.rangoN,
                  Calentamiento: item.calentamiento,
                  Mano: item.tecMano,
                  Patada: item.tecPatada,
                  Especial: item.tecEspe,
                  Combate: item.combate,
                  Rompimiento: item.rompimiento,
                  Teoría: item.teorico,
                  'Nota Final': item.notaFinal,
                  Puesto: reprobado ? 'NP' : item.puesto
                }).map(([key, value]) => (
                  <div key={key} className={`text-sm text-center mb-2 ${key === 'Nota Final' && reprobado ? 'text-red-500 font-bold' : ''}`}>
                    <label className="block font-semibold">{key}:</label>
                    <span>{value || "-"}</span>
                  </div>
                ))}
                <div className="flex justify-center space-x-2 pt-2">
                  <button
                    onClick={() => eliminarExamen(index)}
                    className="p-1 text-sm bg-gray-700 rounded hover:bg-red-700"
                    title="Eliminar examen"
                  >
                    <DeleteIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};
export default Examenes;
