import React, { useState, useRef, useEffect } from 'react';
import { DeleteIcon, FileText  } from 'lucide-react';
import { form, s, tr } from 'framer-motion/client';

const Examenes = () => {
  const [examenes, setExamenes] = useState([]);
  const [inputEstudiante, setInputEstudiante] = useState('');
  const [formData, setFormData] = useState({
    estudianteE: '',
    calentamiento: '',
    tecMano: '',
    tecPatada: '',
    tecEspe: '',
    combate: '',
    rompimiento: '',
    teorico: ''
  });
  const [estudiantes, setEstudiantes] = useState([]);
  const listaEstudiantes = estudiantes.map(est => ({
    id: est.id,
    nombreCompleto: est.nombres + " " + est.apellidos
  }));  // Autocompletado
  const [sugerencias, setSugerencias] = useState([]);
  const [indiceSugerencia, setIndiceSugerencia] = useState(-1);
  useEffect(() => {
    // Cargar usuarios desde la API al montar el componente
    fetch('http://localhost:5234/api/Examen')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar los examenes');
        }
        return response.json();
      })
      .then((data) => {
        setExamenes(data);
      })
      .catch((error) => {
        console.error('Error al cargar examenes:', error);
      });
  }, []);
  useEffect(() => {
    // Cargar usuarios desde la API al montar el componente
    fetch('http://localhost:5234/api/Estudiante')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar los estudiantes');
        }
        return response.json();
      })
      .then((data) => {
        setEstudiantes(data);
      })
      .catch((error) => {
        console.error('Error al cargar estudiantes:', error);
      });
  }, []);


  // Referencia Autocompletador
  const autoRef = useRef(null);

  // Cerrar Sugerencias
  useEffect(() => {
    function handleClickOutside(event) {
      if (autoRef.current && !autoRef.current.contains(event.target)) {
        setSugerencias([]);
        setIndiceSugerencia(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  //============Desen
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

    //Rango Aca va log
    const notaFinal = calcularNotaFinal(formData);
    const nuevoExamen = {
      estudianteId: formData.estudianteE,
      calentamiento: formData.calentamiento,
      tecMano: formData.tecMano,
      tecPatada: formData.tecPatada,
      tecEspecial: formData.tecEspe,
      combate: formData.combate,
      rompimiento: formData.rompimiento,
      teorica: formData.teorico
    };
    console.log(nuevoExamen);

    fetch('http://localhost:5234/api/Examen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoExamen)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al registrar el examen');
        }
        return response.json();
      })
      .then(data => {
        setExamenes((prev) => [...prev, data]);
      })
      .catch(error => {
        console.error('Error al registrar el examen:', error);
      });

    setFormData({
      estudianteE: '',
      calentamiento: '',
      tecMano: '',
      tecPatada: '',
      tecEspe: '',
      combate: '',
      rompimiento: '',
      teorico: ''
    });
    setSugerencias([]);
    setIndiceSugerencia(-1);
  };

  const eliminarExamen = (index) => {
    const actualizados = examenes.filter((_, i) => i !== index);
    actualizados.sort((a, b) => b.notaFinal - a.notaFinal);
    actualizados.forEach((examen, i) => {
      examen.puesto = i + 1;
    });
    setExamenes(actualizados);
  };

  const handleDownload = () => {
    fetch("http://localhost:5234/api/Examen/pdf-examenes", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo descargar el PDF");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "examenes.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error("Error al descargar el PDF:", error);
      });
  }
  return (
    <div className='relative pt-8 pb-4' style={{ backgroundColor: "var(--primary-dark-color)" }}>
      {/* Encabezado */}
      <hr className="absolute top-1 left-[-70px] right-[-70px] border-t border-[color:var(--secundary-dark-color)]" />
      <h1 className='text-sm font-bold ml-2 font-josefin' style={{ color: "var(--accent-dark-color)" }}>EXÁMENES</h1>
      <h1 className="text-2xl sm:text-4xl ml-1 md:text-5xl lg:text-7xl font-josefin mb-2 font-medium text-left" style={{ color: "var(--text-dark-color)" }}>GESTIONAR EXÁMENES</h1>
      <p className="font-josefin ml-2">Administra <span style={{ color: "var(--accent-dark-color)" }}>fácilmente</span> los exámenes y calificaciones.</p>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="w-full space-y-10 mt-10 px-4">
        {/* Campo Estudiante con autocompletado */}
        <div>
          <hr className="border-t border-[color:var(--secundary-dark-color)]" />
          <h1 className='text-sm text-center font-bold ml-2 font-josefin' style={{ color: "var(--accent-dark-color)" }}>DATOS DE ESTUDIANTE</h1>
          <hr className="border-t border-[color:var(--secundary-dark-color)]" />
          <div className="flex flex-wrap gap-x-6 gap-y-4 mt-4">

            {/*Estudiante INput*/}
            <div className="w-full flex justify-center">
              <div ref={autoRef} className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] flex flex-col relative">
                <label htmlFor="estudianteE" className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase text-center mb-1">Estudiante</label>
                <input
                  type="text"
                  id="estudianteE"
                  name="estudianteE"
                  autoComplete="off"
                  placeholder="Nombre del estudiante"
                  required
                  className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-2 text-center text-base"
                  value={
                    inputEstudiante
                  }
                  onChange={e => {
                    const input = e.target.value;
                    const filtrados = listaEstudiantes.filter(est =>
                      est.nombreCompleto.toLowerCase().includes(input.toLowerCase())
                    );
                    setSugerencias(filtrados);
                    setIndiceSugerencia(-1);
                    setInputEstudiante(input);
                    setFormData({ ...formData, estudianteE: '' });
                  }}
                  onKeyDown={e => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setIndiceSugerencia(prev => Math.min(prev + 1, sugerencias.length - 1));
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setIndiceSugerencia(prev => Math.max(prev - 1, 0));
                    } else if (e.key === 'Enter') {
                      e.preventDefault();
                      if (indiceSugerencia >= 0 && sugerencias.length > 0) {
                        const seleccionado = sugerencias[indiceSugerencia];
                        setFormData({ ...formData, estudianteE: seleccionado.id });
                        setInputEstudiante(seleccionado.nombreCompleto);
                      } else if (sugerencias.length > 0) {
                        const seleccionado = sugerencias[0];
                        setFormData({ ...formData, estudianteE: seleccionado.id });
                        setInputEstudiante(seleccionado.nombreCompleto);
                      }
                      setSugerencias([]);
                      setIndiceSugerencia(-1);
                    }
                  }}
                />
                {sugerencias.length > 0 && (
                  <ul className="absolute top-full z-10 w-full bg-white text-black rounded shadow">
                    {sugerencias.map((est, i) => (
                      <li
                        key={est.id}
                        className={`p-2 cursor-pointer ${i === indiceSugerencia ? 'bg-gray-200' : ''}`}
                        onClick={() => {
                          setInputEstudiante(est.nombreCompleto);
                          setFormData({ ...formData, estudianteE: est.id });
                          setSugerencias([]);
                          setIndiceSugerencia(-1);
                        }}
                      >
                        {est.nombreCompleto}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desempeño */}
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
                <label htmlFor={id} className="text-sm font-josefin font-semibold text-[var(--text-dark-color)] uppercase">
                  {label} <span style={{ color: "var(--accent-dark-color)" }}>({pts}pts)</span>
                </label>
                <input type="number" id={id} name={id} value={formData[id]} onChange={handleChange} placeholder={label} required
                  className="bg-transparent border-b-2 border-[var(--accent-dark-color)] text-white p-1"
                />
              </div>
            ))}

            {/* Botón registrar */}
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

      {/* Tabla de resultados */}
      <div className="p-5 mt-10">

      {/* botn DE pdf */}
      <div className="mb-4 flex justify-start">
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-2 bg-[#F44E1C] hover:bg-[#F44E1C66] text-white font-semibold rounded shadow"
        onClick={handleDownload}
      >
        <FileText size={20} /> Generar PDF
      </button>
    </div>

        {/* Tabla escritorio */}
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full text-center shadow-lg border border-[color:var(--terceary-dark-color)]">
            <thead style={{ backgroundColor: "var(--secundary-dark-color)" }}>
              <tr>
                {['Estudiante', 'Calentamiento', 'Mano', 'Patada', 'Especial', 'Combate', 'Rompimiento', 'Teoría', 'Nota Final'].map((col) => (
                  <th key={col} className="p-3 text-sm font-semibold text-[var(--text-dark-color)]">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4b607f]">
              {examenes.map((item, index) => {
                const reprobado = item.notaFinal < 60;
                return (
                  <tr key={index} className="hover:bg-[var(--sidebar-dark-hover)] transition-colors duration-200">
                    <td className="p-2 font-bold text-[var(--text-dark-color)]">{item.estudiante.nombres + " " + item.estudiante.apellidos}</td>
                    <td className="p-2">{item.calentamiento}</td>
                    <td className="p-2">{item.tecMano}</td>
                    <td className="p-2">{item.tecPatada}</td>
                    <td className="p-2">{item.tecEspecial}</td>
                    <td className="p-2">{item.combate}</td>
                    <td className="p-2">{item.rompimiento}</td>
                    <td className="p-2">{item.teorica}</td>
                    <td className="p-2">{item.notaFinal}</td>
                    <td className={`p-2 font-bold ${reprobado ? 'text-red-500' : ''}`}>{reprobado ? 'NP' : item.puesto}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Tarjetas para móvil */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {examenes.map((item, index) => {
            const reprobado = item.notaFinal < 60;
            return (
              <div key={index} className="rounded-lg shadow p-4 space-y-2" style={{ backgroundColor: "var(--secundary-dark-color)", color: "var(--text-dark-color)" }}>
                <div className='text-color-white'><b>Estudiante:</b> {item.estudiante.nombres + " " + item.estudiante.apellidos}</div>
                <div><b>Calentamiento:</b> <span className="text-white">{item.calentamiento}</span></div>
                <div><b>Mano:</b> <span className="text-white">{item.tecMano}</span></div>
                <div><b>Patada:</b> <span className="text-white">{item.tecPatada}</span></div>
                <div><b>Especial:</b> <span className="text-white">{item.tecEspe}</span></div>
                <div><b>Combate:</b> <span className="text-white">{item.combate}</span></div>
                <div><b>Rompimiento:</b> <span className="text-white">{item.rompimiento}</span></div>
                <div><b>Teoría:</b> <span className="text-white">{item.teorico}</span></div>
                <div>
                  <b>Nota Final:</b>{" "}
                  <span className={reprobado ? "text-red-500 font-bold" : ""}>{item.notaFinal}</span>
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