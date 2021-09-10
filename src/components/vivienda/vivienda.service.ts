import { ViviendaDto } from "./dto/vivienda.dto";
import { CrearViviendaDto } from "./dto/crearVivienda.dto";
import { ViviendaRepository } from "./repositories/vivienda.repository";

export class ViviendaService {
  constructor(private readonly viviendaRepository: ViviendaRepository) {}

  public async consultarDatosVivienda({ EMP_CODIGO,NRO_DOCUMENTO }: ViviendaDto) {
    try {
      let buscarDatos = await this.viviendaRepository.consultarDatosVivienda(EMP_CODIGO,NRO_DOCUMENTO);
      if(!buscarDatos[0]){
        buscarDatos = {"error":"No se encontraron datos"};
      }
      return buscarDatos;

    } catch (error) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async consultarDatosTipVivienda() {
    try {
      let buscarDatosTipVivienda = await this.viviendaRepository.consultarDatosTipVivienda();
      if(!buscarDatosTipVivienda[0]){
        buscarDatosTipVivienda = {"error":"No se encontraron datos"};
      }
      return buscarDatosTipVivienda;

    } catch (error) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async consultarDatosPerimetro() {
    try {
      let buscarDatosPerimetro = await this.viviendaRepository.consultarDatosPerimetro();
      if(!buscarDatosPerimetro[0]){
        buscarDatosPerimetro = {"error":"No se encontraron datos"};
      }
      return buscarDatosPerimetro;

    } catch (error) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async consultarDatosEstrato() {
    try {
      let buscarDatosEstrato = await this.viviendaRepository.consultarDatosEstrato();
      if(!buscarDatosEstrato[0]){
        buscarDatosEstrato = {"error":"No se encontraron datos"};
      }
      return buscarDatosEstrato;

    } catch (error) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async consultarDatosServicios() {
    try {
      let buscarDatosServicio = await this.viviendaRepository.consultarDatosServicios();
      if(!buscarDatosServicio[0]){
        buscarDatosServicio = {"error":"No se encontraron datos"};
      }
      return buscarDatosServicio;

    } catch (error) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
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
      const act_hora = dateAct_hora.toISOString().split('T')[0];
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

      return {"ok":"Actualización exitosa"};

    } catch (error) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

}
