export interface ViviendaRepository {
  consultarDatosVivienda(informacionBasica_codigo: number, EMP_CODIGO: number, NRO_DOCUMENTO: number): Promise<any>;
  consultarDatosTipVivienda(): Promise<any>;
  consultarDatosPerimetro(): Promise<any>;
  consultarDatosEstrato(): Promise<any>;
  consultarDatosServicios(): Promise<any>;
  crearRegistroVivienda(
    INFORMACION_BASICA_CODIGO: number,
    TIPO_VIVIENDA: string,
    PERIMETRO: string,
    ESTRATO: number,
    BENEFICIARIO_CREDITO_VIVIENDA: string,
    CREDITO_VIVIENDA_VIGENTE: string,
    SERVICIOS: string,
    HABITANTES_VIVIENDA: number
  ): Promise<any>;
}
