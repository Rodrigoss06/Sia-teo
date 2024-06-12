interface MAE_Trabajadores {
    PK_MAE_Trabajador: number;
    DNI: string;
    NOMBRE: string;
    APELLIDO: string;
    FECHA_NACIMIENTO: Date;
    DIRECCION: string;
}

interface TRS_Boleta_Pago {
    PK_TRS_Boleta_Pago: number;
    PAGO_TOTAL: number;
    FECHA: Date;
    FK_MAE_Trabajador: number;
    FK_MAE_Horario: number;
    FK_MAE_Aportaciones: number;
    FK_MAE_Remuneraciones: number;
    FK_MAE_Descuentos: number;
}

interface MAE_Remuneraciones {
    PK_MAE_Remuneraciones: number;
    SUELDO_COMPUTABLE: number;
    REMUNERACION_VACACIONAL: number;
    MOVILIDAD_SUPLEMENTOS: number;
    CTS: number;
    TOTAL_REMUNERACIONES: number;
}

interface MAE_Descuentos {
    PK_MAE_Descuentos: number;
    AFP_FONDO: number;
    AFP_COMISION: number;
    AFP_SEGURO: number;
    ONP: number;
    FALTAS: number;
    RETENCIONES_JUDICIALES: number;
    ADELANTOS: number;
    TOTAL_DESCUENTOS: number;
}

interface MAE_Aportaciones {
    PK_MAE_Aportaciones: number;
    ESSALUD: number;
    SCTR: number;
}

interface MAE_Horario_Laborado {
    PK_MAE_Horario_Laborado: number;
    MES: number;
    DIAS_LABORADOS: number;
    HORAS_LABORADAS: number;
    DIAS_NO_LABORADOS: number;
    HORAS_EXTRA: number;
}