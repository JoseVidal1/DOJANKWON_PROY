import React from 'react';
import '../Components/input-style.css';

const Productos = () => {
  return (
    <>
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <p className="text-gray-600">Administración de productos e inventario.</p>
    </div>
    <div className="flex">
      <div >
        <form action="" className='flex flex-col gap-4'>
          <label htmlFor="codigo">Codigo</label>
          <input id='codigo' type="text" className='border rounded-md text-center' />
          <label htmlFor="">Descripcion</label>
          <input type="text" className='border rounded-md text-center' />
          <label htmlFor="">Cantidad</label>
          <input type="number" className='border rounded-md text-center' />
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-blue-400'>Agregar</button>
        </form>
      </div>
      <div>
          <table>
            <tr className='bg-indigo-900 text-white'>
              <th className='px-6 py-2'>Codigo</th>
              <th className='px-6 py-2'>Descripcion</th>
              <th className='px-6 py-2'>Cantidad</th>
            </tr>
            
          </table>
      </div>
    </div>
    </>
    
  );
};

export default Productos;