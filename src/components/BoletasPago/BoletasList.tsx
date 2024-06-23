import useApi from '@/hooks/useApi'
import React, { useEffect, useState } from 'react'
import BoletaItem from './BoletaItem'

function BoletasList() {
  const {getBoletasPago} = useApi()
  const [boletas,setBoletas] = useState<TRS_Boleta_Pago[]>([])
  useEffect(()=>{
    const getDataBoletas = async()=>{
      const dataBoletas = await getBoletasPago("https://sia-teo-8rns.vercel.app/api")
      console.log(dataBoletas)
      setBoletas(dataBoletas.boletas_pagos)
    }
    getDataBoletas()
  },[])
  return (
    <div>
      <h1 className='m-4 text-2xl font-semibold'>Lista de Boletas de Pago:</h1>
      <div className='grid grid-cols-[minmax(200px,_4fr)_minmax(50px,_1fr)_minmax(120px,_3fr)_minmax(100px,_2fr)]  gap-4 p-4 bg-[#3F3F46] text-white' >
        <p>Empleado</p>
        <p>Fecha</p>
        <p>Dias Laborados</p>
        <p>Pago Neto</p>
      </div>
        {boletas.map((boleta)=>(
          <div className='border bg-white text-black overflow-hidden' key={boleta.ID_BOLETA_PAGO}>
            <div className='grid grid-cols-[minmax(200px,_4fr)_minmax(50px,_1fr)_minmax(120px,_3fr)_minmax(100px,_2fr)]  gap-4 p-4'>
            <p>{boleta.ID_EMPLEADO}</p>
            <p>{boleta.FECHA.toString().slice(0,10)}</p>
            <p>{boleta.DIAS_LABORADOS}</p>
            <p>{boleta.NETO_PAGAR}</p>
          </div>
          </div>
        ))}
    </div>
  )
}

export default BoletasList
