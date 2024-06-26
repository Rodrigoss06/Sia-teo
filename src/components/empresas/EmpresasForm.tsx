import useApi from "@/hooks/useApi";
import React, { useState } from "react";

function EmpresasForm() {
  const {
    loading,
    error,
    getEmpleados,
    createEmpresa,
    createRemuneracion,
    createDescuento,
    createAportacion,
    createBoletaPago,
  } = useApi();
  const [newEmpresa, setNewEmpresa] = useState<MAE_Empresa>({
    NOMBRE: "",
    ID_EMPRESA: "",
    DIRECCION: "",
    RAZON_SOCIAL: "",
    RUBRO_EMPRESA: "",
    RUC: "",
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(newEmpresa);
      const response = await createEmpresa(
        "https://sia-teo-8rns.vercel.app/api",
        JSON.stringify(newEmpresa)
      );
      console.log(response);
      console.log(response.empresa);
      setNewEmpresa((state) => ({
        ...state,
        NOMBRE: "",
        DIRECCION: "",
        RAZON_SOCIAL: "",
        RUBRO_EMPRESA: "",
        RUC: "",
      }));
    } catch (error) {
      console.error("Error fetching empleados");
    }
  };
  return (
    <form className="flex flex-col p-2 gap-y-4" onSubmit={handleOnSubmit}>
      <input
        type="number"
        minLength={11}
        maxLength={11}
        className="p-2 rounded"
        name="Ruc"
        id="ruc"
        placeholder="RUC"
        onChange={(e) =>
          setNewEmpresa((state) => ({
            ...state,
            RUC: e.target.value,
            ID_EMPRESA: e.target.value,
          }))
        }
      />
      <input
        type="text"
        className="p-2 rounded"
        name="Nombre"
        id="direccion"
        placeholder="Nombre"
        onChange={(e) =>
          setNewEmpresa((state) => ({
            ...state,
            NOMBRE: e.target.value,
          }))
        }
      />
      <input
        type="text"
        className="p-2 rounded"
        name="Direccion"
        id="direccion"
        placeholder="Direccion"
        onChange={(e) =>
          setNewEmpresa((state) => ({
            ...state,
            DIRECCION: e.target.value,
          }))
        }
      />
      <input
        type="text"
        className="p-2 rounded"
        name="Razon_social"
        id="razon_social"
        placeholder="Razon Social"
        onChange={(e) =>
          setNewEmpresa((state) => ({
            ...state,
            RAZON_SOCIAL: e.target.value,
          }))
        }
      />
      <input
        type="text"
        className="p-2 rounded"
        name="Rubro_empresa"
        id="rubro_empresa"
        placeholder="Rubro Empresa"
        onChange={(e) =>
          setNewEmpresa((state) => ({
            ...state,
            RUBRO_EMPRESA: e.target.value,
          }))
        }
      />
      <button type="submit" className="p-2 bg-blue-600 text-white">
        Crear empresa
      </button>
    </form>
  );
}

export default EmpresasForm;
