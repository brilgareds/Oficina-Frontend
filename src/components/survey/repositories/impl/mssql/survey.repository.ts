import { mssqlEsmad } from "../../../../../services/mssql";
import { SurveyAnswersDto } from "../../../dto/surveyAnswers.dto";
import { SurveyHeadsDto } from "../../../dto/surveyHeads.dto";
import { SurveyQuestionsDto } from "../../../dto/surveyQuestions.dto";
import { SurveyResponsesDto } from "../../../dto/surveyResponses.dto";
import { SurveyRepository } from "../../survey.repository";

export class SurveyMSSQLRepository implements SurveyRepository {
  public async getSurveyHeads({
    surveyId,
    clasifications,
    frecuency,
  }: SurveyHeadsDto): Promise<any> {
    const pool = await mssqlEsmad;
    let additionalValidations = "";

    if (clasifications) {
      const clasificationsModified = clasifications.map(
        (clasification) => "'" + clasification + "'"
      );

      additionalValidations += ` AND ESMAD_ENCUESTA_PREGUNTAS.EPR_CLASIFICACION IN (${clasificationsModified})`;
    }

    if (frecuency) {
      additionalValidations += `AND ESMAD_ENCUESTA_PREGUNTAS.EPR_FRECUENCIA ${frecuency}`;
    }

    const query = `SELECT 
        DISTINCT ESMAD_ENCUESTA_CABEZERAS.COD_EC, 
        ESMAD_ENCUESTA_CABEZERAS.EC_NOMBRE, 
        ESMAD_ENCUESTA_CABEZERAS.COD_EN
      FROM 
        dbo.ESMAD_ENCUESTA_CABEZERAS
      INNER JOIN dbo.ESMAD_ENCUESTA ON (ESMAD_ENCUESTA.COD_EN = ESMAD_ENCUESTA_CABEZERAS.COD_EN)
      INNER JOIN dbo.ESMAD_ENCUESTA_PREGUNTAS ON (ESMAD_ENCUESTA_CABEZERAS.COD_EC = ESMAD_ENCUESTA_PREGUNTAS.EPR_TIPO_CLASIFICACION)
      WHERE ESMAD_ENCUESTA.COD_EN = ${surveyId} 
      ${additionalValidations}
      AND ESMAD_ENCUESTA.EMP_CODIGO = 3 
      AND ESMAD_ENCUESTA.ESTADO = 1 
      AND ESMAD_ENCUESTA_CABEZERAS.ESTADO = 1`;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset;
    }

    throw new Error("Error de consulta");
  }

  public async getSurveyQuestions({
    surveyId,
    clasifications,
    frecuency,
  }: SurveyQuestionsDto): Promise<any> {
    const pool = await mssqlEsmad;
    let additionalValidations = "";

    if (clasifications) {
      const clasificationsModified = clasifications.map(
        (clasification) => "'" + clasification + "'"
      );

      additionalValidations += `AND ESMAD_ENCUESTA_PREGUNTAS.EPR_CLASIFICACION IN (${clasificationsModified})`;
    }

    if (frecuency) {
      additionalValidations += `AND ESMAD_ENCUESTA_PREGUNTAS.EPR_FRECUENCIA ${frecuency}`;
    }

    const query = `SELECT
        ESMAD_ENCUESTA_PREGUNTAS.COD_EPR AS ID,
        ESMAD_ENCUESTA_PREGUNTAS.EPR_DESCRIPCION AS PREGUNTA,
        ESMAD_ENCUESTA_PREGUNTAS.EPR_CLASIFICACION AS CALSIFICACION,
        ESMAD_ENCUESTA_PREGUNTAS.EPR_TIPO_CLASIFICACION AS CABECERA_ID,
        ESMAD_ENCUESTA_PREGUNTAS.EPR_TIPO_SELECCION AS SELECCION
      FROM 
        dbo.ESMAD_ENCUESTA_PREGUNTAS
      INNER JOIN dbo.ESMAD_ENCUESTA ON ESMAD_ENCUESTA.COD_EN = ESMAD_ENCUESTA_PREGUNTAS.COD_EN
      WHERE ESMAD_ENCUESTA.COD_EN = ${surveyId}
      ${additionalValidations}
      AND ESMAD_ENCUESTA.EMP_CODIGO = 3
      AND ESMAD_ENCUESTA_PREGUNTAS.ESTADO = 1
      AND ESMAD_ENCUESTA.ESTADO = 1
      ORDER BY ESMAD_ENCUESTA_PREGUNTAS.COD_EPR`;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset;
    }

    throw new Error("Error de consulta");
  }

  public async getSurveyResponses({
    surveyId,
    questionIds,
  }: SurveyResponsesDto): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT
        ESMAD_ENCUESTA_RESPUESTAS.COD_ER,
        ESMAD_ENCUESTA_RESPUESTAS.COD_EPR AS PREGUNTA_ID,
        ESMAD_ENCUESTA_RESPUESTAS.ER_DESCRIPCION AS RESPUESTA,
        ESMAD_ENCUESTA_RESPUESTAS.ER_PUNTOS AS PUNTOS,
        ESMAD_ENCUESTA_RESPUESTAS.ER_PREGUNTA_SIGUIENTE AS PREGUNTA_SIGUIENTE_ID
      FROM
        dbo.ESMAD_ENCUESTA_RESPUESTAS
      WHERE ESMAD_ENCUESTA_RESPUESTAS.COD_EPR IN (${questionIds})
      AND ESMAD_ENCUESTA_RESPUESTAS.ESTADO = 1
    `;

    if (result.rowsAffected) {
      return result.recordset;
    }

    throw new Error("Error de consulta");
  }

  public async getSurveyAnswers({
    identification,
    frecuency,
  }: SurveyAnswersDto): Promise<any> {
    const pool = await mssqlEsmad;
    let additionalValidations = "";

    if (frecuency) {
      additionalValidations += `AND ESMAD_ENCUESTA_PREGUNTAS.EPR_FRECUENCIA ${frecuency}`;
    }

    const query = `
      SELECT 
          MAX(ESMAD_OV_ENCUESTA_COVID.FECHA_CREACION) AS FECHA_CREACION
      FROM 
        dbo.ESMAD_ENCUESTA_PREGUNTAS
      INNER JOIN dbo.ESMAD_ENCUESTA_RESPUESTAS ON ESMAD_ENCUESTA_PREGUNTAS.COD_EPR = ESMAD_ENCUESTA_RESPUESTAS.COD_EPR
      INNER JOIN dbo.ESMAD_ENCUESTA_RESPUESTAS_CLIENTES ON ESMAD_ENCUESTA_RESPUESTAS.COD_ER = ESMAD_ENCUESTA_RESPUESTAS_CLIENTES.COD_ER
      INNER JOIN dbo.ESMAD_OV_ENCUESTA_COVID ON ESMAD_ENCUESTA_RESPUESTAS_CLIENTES.ENCUESTA_COVID = ESMAD_OV_ENCUESTA_COVID.ENC_CODIGO
      WHERE ESMAD_OV_ENCUESTA_COVID.ENC_CEDULA = '${identification}'
      ${additionalValidations}
      AND ESMAD_OV_ENCUESTA_COVID.ESTADO_SALUD = 1
      AND ESMAD_ENCUESTA_PREGUNTAS.COD_EN = 6
      AND ESMAD_ENCUESTA_PREGUNTAS.EPR_CLASIFICACION <> 'S'
      AND ESMAD_OV_ENCUESTA_COVID.ESTADO = 1
    `;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset;
    }

    throw new Error("Error de consulta");
  }

  public async getSurveyFrecuency(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT 
        DISTINCT ESMAD_ENCUESTA_PREGUNTAS.EPR_FRECUENCIA
      FROM
        dbo.ESMAD_ENCUESTA_PREGUNTAS
      WHERE ESMAD_ENCUESTA_PREGUNTAS.ESTADO = 1
      AND ESMAD_ENCUESTA_PREGUNTAS.EPR_FRECUENCIA <> ''
      ORDER BY ESMAD_ENCUESTA_PREGUNTAS.EPR_FRECUENCIA ASC
    `;

    if (result.rowsAffected) {
      return result.recordset;
    }

    throw new Error("Error de consulta");
  }

  public async saveCovidSurveyAnswers(
    userIdentification: number,
    userCompany: string
  ): Promise<any> {
    const pool = await mssqlEsmad;

    const result = await pool.query(`INSERT INTO dbo.ESMAD_OV_ENCUESTA_COVID ( 
      ESMAD_OV_ENCUESTA_COVID.ENC_CEDULA, 
      ESMAD_OV_ENCUESTA_COVID.USUARIO_CREACION, 
      ESMAD_OV_ENCUESTA_COVID.FECHA_CREACION, 
      ESMAD_OV_ENCUESTA_COVID.ESTADO,
      ESMAD_OV_ENCUESTA_COVID.COD_EMPRESA,
      ESMAD_OV_ENCUESTA_COVID.CASOS_COVID
    ) VALUES (
      ${userIdentification},
      ${userIdentification},
      getDate(),
      1,
      ${userCompany},
      1
    );SELECT SCOPE_IDENTITY() AS id`);

    if (result.rowsAffected) {
      return result.recordset[0];
    }

    if (result.rowsAffected) {
      return result.recordset[0];
    }

    throw new Error("Error de consulta");
  }

  public async saveEpidemiologicalFenceSurveyAnswers(
    identification: string,
    name: string,
    company: string
  ): Promise<any> {
    const pool = await mssqlEsmad;

    const result =
      await pool.query(`INSERT INTO dbo.ESMAD_OV_CERCO_EPIDEMIOLOGICO (
      ESMAD_OV_CERCO_EPIDEMIOLOGICO.CE_CEDULA_REPORTANTE, 
      ESMAD_OV_CERCO_EPIDEMIOLOGICO.CE_NOMBRE_CONTACTO,
      ESMAD_OV_CERCO_EPIDEMIOLOGICO.CE_EMPRESA, 
      ESMAD_OV_CERCO_EPIDEMIOLOGICO.USUARIO_CREACION, 
      ESMAD_OV_CERCO_EPIDEMIOLOGICO.FECHA_CREACION, 
      ESMAD_OV_CERCO_EPIDEMIOLOGICO.ESTADO
    ) VALUES (
          '${identification}',
          '${name}',
          ${company},
          '${identification}',
          getDate(),
          1
    );SELECT SCOPE_IDENTITY() AS id`);

    if (result.rowsAffected) {
      return result.recordset[0];
    }

    throw new Error("Error de consulta");
  }

  public async saveHealthConditionSurveyAnswers(
    userIdentification: number,
    userCompany: string
  ): Promise<any> {
    const pool = await mssqlEsmad;

    const result = await pool.query(`INSERT INTO dbo.ESMAD_OV_ENCUESTA_COVID ( 
      ESMAD_OV_ENCUESTA_COVID.ENC_CEDULA, 
      ESMAD_OV_ENCUESTA_COVID.USUARIO_CREACION, 
      ESMAD_OV_ENCUESTA_COVID.FECHA_CREACION, 
      ESMAD_OV_ENCUESTA_COVID.ESTADO,
      ESMAD_OV_ENCUESTA_COVID.COD_EMPRESA,
      ESMAD_OV_ENCUESTA_COVID.CASOS_COVID
    ) VALUES (
      ${userIdentification},
      ${userIdentification},
      getDate(),
      1,
      ${userCompany},
      1
    );SELECT SCOPE_IDENTITY() AS id`);

    if (result.rowsAffected) {
      return result.recordset[0];
    }

    throw new Error("Error de consulta");
  }

  public async saveSurveyAnswers(surveyType: string, answers: string[]) {
    const pool = await mssqlEsmad;
    const answersString = answers.toString();

    const query = `
      INSERT INTO dbo.ESMAD_ENCUESTA_RESPUESTAS_CLIENTES (
        ESMAD_ENCUESTA_RESPUESTAS_CLIENTES.COD_ER,
        ESMAD_ENCUESTA_RESPUESTAS_CLIENTES.USUARIO_CREACION,
        ESMAD_ENCUESTA_RESPUESTAS_CLIENTES.FECHA_CREACION,
        ESMAD_ENCUESTA_RESPUESTAS_CLIENTES.ESTADO,
        ESMAD_ENCUESTA_RESPUESTAS_CLIENTES.RESPUESTA_ABIERTA,
        ESMAD_ENCUESTA_RESPUESTAS_CLIENTES.COD_SE,
        ESMAD_ENCUESTA_RESPUESTAS_CLIENTES.${surveyType}
      ) VALUES ${answersString}
    `;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset;
    }

    throw new Error("Error de consulta");
  }
}
