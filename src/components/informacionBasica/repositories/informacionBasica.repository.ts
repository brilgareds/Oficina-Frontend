export interface InformacionBasicaRepository {
  buscarDatos(cedula: number, empresa: number): Promise<any>;
  consultarTipDocumento(): Promise<any>;
  consultarEstadoCivil(): Promise<any>;
  consultarPaises(): Promise<any>;
  consultarDepartamentos(codPais: number): Promise<any>;
  consultarMunicipios(codDepartamento: number): Promise<any>;
  consultarNomenclatura(): Promise<any>;
  consultarAntiguedad(): Promise<any>;
  consultarTalla(): Promise<any>;
  existeRegistro(empresa: number, cedula: number): Promise<any>;
  crearRegistro(TIP_CODIGO_DOCUMENTO: string,
                NRO_DOCUMENTO: string,
                NOMBRES: string,
                APELLIDOS: string,
                SEXO: string,
                FECHA_NACIMIENTO: string,
                ESTADO_CIVIL: string,
                DEPARTAMENTO_RESIDENCIA: string,
                CIUDAD_RESIDENCIA: string,
                BARRIO_RESIDENCIA: string,
                LOCALIDAD_RESIDENCIA: string,
                DIRECCION_COMPLETA: string,
                EMAIL_PERSONAL: string,
                EMAIL_CORPORATIVO: string,
                CELULAR_CONTACTO: string,
                CELULAR_CORPORATIVO: string,
                ANTIGUEDAD_EMPRESA: string,
                PLAN_CARRERA: string,
                NRO_CARGOS: string,
                CARGOS_OCUPADOS: string,
                EMP_CODIGO: number): Promise<any>;
  actualizacionRegistro(
                INFORMACION_BASICA_CODIGO: number,
                TIP_CODIGO_DOCUMENTO: string,
                NRO_DOCUMENTO: string,
                NOMBRES: string,
                APELLIDOS: string,
                SEXO: string,
                FECHA_NACIMIENTO: string,
                ESTADO_CIVIL: string,
                DEPARTAMENTO_RESIDENCIA: string,
                CIUDAD_RESIDENCIA: string,
                BARRIO_RESIDENCIA: string,
                LOCALIDAD_RESIDENCIA: string,
                DIRECCION_COMPLETA: string,
                EMAIL_PERSONAL: string,
                EMAIL_CORPORATIVO: string,
                CELULAR_CONTACTO: string,
                CELULAR_CORPORATIVO: string,
                ANTIGUEDAD_EMPRESA: string,
                PLAN_CARRERA: string,
                NRO_CARGOS: string,
                CARGOS_OCUPADOS: string,
                EMP_CODIGO:number): Promise<any>;
  actualizacionBi_emple(EMP_CODIGO: number,
                        NRO_DOCUMENTO_string: string,
                        ESTADO_CIVIL: string,
                        DEPARTAMENTO_RESIDENCIA: string,
                        CIUDAD_RESIDENCIA: string,
                        BARRIO_RESIDENCIA: string,
                        DIRECCION_COMPLETA: string,
                        EMAIL_PERSONAL: string,
                        EMAIL_CORPORATIVO: string,
                        CELULAR_CONTACTO: string,
                        CELULAR_CORPORATIVO: string): Promise<any>;
  existeRegistroTallas(empresa: number, cedula: number): Promise<any>
  crearRegistroTallas(
                      EMP_CODIGO: number,
                      NRO_DOCUMENTO: string,
                      USA_UNIFORME: number,
                      TALLA_CAMISA: string,
                      TALLA_PANTALON: string,
                      TALLA_CALZADO: string
                      ): Promise<any>;
  actualizacionRegistroTallas(
                              TALLAS_EMPLEADO_CODIGO: number,
                              USA_UNIFORME: number,
                              TALLA_CAMISA: string,
                              TALLA_PANTALON: string,
                              TALLA_CALZADO: string
                              ): Promise<any>;
  consultarLabelsNivel(
                      empresa: number
                      ): Promise<any>
}
