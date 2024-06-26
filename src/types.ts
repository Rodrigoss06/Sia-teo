interface MAE_Empleado {
    ID_EMPLEADO: number;
    ID_TIPO: number;
    DOCUMENTO:string;
    NOMBRE: string;
    APELLIDO: string;
    FECHA_NACIMIENTO: Date;
    HIJOS: string;
    DIRECCION: string;
    FECHA_INGRESO: Date;
    ID_EMPRESA: string;
}

interface MAE_Empresa {
    ID_EMPRESA: string;
    NOMBRE:string;
    RAZON_SOCIAL: string;
    RUBRO_EMPRESA: string;
    DIRECCION: string;
    RUC: string;
}

interface TRS_Boleta_Pago {
    ID_BOLETA_PAGO: number;
    FECHA: Date;
    MES:number;
    ID_EMPLEADO: number;
    DIAS_LABORADOS: number;
    TOTAL_HORAS_LABORADAS: number;
    HORAS_EXTRAS: number;
    DIAS_NO_LABORADOS: number;
    NETO_PAGAR: number;
    ID_BOLETA_PAGO_DETALLES: number;
}

interface TRS_Remuneraciones {
    ID_REMUNERACION_TRANSACCIONAL: number;
    TOTAL: number;
}

interface TRS_Descuentos {
    ID_DESCUENTO_TRANSACCIONAL: number;
    TOTAL: number;
}

interface TRS_Aportaciones {
    ID_APORTACIONES: number;
    ESSALUD: number;
    SCTR: number;
}

interface MAE_Descuentos {
    ID_DESCUENTO: number;
    DESCRIPCION: string;
    MONTO: number;
    PORCENTAJE?: number;
    ID_DESCUENTO_TRANSACCIONAL: number;
}

interface TRS_Boleta_Pago_Detalle {
    ID_BOLETA_PAGO_DETALLE: number;
    ID_DESCUENTO_TRANSACCIONAL: number;
    ID_REMUNERACION_TRANSACCIONAL: number;
    ID_APORTACIONES_TRANSACCIONAL: number;
}

interface MAE_Remuneraciones {
    ID_REMUNERACIONES: number;
    DESCRIPCION: string;
    MONTO: number;
    ID_REMUNERACION_TRANSACCIONAL: number;
}

interface MAE_Tipo_Documento {
    ID_TIPO: number;
    DESCRIPCION: string;
}

