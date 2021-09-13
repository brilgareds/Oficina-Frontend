export interface ViviendaRepository {
  consultarDatosVivienda(EMP_CODIGO: number, NRO_DOCUMENTO: number): Promise<any>;
  consultarDatosTipVivienda(): Promise<any>;
  consultarDatosPerimetro(): Promise<any>;
  consultarDatosEstrato(): Promise<any>;
  consultarDatosServicios(): Promise<any>;
  crearRegistroVivienda(
    NRO_DOCUMENTO: number,
    TIPO_VIVIENDA: string,
    PERIMETRO: string,
    ESTRATO: number,
    BENEFICIARIO_CREDITO_VIVIENDA: string,
    CREDITO_VIVIENDA_VIGENTE: string,
    SERVICIOS: string,
    HABITANTES_VIVIENDA: number,
    CODIGO_EMPRESA: number
  ): Promise<any>;
  existeRegistroVivienda(EMP_CODIGO: number, NRO_DOCUMENTO: number): Promise<any>;
  actualizarRegistroVivienda(
    VIVIENDA_CODIGO: number,
    TIPO_VIVIENDA: string,
    PERIMETRO: string,
    ESTRATO: number,
    BENEFICIARIO_CREDITO_VIVIENDA: string,
    CREDITO_VIVIENDA_VIGENTE: string,
    SERVICIOS: string,
    HABITANTES_VIVIENDA: number
  ): Promise<any>;
  existeRegistroViviendaKactus(EMP_CODIGO: number, NRO_DOCUMENTO: number): Promise<any>;
  crearRegistroViviendaKactus(
    CODIGO_EMPRESA: number,
    NRO_DOCUMENTO: number,
    TIPO_VIVIENDA: string,
    PERIMETRO: string,
    ESTRATO: number,
    BENEFICIARIO_CREDITO_VIVIENDA: string,
    CREDITO_VIVIENDA_VIGENTE: string,
    HABITANTES_VIVIENDA: number,
    USU_creacion: string,
    act_hora: string
  ): Promise<any>;
  actualizarRegistroViviendaKactus(
    CODIGO_EMPRESA: number,
    NRO_DOCUMENTO: number,
    TIPO_VIVIENDA: string,
    PERIMETRO: string,
    ESTRATO: number,
    BENEFICIARIO_CREDITO_VIVIENDA: string,
    CREDITO_VIVIENDA_VIGENTE: string,
    HABITANTES_VIVIENDA: number
  ): Promise<any>;
}
