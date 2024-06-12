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
        const response = await axios({ method, url, data });
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

  // Descuentos
  const getDescuentos = (API_URL:string) => request('get', `${API_URL}/descuentos`);
  const getDescuento = (API_URL:string,id: string) => request('get', `${API_URL}/descuentos/${id}`);
  const createDescuento = (API_URL:string,descuento: any) => request('post', `${API_URL}/descuentos`, descuento);
  const updateDescuento = (API_URL:string,id: string, descuento: any) => request('put', `${API_URL}/descuentos/${id}`, descuento);
  const deleteDescuento = (API_URL:string,id: string) => request('delete', `${API_URL}/descuentos/${id}`);

  // Aportaciones
  const getAportaciones = (API_URL:string) => request('get', `${API_URL}/aportaciones`);
  const getAportacion = (API_URL:string,id: string) => request('get', `${API_URL}/aportaciones/${id}`);
  const createAportacion = (API_URL:string,aportacion: any) => request('post', `${API_URL}/aportaciones`, aportacion);
  const updateAportacion = (API_URL:string,id: string, aportacion: any) => request('put', `${API_URL}/aportaciones/${id}`, aportacion);
  const deleteAportacion = (API_URL:string,id: string) => request('delete', `${API_URL}/aportaciones/${id}`);

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
    getDescuentos,
    getDescuento,
    createDescuento,
    updateDescuento,
    deleteDescuento,
    getAportaciones,
    getAportacion,
    createAportacion,
    updateAportacion,
    deleteAportacion,
    getHorariosLaborados,
    getHorarioLaborado,
    createHorarioLaborado,
    updateHorarioLaborado,
    deleteHorarioLaborado
  };
};

export default useApi;
