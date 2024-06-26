import React, { useEffect, useState } from 'react'
import BoletaForm from "../BoletasPago/BoletaForm";
import Link from 'next/link';
import useApi from '@/hooks/useApi';
function EmpleadoItem({ empleado }: { empleado: MAE_Empleado }) {
  const { getDocumento }= useApi()
  const [documento,setDocumento]= useState<MAE_Tipo_Documento>()
  useEffect(()=>{
    const getDocumentoData=async()=>{
      const documentoData = await getDocumento("https://sia-teo-8rns.vercel.app/api", String(empleado.ID_TIPO))
      setDocumento(documentoData.documentos)
    }
    getDocumentoData()
  },[])

  return (
    <div className="border bg-white text-black  overflow-hidden ">
      <div className="grid grid-cols-[minmax(200px,_4fr)_minmax(50px,_1fr)_minmax(120px,_3fr)_minmax(100px,_2fr)_minmax(150px,_3fr)]  gap-4 p-4">
        <div className="flex items-center col-span-1">
          <a href={`empleados/${empleado.ID_EMPLEADO}`} className="text-blue-500 hover:underline">
            {empleado.NOMBRE} {empleado.APELLIDO}
          </a>
        </div>
        <div className="flex items-center col-span-1">{documento?.DESCRIPCION}: {empleado.DOCUMENTO!}</div>
        <div className="flex items-center col-span-1">{empleado.DIRECCION}</div>
        <div className="flex items-center col-span-1">{new Date(empleado.FECHA_NACIMIENTO).toLocaleDateString()}</div>
        <div className="flex items-center col-span-1">
        {new Date(empleado.FECHA_INGRESO).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default EmpleadoItem