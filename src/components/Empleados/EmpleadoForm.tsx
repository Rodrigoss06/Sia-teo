import useApi from "@/hooks/useApi";
import axios from "axios";
import React, { useEffect, useState } from "react";

function EmpleadoForm() {
  const { loading, getEmpresas,getDocumentos, createHorarioLaborado, createRemuneracion, createDescuento, createAportacion, createBoletaPago } = useApi();

  const [documentos,setDocumentos] = useState<MAE_Tipo_Documento[]>()
  const [empresas,setEmpresas] = useState<MAE_Empresa[]>([])
  const [newEmpleado, setNewEmpleado] = useState<Omit<MAE_Empleado, 'ID_EMPLEADO'>>({
    FECHA_INGRESO:new Date(),
    ID_TIPO: 0,
    ID_EMPRESA: "",
    NOMBRE: "",
    APELLIDO: "",
    FECHA_NACIMIENTO: new Date(),
    DIRECCION: "",
    HIJOS:"si"
  });

  const [error, setError] = useState<string | null>(null);
  useEffect(()=>{
    const getDataEmpresas = async()=>{
      const data = await getEmpresas("http://localhost:3000/api")
      setEmpresas(data.empresas)
    }
    const getDataDocumentos = async()=>{
      const data = await getDocumentos("http://localhost:3000/api")
      setDocumentos(data.documentos)
    }
    getDataEmpresas()
    getDataDocumentos()
  },[])
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/empleados", {
        newEmpleado: JSON.stringify(newEmpleado),
      });
      console.log(response);
      setNewEmpleado({
        FECHA_INGRESO:new Date(),
        ID_TIPO: 0,
        ID_EMPRESA: "",
        NOMBRE: "",
        APELLIDO: "",
        FECHA_NACIMIENTO: new Date(),
        DIRECCION: "",
        HIJOS:"si"
      });
      setError(null);
    } catch (error) {
      console.error("Error fetching empleados");
      setError("Ocurrió un error al agregar el empleado.");
    }
  };
  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-3 ">
      <div className="flex justify-center">
        <h1 className="text-white text-xl">Agregar Empleado</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <select
        name="tipos_Documentos"
        id="Tipos_Documentos"
        className=" rounded text-lg grid col-span-2"
        required
        onChange={(e) =>
          {
            console.log(e.target.value)
            setNewEmpleado((state) => ({
              ...state,
              ID_TIPO: Number(e.target.value),
            }))
          }
        }
      >
        <option value={""}>Seleccionar documento</option>
        {documentos?.map((documento: MAE_Tipo_Documento) => (
          <option
            key={documento.ID_TIPO}
            value={documento.ID_TIPO}
          >
            {documento.DESCRIPCION}
          </option>
        ))}
      </select>
      <input
        className="p-2 rounded text-lg"
        type="text"
        maxLength={100}
        placeholder="Nombres"
        value={newEmpleado.NOMBRE!}
        onChange={(e) =>
          setNewEmpleado((state) => ({ ...state, NOMBRE: e.target.value }))
        }
      />
      <input
        className="p-2 rounded text-lg"
        type="text"
        maxLength={100}
        placeholder="Apellidos"
        value={newEmpleado.APELLIDO!}
        onChange={(e) =>
          setNewEmpleado((state) => ({ ...state, APELLIDO: e.target.value }))
        }
      />
      <input
        className="p-2 rounded text-lg"
        type="date"
        placeholder="Fecha nacimiento"
        value={newEmpleado.FECHA_NACIMIENTO?.toDateString()!}
        onChange={(e) =>
          setNewEmpleado((state) => ({
            ...state,
            FECHA_NACIMIENTO: new Date(e.target.value),
          }))
        }
      />

      <input
        className="p-2 rounded text-lg"
        type="text"
        maxLength={200}
        placeholder="Dirección"
        value={newEmpleado.DIRECCION!}
        onChange={(e) =>
          setNewEmpleado((state) => ({ ...state, DIRECCION: e.target.value }))
        }
      />
      <select
        name="empresas"
        id="Empresas"
        className=" rounded text-lg grid col-span-2"
        required
        onChange={(e) =>
          setNewEmpleado((state) => ({
            ...state,
            ID_EMPRESA: e.target.value,
          }))
        }
      >
        <option value={""}>Seleccionar empresa</option>
        {empresas?.map((empresa: MAE_Empresa) => (
          <option
            key={empresa.ID_EMPRESA}
            value={empresa.ID_EMPRESA}
          >
            {empresa.RUC + " " + empresa.RUBRO_EMPRESA}
          </option>
        ))}
      </select>
      <button className="rounded p-2 text-white bg-orange-400/70" type="submit">
        Agregar Empleado
      </button>
    </form>
  );
}

export default EmpleadoForm;
