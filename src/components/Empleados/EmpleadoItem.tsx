import React, { useState } from 'react'
import ModalBoletaPago from '../modals/ModalBoletaPago'
import BoletaForm from "../BoletasPago/BoletaForm";
function EmpleadoItem({empleado}:{empleado:MAE_Trabajadores}) {
  const [showModal,setShowModal] = useState(false)
  console.log(empleado.FECHA_NACIMIENTO)
  return (
    <div className='grid grid-cols-[minmax(200px,_4fr)_minmax(50px,_1fr)_minmax(120px,_3fr)_minmax(100px,_2fr)_minmax(150px,_3fr)] m-2 p-2 rounded border' >
        <h1>{empleado.NOMBRE +" "+ empleado.APELLIDO}</h1>
        <p>{empleado.DNI}</p>
        <p>{empleado.DIRECCION}</p>
        <p>{JSON.stringify(empleado.FECHA_NACIMIENTO)}</p>
        <div>
          <button onClick={()=> setShowModal(!showModal)}>Boleta de Pago</button>
          <ModalBoletaPago show={showModal} onClose={()=> setShowModal(!showModal)}>
            <BoletaForm/>
          </ModalBoletaPago>
        </div>
    </div>
  )
}

export default EmpleadoItem