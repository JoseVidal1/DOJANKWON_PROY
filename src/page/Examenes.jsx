import { useState, useMemo, useCallback } from "react";
import Calificaciones from "../Components/Calificaciones";

const ESTUDIANTES_INICIALES = [
  {
    nombre: "Alvaro Vidal",
    grupo: "niños",
    grado: "Blanco Franja Amarilla",
    calentamiento: 10,
    tec_mano: 20,
    tec_patada: 20,
    tec_especial: 10,
    combate: 20,
    rompimiento: 10,
    teorica: 10,
  },
  {
    nombre: "Jose Vidal",
    grupo: "mayores",
    grado: "Blanco Franja Amarilla",
    calentamiento: 5,
    tec_mano: 20,
    tec_patada: 20,
    tec_especial: 10,
    combate: 20,
    rompimiento: 10,
    teorica: 10,
  },
  {
    nombre: "Damian Quintero",
    grupo: "niños",
    grado: "Blanco Franja Amarilla",
    calentamiento: 4,
    tec_mano: 20,
    tec_patada: 20,
    tec_especial: 10,
    combate: 20,
    rompimiento: 10,
    teorica: 10,
  },
  {
    nombre: "Alvaro Vidal",
    grupo: "mayores",
    grado: "Blanco Franja Amarilla",
    calentamiento: 2,
    tec_mano: 20,
    tec_patada: 20,
    tec_especial: 10,
    combate: 20,
    rompimiento: 10,
    teorica: 10,
  },
];

const GRUPOS_OPCIONES = [
  { value: "", label: "Todos los grupos" },
  { value: "niños", label: "Grupo 5pm-6pm" },
  { value: "mayores", label: "Grupo 6pm-7pm" },
  { value: "clase3", label: "Grupo 7pm-8pm" },
];

const COLUMNAS_TABLA = [
  { key: "nombre", label: "Nombre" },
  { key: "grado", label: "Grado" },
  { key: "calentamiento", label: "Calent.\n(10pts)", break: true },
  { key: "tec_mano", label: "Tec.Mano\n(20pts)", break: true },
  { key: "tec_patada", label: "Tec.Patada\n(20pts)", break: true },
  { key: "tec_especial", label: "Tec.Especial\n(10pts)", break: true },
  { key: "combate", label: "Combate\n(20pts)", break: true },
  { key: "rompimiento", label: "Rompimiento\n(10pts)", break: true },
  { key: "teorica", label: "Teórica\n(10pts)", break: true },
  { key: "notaFinal", label: "Nota\nFinal", break: true },
  { key: "puesto", label: "Puesto" },
];

const Examenes = () => {
  const [notasFinales, setNotasFinales] = useState({});
  const [grupoFiltro, setGrupoFiltro] = useState("");

  const handleNotaChange = useCallback((index, nota) => {
    setNotasFinales((prev) => ({ ...prev, [index]: nota }));
  }, []);

  const estudiantesFiltrados = useMemo(() => {
    if (!grupoFiltro) return ESTUDIANTES_INICIALES;
    return ESTUDIANTES_INICIALES.filter((est) => est.grupo === grupoFiltro);
  }, [grupoFiltro]);

  const estudiantesOrdenados = useMemo(() => {
    const conNotas = estudiantesFiltrados.map((est, i) => ({
      ...est,
      index: i,
      notaFinal: notasFinales[i] ?? 0,
    }));

    return [...conNotas].sort((a, b) => b.notaFinal - a.notaFinal);
  }, [estudiantesFiltrados, notasFinales]);

  const handleGrupoChange = useCallback((e) => {
    setGrupoFiltro(e.target.value);
  }, []);

  return (
    <div
      className="p-5 rounded-lg shadow relative pt-8 pb-4"
      style={{
        backgroundColor: "var(--secondary-dark-color)",
        color: "var(--text-dark-color)",
        border: "1px solid var(--tertiary-dark-color)",
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <hr className="absolute top-1 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
          <h1
            className="text-sm font-bold ml-2  font-josefin"
            style={{ color: "var(--accent-dark-color)" }}
          >
            Exámenes
          </h1>
          <hr className="absolute top-12 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
          <h1
            className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-7xl font-josefin mb-2 font-medium text-left"
            style={{ color: "var(--text-dark-color)" }}
          >
            Gestión de exámenes y evaluaciones
          </h1>
        </div>

        <select
          onChange={handleGrupoChange}
          value={grupoFiltro}
          className="rounded-md px-3 py-2 text-sm focus:outline-none w-full md:w-auto"
          style={{
            backgroundColor: "var(--sidebar-dark-hover)",
            border: "1px solid var(--tertiary-dark-color)",
            color: "var(--text-dark-color)",
            outlineColor: "var(--accent-dark-color)",
          }}
        >
          {GRUPOS_OPCIONES.map((grupo) => (
            <option key={grupo.value} value={grupo.value}>
              {grupo.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-auto rounded-lg shadow">
        <table className="w-full text-center border-collapse">
          <thead className="bg-[color:var(--secondary-dark-color)] border-b border-[color:var(--tertiary-dark-color)]">
            <tr>
              {COLUMNAS_TABLA.map((col) => (
                <th
                  key={col.key}
                  className="p-3 text-sm font-semibold tracking-wide whitespace-nowrap text-[color:var(--text-dark-color)]"
                >
                  {col.break ? (
                    <>
                      {col.label.split("\n")[0]}
                      <br />
                      {col.label.split("\n")[1]}
                    </>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--tertiary-dark-color)]">
            {estudiantesOrdenados.map((est, orden) => (
              <Calificaciones
                key={`${est.index}-${est.nombre}`}
                index={est.index}
                nombre={est.nombre}
                grado={est.grado}
                grupo={est.grupo}
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
