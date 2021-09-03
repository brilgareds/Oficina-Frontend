export interface SaludRepository {
  buscarDatos(cedula: number, empresa: number): Promise<any>;
  buscarDatosGrupoSanguineo(): Promise<any>;
  buscarDatosFactor(): Promise<any>;
  buscarDatosRaza(): Promise<any>;
  buscarDatosPlanSalud(): Promise<any>;
  tieneRegistroSalud(empresa:number,cedula: number): Promise<any>;
  crearRegistroSalud(
    NRO_DOCUMENTO: number,
    GRUPO_SANGUINEO: string,
    FACTOR: string,
    ESTATURA: string,
    PESO: string,
    RAZA: string,
    FUMADOR: string,
    BEBEDOR: string,
    ANTEOJOS: string,
    ENFERMEDADES: string,
    RESTRICCIONES_MEDICAS: string,
    FRECUENCIA_ASISTENCIA_MEDICA: string,
    SUFRE_ALERGIAS: string,
    ALERGIAS: string,
    CONTACTO_EMERGENCIA: string,
    NUMERO_CONTACTO_EMERGENCIA: string,
    ENFERMEDAD_LABORAL: string,
    PERDIDA_CAPACIDAD_SALUD: string,
    PLAN_SALUD_NO_EPS: string,
    PLAN_SALUD: string,
    PLAN_SALUD_OTROS: string,
    ENTIDAD_OTROS: string,
    CODIGO_EMPRESA: number
  ): Promise<any>;
  modificarRegistroSalud(
    NRO_DOCUMENTO: number,
    GRUPO_SANGUINEO: string,
    FACTOR: string,
    ESTATURA: string,
    PESO: string,
    RAZA: string,
    FUMADOR: string,
    BEBEDOR: string,
    ANTEOJOS: string,
    ENFERMEDADES: string,
    RESTRICCIONES_MEDICAS: string,
    FRECUENCIA_ASISTENCIA_MEDICA: string,
    SUFRE_ALERGIAS: string,
    ALERGIAS: string,
    CONTACTO_EMERGENCIA: string,
    NUMERO_CONTACTO_EMERGENCIA: string,
    ENFERMEDAD_LABORAL: string,
    PERDIDA_CAPACIDAD_SALUD: string,
    PLAN_SALUD_NO_EPS: string,
    PLAN_SALUD: string,
    PLAN_SALUD_OTROS: string,
    ENTIDAD_OTROS: string,
    CODIGO_EMPRESA: number
  ): Promise<any>;
  tieneRegistroSaludKactus(cedula: number, empresa: number): Promise<any>;
  crearRegistroSaludKactus(
    cedula: number, 
    empresa: number,
    GRUPO_SANGUINEO: string,
    FACTOR: string,
    ESTATURA: string,
    PESO: string,
    RAZA: string,
    FUMADOR: string,
    BEBEDOR: string,
    ANTEOJOS: string,
    ENFERMEDADES: string,
    SUFRE_ALERGIAS: string,
    ALERGIAS: string,
    NUMERO_CONTACTO_EMERGENCIA: string,
    ENFERMEDAD_LABORAL: string,
    PERDIDA_CAPACIDAD_SALUD: string,
    PLAN_SALUD: string,
    PLAN_SALUD_OTROS: string,
    ENTIDAD_OTROS: string,
    USU_creacion: string,
    act_hora: string
    ): Promise<any>;
    modificarRegistroSaludKactus(
      cedula: number, 
      empresa: number,
      GRUPO_SANGUINEO: string,
      FACTOR: string,
      ESTATURA: string,
      PESO: string,
      RAZA: string,
      USU_creacion: string,
      act_hora: string
    ): Promise<any>
}