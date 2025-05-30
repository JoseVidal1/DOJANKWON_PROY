import React, { useEffect, useState } from 'react';
import { Bell, User, Calendar, CreditCard } from 'lucide-react';

const Pagos = () => {
  const [listaPagos, setListaPagos] = useState([]);

  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('todos');

  useEffect(() => {
    fetch('http://localhost:5234/api/Pago')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar los pagos');
        }
        return response.json();
      })
      .then((data) => {
        setListaPagos(data);
      })
      .catch((error) => {
        console.error('Error al cargar pagos:', error);
      });
  }, []);

  const obtenerConfiguracionEstado = (estadoPago) => {
    if (estadoPago === 'pagado') return { clasesCSS: 'bg-green-100 text-green-800 border-green-200', textoMostrar: 'Pagado', icono: '✓' };
    if (estadoPago === 'pendiente') return { clasesCSS: 'bg-yellow-100 text-yellow-800 border-yellow-200', textoMostrar: 'Pendiente', icono: '⚠️' };
    return { clasesCSS: 'bg-gray-100 text-gray-800 border-gray-200', textoMostrar: 'Desconocido', icono: '?' };
  };

  const manejarRegistroPago = (datosUsuario) => {
    fetch('http://localhost:5234/api/Pago', {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosUsuario),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al registrar el pago');
        }
        return response.json();
      })
      .then((data) => {
        setListaPagos((prevPagos) => prevPagos.map(pago => pago.id === data.id ? data : pago));
        alert(`Pago registrado exitosamente para ${datosUsuario.idEstudianteNavigation.nombres}`);
      })
      .catch((error) => {
        console.error('Error al registrar el pago:', error);
        alert('Error al registrar el pago. Por favor, inténtalo de nuevo.');
      });
  };

  const contarPagosPorEstado = (estadoBuscado) => listaPagos.filter(p => p.estado === estadoBuscado).length;

  const CartaPago = ({ datosUsuario }) => {
    const conf = obtenerConfiguracionEstado(datosUsuario.estado);
    return (
      <div className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border overflow-hidden" style={{ backgroundColor: "var(--secundary-dark-color)", borderColor: "var(--terceary-dark-color)" }}>
        <div className="bg-gradient-to-r from-[#18181e] to-[#4b607f] p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span className="font-semibold">{datosUsuario.idEstudianteNavigation.nombres}</span>
            </div>
            <span className="text-sm opacity-90">ID: {datosUsuario.id}</span>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Fecha de Pago</p>
                <p className="font-medium">{datosUsuario.fechaPago || 'No pagado'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Fecha de Vencimiento</p>
                <p className="font-medium">{datosUsuario.fechaVencimiento}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${conf.clasesCSS}`}>
              <span className="mr-2">{conf.icono}</span>{conf.textoMostrar}
            </span>
          </div>
          <div className="pt-4 border-t" style={{ borderColor: "var(--terceary-dark-color)" }}>
            {datosUsuario.estado === 'pendiente' ? (
              <button onClick={() => manejarRegistroPago(datosUsuario)}
                className="w-full text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2" style={{ backgroundColor: 'var(--terceary-dark-color)' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3d506b')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--terceary-dark-color)')}>
                <CreditCard className="w-4 h-4" />
                <span>Registrar Pago</span>
              </button>
            ) : (
              <div className="w-full bg-gray-100 text-gray-500 font-medium py-3 px-4 rounded-lg text-center">
                <span>Pago Completado</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const TarjetaEstadistica = ({ etiqueta, cantidad, colorTexto }) => (
    <div className="rounded-lg p-4 shadow-md text-center" style={{ backgroundColor: "var(--secundary-dark-color)" }}>
      <p className={`text-2xl font-bold ${colorTexto}`}>{cantidad}</p>
      <p className="text-sm text-white">{etiqueta}</p>
    </div>
  );

  // Contenido principal
  return (
    <div className='relative pt-8 pb-4' style={{ backgroundColor: "var(--primary-dark-color)" }}>
      {/* Presentacion */}
      <hr className="absolute top-1 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm font-bold ml-2  font-josefin' style={{ color: "var(--accent-dark-color)" }}>PAGOS</h1>
      <hr className="absolute top-12 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-7xl font-josefin mb-2 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>GESTIONAR PAGOS</h1>
      <hr className="w-[calc(100%+140px)] mx-[-70px] border-t border-[color:var(--secundary-dark-color)] mb-6" />
      <hr className="absolute left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <p className="font-josefin ml-2">Supervisa los <span style={{ color: "var(--accent-dark-color)" }}>pagos</span> de Estudiantes de manera <span style={{ color: "var(--accent-dark-color)" }}>clara</span> y <span style={{ color: "var(--accent-dark-color)" }}>organizada</span>.<br />Asegura un seguimiento <span style={{ color: "var(--accent-dark-color)" }}>puntual</span> de vencimientos y gestiona las <span style={{ color: "var(--accent-dark-color)" }}>notificaciones</span> con facilidad.</p>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <hr className=" mt-10 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm font-bold ml-2 text-center  font-josefin' style={{ color: "var(--accent-dark-color)" }}>ADMINISTRACION DE PAGOS</h1>
      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      {/* Resumen Estado */}
      <hr className="mt-5 left-[-80px] right-[-80px] border-t border-[color:var(--secundary-dark-color)]" />
      <div className="ml-1">
        <h2 className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-6xl font-josefin mb-2 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>ESTADOS</h2>
        <div className="grid grid-cols-2 gap-4">
          <TarjetaEstadistica etiqueta="Pagados" cantidad={contarPagosPorEstado('pagado')} colorTexto="text-green-600" />
          <TarjetaEstadistica etiqueta="Pendientes" cantidad={contarPagosPorEstado('pendiente')} colorTexto="text-yellow-600" />
        </div>
      </div>
      <hr className="mb-5 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />

      <hr className="left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm font-bold ml-2 text-center  font-josefin' style={{ color: "var(--accent-dark-color)" }}>ESTUDIANTES</h1>
      <hr className="mb-5 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      {/* Div principal / contenido */}
      <div className="w-full bg-transparent">

        {/* Div busqueda / Filtros */}
        <div className="mb-4 w-full flex flex-col md:flex-row md:items-center gap-2">
          <input
            type="text"
            placeholder="Buscar por nombre de usuario..."
            className="w-full pl-10 pr-3 py-2 border border-[color:var(--accent-dark-color)] rounded shadow-sm focus:outline-none focus:border-[color:var(--accent-dark-color)] focus:ring-[color:var(--accent-dark-color)] focus:ring-2 text-sm"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
          />
          <select
            className="w-full pl-10 pr-3 py-2 border border-[color:var(--accent-dark-color)] rounded shadow-sm focus:outline-none focus:border-[color:var(--accent-dark-color)] focus:ring-[color:var(--accent-dark-color)] focus:ring-2 text-sm"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
          >
            <option className="bg-[color:var(--secundary-dark-color)] text-[color:var(--text-dark-color)]" value="todos">Todos los estados</option>
            <option className="bg-[color:var(--secundary-dark-color)] text-[color:var,--text-dark-color)]" value="pagado">Pagado</option>
            <option className="bg-[color:var(--secundary-dark-color)] text-[color:var,--text-dark-color)]" value="pendiente">Pendiente</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listaPagos
            .filter(p => p.idEstudianteNavigation.nombres.toLowerCase().includes(terminoBusqueda.toLowerCase()))
            .filter(p => estadoFiltro === 'todos' || p.estado === estadoFiltro)
            .map((datosUsuario) => (
              <CartaPago key={datosUsuario.id} datosUsuario={datosUsuario} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Pagos;