import { InformacionBasicaDto, DepartamentosDto, CiudadesDto, ActualizarInformacionBasicaDto } from "./dto/informacionBasica.dto";
import { InformacionBasicaRepository } from "./repositories/informacionBasica.repository";

export class InformacionBasicaService {
  constructor(private readonly informacionBasicaRepository: InformacionBasicaRepository) {}

  public async buscarMenu({ cedula,empresa }: InformacionBasicaDto) {
    try {
      const buscarDatos = await this.informacionBasicaRepository.buscarDatos(cedula, empresa);

      return buscarDatos;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async consultarTipDocumento() {
    try {
      const buscarTipDocumento = await this.informacionBasicaRepository.consultarTipDocumento();

      return buscarTipDocumento;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async consultarEstadoCivil() {
    try {
      const buscarEstadoCivil = await this.informacionBasicaRepository.consultarEstadoCivil();

      return buscarEstadoCivil;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async consultarPaises() {
    try {
      const buscarPaises = await this.informacionBasicaRepository.consultarPaises();

      return buscarPaises;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async consultarNomenclatura() {
    try {
      const listaNomenclaturas = await this.informacionBasicaRepository.consultarNomenclatura();

      let arrayCalle: object[] = new Array();
      let arrayBis: object[] = new Array();
      let arrayCardinalidad: object[] = new Array();
      let arrayComplemento: object[] = new Array();

      for (const nomenclatura of listaNomenclaturas) {
        if(nomenclatura['COD_NOME'] == 'CL' ||
           nomenclatura['COD_NOME'] == 'KR' ||
           nomenclatura['COD_NOME'] == 'AC' ||
           nomenclatura['COD_NOME'] == 'AK' ||
           nomenclatura['COD_NOME'] == 'DG' ||
           nomenclatura['COD_NOME'] == 'TV'){

            arrayCalle.push(nomenclatura);

        }
        if(nomenclatura['COD_NOME'] == 'BIS'){

          arrayBis.push(nomenclatura);

        }
        if(nomenclatura['COD_NOME'] == 'S' ||
           nomenclatura['COD_NOME'] == 'E'){

          arrayCardinalidad.push(nomenclatura);

        }

        if(nomenclatura['COD_NOME'] == 'AGR' ||
           nomenclatura['COD_NOME'] == 'APTO' ||
           nomenclatura['COD_NOME'] == 'AUTO' ||
           nomenclatura['COD_NOME'] == 'AV' ||
           nomenclatura['COD_NOME'] == 'AC' ||
           nomenclatura['COD_NOME'] == 'AK' ||
           nomenclatura['COD_NOME'] == 'BIS' ||
           nomenclatura['COD_NOME'] == 'BLQ' ||
           nomenclatura['COD_NOME'] == 'CL' ||
           nomenclatura['COD_NOME'] == 'CART' ||
           nomenclatura['COD_NOME'] == 'CART CTRAL' ||
           nomenclatura['COD_NOME'] == 'CS' ||
           nomenclatura['COD_NOME'] == 'CASER' ||
           nomenclatura['COD_NOME'] == 'CTRAL' ||
           nomenclatura['COD_NOME'] == 'CC' ||
           nomenclatura['COD_NOME'] == 'CIR' ||
           nomenclatura['COD_NOME'] == 'CIUD' ||
           nomenclatura['COD_NOME'] == 'COMUNID' ||
           nomenclatura['COD_NOME'] == 'CONJ' ||
           nomenclatura['COD_NOME'] == 'CONS' ||
           nomenclatura['COD_NOME'] == 'CORREG' ||
           nomenclatura['COD_NOME'] == 'DPTAL' ||
           nomenclatura['COD_NOME'] == 'DG' ||
           nomenclatura['COD_NOME'] == 'ED' ||
           nomenclatura['COD_NOME'] == 'ESQ' ||
           nomenclatura['COD_NOME'] == 'ESTAC' ||
           nomenclatura['COD_NOME'] == 'E' ||
           nomenclatura['COD_NOME'] == 'ET' ||
           nomenclatura['COD_NOME'] == 'HDA' ||
           nomenclatura['COD_NOME'] == 'KM' ||
           nomenclatura['COD_NOME'] == 'LT' ||
           nomenclatura['COD_NOME'] == 'MZ' ||
           nomenclatura['COD_NOME'] == 'MOD' ||
           nomenclatura['COD_NOME'] == 'MPAL' ||
           nomenclatura['COD_NOME'] == 'N' ||
           nomenclatura['COD_NOME'] == '#' ||
           nomenclatura['COD_NOME'] == 'W' ||
           nomenclatura['COD_NOME'] == 'OF' ||
           nomenclatura['COD_NOME'] == 'PARC' ||
           nomenclatura['COD_NOME'] == 'P' ||
           nomenclatura['COD_NOME'] == 'PLZ' ||
           nomenclatura['COD_NOME'] == 'PORT' ||
           nomenclatura['COD_NOME'] == 'PPAL' ||
           nomenclatura['COD_NOME'] == 'PTO' ||
           nomenclatura['COD_NOME'] == 'RESG' ||
           nomenclatura['COD_NOME'] == 'RUR' ||
           nomenclatura['COD_NOME'] == 'SECT' ||
           nomenclatura['COD_NOME'] == 'SUPERMZ' ||
           nomenclatura['COD_NOME'] == 'S' ||
           nomenclatura['COD_NOME'] == 'TRR' ||
           nomenclatura['COD_NOME'] == 'TV' ||
           nomenclatura['COD_NOME'] == 'UNID' ||
           nomenclatura['COD_NOME'] == 'URB' ||
           nomenclatura['COD_NOME'] == 'VDA' ||
           nomenclatura['COD_NOME'] == 'VIA'
           ){

          arrayComplemento.push(nomenclatura);

        }

      }

      return {'arrayCalle': arrayCalle,'arrayBis': arrayBis,'arrayCardinalidad': arrayCardinalidad,
              'arrayComplemento': arrayComplemento};

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async consultarAntiguedad() {
    try {
      const buscarEstadoCivil = await this.informacionBasicaRepository.consultarAntiguedad();

      return buscarEstadoCivil;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async consultarDepartamentos({ codPais }: DepartamentosDto) {
    try {
      const buscarDepartamento = await this.informacionBasicaRepository.consultarDepartamentos(codPais);

      return buscarDepartamento;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async consultarMunicipios({ codDepartamento }: CiudadesDto) {
    try {
      const buscarMunicipios = await this.informacionBasicaRepository.consultarMunicipios(codDepartamento);

      return buscarMunicipios;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async consultarTalla() {
    try {
      const buscarTallaUniformes = await this.informacionBasicaRepository.consultarTalla();
      let arrayCamisa = new Array();
      let arrayPantalonMujer = new Array();
      let arrayPantalonHombre = new Array();
      let arrayCalzado = new Array();
      for(const tallaUniforme of buscarTallaUniformes){

        if(tallaUniforme.TIP_CODIGO2 == 1319){
          arrayCamisa.push(tallaUniforme);
        }else if(tallaUniforme.TIP_CODIGO2 == 1327){
          arrayPantalonMujer.push(tallaUniforme);
        }else if(tallaUniforme.TIP_CODIGO2 == 1328){
          arrayPantalonHombre.push(tallaUniforme);
        }else if(tallaUniforme.TIP_CODIGO2 == 1354){
          arrayCalzado.push(tallaUniforme);
        }

      }

      return {'tallaCamisa': arrayCamisa, 'tallaPantalonMujer': arrayPantalonMujer, 
              'tallaPantalonHombre':arrayPantalonHombre,'tallaCalzado':arrayCalzado};

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async actualizacionDatos({
    TIP_CODIGO_DOCUMENTO,
    EMP_CODIGO,
    NRO_DOCUMENTO,
    NOMBRES,
    APELLIDOS,
    SEXO,
    FECHA_NACIMIENTO,
    ESTADO_CIVIL,
    DEPARTAMENTO_RESIDENCIA,
    CIUDAD_RESIDENCIA,
    BARRIO_RESIDENCIA,
    LOCALIDAD_RESIDENCIA,
    DIRECCION_COMPLETA,
    EMAIL_PERSONAL,
    EMAIL_CORPORATIVO,
    CELULAR_CONTACTO,
    CELULAR_CORPORATIVO,
    ANTIGUEDAD_EMPRESA,
    PLAN_CARRERA,
    NRO_CARGOS,
    CARGOS_OCUPADOS
  }: ActualizarInformacionBasicaDto) {
    try {

      
      let operacionActualizarDatos = await this.informacionBasicaRepository.existeRegistro(NRO_DOCUMENTO);
      
      const TIP_CODIGO_DOCUMENTO_string: string = (TIP_CODIGO_DOCUMENTO)?"'"+TIP_CODIGO_DOCUMENTO+"'":"(null)";
      const NRO_DOCUMENTO_string: string = (NRO_DOCUMENTO)?NRO_DOCUMENTO+"":"(null)";
      const NOMBRES_string: string = (NOMBRES)?"'"+NOMBRES+"'":"(null)";
      const APELLIDOS_string: string = (APELLIDOS)?"'"+APELLIDOS+"'":"(null)";
      const SEXO_string: string = (SEXO)?"'"+SEXO+"'":"(null)";
      const FECHA_NACIMIENTO_string: string = (FECHA_NACIMIENTO)?"'"+FECHA_NACIMIENTO+"'":"(null)";
      const ESTADO_CIVIL_string: string = (ESTADO_CIVIL)?"'"+ESTADO_CIVIL+"'":"(null)";
      const DEPARTAMENTO_RESIDENCIA_string: string = (DEPARTAMENTO_RESIDENCIA)?DEPARTAMENTO_RESIDENCIA+"":"(null)";
      const CIUDAD_RESIDENCIA_string: string = (CIUDAD_RESIDENCIA)?CIUDAD_RESIDENCIA+"":"(null)";
      const BARRIO_RESIDENCIA_string: string = (BARRIO_RESIDENCIA)?"'"+BARRIO_RESIDENCIA+"'":"(null)";
      const LOCALIDAD_RESIDENCIA_string: string = (LOCALIDAD_RESIDENCIA)?"'"+LOCALIDAD_RESIDENCIA+"'":"(null)";
      const DIRECCION_COMPLETA_string: string = (DIRECCION_COMPLETA)?"'"+DIRECCION_COMPLETA+"'":"(null)";
      const EMAIL_PERSONAL_string: string = (EMAIL_PERSONAL)?"'"+EMAIL_PERSONAL+"'":"(null)";
      const EMAIL_CORPORATIVO_string: string = (EMAIL_CORPORATIVO)?"'"+EMAIL_CORPORATIVO+"'":"(null)";
      const CELULAR_CONTACTO_string: string = (CELULAR_CONTACTO)?CELULAR_CONTACTO+"":"(null)";
      const CELULAR_CORPORATIVO_string: string = (CELULAR_CORPORATIVO)?CELULAR_CORPORATIVO+"":"(null)";
      const ANTIGUEDAD_EMPRESA_string: string = (ANTIGUEDAD_EMPRESA)?"'"+ANTIGUEDAD_EMPRESA+"'":"(null)";
      const PLAN_CARRERA_string: string = PLAN_CARRERA+"";
      const NRO_CARGOS_string: string = (NRO_CARGOS)?NRO_CARGOS+"":"(null)";
      const CARGOS_OCUPADOS_string: string = (CARGOS_OCUPADOS)?"'"+CARGOS_OCUPADOS+"'":"(null)";

      if (operacionActualizarDatos == "") {

        operacionActualizarDatos = await this.informacionBasicaRepository.crearRegistro(
          TIP_CODIGO_DOCUMENTO_string,
          NRO_DOCUMENTO_string,
          NOMBRES_string,
          APELLIDOS_string,
          SEXO_string,
          FECHA_NACIMIENTO_string,
          ESTADO_CIVIL_string,
          DEPARTAMENTO_RESIDENCIA_string,
          CIUDAD_RESIDENCIA_string,
          BARRIO_RESIDENCIA_string,
          LOCALIDAD_RESIDENCIA_string,
          DIRECCION_COMPLETA_string,
          EMAIL_PERSONAL_string,
          EMAIL_CORPORATIVO_string,
          CELULAR_CONTACTO_string,
          CELULAR_CORPORATIVO_string,
          ANTIGUEDAD_EMPRESA_string,
          PLAN_CARRERA_string,
          NRO_CARGOS_string,
          CARGOS_OCUPADOS_string);

      }else{

        /*operacionActualizarDatos = await this.informacionBasicaRepository.actualizacionRegistro(
          operacionActualizarDatos[0]['INFORMACION_BASICA_CODIGO'],
          TIP_CODIGO_DOCUMENTO_string,
          NRO_DOCUMENTO_string,
          NOMBRES_string,
          APELLIDOS_string,
          SEXO_string,
          FECHA_NACIMIENTO_string,
          ESTADO_CIVIL_string,
          DEPARTAMENTO_RESIDENCIA_string,
          CIUDAD_RESIDENCIA_string,
          BARRIO_RESIDENCIA_string,
          LOCALIDAD_RESIDENCIA_string,
          DIRECCION_COMPLETA_string,
          EMAIL_PERSONAL_string,
          EMAIL_CORPORATIVO_string,
          CELULAR_CONTACTO_string,
          CELULAR_CORPORATIVO_string,
          ANTIGUEDAD_EMPRESA_string,
          PLAN_CARRERA_string,
          NRO_CARGOS_string,
          CARGOS_OCUPADOS_string);*/

      }

      /*operacionActualizarDatos = await this.informacionBasicaRepository.actualizacionBi_emple(
        EMP_CODIGO,
        NRO_DOCUMENTO_string,
        ESTADO_CIVIL_string,
        DEPARTAMENTO_RESIDENCIA_string,
        CIUDAD_RESIDENCIA_string,
        BARRIO_RESIDENCIA_string,
        DIRECCION_COMPLETA_string,
        EMAIL_PERSONAL_string,
        EMAIL_CORPORATIVO_string,
        CELULAR_CONTACTO_string,
        CELULAR_CORPORATIVO_string
      );*/

      return operacionActualizarDatos;

    } catch (error) {

      throw new Error(error.message);

    }
  }

}
