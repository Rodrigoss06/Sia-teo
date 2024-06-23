import React, { useState } from 'react'
import BoletaForm from "../BoletasPago/BoletaForm";
import Link from 'next/link';
function EmpleadoItem({ empleado }: { empleado: MAE_Empleado }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border bg-white text-black  overflow-hidden ">
      <div className="grid grid-cols-[minmax(200px,_4fr)_minmax(50px,_1fr)_minmax(120px,_3fr)_minmax(100px,_2fr)_minmax(150px,_3fr)]  gap-4 p-4">
        <div className="col-span-1">
          <a href={`empleados/${empleado.ID_EMPLEADO}`} className="text-blue-500 hover:underline">
            {empleado.NOMBRE} {empleado.APELLIDO}
          </a>
        </div>
        <div className="col-span-1">{empleado.ID_TIPO}</div>
        <div className="col-span-1">{empleado.DIRECCION}</div>
        <div className="col-span-1">{new Date(empleado.FECHA_NACIMIENTO).toLocaleDateString()}</div>
        <div className="col-span-1 flex ">
          <button
            onClick={() => setShowModal(!showModal)}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Link href="/boletas_de_pago/form">Boleta de Pago</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmpleadoItem