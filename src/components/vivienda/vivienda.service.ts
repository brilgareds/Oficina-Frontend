import { ViviendaDto, CrearViviendaDto } from "./dto/vivienda.dto";
import { ViviendaRepository } from "./repositories/vivienda.repository";

export class ViviendaService {
  constructor(private readonly viviendaRepository: ViviendaRepository) {}

  public async consultarDatosVivienda({ informacionBasica_codigo,EMP_CODIGO,NRO_DOCUMENTO }: ViviendaDto) {
    try {
      const buscarDatos = await this.viviendaRepository.consultarDatosVivienda(informacionBasica_codigo,EMP_CODIGO,NRO_DOCUMENTO);

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

  public async crearRegistroVivienda({ INFORMACION_BASICA_CODIGO,
    TIPO_VIVIENDA,
    PERIMETRO,
    ESTRATO,
    BENEFICIARIO_CREDITO_VIVIENDA,
    CREDITO_VIVIENDA_VIGENTE,
    SERVICIOS,
    HABITANTES_VIVIENDA 
  }: CrearViviendaDto) {
    try {

      const SERVICIOS_string = (SERVICIOS)?"'"+SERVICIOS+"'":"(null)";
      const actualizarDatosVivienda = await this.viviendaRepository.crearRegistroVivienda(
        INFORMACION_BASICA_CODIGO,
        TIPO_VIVIENDA,
        PERIMETRO,
        ESTRATO,
        BENEFICIARIO_CREDITO_VIVIENDA,
        CREDITO_VIVIENDA_VIGENTE,
        SERVICIOS_string,
        HABITANTES_VIVIENDA
      );

      return actualizarDatosVivienda;

    } catch (error) {

      throw new Error(error.message);

    }
  }

}
