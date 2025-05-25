import { useState, useEffect, useMemo, useCallback } from "react";

const NOTE_TYPES = {
  CALENTAMIENTO: { max: 10, label: "Calentamiento" },
  MANO: { max: 20, label: "Técnica Mano" },
  PATADA: { max: 20, label: "Técnica Patada" },
  ESPECIAL: { max: 10, label: "Técnica Especial" },
  COMBATE: { max: 20, label: "Combate" },
  ROMPIMIENTO: { max: 10, label: "Rompimiento" },
  TEORICA: { max: 10, label: "Teórica" },
};

export default function Calificaciones({
  index,
  nombre,
  grado,
  grupo,
  calentamiento = "",
  tec_mano = "",
  tec_patada = "",
  tec_especial = "",
  combate = "",
  rompimiento = "",
  teorica = "",
  puesto = 0,
  onNotaFinalChange,
}) {
  const initialNotas = useMemo(
    () => ({
      calentamiento,
      tec_mano,
      tec_patada,
      tec_especial,
      combate,
      rompimiento,
      teorica,
    }),
    [
      calentamiento,
      tec_mano,
      tec_patada,
      tec_especial,
      combate,
      rompimiento,
      teorica,
    ]
  );

  const [notas, setNotas] = useState(initialNotas);
  const [notaFinal, setNotaFinal] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const validarNota = useCallback((value, max) => {
    if (value === "") return "";
    const num = parseFloat(value);
    return isNaN(num) ? "" : Math.max(0, Math.min(max, num));
  }, []);

  const handleNotaChange = useCallback(
    (field, max) => (e) =>
      setNotas((prev) => ({
        ...prev,
        [field]: validarNota(e.target.value, max),
      })),
    [validarNota]
  );

  useEffect(() => {
    const valoresNotas = Object.values(notas);
    const todasValidas = valoresNotas.every((nota) => nota !== "");
    const total = todasValidas
      ? valoresNotas.reduce((sum, nota) => sum + parseFloat(nota), 0)
      : 0;

    setNotaFinal(total);
    onNotaFinalChange?.(index, total);
  }, [notas, index, onNotaFinalChange]);

  const { medalla, bgColor } = useMemo(() => {
    let medalla = "-";
    let bgColor = "bg-[color:var(--background-primary)]";

    if (puesto > 0) {
      if (puesto === 1) {
        medalla = "🥇";
        bgColor = "bg-[color:var(--gold-bg)]";
      } else if (puesto === 2) {
        medalla = "🥈";
        bgColor = "bg-[color:var(--silver-bg)]";
      } else if (puesto === 3) {
        medalla = "🥉";
        bgColor = "bg-[color:var(--bronze-bg)]";
      } else {
        medalla = puesto;
      }
    }

    return { medalla, bgColor };
  }, [puesto]);

  const hoverClasses = isHovered ? "bg-[color:var(--table-hover-bg)]" : "";

  return (
    <tr
      className={`border-b transition-colors ${bgColor} ${hoverClasses}`}
      style={{ cursor: "pointer" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="p-3 text-sm text-[color:var(--text-primary)]">
        <div className="font-medium">{nombre}</div>
        <div className="text-xs text-[color:var(--secondary-text-color)] mt-1">
          {grupo}
        </div>
      </td>
      <td className="p-3 text-sm text-[color:var(--text-primary)]">{grado}</td>

      {Object.entries({
        calentamiento: NOTE_TYPES.CALENTAMIENTO,
        tec_mano: NOTE_TYPES.MANO,
        tec_patada: NOTE_TYPES.PATADA,
        tec_especial: NOTE_TYPES.ESPECIAL,
        combate: NOTE_TYPES.COMBATE,
        rompimiento: NOTE_TYPES.ROMPIMIENTO,
        teorica: NOTE_TYPES.TEORICA,
      }).map(([field, { max, label }]) => (
        <td key={field} className="p-3">
          <input
            className="w-16 md:w-20 rounded px-2 py-1 text-sm text-center 
              border border-[color:var(--input-border)] 
              bg-[color:var(--input-bg)] 
              text-[color:var(--text-primary)] 
              focus:outline-none focus:ring-1 focus:ring-[color:var(--accent-color)]"
            type="number"
            value={notas[field] ?? ""}
            onChange={handleNotaChange(field, max)}
            min="0"
            max={max}
            step="0.1"
            aria-label={label}
            title={label}
          />
        </td>
      ))}

      <td className="p-3 text-sm font-medium text-[color:var(--text-primary)]">
        {notaFinal.toFixed(1)}
      </td>
      <td className="p-3 text-sm text-[color:var(--text-primary)]">
        {medalla}
      </td>
    </tr>
  );
}
