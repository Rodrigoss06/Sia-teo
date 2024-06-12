import axios from "axios";
import React, { useState } from "react";

function EmpleadoForm() {
  const [newEmpleado, setNewEmpleado] = useState<Omit<MAE_Trabajadores, 'PK_MAE_Trabajador'>>({
    DNI: "",
    NOMBRE: "",
    APELLIDO: "",
    FECHA_NACIMIENTO: new Date(),
    DIRECCION: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/empleados", {
        newEmpleado: JSON.stringify(newEmpleado),
      });
      console.log(response);
      setNewEmpleado({
        DNI: "",
        NOMBRE: "",
        APELLIDO: "",
        FECHA_NACIMIENTO: new Date(),
        DIRECCION: "",
      });
      setError(null); // Limpiar el error después de un envío exitoso
    } catch (error) {
      console.error("Error fetching empleados");
      setError("Ocurrió un error al agregar el empleado.");
    }
  };
  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-3">
      <div className="flex justify-center">
        <h1 className="text-white text-xl">Agregar Empleado</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <input
        className="p-2 rounded text-lg"
        type="number"
        minLength={8}
        maxLength={8}
        value={newEmpleado.DNI!}
        placeholder="DNI"
        onChange={(e) =>
          setNewEmpleado((state) => ({ ...state, DNI: e.target.value }))
        }
      />
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
      <button className="rounded p-2 text-white bg-orange-400/70" type="submit">
        Agregar Empleado
      </button>
    </form>
  );
}

export default EmpleadoForm;
