import React from 'react'

function EmpresaItem({empresa}:{empresa:MAE_Empresa}) {
  return (
    <div className="border bg-white text-black overflow-hidden ">
      <div className="grid grid-cols-[minmax(20px,_1fr)_minmax(150px,_3fr)_minmax(100px,_2fr)_minmax(70px,_1fr)_minmax(70px,_1fr)] gap-4 p-4">
        <p className="font-medium text-gray-700">{empresa.RUC}</p>
        <p className="font-bold text-blue-600">{empresa.NOMBRE}</p>
        <p className="text-gray-600">{empresa.DIRECCION}</p>
        <p className="text-gray-500">{empresa.RUBRO_EMPRESA}</p>
        <p className="text-gray-600">{empresa.RAZON_SOCIAL}</p>
      </div>
    </div>
  )
}

export default EmpresaItem