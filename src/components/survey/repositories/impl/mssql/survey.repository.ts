import { mssqlEsmad } from "../../../../../services/mssql";
import { SurveyRepository } from "../../survey.repository";

export class SurveyMSSQLRepository implements SurveyRepository {
  public async getSurveyHeads(surveyId: number): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT 
        ESMAD_ENCUESTA_CABEZERAS.COD_EC, 
        ESMAD_ENCUESTA_CABEZERAS.EC_NOMBRE, 
        ESMAD_ENCUESTA_CABEZERAS.COD_EN
      FROM 
        dbo.ESMAD_ENCUESTA_CABEZERAS
      INNER JOIN dbo.ESMAD_ENCUESTA ON (ESMAD_ENCUESTA.COD_EN = ESMAD_ENCUESTA_CABEZERAS.COD_EN)
      WHERE ESMAD_ENCUESTA.COD_EN = ${surveyId} 
      AND ESMAD_ENCUESTA.EMP_CODIGO = 3 
      AND ESMAD_ENCUESTA.ESTADO = 1 
      AND ESMAD_ENCUESTA_CABEZERAS.ESTADO = 1
    `;

    if (result.rowsAffected) {
      return result.recordset;
    }

    throw new Error("Error de consulta");
  }

  public async getSurveyQuestions(surveyId: number): Promise<any> {
    const pool = await mssqlEsmad;
    // (ESMAD_ENCUESTA_PREGUNTAS.EPR_CLASIFICACION = 'A' OR ESMAD_ENCUESTA_PREGUNTAS.EPR_CLASIFICACION = 'S')
    // AND
    const result = await pool.query`
      SELECT
        ESMAD_ENCUESTA_PREGUNTAS.COD_EPR AS ID,
        ESMAD_ENCUESTA_PREGUNTAS.EPR_DESCRIPCION AS PREGUNTA,
        ESMAD_ENCUESTA_PREGUNTAS.EPR_CLASIFICACION AS CALSIFICACION,
        ESMAD_ENCUESTA_PREGUNTAS.EPR_TIPO_CLASIFICACION AS CABECERA_ID,
        ESMAD_ENCUESTA_PREGUNTAS.EPR_TIPO_SELECCION AS SELECCION
      FROM 
        dbo.ESMAD_ENCUESTA_PREGUNTAS
      INNER JOIN dbo.ESMAD_ENCUESTA ON ESMAD_ENCUESTA.COD_EN = ESMAD_ENCUESTA_PREGUNTAS.COD_EN
      WHERE ESMAD_ENCUESTA.COD_EN = ${surveyId}
      AND ESMAD_ENCUESTA.EMP_CODIGO = 3
      AND ESMAD_ENCUESTA_PREGUNTAS.ESTADO = 1
      AND ESMAD_ENCUESTA.ESTADO = 1
      ORDER BY ESMAD_ENCUESTA_PREGUNTAS.COD_EPR
    `;

    if (result.rowsAffected) {
      return result.recordset;
    }

    throw new Error("Error de consulta");
  }

  public async getSurveyResponses(
    surveyId: number,
    questionIds: number[]
  ): Promise<any> {
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
}
