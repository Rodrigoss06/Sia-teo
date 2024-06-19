import useApi from '@/hooks/useApi';
import React, { useEffect, useState } from 'react'

function BoletaItem({boleta}:{boleta:TRS_Boleta_Pago}) {
  const {loading, error, getEmpresa,getEmpleado,getBoletaPagoDetalle,getMaeRemuneraciones,getMaeDescuentos,getAportacion} = useApi();
  const [empresa,setEmpresa] = useState<Omit<MAE_Empresa,'ID_EMPRESA'>>()
  const [empleado,setEmpleado]= useState<Omit<MAE_Empleado,'ID_EMPLEADO'>>()
  const [remuneraciones,setRemuneraciones]= useState<MAE_Remuneraciones[]>()
  const [descuentos,setDescuentos]= useState<MAE_Descuentos[]>()
  const [aportaciones,setAportaciones]= useState<TRS_Aportaciones[]>()

  useEffect(()=>{
    try {
      const getEmpleadoData =async()=>{
        const empleadoData = await getEmpleado("http://localhost:3000/api",String(boleta.ID_EMPLEADO))
        console.log(empleadoData.empleado)
        setEmpleado(empleadoData.empleado)
        const empresaData = await getEmpresa("http://localhost:3000/api",String(empleadoData.empleado.ID_EMPRESA))
        console.log(empresaData.empresa)
        setEmpresa(empresaData.empresa)
        const boletaPagoDetalleData = await getBoletaPagoDetalle("http://localhost:3000/api",String(boleta.ID_BOLETA_PAGO_DETALLES))
        console.log(boletaPagoDetalleData.boleta_pago)
        const remuneracionesData = await getMaeRemuneraciones("http://localhost:3000/api")
        console.log(remuneracionesData.remuneraciones)
        const remuneracionesFilter = remuneracionesData.remuneraciones.filter((remuneracion:MAE_Remuneraciones)=>remuneracion.ID_REMUNERACION_TRANSACCIONAL === boletaPagoDetalleData.boleta_pago.ID_REMUNERACION_TRANSACCIONAL)
        console.log(remuneracionesFilter)
        setRemuneraciones(remuneracionesFilter)
        const descuentosData = await getMaeDescuentos("http://localhost:3000/api")
        console.log(descuentosData.descuentos)
        const descuentosFilter = descuentosData.descuentos.filter((descuento:MAE_Descuentos)=>descuento.ID_DESCUENTO_TRANSACCIONAL ===boletaPagoDetalleData.boleta_pago.ID_DESCUENTO_TRANSACCIONAL)
        console.log(descuentosFilter)
        setDescuentos(descuentosFilter)
        const aportacionesData = await getAportacion("http://localhost:3000/api",String(boletaPagoDetalleData.boleta_pago.ID_APORTACIONES_TRANSACCIONAL))
        console.log(aportacionesData.aportaciones)
        setAportaciones(aportacionesData.aportaciones)
      }
      getEmpleadoData()
    } catch (error) {
      console.log(error)
    }
  },[])
  return (
    <div>
      <div>
        <h1>Datos de la empresa</h1>
        <div className='grid grid-rows-[minmax(30px,_1fr),_minmax(50px,_2fr)]'>
        <div className='grid row-span-1 grid-cols-[minmax(50px,_2fr),_minmax(70px,_2fr),_repeat(2,_minmax(120px,_3fr))]'>
            <p>RUC:</p>
            <p>Razón Social:</p>
            <p>Nombre de la empresa:</p>
            <p>Direccón:</p>
          </div>
          <div className='grid row-span-1 grid-cols-[minmax(50px,_2fr),_minmax(70px,_2fr),_repeat(2,_minmax(120px,_3fr))]'>
            <p>{empresa?.RUC}</p>
            <p>{empresa?.RAZON_SOCIAL}</p>
            <p>{empresa?.RUBRO_EMPRESA}</p>
            <p>{empresa?.DIRECCION}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoletaItem