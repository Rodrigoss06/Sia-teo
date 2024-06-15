import useApi from "@/hooks/useApi";
import { TRS_Remuneraciones } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function EmpleadoForm() {
  const { loading, error, getEmpleados, createHorarioLaborado, createRemuneracion, createDescuento, createAportacion, createBoletaPago } = useApi();
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
  const [trsRemuneraciones, setTrsRemuneraciones] = useState<Omit<TRS_Remuneraciones, 'ID_REMUNERACION_TRANSACCIONAL'>>({
    ID_REMUNERACIONES: 0,
    TOTAL: null,
  });
  const [remuneraciones, setRemuneraciones] = useState<Omit<MAE_Remuneraciones, 'ID_REMUNERACIONES'>[]>([
    { DESCRIPCION: '', MONTO: 0 }
  ]);

  const [trsDescuentos, setTrsDescuentos] = useState<Omit<TRS_Descuentos, 'ID_DESCUENTO_TRANSACCIONAL'>>({
    ID_DESCUENTO: 0,
    TOTAL: 0,
  });
  const [descuentos, setDescuentos] = useState<Omit<MAE_Descuentos, 'ID_DESCUENTO'>[]>([
    { DESCRIPCION: '', MONTO: 0, PORCENTAJE: 0 }
  ]);

  const [aportaciones, setAportaciones] = useState<
    Omit<TRS_Aportaciones, "ID_APORTACIONES">
  >({
    ESSALUD: 1,
    SCTR:0
  });
  const [boletaPagoDetalles, setBoletaPagoDetalles] = useState<Omit<TRS_Boleta_Pago_Detalle, 'ID_BOLETA_PAGO_DETALLE'>>({
    ID_DESCUENTO_TRANSACCIONAL: 0,
    ID_REMUNERACION_TRANSACCIONAL: 0,
    ID_APORTACIONES_TRANSACCIONAL: 0,
  });

  const [boletaPago, setBoletaPago] = useState<Omit<TRS_Boleta_Pago, 'ID_BOLETA_PAGO'>>({
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
  useEffect(()=>{
    
  },[remuneraciones])
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newHorario = (await createHorarioLaborado("http://localhost:3000/api", JSON.stringify(horario_Laborado)))
      console.log('Nuevo Horario:', newHorario);
  
      if (!newHorario) throw new Error('No se pudo crear el horario');
  
      // const total_remuneraciones = remuneraciones.SUELDO_COMPUTABLE + remuneraciones.REMUNERACION_VACACIONAL + remuneraciones.MOVILIDAD_SUPLEMENTOS + remuneraciones.CTS;
      // setRemuneraciones((state) => ({ ...state, TOTAL_REMUNERACIONES: total_remuneraciones }));
  
      // const [newRemuneracion, newDescuento, newAportacion] = await Promise.all([
      //   createRemuneracion("http://localhost:3000/api", JSON.stringify(remuneraciones)),
      //   createDescuento("http://localhost:3000/api", JSON.stringify(descuentos)),
      //   createAportacion("http://localhost:3000/api", JSON.stringify(aportaciones))
      // ]);
  
      // console.log('Nueva Remuneración:', newRemuneracion);
      // console.log('Nuevo Descuento:', newDescuento);
      // console.log('Nueva Aportación:', newAportacion);
      // console.log(newHorario.horario.PK_MAE_Horario_Laborado)
      // console.log(newAportacion.aportacion.PK_MAE_Aportaciones)
      // console.log(newRemuneracion.remuneracion.PK_MAE_Remuneraciones)
      // console.log(newDescuento.descuento.PK_MAE_Descuentos)
      // if (!newRemuneracion) throw new Error('No se pudo crear la remuneración');
      // if (!newDescuento) throw new Error('No se pudo crear el descuento');
      // if (!newAportacion) throw new Error('No se pudo crear la aportación');
      // const FK_MAE_Horario = newHorario.horario.PK_MAE_Horario_Laborado;
      // const FK_MAE_Aportaciones = newAportacion.aportacion.PK_MAE_Aportaciones;
      // const FK_MAE_Remuneraciones = newRemuneracion.remuneracion.PK_MAE_Remuneraciones;
      // const FK_MAE_Descuentos = newDescuento.descuento.PK_MAE_Descuentos;
  
      // setBoletaPago((state) => ({
      //   ...state,
      //   FK_MAE_Horario,
      //   FK_MAE_Remuneraciones,
      //   FK_MAE_Descuentos,
      //   FK_MAE_Aportaciones
      // }));
  
      // const newBoleta = await createBoletaPago("http://localhost:3000/api", JSON.stringify(boletaPago));
      // console.log('Nueva Boleta de Pago:', newBoleta);
      
    } catch (error) {
      console.error("Error creando boleta de pago:", error);
    }
  };
  const handleAddRemuneracionField = () => {
    setRemuneraciones([...remuneraciones, { DESCRIPCION: '', MONTO: 0 }]);
  };

  const handleRemoveRemuneracionField = (index: number) => {
    setRemuneraciones(remuneraciones.filter((_, i) => i !== index));
  };

  const handleChangeRemuneracion = (index: number, field: string, value: string | number) => {
    const updatedRemuneraciones = [...remuneraciones];
    updatedRemuneraciones[index] = { ...updatedRemuneraciones[index], [field]: value };
    setRemuneraciones(updatedRemuneraciones);
  };

  // Funciones para manejar múltiples descuentos
  const handleAddDescuentoField = () => {
    setDescuentos([...descuentos, { DESCRIPCION: '', MONTO: 0, PORCENTAJE: 0 }]);
  };

  const handleRemoveDescuentoField = (index: number) => {
    setDescuentos(descuentos.filter((_, i) => i !== index));
  };

  const handleChangeDescuento = (index: number, field: string, value: string | number) => {
    const updatedDescuentos = [...descuentos];
    updatedDescuentos[index] = { ...updatedDescuentos[index], [field]: value };
    setDescuentos(updatedDescuentos);
  };
  return (
    <form onSubmit={handleOnSubmit} className="grid gap-4 text-black  grid-rows-[minmax(50px,_1fr),_repeat(5,_minmax(50px,_1fr))_minmax(20px,40px)] grid-cols-[repeat(6,minmax(150px,_1fr))]">
      <div className="grid col-span-6">
        <h1 className="text-white text-xl">Crear Boleta de Pago</h1>
        {error && <p style={{ color: "red" }}>{String(error.message)}</p>}
      </div>
      <select
        name="empleados"
        id="Empleado"
        className=" rounded text-lg grid col-span-2"
        required
        onChange={(e) =>
          setBoletaPago((state) => ({
            ...state,
            FK_MAE_Trabajador: Number(e.target.value),
          }))
        }
      >
        <option value={""}></option>
        {trabajadores?.map((trabajador: MAE_Empleado) => (
          <option
            key={trabajador.ID_EMPLEADO}
            value={trabajador.ID_EMPLEADO}
          >
            {trabajador.NOMBRE + " " + trabajador.APELLIDO}
          </option>
        ))}
      </select>
      <div className="grid col-span-4 gap-x-4 grid-cols-[minmax(30px,_1fr),_minmax(30px,_1fr),_minmax(30px,_1fr),_minmax(30px,_1fr)_minmax(30px,_1fr)]" id="horario_laborado">
        <input
          type="number"
          name="mes"
          className="rounded"
          placeholder="MES"
          value={horario_Laborado.MES}
          required
          onChange={(e) =>
            setHorario_Laborado((state) => ({
              ...state,
              MES: Number(e.target.value),
            }))
          }
        />
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
      <div className="grid col-span-2 row-span-4 gap-4" id="remuneraciones">
        <h3>Add Remuneraciones</h3>
        {remuneraciones.map((remuneracion, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Descripcion"
              value={remuneracion.DESCRIPCION}
              onChange={(e) => handleChangeRemuneracion(index, 'DESCRIPCION', e.target.value)}
            />
            <input
              type="number"
              placeholder="Monto"
              value={remuneracion.MONTO}
              onChange={(e) => handleChangeRemuneracion(index, 'MONTO', parseFloat(e.target.value))}
            />
            {remuneraciones.length > 1 && (
              <button onClick={() => handleRemoveRemuneracionField(index)}>Remove</button>
            )}
          </div>
        ))}
        <button onClick={handleAddRemuneracionField}>Añadir Remuneracion</button>
      </div>
      <div className="grid col-span-2 row-span-4 gap-4" id="descuentos">
      <h3>Add Descuentos</h3>
        {descuentos.map((descuento, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Descripcion"
              value={descuento.DESCRIPCION}
              onChange={(e) => handleChangeDescuento(index, 'DESCRIPCION', e.target.value)}
            />
            <input
              type="number"
              placeholder="Monto"
              value={descuento.MONTO}
              onChange={(e) => handleChangeDescuento(index, 'MONTO', parseFloat(e.target.value))}
            />
            <input
              type="number"
              placeholder="Porcentaje"
              value={descuento.PORCENTAJE}
              onChange={(e) => handleChangeDescuento(index, 'PORCENTAJE', parseFloat(e.target.value))}
            />
            {descuentos.length > 1 && (
              <button onClick={() => handleRemoveDescuentoField(index)}>Remove</button>
            )}
          </div>
        ))}
        <button onClick={handleAddDescuentoField}>Add Another Descuento</button>
      </div>
      <div className="grid col-span-2 row-span-2 gap-4" id="aportaciones">
        <input
          type="number"
          name="essalud"
          className="rounded"
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
      <button className="grid col-span-6 rounded p-2 text-white bg-orange-400/70" type="submit">
        Crear Boleta de Pago
      </button>
    </form>
  );
}

export default EmpleadoForm;
