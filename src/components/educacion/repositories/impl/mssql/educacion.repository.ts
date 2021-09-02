import { mssqlEsmad } from "../../../../../services/mssql";
import { EducacionRepository } from "../../educacion.repository";

export class EducacionMssqlRepository implements EducacionRepository {

  public async consultarNivelEstudio(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`SELECT TIP_CODIGO, TIP_NOMBRE
                                    FROM ESMAD_TIPO
                                    WHERE ESMAD_TIPO.CLT_CODIGO = 52 AND ESMAD_TIPO.ESTADO = 1`;   
    return result.recordset;
  }

  public async consultarEstadoEstudio(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`SELECT TIP_CODIGO, TIP_NOMBRE
                                    FROM ESMAD_TIPO
                                    WHERE ESMAD_TIPO.CLT_CODIGO = 53 AND ESMAD_TIPO.ESTADO = 1`;  
    return result.recordset;
  }

  public async consultarModalidadEstudio(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`SELECT TIP_CODIGO, TIP_NOMBRE
                                    FROM ESMAD_TIPO
                                    WHERE ESMAD_TIPO.CLT_CODIGO = 54 AND ESMAD_TIPO.ESTADO = 1`;  
    return result.recordset;
  }

  public async crearRegistro(MENU_CODIGO: number, 
                             INFORMACION_BASICA_CODIGO: number,
                             NIVEL_ESTUDIO: number,
                             TITULO: string,
                             INSTITUCION: string,
                             CIUDAD: number,
                             ESTADO_ESTUDIO: number,
                             FECHA_INICIO: string,
                             FECHA_FINALIZACION: string,
                             FECHA_GRADO_TENTATIVO: string,
                             MODALIDAD_ESTUDIO: number,
                             PROMEDIO: string): Promise<any>{
                              const pool = await mssqlEsmad;
                              const result = await pool.query`INSERT INTO ESMAD_EDUCACION 
                                                              (MENU_CODIGO, INFORMACION_BASICA_CODIGO, 
                                                              NIVEL_ESTUDIO, TITULO, INSTITUCION, CIUDAD, ESTADO_ESTUDIO, 
                                                              FECHA_INICIO, FECHA_FINALIZACION, FECHA_GRADO_TENTATIVO, 
                                                              MODALIDAD_ESTUDIO, PROMEDIO) 
                                                              VALUES (${MENU_CODIGO}, ${INFORMACION_BASICA_CODIGO}, ${NIVEL_ESTUDIO}, ${TITULO}, 
                                                                      ${INSTITUCION}, ${CIUDAD}, ${ESTADO_ESTUDIO}, ${FECHA_INICIO}, ${FECHA_FINALIZACION}, 
                                                                      ${FECHA_GRADO_TENTATIVO}, ${MODALIDAD_ESTUDIO}, ${PROMEDIO})`;
                              return result.recordset;

    }
}