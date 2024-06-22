import React, { useState } from 'react'

function RemuneracionesForm() {
    const [newMaeRemuneracion,setNewMaeRemuneracion] = useState<Omit<MAE_Remuneraciones,'ID_REMUNERACIONES'>>({
        DESCRIPCION:"",
        MONTO:0,
        ID_REMUNERACION_TRANSACCIONAL:0
    })
  return (
    <form>
        <input type="text" />
        <input type="text" />
    </form>
  )
}

export default RemuneracionesForm