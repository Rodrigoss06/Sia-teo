import NavigationBar from '@/components/Admin/Navbar/NavigationBar'
import BoletasList from '@/components/BoletasPago/BoletasList'
import React from 'react'

function list() {
  return (
    <div>
        <NavigationBar/>
        <BoletasList/>
    </div>
  )
}

export default list