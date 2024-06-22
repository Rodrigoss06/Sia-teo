import NavigationBar from '@/components/Admin/Navbar/NavigationBar'
import BoletaForm from '@/components/BoletasPago/BoletaForm'
import React from 'react'

function form() {
  return (
    <div>
        <NavigationBar/>
        <div className='flex justify-center '>
        <BoletaForm/>
        </div>
    </div>
  )
}

export default form