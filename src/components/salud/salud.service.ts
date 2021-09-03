import { SaludDatosDto } from "./dto/saludDatos.dto";
import { CrearRegistroSaludDto } from "./dto/crearRegistroSalud.dto";
import { SaludRepository } from "./repositories/salud.repository";

export class SaludService {
  constructor(private readonly saludRepository: SaludRepository) {}

  public async buscarDatos({ cedula,empresa }: SaludDatosDto) {
    try {
      const buscarDatos = await this.saludRepository.buscarDatos(cedula, empresa);

      return buscarDatos;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async buscarDatosGrupoSanguineo() {
    try {
      const buscarDatosGrupoSanguineo = await this.saludRepository.buscarDatosGrupoSanguineo();

      return buscarDatosGrupoSanguineo;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async buscarDatosFactor() {
    try {
      const buscarDatosFactor = await this.saludRepository.buscarDatosFactor();

      return buscarDatosFactor;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async buscarDatosRaza() {
    try {
      const buscarDatosRaza = await this.saludRepository.buscarDatosRaza();

      return buscarDatosRaza;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async buscarDatosPlanSalud() {
    try {
      const buscarDatosPlanSalud = await this.saludRepository.buscarDatosPlanSalud();

      return buscarDatosPlanSalud;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async crearRegistroSalud({
    EMPRESA,
    NRO_DOCUMENTO,
    GRUPO_SANGUINEO,
    FACTOR,
    ESTATURA,
    PESO,
    RAZA,
    FUMADOR,
    BEBEDOR,
    ANTEOJOS,
    ENFERMEDADES,
    RESTRICCIONES_MEDICAS,
    FRECUENCIA_ASISTENCIA_MEDICA,
    SUFRE_ALERGIAS,
    ALERGIAS,
    CONTACTO_EMERGENCIA,
    NUMERO_CONTACTO_EMERGENCIA,
    ENFERMEDAD_LABORAL,
    PERDIDA_CAPACIDAD_SALUD,
    PLAN_SALUD_NO_EPS,
    PLAN_SALUD,
    PLAN_SALUD_OTROS,
    ENTIDAD_OTROS
   }: CrearRegistroSaludDto) {
    try {
      let actualizarRegistroSalud = await this.saludRepository.tieneRegistroSalud(EMPRESA,NRO_DOCUMENTO);

      const FUMADOR_string = (FUMADOR)?"'"+FUMADOR+"'":"NULL";
      const BEBEDOR_string = (BEBEDOR)?"'"+BEBEDOR+"'":"NULL";
      const ANTEOJOS_string = (ANTEOJOS)?"'"+ANTEOJOS+"'":"NULL";
      const ENFERMEDADES_string = (ENFERMEDADES)?"'"+ENFERMEDADES+"'":"NULL";
      const RESTRICCIONES_MEDICAS_string = (RESTRICCIONES_MEDICAS)?"'"+RESTRICCIONES_MEDICAS+"'":"NULL";
      const FRECUENCIA_ASISTENCIA_MEDICA_string = (FRECUENCIA_ASISTENCIA_MEDICA)?"'"+FRECUENCIA_ASISTENCIA_MEDICA+"'":"NULL";
      const SUFRE_ALERGIAS_string = (SUFRE_ALERGIAS)?"'"+SUFRE_ALERGIAS+"'":"NULL";
      const ALERGIAS_string = (ALERGIAS)?"'"+ALERGIAS+"'":"NULL";
      const CONTACTO_EMERGENCIA_string = (CONTACTO_EMERGENCIA)?"'"+CONTACTO_EMERGENCIA+"'":"NULL";
      const NUMERO_CONTACTO_EMERGENCIA_string = (NUMERO_CONTACTO_EMERGENCIA)?"'"+NUMERO_CONTACTO_EMERGENCIA+"'":"NULL";
      const ENFERMEDAD_LABORAL_string = (ENFERMEDAD_LABORAL)?"'"+ENFERMEDAD_LABORAL+"'":"NULL";
      const PERDIDA_CAPACIDAD_SALUD_string = (PERDIDA_CAPACIDAD_SALUD)?PERDIDA_CAPACIDAD_SALUD+"":"NULL";
      const PLAN_SALUD_NO_EPS_string = (PLAN_SALUD_NO_EPS)?"'"+PLAN_SALUD_NO_EPS+"'":"NULL";
      const PLAN_SALUD_string = (PLAN_SALUD)?"'"+PLAN_SALUD+"'":"NULL";
      const PLAN_SALUD_OTROS_string = (PLAN_SALUD_OTROS)?"'"+PLAN_SALUD_OTROS+"'":"NULL";
      const ENTIDAD_OTROS_string = (ENTIDAD_OTROS)?"'"+ENTIDAD_OTROS+"'":"NULL";

        if(!actualizarRegistroSalud[0]['SALUD_CODIGO']){

          actualizarRegistroSalud = await this.saludRepository.crearRegistroSalud(
            NRO_DOCUMENTO,
            GRUPO_SANGUINEO,
            FACTOR,
            ESTATURA,
            PESO,
            RAZA,
            FUMADOR_string,
            BEBEDOR_string,
            ANTEOJOS_string,
            ENFERMEDADES_string,
            RESTRICCIONES_MEDICAS_string,
            FRECUENCIA_ASISTENCIA_MEDICA_string,
            SUFRE_ALERGIAS_string,
            ALERGIAS_string,
            CONTACTO_EMERGENCIA_string,
            NUMERO_CONTACTO_EMERGENCIA_string,
            ENFERMEDAD_LABORAL_string,
            PERDIDA_CAPACIDAD_SALUD_string,
            PLAN_SALUD_NO_EPS_string,
            PLAN_SALUD_string,
            PLAN_SALUD_OTROS_string,
            ENTIDAD_OTROS_string,
            EMPRESA
            );

        }else{

          actualizarRegistroSalud = await this.saludRepository.modificarRegistroSalud(
            NRO_DOCUMENTO,
            GRUPO_SANGUINEO,
            FACTOR,
            ESTATURA,
            PESO,
            RAZA,
            FUMADOR_string,
            BEBEDOR_string,
            ANTEOJOS_string,
            ENFERMEDADES_string,
            RESTRICCIONES_MEDICAS_string,
            FRECUENCIA_ASISTENCIA_MEDICA_string,
            SUFRE_ALERGIAS_string,
            ALERGIAS_string,
            CONTACTO_EMERGENCIA_string,
            NUMERO_CONTACTO_EMERGENCIA_string,
            ENFERMEDAD_LABORAL_string,
            PERDIDA_CAPACIDAD_SALUD_string,
            PLAN_SALUD_NO_EPS_string,
            PLAN_SALUD_string,
            PLAN_SALUD_OTROS_string,
            ENTIDAD_OTROS_string,
            EMPRESA
          );

        }

        actualizarRegistroSalud = await this.saludRepository.tieneRegistroSaludKactus(NRO_DOCUMENTO, EMPRESA);
        const USU_creacion = ((NRO_DOCUMENTO+"").length>8)?(NRO_DOCUMENTO+"").substring(0, 8):NRO_DOCUMENTO+"";
        const dateAct_hora = new Date(Date.now());
        const act_hora = dateAct_hora.getFullYear()+"-"+dateAct_hora.getMonth()+"-"+dateAct_hora.getDay();
        if(actualizarRegistroSalud && 
           !actualizarRegistroSalud[0]['cod_empr'] && 
           !actualizarRegistroSalud[0]['cod_empl']){

            actualizarRegistroSalud = await this.saludRepository.crearRegistroSaludKactus(
              NRO_DOCUMENTO, 
              EMPRESA,
              GRUPO_SANGUINEO,
              FACTOR,
              ESTATURA,
              PESO,
              RAZA,
              FUMADOR_string,
              BEBEDOR_string,
              ANTEOJOS_string,
              ENFERMEDADES_string,
              SUFRE_ALERGIAS_string,
              ALERGIAS_string,
              NUMERO_CONTACTO_EMERGENCIA_string,
              ENFERMEDAD_LABORAL_string,
              PERDIDA_CAPACIDAD_SALUD_string,
              PLAN_SALUD_string,
              PLAN_SALUD_OTROS_string,
              ENTIDAD_OTROS_string,
              USU_creacion,
              act_hora
              );

        }else{

          actualizarRegistroSalud = await this.saludRepository.modificarRegistroSaludKactus(
            NRO_DOCUMENTO, 
            EMPRESA,
            GRUPO_SANGUINEO,
            FACTOR,
            ESTATURA,
            PESO,
            RAZA,
            USU_creacion,
            act_hora
            );

        }

      return actualizarRegistroSalud;

    } catch (error) {

      throw new Error(error.message);

    }
  }

}