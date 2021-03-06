export interface EducacionRepository {

  consultarNivelEstudio(): Promise<any>;
  consultarEstadoEstudio(): Promise<any>;
  consultarModalidadEstudio(): Promise<any>;
  consultarDatosEstudio(cedula: number): Promise<any>;
  crearRegistro(MENU_CODIGO: number,
                INFORMACION_BASICA_CODIGO: number,
                NIVEL_ESTUDIO: number,
                TITULO: string,
                INSTITUCION: string,
                CIUDAD: number,
                ESTADO_ESTUDIO: number,
                FECHA_INICIO: string,
                FECHA_FINALIZACION: string,
                FECHA_GRADO_TENTATIVO: string,
                MODALIDAD_ESTUDIO: number,
                PROMEDIO: string,
                PAI_CODIGO: number,
                DTO_CODIGO: number,
                URL: string): Promise<any>;
  actualizarRegistro(
    EDUCACION_CODIGO: number,
    NIVEL_ESTUDIO: number,
    TITULO: string,
    INSTITUCION: string,
    CIUDAD: number,
    ESTADO_ESTUDIO: number,
    FECHA_INICIO: string,
    FECHA_FINALIZACION: string,
    FECHA_GRADO_TENTATIVO: string,
    MODALIDAD_ESTUDIO: number,
    PROMEDIO: string,
    PAI_CODIGO: number,
    DTO_CODIGO: number,
    URL: string): Promise<any>;
  eliminarRegistro(EDUCACION_CODIGO: number): Promise<any>;
}