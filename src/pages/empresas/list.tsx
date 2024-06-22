import NavigationBar from '@/components/Admin/Navbar/NavigationBar'
import EmpresasList from '@/components/Empresas/EmpresasList'
import React from 'react'

function list() {
  return (
    <div>
        <NavigationBar/>
        <EmpresasList/>
    </div>
  )
}

export default list