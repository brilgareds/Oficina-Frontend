import { ViviendaDto } from "./dto/vivienda.dto";
import { CrearViviendaDto } from "./dto/crearVivienda.dto";
import { ViviendaRepository } from "./repositories/vivienda.repository";

export class ViviendaService {
  constructor(private readonly viviendaRepository: ViviendaRepository) {}

  public async consultarDatosVivienda({ EMP_CODIGO,NRO_DOCUMENTO }: ViviendaDto) {
    try {
      const buscarDatos = await this.viviendaRepository.consultarDatosVivienda(EMP_CODIGO,NRO_DOCUMENTO);

      return buscarDatos;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async consultarDatosTipVivienda() {
    try {
      const buscarDatosTipVivienda = await this.viviendaRepository.consultarDatosTipVivienda();

      return buscarDatosTipVivienda;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async consultarDatosPerimetro() {
    try {
      const buscarDatosPerimetro = await this.viviendaRepository.consultarDatosPerimetro();

      return buscarDatosPerimetro;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async consultarDatosEstrato() {
    try {
      const buscarDatosEstrato = await this.viviendaRepository.consultarDatosEstrato();

      return buscarDatosEstrato;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async consultarDatosServicios() {
    try {
      const buscarDatosServicio = await this.viviendaRepository.consultarDatosServicios();

      return buscarDatosServicio;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async crearRegistroVivienda({ 
    NRO_DOCUMENTO,
    TIPO_VIVIENDA,
    PERIMETRO,
    ESTRATO,
    BENEFICIARIO_CREDITO_VIVIENDA,
    CREDITO_VIVIENDA_VIGENTE,
    SERVICIOS,
    HABITANTES_VIVIENDA,
    CODIGO_EMPRESA
  }: CrearViviendaDto) {
    try {

      let actualizarDatosVivienda = await this.viviendaRepository.existeRegistroVivienda(CODIGO_EMPRESA,NRO_DOCUMENTO);
      const SERVICIOS_string = (SERVICIOS)?"'"+SERVICIOS+"'":"NULL";
      
      if(!actualizarDatosVivienda[0]['VIVIENDA_CODIGO']){

        actualizarDatosVivienda = await this.viviendaRepository.crearRegistroVivienda(
          NRO_DOCUMENTO,
          TIPO_VIVIENDA,
          PERIMETRO,
          ESTRATO,
          BENEFICIARIO_CREDITO_VIVIENDA,
          CREDITO_VIVIENDA_VIGENTE,
          SERVICIOS_string,
          HABITANTES_VIVIENDA,
          CODIGO_EMPRESA
        );

      }else{

        actualizarDatosVivienda = await this.viviendaRepository.actualizarRegistroVivienda(
          actualizarDatosVivienda[0]['VIVIENDA_CODIGO'],
          TIPO_VIVIENDA,
          PERIMETRO,
          ESTRATO,
          BENEFICIARIO_CREDITO_VIVIENDA,
          CREDITO_VIVIENDA_VIGENTE,
          SERVICIOS_string,
          HABITANTES_VIVIENDA
        );

      }

      actualizarDatosVivienda = await this.viviendaRepository.existeRegistroViviendaKactus(CODIGO_EMPRESA,NRO_DOCUMENTO);
      const USU_creacion = ((NRO_DOCUMENTO+"").length>8)?(NRO_DOCUMENTO+"").substring(0, 8):NRO_DOCUMENTO+"";
      const dateAct_hora = new Date(Date.now());
      const act_hora = dateAct_hora.getFullYear()+"-"+dateAct_hora.getMonth()+"-"+dateAct_hora.getDay();
      if(!actualizarDatosVivienda[0]['cod_empr'] && !actualizarDatosVivienda[0]['cod_empl']){
        actualizarDatosVivienda = await this.viviendaRepository.crearRegistroViviendaKactus(
          CODIGO_EMPRESA,
          NRO_DOCUMENTO,
          TIPO_VIVIENDA,
          PERIMETRO,
          ESTRATO,
          BENEFICIARIO_CREDITO_VIVIENDA,
          CREDITO_VIVIENDA_VIGENTE,
          HABITANTES_VIVIENDA,
          USU_creacion,
          act_hora
        );
      }else{

        actualizarDatosVivienda = await this.viviendaRepository.actualizarRegistroViviendaKactus(
          CODIGO_EMPRESA,
          NRO_DOCUMENTO,
          TIPO_VIVIENDA,
          PERIMETRO,
          ESTRATO,
          BENEFICIARIO_CREDITO_VIVIENDA,
          CREDITO_VIVIENDA_VIGENTE,
          HABITANTES_VIVIENDA
        );

      }

      return actualizarDatosVivienda;

    } catch (error) {

      throw new Error(error.message);

    }
  }

}
