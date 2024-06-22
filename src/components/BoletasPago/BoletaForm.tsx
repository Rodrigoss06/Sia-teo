import useApi from "@/hooks/useApi";
import React, { useEffect, useState } from "react";
type Remuneracion = Omit<MAE_Remuneraciones, 'ID_REMUNERACIONES'> & {
  ID_REMUNERACION_TRANSACCIONAL: number;
};

function BoletaForm() {
  const {
    loading,
    error,
    getEmpleados,
    createHorarioLaborado,
    getMaeDescuentos,
    getMaeRemuneraciones,
    createMaeRemuneracion,
    createRemuneracion,
    createMaeDescuento,
    createDescuento,
    createAportacion,
    createBoletaPago,
    createBoletaPagoDetalle
  } = useApi();
  
  const [trabajadores, setTrabajadores] = useState<MAE_Empleado[]>();
  // const [horario_Laborado, setHorario_Laborado] = useState<
  //   Omit<MAE_Horario_Laborado, "PK_MAE_Horario_Laborado">
  // >({
  //   MES: 0,
  //   DIAS_LABORADOS: 0,
  //   HORAS_LABORADAS: 0,
  //   HORAS_EXTRA: 0,
  //   DIAS_NO_LABORADOS: 0,
  // });
  
  const [trsRemuneraciones, setTrsRemuneraciones] = useState<
    Omit<TRS_Remuneraciones, "ID_REMUNERACION_TRANSACCIONAL">
  >({
    TOTAL: 0,
  });
  const [MaeRemuneraciones,setMaeRemuneraciones]= useState<MAE_Remuneraciones[]>([])
  const [selectMaeRemuneracion,setSelectMaeRemuneracion]= useState<Omit<MAE_Remuneraciones,'ID_REMUNERACIONES'>>({
    ID_REMUNERACION_TRANSACCIONAL:0,
    DESCRIPCION:"",
    MONTO:0
  })
  const [remuneraciones, setRemuneraciones] = useState<Remuneracion[]>([{ 
    ID_REMUNERACION_TRANSACCIONAL: 0, 
    DESCRIPCION: "", 
    MONTO: 0 
  }]);
  
  const [trsDescuentos, setTrsDescuentos] = useState<
    Omit<TRS_Descuentos, "ID_DESCUENTO_TRANSACCIONAL">
  >({
    TOTAL: 0,
  });
  const [MaeDescuentos,setMaeDescuentos]= useState<MAE_Descuentos[]>([])
  const [selectMaeDescuento,setSelectMaeDescuento]= useState<Omit<MAE_Descuentos,'ID_DESCUENTO'>>()
  const [descuentos, setDescuentos] = useState<
    Omit<MAE_Descuentos, "ID_DESCUENTO">[]
  >([{ 
    ID_DESCUENTO_TRANSACCIONAL: 0, 
    DESCRIPCION: "", 
    MONTO: 0, 
    PORCENTAJE: 0 
  }]);
  
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
      const dataEmpleados = await getEmpleados("http://localhost:3000/api");
      setTrabajadores(dataEmpleados.empleados);
      const dataRemuneraciones =await getMaeRemuneraciones("http://localhost:3000/api")
      const maeRemuneracionesFilter = dataRemuneraciones.remuneraciones.filter((remuneracion:MAE_Remuneraciones)=>remuneracion.ID_REMUNERACION_TRANSACCIONAL ===null)
      setMaeRemuneraciones(maeRemuneracionesFilter)
      const dataDescuentos = await getMaeDescuentos("http://localhost:3000/api")
      const maeDescuentosFilter = dataDescuentos.descuentos.filter((descuento:MAE_Descuentos)=>descuento.ID_DESCUENTO_TRANSACCIONAL === null)
      setMaeDescuentos(maeDescuentosFilter)
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    const remuneraciones_total = remuneraciones.reduce((acumulador, currentValue) => acumulador + currentValue.MONTO, 0);
    console.log(remuneraciones_total)
    const descuento_total = descuentos.reduce((acumulador, currentValue) => {
      const descuento = currentValue.PORCENTAJE;
      if (descuento !== 0 && descuento !==null && descuento!=undefined) {
        return acumulador + (currentValue.PORCENTAJE! / 100 * remuneraciones_total);
      }
      return acumulador + currentValue.MONTO;
    }, 0);
    const pago_neto = remuneraciones_total - descuento_total;
    setBoletaPago((state) => ({ ...state, NETO_PAGAR: pago_neto }));
  }, [remuneraciones, descuentos]);
  
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // const newHorario = await createHorarioLaborado(
      //   "http://localhost:3000/api",
      //   JSON.stringify(horario_Laborado)
      // );
      // console.log("Nuevo Horario:", newHorario);
  
      // if (!newHorario) throw new Error("No se pudo crear el horario");
  
      const newTrsRemuneracion = await createRemuneracion("http://localhost:3000/api", JSON.stringify(trsRemuneraciones));
      const trsRemuneracionId = newTrsRemuneracion.remuneracion.ID_REMUNERACION_TRANSACCIONAL;
  
      const updatedRemuneraciones = remuneraciones.map((remuneracion) => ({
        ...remuneracion,
        ID_REMUNERACION_TRANSACCIONAL: trsRemuneracionId,
      }));
  
      const newMaeRemuneraciones = await Promise.all(
        updatedRemuneraciones.map((remuneracion) =>
          createMaeRemuneracion(
            "http://localhost:3000/api",
            JSON.stringify(remuneracion)
          )
        )
      );
  
      console.log('Nuevas remuneraciones MAE:', newMaeRemuneraciones);
  
      const newDescuento = await createDescuento("http://localhost:3000/api", JSON.stringify(trsDescuentos));
      const trsDescuentoId = newDescuento.descuento.ID_DESCUENTO_TRANSACCIONAL;
  
      const updateDescuentos = descuentos.map((descuento) => ({
        ...descuento,
        ID_DESCUENTO_TRANSACCIONAL: trsDescuentoId
      }));
  
      const newMaeDescuentos = await Promise.all(
        updateDescuentos.map((descuento) => createMaeDescuento(
          "http://localhost:3000/api",
          JSON.stringify(descuento)
        ))
      );
      console.log('Nuevas descuentos MAE:', newMaeDescuentos);
  
      const newAportacion = await createAportacion(
        "http://localhost:3000/api",
        JSON.stringify(aportaciones)
      );
      const trsAportacionesId = newAportacion.aportacion.ID_APORTACIONES;
      console.log(trsAportacionesId);
      console.log('Nuevas aportaciones:', newAportacion);
  
      const newBoletaPagoDetalle = {
        ID_DESCUENTO_TRANSACCIONAL: trsDescuentoId,
        ID_REMUNERACION_TRANSACCIONAL: trsRemuneracionId,
        ID_APORTACIONES_TRANSACCIONAL: trsAportacionesId,
      };
  
      const boletaPagoDetalle = await createBoletaPagoDetalle(
        "http://localhost:3000/api",
        JSON.stringify(newBoletaPagoDetalle)
      );
      console.log(boletaPagoDetalle);
  
      const newBoletaPago = {
        ...boletaPago,
        ID_BOLETA_PAGO_DETALLES: boletaPagoDetalle.boleta_pago.ID_BOLETA_PAGO_DETALLE,
      };
      console.log(newBoletaPago);
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
    if (selectMaeRemuneracion?.DESCRIPCION!=="",selectMaeRemuneracion?.MONTO!==0) {
      console.log(selectMaeRemuneracion)
      setRemuneraciones([...remuneraciones, selectMaeRemuneracion!]);
    }
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
    if (selectMaeDescuento?.DESCRIPCION!=="",selectMaeDescuento?.MONTO!==0) {
      console.log(selectMaeDescuento)
      setDescuentos([...descuentos,selectMaeDescuento!]);
    }
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
      className="grid gap-5 text-black  grid-rows-[minmax(50px,_0.5fr),_repeat(5,_minmax(70px,_1fr))_minmax(20px,40px)] grid-cols-[repeat(6,minmax(150px,_1fr))] p-4 mt-10 rounded bg-slate-600"
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
              ID_EMPLEADO: Number(e.target.value),
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
            value={boletaPago.DIAS_LABORADOS}
            required
            onChange={(e) =>
              setBoletaPago((state) => ({
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
            value={boletaPago.TOTAL_HORAS_LABORADAS}
            onChange={(e) =>
              setBoletaPago((state) => ({
                ...state,
                TOTAL_HORAS_LABORADAS: Number(e.target.value),
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
            value={boletaPago.HORAS_EXTRAS}
            onChange={(e) =>
              setBoletaPago((state) => ({
                ...state,
                HORAS_EXTRAS: Number(e.target.value),
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
            value={boletaPago.DIAS_NO_LABORADOS}
            onChange={(e) =>
              setBoletaPago((state) => ({
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
          <div key={index} className="row-span-2 flex flex-col justify-around text-white">
            <p>{remuneracion.DESCRIPCION}:  {remuneracion.MONTO}</p>
            {remuneraciones.length > 1 && (
              <button
                className=" p-2 rounded bg-red-500 hover:bg-red-600 row-span-1"
                onClick={() => handleRemoveRemuneracionField(index)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        <div className="row-span-1 flex items-center">
          <select name="MaeRemuneraciones" id="maeremuneraciones" onChange={(e)=>{
            if (e.target.value!=="") {
              console.log(e.target.value)
              setSelectMaeRemuneracion({ID_REMUNERACION_TRANSACCIONAL:0,DESCRIPCION:JSON.parse(e.target.value).DESCRIPCION,MONTO:Number(JSON.parse(e.target.value).MONTO)})
            }else{
              console.log(e.target.value)
              setSelectMaeRemuneracion({ID_REMUNERACION_TRANSACCIONAL:0,DESCRIPCION:"",MONTO:0})
            }
          }}>
            <option value="">Seleccionar remuneraciones</option>
            {MaeRemuneraciones.map((maeRemuneracion)=>(
              <option value={JSON.stringify(maeRemuneracion)}>{maeRemuneracion.DESCRIPCION}: {maeRemuneracion.MONTO}</option>
            ))}
          </select>
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
          <div key={index} className="row-span-2 flex flex-col justify-around text-white">
            <p>{descuento.DESCRIPCION}:  {descuento.MONTO}</p>
            {descuentos.length > 1 && (
              <button
                className=" p-2 rounded bg-red-500 hover:bg-red-600 row-span-1"
                onClick={() => handleRemoveDescuentoField(index)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        <div className="flex items-center">
          <select name="MaeDescuentos" id="maedescuentos" onChange={(e)=>{
            if (e.target.value!=="") {
              console.log(e.target.value)

              setSelectMaeDescuento({ID_DESCUENTO_TRANSACCIONAL:0,DESCRIPCION:JSON.parse(e.target.value).DESCRIPCION,MONTO:Number(JSON.parse(e.target.value).MONTO)})
            }else{
              console.log(e.target.value)

              setSelectMaeDescuento({ID_DESCUENTO_TRANSACCIONAL:0,DESCRIPCION:"",MONTO:0})
            }
          }}>
            <option value="">Seleccionar descuentos</option>
            {MaeDescuentos.map((maeDescuento)=>(
              <option value={JSON.stringify(maeDescuento)}>{maeDescuento.DESCRIPCION}: {maeDescuento.MONTO}</option>
            ))}
          </select>
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
