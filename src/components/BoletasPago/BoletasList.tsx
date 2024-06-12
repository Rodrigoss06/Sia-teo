import axios from "axios";
import React, { useEffect, useState } from "react";
import ModalAgregarEmpleado from "../modals/ModalAgregarEmpleado";
import BoletaForm from "./BoletaForm";
import BoletaItem from "./BoletaItem";

function EmpleadosList() {
  const [empleados, setEmpleados] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
    <div className="bg-blue-200 h-screen">
      <span className="flex justify-between">
        <h1 className="text-xl ml-8 mt-4">Lista de Empleados:</h1>
        <button className="bg-orange-400 rounded-2xl p-2 mt-4 mr-8" onClick={()=>setShowModal(!showModal)}>Agregar empleado</button>
      </span>
      <section className="bg-zinc-700 text-white">
        <span className="grid grid-cols-[minmax(200px,_4fr)_minmax(50px,_1fr)_minmax(120px,_3fr)_minmax(100px,_2fr)_minmax(150px,_3fr)] m-2 p-2 rounded border-t border-x">
          <p>Nombre</p>
          <p>DNI</p>
          <p>Dirección</p>
          <p>Fecha de nacimiento</p>
          <p>Opciones</p>
        </span>
      {empleados.map((boleta: TRS_Boleta_Pago) => (
        <BoletaItem boleta={boleta} key={boleta.PK_TRS_Boleta_Pago} />
      ))}
      </section>
      <ModalAgregarEmpleado show={showModal} onClose={()=>setShowModal(!showModal)}>
        <BoletaForm/>
      </ModalAgregarEmpleado>
    </div>
  );
}

export default EmpleadosList;
