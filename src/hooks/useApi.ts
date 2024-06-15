import { useState } from 'react';
import axios, { AxiosError } from 'axios';
interface ApiError {
    message: {};
    status?: number;
  }
  
  const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);
  
    // Wrapper to handle requests
    const request = async (method: string, url: string, data?: any) => {
      setLoading(true);
      setError(null);
      try {
        console.log(method)
        console.log(url)
        console.log(data)
        const response = await axios({ method, url, data:{
          data:data
        } });
        setLoading(false);
        return response.data;
      } catch (err) {
        setLoading(false);
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError;
          setError({
            message: axiosError.response?.data || axiosError.message,
            status: axiosError.response?.status,
          });
        } else {
          setError({
            message: 'An unexpected error occurred',
          });
        }
        throw err;
      }
    };
  // Empleados
  const getEmpleados = (API_URL:string) => request('get', `${API_URL}/empleados`);
  const getEmpleado = (API_URL:string,id: string) => request('get', `${API_URL}/empleados/${id}`);
  const createEmpleado = (API_URL:string,empleado: any) => request('post', `${API_URL}/empleados`, empleado);
  const updateEmpleado = (API_URL:string,id: string, empleado: any) => request('put', `${API_URL}/empleados/${id}`, empleado);
  const deleteEmpleado = (API_URL:string,id: string) => request('delete', `${API_URL}/empleados/${id}`);

  // Empleados
  const getEmpresas = (API_URL:string) => request('get', `${API_URL}/empresas`);
  const getEmpresa = (API_URL:string,id: string) => request('get', `${API_URL}/empresas/${id}`);
  const createEmpresa = (API_URL:string,empresa: any) => request('post', `${API_URL}/empresas`, empresa);
  const updateEmpresa = (API_URL:string,id: string, empresa: any) => request('put', `${API_URL}/empresas/${id}`, empresa);
  const deleteEmpresa = (API_URL:string,id: string) => request('delete', `${API_URL}/empresas/${id}`);

  // Boletas de Pago
  const getBoletasPago = (API_URL:string) => request('get', `${API_URL}/boletas-pago`);
  const getBoletaPago = (API_URL:string,id: string) => request('get', `${API_URL}/boletas-pago/${id}`);
  const createBoletaPago = (API_URL:string,boleta: any) => request('post', `${API_URL}/boletas-pago`, boleta);
  const updateBoletaPago = (API_URL:string,id: string, boleta: any) => request('put', `${API_URL}/boletas-pago/${id}`, boleta);
  const deleteBoletaPago = (API_URL:string,id: string) => request('delete', `${API_URL}/boletas-pago/${id}`);

  // Remuneraciones
  const getRemuneraciones = (API_URL:string) => request('get', `${API_URL}/remuneraciones`);
  const getRemuneracion = (API_URL:string,id: string) => request('get', `${API_URL}/remuneraciones/${id}`);
  const createRemuneracion = (API_URL:string,remuneracion: any) => request('post', `${API_URL}/remuneraciones`, remuneracion);
  const updateRemuneracion = (API_URL:string,id: string, remuneracion: any) => request('put', `${API_URL}/remuneraciones/${id}`, remuneracion);
  const deleteRemuneracion = (API_URL:string,id: string) => request('delete', `${API_URL}/remuneraciones/${id}`);

  // MAE Remuneraciones
  const getMaeRemuneraciones = (API_URL: string) => request('get', `${API_URL}/mae-remuneraciones`);
  const getMaeRemuneracion = (API_URL: string, id: string) => request('get', `${API_URL}/mae-remuneraciones/${id}`);
  const createMaeRemuneracion = (API_URL: string, maeRemuneracion: any) => request('post', `${API_URL}/mae-remuneraciones`, maeRemuneracion);
  const updateMaeRemuneracion = (API_URL: string, id: string, maeRemuneracion: any) => request('put', `${API_URL}/mae-remuneraciones/${id}`, maeRemuneracion);
  const deleteMaeRemuneracion = (API_URL: string, id: string) => request('delete', `${API_URL}/mae-remuneraciones/${id}`);

  // Descuentos
  const getDescuentos = (API_URL:string) => request('get', `${API_URL}/descuentos`);
  const getDescuento = (API_URL:string,id: string) => request('get', `${API_URL}/descuentos/${id}`);
  const createDescuento = (API_URL:string,descuento: any) => request('post', `${API_URL}/descuentos`, descuento);
  const updateDescuento = (API_URL:string,id: string, descuento: any) => request('put', `${API_URL}/descuentos/${id}`, descuento);
  const deleteDescuento = (API_URL:string,id: string) => request('delete', `${API_URL}/descuentos/${id}`);

      // MAE Descuentos
      const getMaeDescuentos = (API_URL: string) => request('get', `${API_URL}/mae-descuentos`);
      const getMaeDescuento = (API_URL: string, id: string) => request('get', `${API_URL}/mae-descuentos/${id}`);
      const createMaeDescuento = (API_URL: string, maeDescuento: any) => request('post', `${API_URL}/mae-descuentos`, maeDescuento);
      const updateMaeDescuento = (API_URL: string, id: string, maeDescuento: any) => request('put', `${API_URL}/mae-descuentos/${id}`, maeDescuento);
      const deleteMaeDescuento = (API_URL: string, id: string) => request('delete', `${API_URL}/mae-descuentos/${id}`);

  // Aportaciones
  const getAportaciones = (API_URL:string) => request('get', `${API_URL}/aportaciones`);
  const getAportacion = (API_URL:string,id: string) => request('get', `${API_URL}/aportaciones/${id}`);
  const createAportacion = (API_URL:string,aportacion: any) => request('post', `${API_URL}/aportaciones`, aportacion);
  const updateAportacion = (API_URL:string,id: string, aportacion: any) => request('put', `${API_URL}/aportaciones/${id}`, aportacion);
  const deleteAportacion = (API_URL:string,id: string) => request('delete', `${API_URL}/aportaciones/${id}`);

  // Boleta Pago Detalle
  const getBoletaPagoDetalles = (API_URL: string) => request('get', `${API_URL}/boleta-pago-detalles`);
  const getBoletaPagoDetalle = (API_URL: string, id: string) => request('get', `${API_URL}/boleta-pago-detalles/${id}`);
  const createBoletaPagoDetalle = (API_URL: string, detalle: any) => request('post', `${API_URL}/boleta-pago-detalles`, detalle);
  const updateBoletaPagoDetalle = (API_URL: string, id: string, detalle: any) => request('put', `${API_URL}/boleta-pago-detalles/${id}`, detalle);
  const deleteBoletaPagoDetalle = (API_URL: string, id: string) => request('delete', `${API_URL}/boleta-pago-detalles/${id}`);

  // Horario Laborado
  const getHorariosLaborados = (API_URL: string) => request('get', `${API_URL}/horario-laborado`);
  const getHorarioLaborado = (API_URL: string, id: string) => request('get', `${API_URL}/horario-laborado/${id}`);
  const createHorarioLaborado = (API_URL: string, horario: any) => request('post', `${API_URL}/horario-laborado`, horario);
  const updateHorarioLaborado = (API_URL: string, id: string, horario: any) => request('put', `${API_URL}/horario-laborado/${id}`, horario);
  const deleteHorarioLaborado = (API_URL: string, id: string) => request('delete', `${API_URL}/horario-laborado/${id}`);
  
  return {
    loading,
    error,
    getEmpleados,
    getEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
    getEmpresas,
    getEmpresa,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
    getBoletasPago,
    getBoletaPago,
    createBoletaPago,
    updateBoletaPago,
    deleteBoletaPago,
    getRemuneraciones,
    getRemuneracion,
    createRemuneracion,
    updateRemuneracion,
    deleteRemuneracion,
    getMaeRemuneracion,
    getMaeRemuneraciones,
    createMaeRemuneracion,
    updateMaeRemuneracion,
    deleteMaeRemuneracion,
    getDescuentos,
    getDescuento,
    createDescuento,
    updateDescuento,
    deleteDescuento,
    getMaeDescuento,
    getMaeDescuentos,
    createMaeDescuento,
    updateMaeDescuento,
    deleteMaeDescuento,
    getAportaciones,
    getAportacion,
    createAportacion,
    updateAportacion,
    deleteAportacion,
    getBoletaPagoDetalle,
    getBoletaPagoDetalles,
    createBoletaPagoDetalle,
    updateBoletaPagoDetalle,
    deleteBoletaPagoDetalle,
    getHorariosLaborados,
    getHorarioLaborado,
    createHorarioLaborado,
    updateHorarioLaborado,
    deleteHorarioLaborado
  };
};

export default useApi;
