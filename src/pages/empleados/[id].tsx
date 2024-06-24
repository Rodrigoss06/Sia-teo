import NavigationBar from "@/components/Admin/Navbar/NavigationBar";
import BoletaItem from "@/components/BoletasPago/BoletaItem";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Page() {
  const [empleado, setEmpleado] = useState<MAE_Empleado | null>(null);
  const [documento,setDocumento] = useState<MAE_Tipo_Documento>()
  const [empresa, setEmpresa] = useState<MAE_Empresa | null>(null);
  const [boletas, setBoletas] = useState<TRS_Boleta_Pago[]>([]);
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { getEmpleado, getEmpresa, getBoletasPago, getDocumento } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setRetry(true);
        return;
      }

      try {
        const dataEmpleado = await getEmpleado("https://sia-teo-8rns.vercel.app/api", String(id));
        if (dataEmpleado.empleado) {
          setEmpleado(dataEmpleado.empleado);

          const dataEmpresa = await getEmpresa("https://sia-teo-8rns.vercel.app/api", dataEmpleado.empleado.ID_EMPRESA!);
          setEmpresa(dataEmpresa.empresa);

          const dataBoletas = await getBoletasPago("https://sia-teo-8rns.vercel.app/api");
          const filteredBoletas = dataBoletas.boletas_pagos.filter(
            (boleta: TRS_Boleta_Pago) => boleta.ID_EMPLEADO === dataEmpleado.empleado.ID_EMPLEADO
          );
          setBoletas(filteredBoletas);
          const dataDocumento = await getDocumento("https://sia-teo-8rns.vercel.app/api",dataEmpleado.empleado.ID_TIPO!)
          setDocumento(dataDocumento.documentos)
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    if (retry) {
      const retryTimeout = setTimeout(() => {
        setRetry(false);
      }, 500);
      return () => clearTimeout(retryTimeout);
    }
  }, [id, retry]);
  if (loading || !empleado) {
    return <div>Loading...</div>;
  }
  
    return (
      <div>
      <NavigationBar />
      <div className="p-4">
        <div>
          <h1 className="text-2xl font-bold">{empleado.NOMBRE} {empleado.APELLIDO}</h1>
          <h1 className="text-xl font-semibold">Datos:</h1>
        </div>
        <div className="p-4 mt-4 bg-gray-200 max-w-lg flex flex-col justify-start gap-y-3 rounded shadow-lg">
          <p className="text-lg">{documento?.DESCRIPCION}: {empleado.DOCUMENTO}</p>
          <p className="text-lg">Fecha de ingreso: {empleado.FECHA_INGRESO.toString().slice(0,10)}</p>
          <p className="text-lg">Fecha de nacimiento: {empleado.FECHA_NACIMIENTO.toString().slice(0,10)}</p>
          <p className="text-lg">Empresa: {empresa?.NOMBRE}</p>
          <p className="text-lg">Dirección: {empleado.DIRECCION}</p>
          <p className="text-lg">Hijos: {empleado.HIJOS}</p>
        </div>
          <h2 className="text-xl font-semibold mt-4">Boletas de Pago:</h2>
          <ul className="list-disc pl-5">
            {boletas.map((boleta) => (
              <BoletaItem boleta={boleta} key={boleta.ID_BOLETA_PAGO}/>
            ))}
          </ul>
      </div>
    </div>
    );
  }
  
  export default Page;
