import axios from 'axios'
import React, { useEffect, useState } from 'react'

function EmployeesList() {
  const [empleados,setEmpleados]= useState()
  useEffect(()=>{
    const getEmpleados= async()=>{
      try {
        console.log(1)
        const response = await axios.get("api/empleados")
        console.log(response.data)
      } catch (error) {
        console.log("Error fetching empleados")
        console.log(error)
      }
    }
    getEmpleados()
  },[])
  return (
    <div>
      <h1>test</h1>
    </div>
  )
}

export default EmployeesList