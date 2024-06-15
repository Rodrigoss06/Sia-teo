import React, { useState } from 'react'

function EmpresasForm() {
    const [newEmpresa,setNewEmpresa]= useState<
    Omit<MAE_E, "PK_MAE_Horario_Laborado">
  >({
    MES: 0,
    DIAS_LABORADOS: 0,
    HORAS_LABORADAS: 0,
    HORAS_EXTRA: 0,
    DIAS_NO_LABORADOS: 0,
  });
  return (
    <div>EmpresasForm</div>
  )
}

export default EmpresasForm