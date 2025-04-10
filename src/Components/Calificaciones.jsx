import React, { useState } from 'react';

export default function Calificaciones({ nombre, grado, calentamiento, tec_mano, tec_patada, tec_especial, combate, rompimiento, teorica, nota_final, puesto_ocupado }) {
  const [notaCalentamiento, setNotaCalentamiento] = useState(calentamiento || '');
  const [notaMano, setNotaMano] = useState(tec_mano || '');
  const [notaPatada, setNotaPatada] = useState(tec_patada || '');
  const [notaEspecial, setNotaEspecial] = useState(tec_especial || '');
  const [notaCombate, setNotaCombate] = useState(combate || '');
  const [notaRompimiento, setNotaRompimiento] = useState(rompimiento || '');
  const [notaTeorica, setNotaTeorica] = useState(teorica || '');

  return (
    <tr className="border-b">
      <td className="px-1 py-1">{nombre}</td>
      <td className="px-1 py-1">{grado}</td>

      <td className='px-1 py-1'>
        <input
          className='text-center w-20'
          type="number"
          value={notaCalentamiento}
          onChange={e => setNotaCalentamiento(e.target.value)}
        />
      </td>
      <td className='px-1 py-1'>
        <input
          className='text-center w-20'
          type="number"
          value={notaMano}
          onChange={e => setNotaMano(e.target.value)}
        />
      </td>
      <td className='px-1 py-1'>
        <input
          className='text-center w-20'
          type="number"
          value={notaPatada}
          onChange={e => setNotaPatada(e.target.value)}
        />
      </td>
      <td className='px-1 py-1'>
        <input
          className='text-center w-20'
          type="number"
          value={notaEspecial}
          onChange={e => setNotaEspecial(e.target.value)}
        />
      </td>
      <td className='px-1 py-1'>
        <input
          className='text-center w-20'
          type="number"
          value={notaCombate}
          onChange={e => setNotaCombate(e.target.value)}
        />
      </td>
      <td className='px-1 py-1'>
        <input
          className='text-center w-20'
          type="number"
          value={notaRompimiento}
          onChange={e => setNotaRompimiento(e.target.value)}
        />
      </td>
      <td className='px-1 py-1'>
        <input
          className='text-center w-20'
          type="number"
          value={notaTeorica}
          onChange={e => setNotaTeorica(e.target.value)}
        />
      </td>

      <td className='px-1 py-1'>
        <span className='text-center w-20'>
          {nota_final}
        </span>
      </td>
      <td className='px-1 py-1'>
        <span className='text-center w-20'>
          {puesto_ocupado}
        </span>
      </td>
    </tr>
  );
}
