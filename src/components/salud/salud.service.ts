import { SaludDatosDto } from "./dto/saludDatos.dto";
import { CrearRegistroSaludDto } from "./dto/crearRegistroSalud.dto";
import { SaludRepository } from "./repositories/salud.repository";

export class SaludService {
  constructor(private readonly saludRepository: SaludRepository) {}

  public async buscarDatos({ cedula,empresa }: SaludDatosDto) {
    try {
      let buscarDatos = await this.saludRepository.buscarDatos(cedula, empresa);
      if(!buscarDatos[0]){
        buscarDatos = {"error":"No se encontraron datos"};
      }
      return buscarDatos;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async buscarDatosGrupoSanguineo() {
    try {
      let buscarDatosGrupoSanguineo = await this.saludRepository.buscarDatosGrupoSanguineo();
      if(!buscarDatosGrupoSanguineo[0]){
        buscarDatosGrupoSanguineo = {"error":"No se encontraron datos"};
      }
      return buscarDatosGrupoSanguineo;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async buscarDatosFactor() {
    try {
      let buscarDatosFactor = await this.saludRepository.buscarDatosFactor();
      if(!buscarDatosFactor[0]){
        buscarDatosFactor = {"error":"No se encontraron datos"};
      }
      return buscarDatosFactor;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async buscarDatosRaza() {
    try {
      let buscarDatosRaza = await this.saludRepository.buscarDatosRaza();
      if(!buscarDatosRaza[0]){
        buscarDatosRaza = {"error":"No se encontraron datos"};
      }
      return buscarDatosRaza;

    } catch (error) {

      throw new Error(error.message);

    }
  }

  public async buscarDatosPlanSalud() {
    try {
      let buscarDatosPlanSalud = await this.saludRepository.buscarDatosPlanSalud();
      if(!buscarDatosPlanSalud[0]){
        buscarDatosPlanSalud = {"error":"No se encontraron datos"};
      }
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
    ENTIDAD_OTROS,
    EMBARAZO_ALTO_RIESGO,
    FECHA_EXAMEN_EMBARAZO,
    TIEMPO_GESTACION,
    FECHA_PARTO,
    OBSERVACION
   }: CrearRegistroSaludDto) {
    try {
      let actualizarRegistroSalud = await this.saludRepository.tieneRegistroSalud(EMPRESA,NRO_DOCUMENTO);

      //SALUD
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

      //REPORTE EMBARAZO
      const EMBARAZO_ALTO_RIESGO_string = (EMBARAZO_ALTO_RIESGO || EMBARAZO_ALTO_RIESGO==0)?EMBARAZO_ALTO_RIESGO+"":"NULL";
      const FECHA_EXAMEN_EMBARAZO_string = (FECHA_EXAMEN_EMBARAZO)?"'"+FECHA_EXAMEN_EMBARAZO+"'":"NULL";
      const TIEMPO_GESTACION_string = (TIEMPO_GESTACION || EMBARAZO_ALTO_RIESGO==0)?TIEMPO_GESTACION+"":"NULL";
      const FECHA_PARTO_string = (FECHA_PARTO)?"'"+FECHA_PARTO+"'":"NULL";
      const OBSERVACION_string = (OBSERVACION)?"'"+OBSERVACION+"'":"NULL";

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
        const act_hora = dateAct_hora.toISOString().split('T')[0];
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

      actualizarRegistroSalud = await this.saludRepository.tieneRegistroReporteEmbarazo(EMPRESA,NRO_DOCUMENTO);
      if(!actualizarRegistroSalud[0]['REPORTE_EMBARAZO_CODIGO']){
        actualizarRegistroSalud = await this.saludRepository.crearRegistroReporteEmbarazo(
          EMPRESA,
          NRO_DOCUMENTO,
          EMBARAZO_ALTO_RIESGO_string,
          FECHA_EXAMEN_EMBARAZO_string,
          TIEMPO_GESTACION_string,
          FECHA_PARTO_string,
          OBSERVACION_string
        );
      }else{
        actualizarRegistroSalud = await this.saludRepository.actualizarRegistroReporteEmbarazo(
          actualizarRegistroSalud[0]['REPORTE_EMBARAZO_CODIGO'],
          EMBARAZO_ALTO_RIESGO_string,
          FECHA_EXAMEN_EMBARAZO_string,
          TIEMPO_GESTACION_string,
          FECHA_PARTO_string,
          OBSERVACION_string
        );
      }

      return {"status":"ok"};

    } catch (error) {

      throw new Error(error.message);

    }
  }

}
