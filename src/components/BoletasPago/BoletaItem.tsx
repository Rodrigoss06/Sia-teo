import useApi from '@/hooks/useApi';
import React, { useEffect, useState } from 'react'

function BoletaItem({boleta}:{boleta:TRS_Boleta_Pago}) {
  const {loading, error, getEmpresa,getEmpleado,getBoletaPagoDetalle,getMaeRemuneraciones,getMaeDescuentos,getAportacion} = useApi();
  const [empresa,setEmpresa] = useState<Omit<MAE_Empresa,'ID_EMPRESA'>>()
  const [empleado,setEmpleado]= useState<MAE_Empleado>()
  const [remuneraciones,setRemuneraciones]= useState<MAE_Remuneraciones[]>()
  const [descuentos,setDescuentos]= useState<MAE_Descuentos[]>()
  const [aportaciones,setAportaciones]= useState<TRS_Aportaciones[]>()

  useEffect(()=>{
    try {
      const getEmpleadoData =async()=>{
        const empleadoData = await getEmpleado("https://sia-teo-8rns.vercel.app/api",String(boleta.ID_EMPLEADO))
        setEmpleado(empleadoData.empleado)
        const empresaData = await getEmpresa("https://sia-teo-8rns.vercel.app/api",String(empleadoData.empleado.ID_EMPRESA))
        setEmpresa(empresaData.empresa)
        const boletaPagoDetalleData = await getBoletaPagoDetalle("https://sia-teo-8rns.vercel.app/api",String(boleta.ID_BOLETA_PAGO_DETALLES))
        const remuneracionesData = await getMaeRemuneraciones("https://sia-teo-8rns.vercel.app/api")
        const remuneracionesFilter = remuneracionesData.remuneraciones.filter((remuneracion:MAE_Remuneraciones)=>remuneracion.ID_REMUNERACION_TRANSACCIONAL === boletaPagoDetalleData.boleta_pago.ID_REMUNERACION_TRANSACCIONAL)
        setRemuneraciones(remuneracionesFilter)
        const descuentosData = await getMaeDescuentos("https://sia-teo-8rns.vercel.app/api")
        const descuentosFilter = descuentosData.descuentos.filter((descuento:MAE_Descuentos)=>descuento.ID_DESCUENTO_TRANSACCIONAL ===boletaPagoDetalleData.boleta_pago.ID_DESCUENTO_TRANSACCIONAL)
        setDescuentos(descuentosFilter)
        const aportacionesData = await getAportacion("https://sia-teo-8rns.vercel.app/api",String(boletaPagoDetalleData.boleta_pago.ID_APORTACIONES_TRANSACCIONAL))
        setAportaciones(aportacionesData.aportaciones)
      }
      getEmpleadoData()
    } catch (error) {
      console.log(error)
    }
  },[])
  return (
    <div className='bg-gray-200 p-2 roundedp-4 mt-4 ml-[-20px] flex flex-col justify-start gap-y-3 rounded shadow-lg"'>
      <div>
        <h1 className='text-lg font-semibold'>Datos de la empresa</h1>
        <div className='grid grid-rows-[minmax(30px,_1fr),_minmax(_2fr,50px)]  p-1'>
        <div className='grid row-span-1 grid-cols-[minmax(50px,_2fr),_minmax(70px,_2fr),_repeat(2,_minmax(120px,_3fr))] bg-[#DAE4F0] '>
            <p className='border border-black'>RUC:</p>
            <p className='border border-black'>Razón Social:</p>
            <p className='border border-black'>Nombre de la empresa:</p>
            <p className='border border-black'>Direccón:</p>
          </div>
          <div className='grid row-span-1 grid-cols-[minmax(50px,_2fr),_minmax(70px,_2fr),_repeat(2,_minmax(120px,_3fr))]'>
            <p className='border border-black'>{empresa?.RUC}</p>
            <p className='border border-black'>{empresa?.RAZON_SOCIAL}</p>
            <p className='border border-black'>{empresa?.RUBRO_EMPRESA}</p>
            <p className='border border-black'>{empresa?.DIRECCION}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className='text-lg font-semibold'>Datos del trabajador</h1>
          <div className='grid grid-rows-[minmax(30px,_1fr),_minmax(50px,_2fr)]'>
            <div className='grid row-span-1 grid-cols-[minmax(30px,_1fr),_minmax(60px,_2fr),_minmax(30px,_1fr),_repeat(2,_minmax(60px,_2fr)),_minmax(30px,_1fr)] bg-[#DAE4F0]'>
              <p className='border border-black'>Código:</p>
              <p className='border border-black'>Apellidos y nombres:</p>
              <p className='border border-black'>Documento:</p>
              <p className='border border-black'>Fecha de nacimiento</p>
              <p className='border border-black'>Dirección:</p>
              <p className='border border-black'>Hijos:</p>
            </div>
            <div className='grid grid-cols-[minmax(30px,_1fr),_minmax(60px,_2fr),_minmax(30px,_1fr),_repeat(2,_minmax(60px,_2fr)),_minmax(30px,_1fr)]'>
              <p className='border border-black'>{empleado?.ID_EMPLEADO}</p>
              <p className='border border-black'>{empleado?.APELLIDO + " " + empleado?.NOMBRE!}</p>
              <p className='border border-black'>{empleado?.ID_TIPO}</p>
              <p className='border border-black'>{empleado?.FECHA_NACIMIENTO.toString().slice(0,10)}</p>
              <p className='border border-black'>{empleado?.DIRECCION}</p>
              <p className='border border-black'>{empleado?.HIJOS}</p>
            </div>
          </div>
      </div>
      <div>
        <h1 className='text-lg font-semibold'>Datos del trabajador vinculados a el horario laboral</h1>
        <div>
          <div className='grid grid-rows-[minmax(30px,_1fr),_minmax(50px,_2fr)]'>
            <div className='grid grid-cols-[minmax(80px,_3fr),_minmax(30px,_1fr),_minmax(50px,_2fr),_minmax(30px,_1fr),_minmax(50px,_2fr)] bg-[#DAE4F0]'>
              <p className='border border-black'>Fecha de ingreso:</p>
              <p className='border border-black'>Dias laborales:</p>
              <p className='border border-black'>Total de horas laboradas</p>
              <p className='border border-black'>Horas extra:</p>
              <p className='border border-black'>Dias no laborados:</p>
            </div>
            <div className='grid grid-cols-[minmax(80px,_3fr),_minmax(30px,_1fr),_minmax(50px,_2fr),_minmax(30px,_1fr),_minmax(50px,_2fr)]'>
              <p className='border border-black'>{empleado?.FECHA_INGRESO.toString().slice(0,10)}</p>
              <p className='border border-black'>{boleta.DIAS_LABORADOS}</p>
              <p className='border border-black'>{boleta.TOTAL_HORAS_LABORADAS}</p>
              <p className='border border-black'>{boleta.HORAS_EXTRAS}</p>
              <p className='border border-black'>{boleta.DIAS_NO_LABORADOS}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-rows-[minmax(20px,_3fr),_minmax(100px,_10fr),_minmax(100px,_10fr),minmax(20px,_3fr)] grid-cols-[minmax(20px,_3fr),_minmax(200px,_10fr),_minmax(100px,_6fr),_minmax(100px,_6fr),minmax(20px,_3fr)] border border-black'>
        <div className='bg-[#DAE4F0] row-span-1 col-span-5 grid grid-cols-[minmax(20px,_3fr),_minmax(200px,_10fr),_minmax(100px,_6fr),_minmax(100px,_6fr),minmax(20px,_3fr)]'>
          <p className='border border-black'>Código</p>
          <p className='border border-black'>Descripción</p>
          <p className='border border-black'>Ingresos S/.</p>
          <p className='border border-black'>Descuentos S/.</p>
          <p className='border border-black'>Neto S/.</p>
        </div>
        <div className='row-span-1 col-span-5 border border-black'>
          <h3>Remuneraciones</h3>
          {remuneraciones?.map((maeRemuneracion)=>(
            <div key={maeRemuneracion.ID_REMUNERACIONES} className='grid grid-cols-[minmax(20px,_3fr),_minmax(200px,_10fr),_minmax(100px,_6fr),_minmax(100px,_6fr),minmax(20px,_3fr)]'>
              <p>{maeRemuneracion.ID_REMUNERACIONES}</p>
              <p>{maeRemuneracion.DESCRIPCION}</p>
              <p>{maeRemuneracion.MONTO}</p>
              <p></p>
              <p></p>
            </div>
          ))}
        </div>
        <div className='row-span-1 col-span-5 border border-black'>
          <h3>Descuentos</h3>
          {descuentos?.map((maeDescuentos)=>(
            <div key={maeDescuentos.ID_DESCUENTO} className='grid grid-cols-[minmax(20px,_3fr),_minmax(200px,_10fr),_minmax(100px,_6fr),_minmax(100px,_6fr),minmax(20px,_3fr)]'>
              <p>{maeDescuentos.ID_DESCUENTO}</p>
              <p>{maeDescuentos.DESCRIPCION}</p>
              <p></p>
              <p>{maeDescuentos.MONTO}</p>
              <p></p>
            </div>
          ))}
        </div>
        <div className='row-span-1 col-span-5 border border-black'>
            <div className='grid grid-cols-[minmax(20px,_3fr),_minmax(200px,_10fr),_minmax(100px,_6fr),_minmax(100px,_6fr),minmax(20px,_3fr)]'>
              <p className='col-span-4'>Neto a Pagar</p>
              <p>{boleta.NETO_PAGAR}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default BoletaItem