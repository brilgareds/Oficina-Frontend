export interface DatosAdicionalesRepository {
  buscarDatos(CODIGO_EMPRESA: number, NRO_DOCUMENTO: number): Promise<any>;
  buscarDatosListaDatosAdicionales(DATOS_ADICIONALES_CODIGO: number): Promise<any>;
  buscarDatosFrecuencia(): Promise<any>;
  buscarDatosVehiculos(): Promise<any>;
  buscarDatosLicenciaConduccion(): Promise<any>;
  buscarDatosCondicionEspecial(): Promise<any>;
  buscarDatosBienesServicios(): Promise<any>;
  buscarDatosTemasInteres(): Promise<any>;
  existeRegistroDatosAdicionales(CODIGO_EMPRESA: number, NRO_DOCUMENTO: number): Promise<any>;
  crearRegistroDatosAdicionales(
    NRO_DOCUMENTO: number,
    CODIGO_EMPRESA: number,
    HOBBIES: string,
    PROFESION: string,
    ANOS_PROFESION: string,
    INGRESOS_ADICIONALES: string,
    MASCOTA: string, 
    CUAL_MASCOTA: string,
    RECREACION: string,
    CUAL_RECREACION: string,
    FRECUENCIA_RECREACION: string,
    DEPORTE: string,
    CUAL_DEPORTE: string,
    FRECUENCIA_DEPORTE: string,
    OTRO_TRABAJO: string,
    CUAL_OTRO_TRABAJO: string,
    FRECUENCIA_OTRO_TRABAJO: string,
    VEHICULO: string,
    CUAL_VEHICULO: string,
    LICENCIA_CONDUCCION: string,
    LICENCIA_CONDUCCION_TIPO: string,
    GRUPO_SOCIAL: string,
    CUAL_GRUPO_SOCIAL: string,
    AHORRO: string,
    PORCENTAJE_AHORRO_SALARIAL: string,
    DESTINO_AHORROS: string,
    INTERES_OTRO: string,
    CONVENIOS_ADICIONALES: string,
    DEPORTES_INTERES: string
  ): Promise<any>;
  consultarIdUltimoRegistro(tableName: string): Promise<any>;
  existeRegistroListaDatosAdicionales(DATOS_ADICIONALES_CODIGO: number): Promise<any>;
  desactivarListaCondicionEspecial(DATOS_ADICIONALES_CODIGO: number): Promise<any>;
  desactivarListaDeudas(DATOS_ADICIONALES_CODIGO: number): Promise<any>;
  desactivarListaDeudasFuturas(DATOS_ADICIONALES_CODIGO: number): Promise<any>;
  desactivarListaTemasInteres(DATOS_ADICIONALES_CODIGO: number): Promise<any>
  buscarRegistroListaDatosAdicionales(DATOS_ADICIONALES_CODIGO: number, TIP_CODIGO:number): Promise<any>
  crearRegistroListaDatosAdicionales(
    DATOS_ADICIONALES_CODIGO: number,
    TIP_CODIGO: number,
    CONDICION_ESPECIAL: number,
    DEUDAS: number,
    DEUDAS_FUTURAS: number,
    ESTADO: number,
  ): Promise<any>;
  activarListaDatosAdicionales(LISTA_DATOS_ADICIONALES_CODIGO: number): Promise<any>;
  actualizarRegistroDatosAdicionales(
    DATOS_ADICIONALES_CODIGO: number,
    HOBBIES: string,
    PROFESION: string,
    ANOS_PROFESION: string,
    INGRESOS_ADICIONALES: string,
    MASCOTA: string, 
    CUAL_MASCOTA: string,
    RECREACION: string,
    CUAL_RECREACION: string,
    FRECUENCIA_RECREACION: string,
    DEPORTE: string,
    CUAL_DEPORTE: string,
    FRECUENCIA_DEPORTE: string,
    OTRO_TRABAJO: string,
    CUAL_OTRO_TRABAJO: string,
    FRECUENCIA_OTRO_TRABAJO: string,
    VEHICULO: string,
    CUAL_VEHICULO: string,
    LICENCIA_CONDUCCION: string,
    LICENCIA_CONDUCCION_TIPO: string,
    GRUPO_SOCIAL: string,
    CUAL_GRUPO_SOCIAL: string,
    AHORRO: string,
    PORCENTAJE_AHORRO_SALARIAL: string,
    DESTINO_AHORROS: string,
    INTERES_OTRO: string,
    CONVENIOS_ADICIONALES: string,
    DEPORTES_INTERES: string
  ): Promise<any>;
  existeRegistroDatosAdicionalesKactus(CODIGO_EMPRESA: number, NRO_DOCUMENTO: number): Promise<any>;
  buscarValorTipo(TIP_CODIGO:number): Promise<any>;
  crearRegistroDatosAdicionalesKactus(
    CODIGO_EMPRESA: number,
    NRO_DOCUMENTO: number,
    HOBBIES: string,
    PROFESION: string,
    ANOS_PROFESION: string,
    CUAL_MASCOTA: string,
    CUAL_RECREACION: string,
    FRECUENCIA_RECREACION: string,
    CUAL_DEPORTE: string,
    FRECUENCIA_DEPORTE: string,
    CUAL_OTRO_TRABAJO: string,
    FRECUENCIA_OTRO_TRABAJO: string,
    CUAL_VEHICULO: string,
    LICENCIA_CONDUCCION_TIPO: string,
    CUAL_GRUPO_SOCIAL: string,
    CONDICION_ESPECIAL: string,
    CONDICION_ESPECIAL_LGTB: string,
    USU_creacion: string,
    act_hora: string
  ): Promise<any>;
  actualizarRegistroDatosAdicionalesKactus(
    CODIGO_EMPRESA: number,
    NRO_DOCUMENTO: number,
    HOBBIES: string,
    PROFESION: string,
    ANOS_PROFESION: string,
    CUAL_MASCOTA: string,
    CUAL_RECREACION: string,
    FRECUENCIA_RECREACION: string,
    CUAL_DEPORTE: string,
    FRECUENCIA_DEPORTE: string,
    CUAL_OTRO_TRABAJO: string,
    FRECUENCIA_OTRO_TRABAJO: string,
    CUAL_VEHICULO: string,
    LICENCIA_CONDUCCION_TIPO: string,
    CUAL_GRUPO_SOCIAL: string,
    CONDICION_ESPECIAL: string,
    CONDICION_ESPECIAL_LGTB: string
  ): Promise<any>;
}
