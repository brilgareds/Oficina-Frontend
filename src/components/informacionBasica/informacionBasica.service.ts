import { InformacionBasicaDto } from "./dto/informacionBasica.dto";
import { DepartamentosDto } from "./dto/departamentos.dto";
import { CiudadesDto } from "./dto/ciudades.dto";
import { ActualizarInformacionBasicaDto } from "./dto/actualizarInformacionBasica.dto";
import { LabelsNivelDto } from "./dto/labelsNivel.dto";
import { InformacionBasicaRepository } from "./repositories/informacionBasica.repository";

export class InformacionBasicaService {
  constructor(private readonly informacionBasicaRepository: InformacionBasicaRepository) {}

  public async buscarMenu({ cedula,empresa }: InformacionBasicaDto) {
    try {

      let buscarDatos = await this.informacionBasicaRepository.buscarDatos(cedula, empresa);

      if(!buscarDatos[0]){
        buscarDatos = {"error":"No se encontraron datos"};
      }
      return buscarDatos;

    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async consultarTipDocumento() {
    try {
      let buscarTipDocumento = await this.informacionBasicaRepository.consultarTipDocumento();

      if(!buscarTipDocumento[0]){
        buscarTipDocumento = {"error":"No se encontraron datos"};
      }

      return buscarTipDocumento;

    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async consultarEstadoCivil() {
    try {
      let buscarEstadoCivil = await this.informacionBasicaRepository.consultarEstadoCivil();

      if(!buscarEstadoCivil[0]){
        buscarEstadoCivil = {"error":"No se encontraron datos"};
      }
      return buscarEstadoCivil;

    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async consultarPaises() {
    try {
      let buscarPaises = await this.informacionBasicaRepository.consultarPaises();

      if(!buscarPaises[0]){
        buscarPaises = {"error":"No se encontraron datos"};
      }
      return buscarPaises;

    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async consultarLabelsNivel({ empresa }: LabelsNivelDto) {
    try {
      let buscarLabels = await this.informacionBasicaRepository.consultarLabelsNivel(empresa);

      if(!buscarLabels[0]){
        buscarLabels = {"error":"No se encontraron datos"};
      }
      return buscarLabels;

    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async consultarNomenclatura() {
    try {
      let listaNomenclaturas = await this.informacionBasicaRepository.consultarNomenclatura();

      let arrayCalle: object[] = new Array();
      let arrayBis: object[] = new Array();
      let arrayCardinalidad: object[] = new Array();
      let arrayComplemento: object[] = new Array();

      if(listaNomenclaturas[0]){

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

      listaNomenclaturas = {'arrayCalle': arrayCalle,'arrayBis': arrayBis,'arrayCardinalidad': arrayCardinalidad,
                            'arrayComplemento': arrayComplemento};

    }else{
      listaNomenclaturas = {"error":"No se encontraron datos"};
    }

      return listaNomenclaturas;

    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async consultarAntiguedad() {
    try {
      let buscarEstadoCivil = await this.informacionBasicaRepository.consultarAntiguedad();

      if(!buscarEstadoCivil[0]){
        buscarEstadoCivil = {"error":"No se encontraron datos"};
      }
      return buscarEstadoCivil;

    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async consultarDepartamentos({ codPais }: DepartamentosDto) {
    try {
      let buscarDepartamento = await this.informacionBasicaRepository.consultarDepartamentos(codPais);

      if(!buscarDepartamento[0]){
        buscarDepartamento = {"error":"No se encontraron datos"};
      }
      return buscarDepartamento;

    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async consultarMunicipios({ codPais, codDepartamento }: CiudadesDto) {
    try {
      let buscarMunicipios = await this.informacionBasicaRepository.consultarMunicipios(
        codPais,
        codDepartamento
      );

      if(!buscarMunicipios[0]){
        buscarMunicipios = {"error":"No se encontraron datos"};
      }
      return buscarMunicipios;

    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async consultarTalla() {
    try {
      let buscarTallaUniformes = await this.informacionBasicaRepository.consultarTalla();
      let arrayCamisa = new Array();
      let arrayPantalonMujer = new Array();
      let arrayPantalonHombre = new Array();
      let arrayCalzado = new Array();
      if(buscarTallaUniformes[0]){
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

        arrayPantalonMujer.sort(function (a, b) {
          if (parseInt(a.TIP_NOMBRE) > parseInt(b.TIP_NOMBRE)) {
            return 1;
          }
          if (parseInt(a.TIP_NOMBRE) < parseInt(b.TIP_NOMBRE)) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

        arrayPantalonHombre.sort(function (a, b) {
          if (parseInt(a.TIP_NOMBRE) > parseInt(b.TIP_NOMBRE)) {
            return 1;
          }
          if (parseInt(a.TIP_NOMBRE) < parseInt(b.TIP_NOMBRE)) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

        buscarTallaUniformes = {'tallaCamisa': arrayCamisa, 'tallaPantalonMujer': arrayPantalonMujer, 
                                'tallaPantalonHombre':arrayPantalonHombre,'tallaCalzado':arrayCalzado};
      }else{
        buscarTallaUniformes = {"error":"No se encontraron datos"};
      }

      return buscarTallaUniformes;

    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
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
    CARGOS_OCUPADOS,
    USA_UNIFORME,
    TALLA_CAMISA,
    TALLA_PANTALON,
    TALLA_CALZADO,
    PAI_CODIGO
  }: ActualizarInformacionBasicaDto) {
    try {

      
      let operacionActualizarDatos = await this.informacionBasicaRepository.existeRegistro(EMP_CODIGO, NRO_DOCUMENTO);
      
      const TIP_CODIGO_DOCUMENTO_string: string = (TIP_CODIGO_DOCUMENTO)?"'"+TIP_CODIGO_DOCUMENTO+"'":"NULL";
      const NRO_DOCUMENTO_string: string = (NRO_DOCUMENTO)?NRO_DOCUMENTO+"":"NULL";
      const NOMBRES_string: string = (NOMBRES)?"'"+NOMBRES+"'":"NULL";
      const APELLIDOS_string: string = (APELLIDOS)?"'"+APELLIDOS+"'":"NULL";
      const SEXO_string: string = (SEXO)?"'"+SEXO+"'":"NULL";
      const FECHA_NACIMIENTO_string: string = (FECHA_NACIMIENTO)?"'"+FECHA_NACIMIENTO+"'":"NULL";
      const ESTADO_CIVIL_string: string = (ESTADO_CIVIL)?"'"+ESTADO_CIVIL+"'":"NULL";
      const DEPARTAMENTO_RESIDENCIA_string: string = (DEPARTAMENTO_RESIDENCIA)?DEPARTAMENTO_RESIDENCIA+"":"NULL";
      const CIUDAD_RESIDENCIA_string: string = (CIUDAD_RESIDENCIA)?CIUDAD_RESIDENCIA+"":"NULL";
      const BARRIO_RESIDENCIA_string: string = (BARRIO_RESIDENCIA)?"'"+BARRIO_RESIDENCIA+"'":"NULL";
      const LOCALIDAD_RESIDENCIA_string: string = (LOCALIDAD_RESIDENCIA)?"'"+LOCALIDAD_RESIDENCIA+"'":"NULL";
      const DIRECCION_COMPLETA_string: string = (DIRECCION_COMPLETA)?"'"+DIRECCION_COMPLETA+"'":"NULL";
      const EMAIL_PERSONAL_string: string = (EMAIL_PERSONAL)?"'"+EMAIL_PERSONAL+"'":"NULL";
      const EMAIL_CORPORATIVO_string: string = (EMAIL_CORPORATIVO)?"'"+EMAIL_CORPORATIVO+"'":"NULL";
      const CELULAR_CONTACTO_string: string = (CELULAR_CONTACTO)?"'"+CELULAR_CONTACTO+"'":"NULL";
      const CELULAR_CORPORATIVO_string: string = (CELULAR_CORPORATIVO)?"'"+CELULAR_CORPORATIVO+"'":"NULL";
      const ANTIGUEDAD_EMPRESA_string: string = (ANTIGUEDAD_EMPRESA)?"'"+ANTIGUEDAD_EMPRESA+"'":"NULL";
      const PLAN_CARRERA_string: string = PLAN_CARRERA+"";
      const NRO_CARGOS_string: string = (NRO_CARGOS)?NRO_CARGOS+"":"NULL";
      const CARGOS_OCUPADOS_string: string = (CARGOS_OCUPADOS)?"'"+CARGOS_OCUPADOS+"'":"NULL";
      const TALLA_CAMISA_string: string = (TALLA_CAMISA)?TALLA_CAMISA+"":"NULL";
      const TALLA_PANTALON_string: string = (TALLA_PANTALON)?TALLA_PANTALON+"":"NULL";
      const TALLA_CALZADO_string: string = (TALLA_CALZADO)?TALLA_CALZADO+"":"NULL";
      const PAI_CODIGO_string: string = (PAI_CODIGO)?PAI_CODIGO+"":"NULL";

      if (!operacionActualizarDatos[0]['INFORMACION_BASICA_CODIGO']) {

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
          CARGOS_OCUPADOS_string,
          EMP_CODIGO,
          PAI_CODIGO_string);

      }else{

        operacionActualizarDatos = await this.informacionBasicaRepository.actualizacionRegistro(
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
          CARGOS_OCUPADOS_string,
          EMP_CODIGO,
          PAI_CODIGO_string);

      }

      operacionActualizarDatos = await this.informacionBasicaRepository.actualizacionBi_emple(
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
        CELULAR_CORPORATIVO_string,
        PAI_CODIGO_string
      );

      operacionActualizarDatos = await this.informacionBasicaRepository.existeRegistroTallas(EMP_CODIGO, NRO_DOCUMENTO);
      
      if(!operacionActualizarDatos[0]['TALLAS_EMPLEADO_CODIGO']){
        operacionActualizarDatos = await this.informacionBasicaRepository.crearRegistroTallas(
          EMP_CODIGO,
          NRO_DOCUMENTO_string,
          USA_UNIFORME,
          TALLA_CAMISA_string,
          TALLA_PANTALON_string,
          TALLA_CALZADO_string
        );
      }else{
        operacionActualizarDatos = await this.informacionBasicaRepository.actualizacionRegistroTallas(
          operacionActualizarDatos[0]['TALLAS_EMPLEADO_CODIGO'],
          USA_UNIFORME,
          TALLA_CAMISA_string,
          TALLA_PANTALON_string,
          TALLA_CALZADO_string
        );
      }

      return {"ok":"Actualizaci??n de datos exitosa"};

    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

}
