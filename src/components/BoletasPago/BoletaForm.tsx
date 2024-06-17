import useApi from "@/hooks/useApi";
import { TRS_Remuneraciones } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function BoletaForm() {
  const {
    loading,
    error,
    getEmpleados,
    createHorarioLaborado,
    createRemuneracion,
    createDescuento,
    createAportacion,
    createBoletaPago,
  } = useApi();
  const [trabajadores, setTrabajadores] = useState<MAE_Empleado[]>();
  const [horario_Laborado, setHorario_Laborado] = useState<
    Omit<MAE_Horario_Laborado, "PK_MAE_Horario_Laborado">
  >({
    MES: 0,
    DIAS_LABORADOS: 0,
    HORAS_LABORADAS: 0,
    HORAS_EXTRA: 0,
    DIAS_NO_LABORADOS: 0,
  });
  const [trsRemuneraciones, setTrsRemuneraciones] = useState<
    Omit<TRS_Remuneraciones, "ID_REMUNERACION_TRANSACCIONAL">
  >({
    ID_REMUNERACIONES: 0,
    TOTAL: null,
  });
  const [remuneraciones, setRemuneraciones] = useState<
    Omit<MAE_Remuneraciones, "ID_REMUNERACIONES">[]
  >([{ DESCRIPCION: "", MONTO: 0 }]);

  const [trsDescuentos, setTrsDescuentos] = useState<
    Omit<TRS_Descuentos, "ID_DESCUENTO_TRANSACCIONAL">
  >({
    ID_DESCUENTO: 0,
    TOTAL: 0,
  });
  const [descuentos, setDescuentos] = useState<
    Omit<MAE_Descuentos, "ID_DESCUENTO">[]
  >([{ DESCRIPCION: "", MONTO: 0, PORCENTAJE: 0 }]);

  const [aportaciones, setAportaciones] = useState<
    Omit<TRS_Aportaciones, "ID_APORTACIONES">
  >({
    ESSALUD: 1,
    SCTR: 0,
  });
  const [boletaPagoDetalles, setBoletaPagoDetalles] = useState<
    Omit<TRS_Boleta_Pago_Detalle, "ID_BOLETA_PAGO_DETALLE">
  >({
    ID_DESCUENTO_TRANSACCIONAL: 0,
    ID_REMUNERACION_TRANSACCIONAL: 0,
    ID_APORTACIONES_TRANSACCIONAL: 0,
  });

  const [boletaPago, setBoletaPago] = useState<
    Omit<TRS_Boleta_Pago, "ID_BOLETA_PAGO">
  >({
    FECHA: new Date(),
    ID_EMPLEADO: 0,
    DIAS_LABORADOS: 0,
    TOTAL_HORAS_LABORADAS: 0,
    HORAS_EXTRAS: 0,
    DIAS_NO_LABORADOS: 0,
    NETO_PAGAR: 0,
    ID_BOLETA_PAGO_DETALLES: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmpleados("http://localhost:3000/api");
      setTrabajadores(data.empleados);
    };
    fetchData();
  }, []);
  useEffect(() => {}, [remuneraciones]);
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // const newHorario = await createHorarioLaborado(
      //   "http://localhost:3000/api",
      //   JSON.stringify(horario_Laborado)
      // );
      // console.log("Nuevo Horario:", newHorario);

      // if (!newHorario) throw new Error("No se pudo crear el horario");

      const newRemuneraciones = await Promise.all(
        remuneraciones.map((remuneracion) =>
          createRemuneracion(
            "http://localhost:3000/api",
            JSON.stringify(remuneracion)
          )
        )
      );

      const newDescuentos = await Promise.all(
        descuentos.map((descuento) =>
          createDescuento("http://localhost:3000/api", JSON.stringify(descuento))
        )
      );

      const newAportacion = await createAportacion(
        "http://localhost:3000/api",
        JSON.stringify(aportaciones)
      );

      const ID_REMUNERACION_TRANSACCIONAL = newRemuneraciones[0].ID_REMUNERACION_TRANSACCIONAL;
      const ID_DESCUENTO_TRANSACCIONAL = newDescuentos[0].ID_DESCUENTO_TRANSACCIONAL;
      const ID_APORTACIONES_TRANSACCIONAL = newAportacion.ID_APORTACIONES;

      const newBoletaPagoDetalle = {
        ID_DESCUENTO_TRANSACCIONAL,
        ID_REMUNERACION_TRANSACCIONAL,
        ID_APORTACIONES_TRANSACCIONAL,
      };

      const boletaPagoDetalle = await createBoletaPago(
        "http://localhost:3000/api",
        JSON.stringify(newBoletaPagoDetalle)
      );

      const newBoletaPago = {
        ...boletaPago,
        ID_BOLETA_PAGO_DETALLES: boletaPagoDetalle.ID_BOLETA_PAGO_DETALLE,
      };

      const boletaPagoCreated = await createBoletaPago(
        "http://localhost:3000/api",
        JSON.stringify(newBoletaPago)
      );

      console.log('Nueva Boleta de Pago:', boletaPagoCreated);
    } catch (error) {
      console.error("Error creando boleta de pago:", error);
    }
  };
  const handleAddRemuneracionField = () => {
    setRemuneraciones([...remuneraciones, { DESCRIPCION: "", MONTO: 0 }]);
  };

  const handleRemoveRemuneracionField = (index: number) => {
    setRemuneraciones(remuneraciones.filter((_, i) => i !== index));
  };

  const handleChangeRemuneracion = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedRemuneraciones = [...remuneraciones];
    updatedRemuneraciones[index] = {
      ...updatedRemuneraciones[index],
      [field]: value,
    };
    setRemuneraciones(updatedRemuneraciones);
  };

  // Funciones para manejar múltiples descuentos
  const handleAddDescuentoField = () => {
    setDescuentos([
      ...descuentos,
      { DESCRIPCION: "", MONTO: 0, PORCENTAJE: 0 },
    ]);
  };

  const handleRemoveDescuentoField = (index: number) => {
    setDescuentos(descuentos.filter((_, i) => i !== index));
  };

  const handleChangeDescuento = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedDescuentos = [...descuentos];
    updatedDescuentos[index] = { ...updatedDescuentos[index], [field]: value };
    setDescuentos(updatedDescuentos);
  };
  return (
    <form
      onSubmit={handleOnSubmit}
      className="grid gap-5 text-black  grid-rows-[minmax(50px,_0.5fr),_repeat(5,_minmax(70px,_1fr))_minmax(20px,40px)] grid-cols-[repeat(6,minmax(150px,_1fr))]"
    >
      <div className="grid col-span-6">
        <h1 className="text-white text-xl">Crear Boleta de Pago</h1>
        {error && <p style={{ color: "red" }}>{String(error.message)}</p>}
      </div>
      <div className="grid col-span-2">
        <h1 className="text-white mb-[-10px]">Trabajador</h1>
        <select
          name="empleados"
          id="Empleado"
          className=" rounded  bg-[#C6C6C6]"
          required
          onChange={(e) =>
            setBoletaPago((state) => ({
              ...state,
              FK_MAE_Trabajador: Number(e.target.value),
            }))
          }
        >
          <option value={""}>Seleccionar...</option>
          {trabajadores?.map((trabajador: MAE_Empleado) => (
            <option key={trabajador.ID_EMPLEADO} value={trabajador.ID_EMPLEADO}>
              {trabajador.NOMBRE + " " + trabajador.APELLIDO}
            </option>
          ))}
        </select>
      </div>
      <div
        className="grid col-span-4 gap-x-4 grid-cols-[repeat(4,minmax(30px,_1fr))]"
        id="horario_laborado"
      >
        <div className="flex flex-col col-span-1">
          <label htmlFor="mes" className="text-white">
            Dias laborados
          </label>
          <input
            type="number"
            name="dias_laborados"
            className="rounded"
            placeholder="DIAS LABORADOS"
            value={horario_Laborado.DIAS_LABORADOS}
            required
            onChange={(e) =>
              setHorario_Laborado((state) => ({
                ...state,
                DIAS_LABORADOS: Number(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex flex-col col-span-1">
          <label htmlFor="mes" className="text-white">
            Horas laboradas
          </label>

          <input
            type="number"
            name="horas_laborados"
            className="rounded"
            placeholder="HORAS LABORADAS"
            value={horario_Laborado.HORAS_LABORADAS}
            onChange={(e) =>
              setHorario_Laborado((state) => ({
                ...state,
                HORAS_LABORADAS: Number(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex flex-col col-span-1">
          <label htmlFor="mes" className="text-white">
            Hora extra
          </label>

          <input
            type="number"
            name="horas_extra"
            className="rounded"
            placeholder="HORAS EXTRA"
            value={horario_Laborado.HORAS_EXTRA}
            onChange={(e) =>
              setHorario_Laborado((state) => ({
                ...state,
                HORAS_EXTRA: Number(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex flex-col col-span-1">
          <label htmlFor="mes" className="text-white">
            Dias no laborados
          </label>

          <input
            type="number"
            name="dias_no_laborados"
            className="rounded"
            placeholder="DIAS NO LABORADOS"
            value={horario_Laborado.DIAS_NO_LABORADOS}
            onChange={(e) =>
              setHorario_Laborado((state) => ({
                ...state,
                DIAS_NO_LABORADOS: Number(e.target.value),
              }))
            }
          />
        </div>
      </div>
      <div className="grid col-span-2 row-span-4 gap-4 grid-rows-[repeat(4,_minmax(70px,_1fr))]" id="remuneraciones">
        <h3 className="text-white row-span-1">Remuneraciones</h3>
        {remuneraciones.map((remuneracion, index) => (
          <div key={index} className="row-span-2 flex flex-col justify-around">
            <input
              type="text"
              placeholder="Descripcion"
              className="rounded p-2"
              value={remuneracion.DESCRIPCION}
              onChange={(e) =>
                handleChangeRemuneracion(index, "DESCRIPCION", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Monto"
              value={remuneracion.MONTO}
              className="rounded p-2"
              onChange={(e) =>
                handleChangeRemuneracion(
                  index,
                  "MONTO",
                  parseFloat(e.target.value)
                )
              }
            />
            {remuneraciones.length > 1 && (
              <button
                className="text-white p-2 rounded bg-red-500 hover:bg-red-600 row-span-1"
                onClick={() => handleRemoveRemuneracionField(index)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        <div className="row-span-1 flex items-center">
        <button
          className="text-white p-2 bg-blue-400 hover:bg-blue-500 rounded"
          onClick={handleAddRemuneracionField}
        >
          Añadir Remuneracion
        </button>
        </div>
      </div>
      <div className="grid col-span-2 row-span-4 gap-4 grid-rows-[repeat(4,_minmax(70px,_1fr))]" id="descuentos">
        <h3 className="text-white row-span-1">Descuentos</h3>
        {descuentos.map((descuento, index) => (
          <div key={index} className="row-span-2 flex flex-col justify-around">
            <input
              type="text"
              placeholder="Descripcion"
              value={descuento.DESCRIPCION}
              className="p-2 rounded"
              onChange={(e) =>
                handleChangeDescuento(index, "DESCRIPCION", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Monto"
              value={descuento.MONTO}
              className="p-2 rounded"
              onChange={(e) =>
                handleChangeDescuento(
                  index,
                  "MONTO",
                  parseFloat(e.target.value)
                )
              }
            />
            <input
              type="number"
              placeholder="Porcentaje"
              value={descuento.PORCENTAJE}
              className="p-2 rounded"
              onChange={(e) =>
                handleChangeDescuento(
                  index,
                  "PORCENTAJE",
                  parseFloat(e.target.value)
                )
              }
            />
            {descuentos.length > 1 && (
              <button
                className="text-white p-2 rounded bg-red-500 hover:bg-red-600 row-span-1"
                onClick={() => handleRemoveDescuentoField(index)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        <div className="flex items-center">
        <button
          className="text-white p-2 max-w-48 max-h-12 bg-blue-400 hover:bg-blue-500 rounded"
          onClick={handleAddDescuentoField}
        >
          Añadir Descuento
        </button>
        </div>
      </div>
      <div className="grid col-span-2 row-span-2 gap-4" id="aportaciones">
        <h1 className="text-white">Aportaciones</h1>
        <input
          type="number"
          name="essalud"
          className="rounded max-h-10"
          placeholder="ESSALUD"
          value={aportaciones.ESSALUD}
          onChange={(e) =>
            setAportaciones((state) => ({
              ...state,
              ESSALUD: Number(e.target.value),
            }))
          }
        />
        <input
          type="number"
          name="sctr"
          className="rounded"
          placeholder="SCTR"
          value={aportaciones.SCTR}
          onChange={(e) =>
            setAportaciones((state) => ({
              ...state,
              SCTR: Number(e.target.value),
            }))
          }
        />
      </div>
      <button
        className="grid col-span-6 rounded p-2 text-white bg-orange-400/70"
        type="submit"
      >
        Crear Boleta de Pago
      </button>
    </form>
  );
}

export default BoletaForm;
