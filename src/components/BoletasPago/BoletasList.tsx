import useApi from '@/hooks/useApi'
import React, { useEffect, useState } from 'react'
import BoletaItem from './BoletaItem'


function BoletasList() {
  const {getBoletasPago,getEmpleados, getBoletaPagoDetalle, getMaeDescuentos,getMaeRemuneraciones,deleteBoletaPago,deleteBoletaPagoDetalle,deleteAportacion,deleteDescuento,deleteMaeDescuento,deleteRemuneracion,deleteMaeRemuneracion} = useApi()
  const [boletas,setBoletas] = useState<TRS_Boleta_Pago[]>([])
  const [empleados,setEmpleados] = useState<MAE_Empleado[]>()

  useEffect(()=>{
    const getDataBoletas = async()=>{
      const dataBoletas = await getBoletasPago("https://sia-teo-8rns.vercel.app/api")
      setBoletas(dataBoletas.boletas_pagos)
      const dataEmpleados = await getEmpleados("https://sia-teo-8rns.vercel.app/api")
      setEmpleados(dataEmpleados.empleados)
    }
    getDataBoletas()
  },[])
  const handleDeleteBoleta= async(boleta:TRS_Boleta_Pago)=>{
    await deleteBoletaPago("https://sia-teo-8rns.vercel.app/api",String(boleta.ID_BOLETA_PAGO))
    const boletaDetalle:TRS_Boleta_Pago_Detalle = await getBoletaPagoDetalle("https://sia-teo-8rns.vercel.app/api",String(boleta.ID_BOLETA_PAGO_DETALLES)) 
    await deleteBoletaPagoDetalle("https://sia-teo-8rns.vercel.app/api",String(boleta.ID_BOLETA_PAGO_DETALLES))
    await deleteAportacion("https://sia-teo-8rns.vercel.app/api",String(boletaDetalle.ID_APORTACIONES_TRANSACCIONAL))
    const MaeDescuentos:MAE_Descuentos[] = await getMaeDescuentos("https://sia-teo-8rns.vercel.app/api")
    const filterMaeDescuentos:MAE_Descuentos[] = MaeDescuentos.filter((maeDescuento)=>maeDescuento.ID_DESCUENTO_TRANSACCIONAL===boletaDetalle.ID_DESCUENTO_TRANSACCIONAL)
    filterMaeDescuentos.map(async(maeDescuento)=>{
      await deleteMaeDescuento("https://sia-teo-8rns.vercel.app/api",String(maeDescuento.ID_DESCUENTO))
    })
    const deleteTrsDescuento = await deleteDescuento("https://sia-teo-8rns.vercel.app/api",String(boletaDetalle.ID_DESCUENTO_TRANSACCIONAL))
    const MaeRemuneraciones:MAE_Remuneraciones[] = await getMaeRemuneraciones("https://sia-teo-8rns.vercel.app/api")
    const filterMaeRemuneraciones = MaeRemuneraciones.filter((maeRemuneracion)=>maeRemuneracion.ID_REMUNERACION_TRANSACCIONAL===boletaDetalle.ID_REMUNERACION_TRANSACCIONAL)
    filterMaeRemuneraciones.map(async(maeRemuneracion)=>{
      await deleteMaeRemuneracion("https://sia-teo-8rns.vercel.app/api",String(maeRemuneracion.ID_REMUNERACIONES))
    })
    const deleteTrsRemuneracion = await deleteRemuneracion("https://sia-teo-8rns.vercel.app/api",String(boletaDetalle.ID_REMUNERACION_TRANSACCIONAL))
  }
  return (
    <div>
      <h1 className='m-4 text-2xl font-semibold'>Lista de Boletas de Pago:</h1>
      <div className='grid grid-cols-[minmax(200px,_4fr)_minmax(50px,_1fr)_minmax(120px,_3fr)_minmax(100px,_2fr)_minmax(150px,_3fr)]  gap-4 p-4 bg-[#3F3F46] text-white' >
        <p>Empleado</p>
        <p>Fecha</p>
        <p>Dias Laborados</p>
        <p>Pago Neto</p>
        <p>Opciones</p>
      </div>
        {boletas.map((boleta)=>(
          <div className='border bg-white text-black overflow-hidden' key={boleta.ID_BOLETA_PAGO}>
            <div className='grid grid-cols-[minmax(200px,_4fr)_minmax(50px,_1fr)_minmax(120px,_3fr)_minmax(100px,_2fr)_minmax(150px,_3fr)]  gap-4 p-4'>
            <p>{empleados?.filter((empleado)=>empleado.ID_EMPLEADO === boleta.ID_EMPLEADO)[0].NOMBRE + " " +empleados?.filter((empleado)=>empleado.ID_EMPLEADO === boleta.ID_EMPLEADO)[0].APELLIDO}</p>
            <p>{boleta.FECHA.toString().slice(0,10)}</p>
            <p>{boleta.DIAS_LABORADOS}</p>
            <p>{boleta.NETO_PAGAR}</p>
            <div>
              <button onClick={()=>handleDeleteBoleta(boleta)} className='text-white py-2 px-4 rounded focus:outline-none focus:ring-2 bg-red-600 hover:bg-red-500'>Eliminar</button>
            </div>
          </div>
          </div>
        ))}
    </div>
  )
}

export default BoletasList
