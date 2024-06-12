import useApi from "@/hooks/useApi";
import axios from "axios";
import React, { useEffect, useState } from "react";

function EmpleadoForm() {
  const { loading, error, getEmpleados, createHorarioLaborado, createRemuneracion, createDescuento, createAportacion, createBoletaPago } = useApi();
  const [trabajadores, setTrabajadores] = useState<MAE_Trabajadores[]>();
  const [horario_Laborado, setHorario_Laborado] = useState<
    Omit<MAE_Horario_Laborado, "PK_MAE_Horario_Laborado">
  >({
    MES: 0,
    DIAS_LABORADOS: 0,
    HORAS_LABORADAS: 0,
    HORAS_EXTRA: 0,
    DIAS_NO_LABORADOS: 0,
  });
  const [remuneraciones, setRemuneraciones] = useState<
    Omit<MAE_Remuneraciones, "PK_MAE_Remuneraciones">
  >({
    SUELDO_COMPUTABLE: 0,
    REMUNERACION_VACACIONAL: 0,
    MOVILIDAD_SUPLEMENTOS: 0,
    CTS: 0,
    TOTAL_REMUNERACIONES: 0,
  });
  const [descuentos, setDescuentos] = useState<
    Omit<MAE_Descuentos, "PK_MAE_Descuentos">
  >({
    AFP_FONDO: 0,
    AFP_COMISION: 0,
    AFP_SEGURO: 0,
    ONP: 0,
    FALTAS: 0,
    RETENCIONES_JUDICIALES: 0,
    ADELANTOS: 0,
    TOTAL_DESCUENTOS: 0,
  });
  const [aportaciones, setAportaciones] = useState<
    Omit<MAE_Aportaciones, "PK_MAE_Aportaciones">
  >({
    ESSALUD: 0,
    SCTR: 0,
  });
  const [boletaPago, setBoletaPago] = useState<
    Omit<TRS_Boleta_Pago, "PK_TRS_Boleta_Pago">
  >({
    PAGO_TOTAL: 0,
    FECHA: new Date(),
    FK_MAE_Trabajador: 0,
    FK_MAE_Horario: 0,
    FK_MAE_Aportaciones: 0,
    FK_MAE_Remuneraciones: 0,
    FK_MAE_Descuentos: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmpleados("/api");
      setTrabajadores(data.empleados);
    };
    fetchData();
  }, []);
  useEffect(()=>{
    console.log("ssasadsa")
    const total_remuneraciones = remuneraciones.SUELDO_COMPUTABLE + remuneraciones.REMUNERACION_VACACIONAL + remuneraciones.MOVILIDAD_SUPLEMENTOS + remuneraciones.CTS
    console.log(total_remuneraciones)
    const afp_fondo = total_remuneraciones*0.1
    const afp_comision = total_remuneraciones*0.0038
    const afp_seguro = total_remuneraciones*0.0135
    console.log(afp_fondo)
    console.log(afp_comision)
    console.log(afp_seguro)
    setDescuentos((state)=>({...state,AFP_FONDO:afp_fondo,AFP_COMISION:afp_comision,AFP_SEGURO:afp_seguro}))
    const total_descuentos = descuentos.AFP_FONDO + descuentos.AFP_COMISION + descuentos.AFP_SEGURO + descuentos.ONP + descuentos.FALTAS + descuentos.RETENCIONES_JUDICIALES
    setDescuentos((state)=>({...state,TOTAL_DESCUENTOS:total_descuentos}))
  },[remuneraciones])
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newHorario = await createHorarioLaborado("http://localhost:3000/api", horario_Laborado);
      console.log('Nuevo Horario:', newHorario);
  
      if (!newHorario) throw new Error('No se pudo crear el horario');
  
      const total_remuneraciones = remuneraciones.SUELDO_COMPUTABLE + remuneraciones.REMUNERACION_VACACIONAL + remuneraciones.MOVILIDAD_SUPLEMENTOS + remuneraciones.CTS;
      setRemuneraciones((state) => ({ ...state, TOTAL_REMUNERACIONES: total_remuneraciones }));
  
      const [newRemuneracion, newDescuento, newAportacion] = await Promise.all([
        createRemuneracion("http://localhost:3000/api", remuneraciones),
        createDescuento("http://localhost:3000/api", descuentos),
        createAportacion("http://localhost:3000/api", aportaciones)
      ]);
  
      console.log('Nueva Remuneración:', newRemuneracion);
      console.log('Nuevo Descuento:', newDescuento);
      console.log('Nueva Aportación:', newAportacion);
  
      if (!newRemuneracion) throw new Error('No se pudo crear la remuneración');
      if (!newDescuento) throw new Error('No se pudo crear el descuento');
      if (!newAportacion) throw new Error('No se pudo crear la aportación');
  
      const FK_MAE_Horario = newHorario.PK_MAE_Horario_Laborado;
      const FK_MAE_Aportaciones = newAportacion.PK_MAE_Aportaciones;
      const FK_MAE_Remuneraciones = newRemuneracion.PK_MAE_Remuneraciones;
      const FK_MAE_Descuentos = newDescuento.PK_MAE_Descuentos;
  
      setBoletaPago((state) => ({
        ...state,
        FK_MAE_Horario,
        FK_MAE_Remuneraciones,
        FK_MAE_Descuentos,
        FK_MAE_Aportaciones
      }));
  
      const newBoleta = await createBoletaPago("http://localhost:3000/api", boletaPago);
      console.log('Nueva Boleta de Pago:', newBoleta);
      
    } catch (error) {
      console.error("Error creando boleta de pago:", error);
    }
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
            FK_MAE_Empleado_TRS_Boleta_Pago: Number(e.target.value),
          }))
        }
      >
        {trabajadores?.map((trabajador: MAE_Trabajadores) => (
          <option
            key={trabajador.PK_MAE_Trabajador}
            value={trabajador.PK_MAE_Trabajador}
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
        <input
          type="number"
          name="sueldo_computable"
          className="rounded"
          placeholder="SUELDO COMPUTABLE"
          value={remuneraciones.SUELDO_COMPUTABLE}
          onChange={(e) =>
            setRemuneraciones((state) => ({
              ...state,
              SUELDO_COMPUTABLE: Number(e.target.value),
            }))
          }
        />
        <input
          type="number"
          name="remuneracion_vacacional"
          className="rounded"
          placeholder="REMUNERACION VACACIONAL"
          value={remuneraciones.REMUNERACION_VACACIONAL}
          onChange={(e) =>
            setRemuneraciones((state) => ({
              ...state,
              REMUNERACION_VACACIONAL: Number(e.target.value),
            }))
          }
        />
        <input
          type="number"
          name="movilidad_suplementos"
          className="rounded"
          placeholder="MOVILIDAD SUPLEMENTOS"
          value={remuneraciones.MOVILIDAD_SUPLEMENTOS}
          onChange={(e) =>
            setRemuneraciones((state) => ({
              ...state,
              MOVILIDAD_SUPLEMENTOS: Number(e.target.value),
            }))
          }
        />
        <input
          type="number"
          name="cts"
          className="rounded"
          placeholder="C.T.S."
          value={remuneraciones.CTS}
          onChange={(e) =>
            setRemuneraciones((state) => ({
              ...state,
              CTS: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="grid col-span-2 row-span-4 gap-4" id="descuentos">
        <input
          type="number"
          name="onp"
          className="rounded"
          placeholder="ONP"
          value={descuentos.ONP}
          onChange={(e) =>
            setDescuentos((state) => ({
              ...state,
              ONP: Number(e.target.value),
            }))
          }
        />
        <input
          type="number"
          name="faltas"
          className="rounded"
          placeholder="FALTAS"
          value={descuentos.FALTAS}
          onChange={(e) =>
            setDescuentos((state) => ({
              ...state,
              FALTAS: Number(e.target.value),
            }))
          }
        />
        <input
          type="number"
          name="retenciones_judiciales"
          className="rounded"
          placeholder="RETENCIONES_JUDICIALES"
          value={descuentos.RETENCIONES_JUDICIALES}
          onChange={(e) =>
            setDescuentos((state) => ({
              ...state,
              RETENCIONES_JUDICIALES: Number(e.target.value),
            }))
          }
        />
        <input
          type="number"
          name="adelantos"
          className="rounded"
          placeholder="ADELANTOS"
          value={descuentos.ADELANTOS}
          onChange={(e) =>
            setDescuentos((state) => ({
              ...state,
              ADELANTOS: Number(e.target.value),
            }))
          }
        />
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
