import useApi from "@/hooks/useApi";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Page() {
    const [empleado, setEmpleado] = useState<MAE_Empleado | null>(null);
    const [empresa, setEmpresa] = useState<MAE_Empresa | null>(null);
    const [boletas, setBoletas] = useState<TRS_Boleta_Pago[]>([]);
    const [loading, setLoading] = useState(true);
    const [carga,setCarga]= useState(0)
    const router = useRouter();
    const { id } = router.query;
    const { getEmpleado, getEmpresa, getBoletasPago } = useApi();
    console.log(id)
    useEffect(() => {
        console.log(id)
      if (!id) {
        console.log(id)
        setCarga(carga+1)
        return
      };

      const getDataEmpleado = async () => {
        try {
            console.log(2)
          const data = await getEmpleado("http://localhost:3000/api",String(id));
          console.log(data)
          if (data.empleado) {
            console.log(data.empleado)
            console.log(empleado)
            try {
                console.log(7)
                console.log(3)
                console.log(empleado!.FK_MAE_Empresa_MAE_Empleado!)
                const data = await getEmpresa("http://localhost:3000/api",empleado!.FK_MAE_Empresa_MAE_Empleado!);
                console.log(data)
                console.log(data.empresa)
                setEmpresa(data.empresa);
              } catch (error) {
                console.error(error);
              }
              try {
                console.log(8)
                console.log(4)
                const data = await getBoletasPago("http://localhost:3000/api");
                console.log(data)
                console.log(data.boletas)
                const filteredBoletas = data.boletas.filter(
                  (boleta: TRS_Boleta_Pago) => boleta.FK_MAE_Empleado_TRS_Boleta_Pago === empleado!.PK_MAE_Empleado
                );
                console.log(filteredBoletas)
                setBoletas(filteredBoletas);
              } catch (error) {
                console.error(error);
              }
              setLoading(false)
          }
          setEmpleado(data.empleado);
        } catch (error) {
          console.error(error);
        }
      };
  
      getDataEmpleado();
    }, []);
  

  
    if (loading || !empleado) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <div>
          <h1>{empleado.NOMBRE} {empleado.APELLIDO}</h1>
        </div>
        <div>
          <h1>Datos:</h1>
          <p>DNI: {empleado.DNI}</p>
          <p>Fecha de nacimiento: {new Date(JSON.stringify(empleado.FECHA_NACIMIENTO)).toLocaleDateString()}</p>
          <p>Empresa: {empresa?.RAZON_SOCIAL}</p>
          <h2>Boletas de Pago:</h2>
          <ul>
            {boletas.map((boleta) => (
              <li key={boleta.PK_TRS_Boleta_Pago}>
                {boleta.MES}/{boleta.ANIO} - {boleta.NETO_PAGAR} Soles
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  export default Page;
