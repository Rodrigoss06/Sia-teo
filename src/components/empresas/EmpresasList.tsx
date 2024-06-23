import useApi from '@/hooks/useApi'
import React, { useEffect, useState } from 'react'
import EmpresaItem from './EmpresaItem'

function EmpresasList() {
    const {getEmpresas} = useApi()
    const [empresas,setEmpresas]= useState<MAE_Empresa[]>([])
    useEffect(()=>{
        const getDataEmpresas=async()=>{
            const dataEmpresas = await getEmpresas("https://sia-teo-8rns.vercel.app/api")
            console.log(dataEmpresas)
            setEmpresas(dataEmpresas.empresas)
        }
        getDataEmpresas()
    },[])
  return (
    <div>
        <h1 className='text-2xl font-semibold m-2'>Lista de Empresas:</h1>
        <div className='grid grid-cols-[minmax(20px,_1fr)_minmax(150px,_3fr)_minmax(100px,_2fr)_minmax(70px,_1fr)_minmax(70px,_1fr)]  gap-4 p-4 bg-[#3F3F46] text-white'>
            <p>RUC</p>
            <p>Nombre</p>
            <p>Dirección</p>
            <p>Rubro</p>
            <p>Razon social</p>
        </div>
        {empresas.map((empresa)=>(
           <EmpresaItem empresa={empresa} key={empresa.ID_EMPRESA}/>
        ))}
    </div>
  )
}

export default EmpresasList