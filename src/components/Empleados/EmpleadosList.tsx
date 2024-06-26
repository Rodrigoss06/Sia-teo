import axios from "axios";
import React, { useEffect, useState } from "react";
import EmpleadoItem from "./EmpleadoItem";
import ModalAgregarEmpleado from "../modals/ModalAgregarEmpleado";
import EmpleadoForm from "./EmpleadoForm";
import ModalAgregarEmpresa from "../modals/ModalAgregarEmpresa";
import EmpresasForm from "../Empresas/EmpresasForm";
import Link from "next/link";

function EmpleadosList() {
  const [empleados, setEmpleados] = useState([]);
  const [showModalEmpleado, setShowModalEmpleado] = useState(false);
  const [showModalEmpresa, setShowModalEmpresa] = useState(false);

  useEffect(() => {
    const getEmpleados = async () => {
      try {
        console.log(1);
        const response = await axios.get("api/empleados");
        setEmpleados(response.data.empleados);
      } catch (error) {
        console.log("Error fetching empleados");
        console.log(error);
      }
    };
    getEmpleados();
  }, []);
  return (
    <div className=" h-screen">
      <span className="flex justify-between">
        <h1 className="text-2xl font-semibold m-4">Lista de Empleados:</h1>
        <button className="bg-orange-400 rounded-2xl p-2 mt-4 mr-8" onClick={()=>setShowModalEmpleado(!showModalEmpleado)}>Agregar empleado</button>
        <button className="bg-orange-400 rounded-2xl p-2 mt-4 mr-8" onClick={()=>setShowModalEmpresa(!showModalEmpresa)}>Agregar empresa</button>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white rounded-2xl  mt-4 mr-8 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Link href="/boletas_de_pago/form">Boleta de Pago</Link>
          </button>
      </span>
      <section className="bg-zinc-700 text-white">
        <span className="grid grid-cols-[minmax(200px,_4fr)_minmax(50px,_1fr)_minmax(120px,_3fr)_minmax(100px,_2fr)_minmax(150px,_3fr)]  gap-4 p-4 mt-2 ">
          <p>Nombre</p>
          <p>Documento</p>
          <p>Dirección</p>
          <p>Fecha de nacimiento</p>
          <p>Fecha de ingreso</p>
        </span>
      {empleados.map((empleado: MAE_Empleado) => (
        <EmpleadoItem empleado={empleado} key={empleado.ID_EMPLEADO} />
      ))}
      </section>
      <ModalAgregarEmpleado show={showModalEmpleado} onClose={()=>setShowModalEmpleado(!showModalEmpleado)}>
        <EmpleadoForm/>
      </ModalAgregarEmpleado>
      <ModalAgregarEmpresa show={showModalEmpresa} onClose={()=>setShowModalEmpresa(!showModalEmpresa)}>
        <EmpresasForm/>
      </ModalAgregarEmpresa>
    </div>
  );
}

export default EmpleadosList;
