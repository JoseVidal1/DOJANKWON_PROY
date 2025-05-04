import React, { useState, useEffect } from 'react'
import editIcon from '../assets/icons/edit.svg';
import deleteIcon from '../assets/icons/delete.svg';

export default function Estudiante({ estudiante, onEditar, onEliminar }) {
    const [eps, setEps] = useState(estudiante.eps);
    const [direccion, setDireccion] = useState(estudiante.direccion);
    const [telefono, setTelefono] = useState(estudiante.telefono);
    const [correo, setCorreo] = useState(estudiante.correo);

    useEffect(() => {
        setEps(estudiante.eps);
        setDireccion(estudiante.direccion);
        setTelefono(estudiante.telefono);
        setCorreo(estudiante.correo);
    }, [estudiante]);

    const handleEditar = () => {
        onEditar({
            ...estudiante,
            eps,
            direccion,
            telefono,
            correo
        });
    };

    // editar y eliminar
    const EditIcon = (
      <img src="/assets/icons/edit.svg" alt="Editar" width={16} height={16} />
    );
    const DeleteIcon = (
      <img src="/assets/icons/delete.svg" alt="Eliminar" width={16} height={16} />
    );

    // Estilos
    const inputClass = 'w-30 px-1 py-0.5 bg-transparent text-center text-sm';
    const buttonClass = 'flex items-center justify-center w-7 h-7 mt-1.5 rounded bg-gray-700 hover:bg-gray-800 transition-colors';

    return (
        <tr className="hover:bg-gray-100 ">
            <td className='p-2 text-center'>{estudiante.id}</td>
            <td className='p-2 text-center'>{estudiante.nombre}</td>
            <td className='p-2 text-center'>{estudiante.apellido}</td>
            <td className="p-2 text-center">{(() => {
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
            })()}</td>
            <td className='p-2 text-center align-middle'><input className={inputClass}  type="text" value={eps} onChange={e=> setEps( e.target.value)} /></td>
            <td className='p-2 text-center align-middle'><input className={inputClass} type="text" value={direccion} onChange={e=> setDireccion(e.target.value)}  /></td>
            <td className='p-2 text-center align-middle'><input className={inputClass} type="text" value={telefono} onChange={e=> setTelefono(e.target.value)} /></td>
            <td className='p-2 text-center align-middle'><input className={inputClass} type="email" value={correo} onChange={e=> setCorreo(e.target.value)} /></td>
            <td className="flex justify-center items-center gap-1">
                <button className={buttonClass} onClick={handleEditar} title="Editar">
                  <img src={editIcon} alt="Editar" className="w-4 h-4" />
                </button>
                <button className={buttonClass + ' ml-1'} onClick={() => onEliminar(estudiante)} title="Eliminar">
                  <img src={deleteIcon} alt="Eliminar" className="w-4 h-4" />
                </button>
            </td>
        </tr>
    )
}
