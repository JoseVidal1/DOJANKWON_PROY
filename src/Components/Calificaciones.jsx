import React, { useState, useEffect } from 'react';
import './input-style.css';

export default function Calificaciones({ index,nombre, grado, calentamiento, tec_mano, tec_patada, tec_especial, combate, rompimiento, teorica, puesto , onNotaFinalChange }) {
  const [notaCalentamiento, setNotaCalentamiento] = useState(calentamiento || '');
  const [notaMano, setNotaMano] = useState(tec_mano || '');
  const [notaPatada, setNotaPatada] = useState(tec_patada || '');
  const [notaEspecial, setNotaEspecial] = useState(tec_especial || '');
  const [notaCombate, setNotaCombate] = useState(combate || '');
  const [notaRompimiento, setNotaRompimiento] = useState(rompimiento || '');
  const [notaTeorica, setNotaTeorica] = useState(teorica || '');
  const [notaFinal, setNotaFinal] = useState(0);
  const validarNota10 = (nota) => {
    if (nota < 0) return 0;
    if (nota > 10) return 10;
    return nota;
  }
  const validarNota20 = (nota) => {
    if (nota < 0) return 0;
    if (nota > 20) return 20;
    return nota;  
  }
  useEffect(() => {
    if (
      notaCalentamiento !== '' &&
      notaMano !== '' &&
      notaPatada !== '' &&
      notaEspecial !== '' &&
      notaCombate !== '' &&
      notaRompimiento !== '' &&
      notaTeorica !== ''
    ) {
      const total =
        parseFloat(notaCalentamiento) +
        parseFloat(notaMano) +
        parseFloat(notaPatada) +
        parseFloat(notaEspecial) +
        parseFloat(notaCombate) +
        parseFloat(notaRompimiento) +
        parseFloat(notaTeorica);
        setNotaFinal(total);
      if (onNotaFinalChange) onNotaFinalChange(index,total); // 🚀 Envía al padre
    } else {
      setNotaFinal(0);
      if (onNotaFinalChange) onNotaFinalChange(index,0);
    }
  }, [notaCalentamiento, notaMano, notaPatada, notaEspecial, notaCombate, notaRompimiento, notaTeorica]);
  
  const obtenerMedalla = (_puesto) => {
    if (puesto === 0) return '-'; // Sin puesto
    if (puesto === 1) return '🥇'; // Oro
    if (puesto === 2) return '🥈'; // Plata
    if (puesto === 3) return '🥉'; // Bronce
    return puesto; // Si no es del 1 al 3, mostramos el número (puesto humano)
  };

  const getBgColor = () => {
    if (puesto === 1) return 'bg-amber-100';
    if (puesto === 2) return 'bg-gray-100';
    if (puesto === 3) return 'bg-orange-100';
    return '';
  };
  return (
    <tr className={`border-b transition-colors hover:bg-gray-100 ${getBgColor()}`}>
      <td className="px-1  py-1  ">{nombre}</td>
      <td className="px-1  py-1  ">{grado}</td>

      <td className='px-1  py-1 '>
        <input
          className='text-center   w-20 border rounded-md'
          type="number"
          value={notaCalentamiento}
          onChange={e => setNotaCalentamiento(validarNota10(e.target.value))}
        />
      </td>
      <td className='px-1  py-1 '>
        <input
          className='text-center w-20 border   rounded-md'
          type="number"
          value={notaMano}
          onChange={e => setNotaMano(validarNota20(e.target.value))}
        />
      </td>
      <td className='px-1  py-1  '>
        <input
          className='text-center w-20 border   rounded-md'
          type="number"
          value={notaPatada}
          onChange={e => setNotaPatada(validarNota20(e.target.value))}
        />
      </td>
      <td className='px-1  py-1  '>
        <input
          className='text-center w-20 border rounded-md  '
          type="number"
          value={notaEspecial}
          onChange={e => setNotaEspecial(validarNota10(e.target.value))}
        />
      </td>
      <td className='px-1  py-1 '>
        <input
          className='text-center w-20 border rounded-md  '
          type="number"
          value={notaCombate}
          onChange={e => setNotaCombate(validarNota20(e.target.value))}
        />
      </td>
      <td className='px-1  py-1 '>
        <input
          className='text-center w-20 border rounded-md  '
          type="number"
          value={notaRompimiento}
          onChange={e => setNotaRompimiento(validarNota10(e.target.value))}
        />
      </td>
      <td className='px-1  py-1 '>
        <input
          className='text-center w-20 border rounded-md  '
          type="number"
          value={notaTeorica}
          onChange={e => setNotaTeorica(validarNota10(e.target.value))}
        />
      </td>

      <td className='px-1  py-1 '>
        <span className='text-center w-20  '>
          {notaFinal}
        </span>
      </td>
      <td className='px-1  py-1 '>
      <span className='text-center w-20'>
      {obtenerMedalla(puesto)}
      </span>
      </td>
    </tr>
  );
}
