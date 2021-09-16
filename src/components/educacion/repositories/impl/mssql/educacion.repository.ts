import { mssqlEsmad } from "../../../../../services/mssql";
import { EducacionRepository } from "../../educacion.repository";

export class EducacionMssqlRepository implements EducacionRepository {

  public async consultarNivelEstudio(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`SELECT TIP_CODIGO, TIP_NOMBRE, TIP_ATRIBUTO1
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

  public async consultarDatosEstudio(cedula: number): Promise<any>{
    const pool = await mssqlEsmad;
    const result = await pool.query`SELECT EDUCACION_CODIGO, INFORMACION_BASICA_CODIGO, NIVEL_ESTUDIO, 
                                    NIVEL.TIP_NOMBRE AS NIVEL_NOMBRE, TITULO, INSTITUCION, 
                                    CIUDAD, ESTADO_ESTUDIO, ESTADO.TIP_NOMBRE AS ESTADO_NOMBRE, 
                                    FECHA_INICIO, FECHA_FINALIZACION, FECHA_GRADO_TENTATIVO, 
                                    MODALIDAD_ESTUDIO, MODALIDAD.TIP_NOMBRE AS MODALIDAD_NOMBRE, 
                                    PROMEDIO, PAI_CODIGO, DTO_CODIGO, URL
                                    FROM ESMAD_EDUCACION LEFT JOIN dbo.ESMAD_TIPO AS MODALIDAD
                                    ON(ESMAD_EDUCACION.MODALIDAD_ESTUDIO = MODALIDAD.TIP_CODIGO) LEFT JOIN dbo.ESMAD_TIPO AS NIVEL
                                    ON(ESMAD_EDUCACION.NIVEL_ESTUDIO = NIVEL.TIP_CODIGO) LEFT JOIN dbo.ESMAD_TIPO AS ESTADO
                                    ON(ESMAD_EDUCACION.ESTADO_ESTUDIO = ESTADO.TIP_CODIGO)
                                    WHERE INFORMACION_BASICA_CODIGO = ${cedula} AND ESMAD_EDUCACION.ESTADO = 1`;  
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
                             PROMEDIO: string,
                             PAI_CODIGO: number,
                             DTO_CODIGO: number,
                             URL: string): Promise<any>{
                              const pool = await mssqlEsmad;
                              const sql = `INSERT INTO ESMAD_EDUCACION 
                                                              (MENU_CODIGO, INFORMACION_BASICA_CODIGO, 
                                                              NIVEL_ESTUDIO, TITULO, INSTITUCION, CIUDAD, ESTADO_ESTUDIO, 
                                                              FECHA_INICIO, FECHA_FINALIZACION, FECHA_GRADO_TENTATIVO, 
                                                              MODALIDAD_ESTUDIO, PROMEDIO, ESTADO, PAI_CODIGO, DTO_CODIGO, URL) 
                                                              VALUES (${MENU_CODIGO}, ${INFORMACION_BASICA_CODIGO}, ${NIVEL_ESTUDIO}, '${TITULO}', 
                                                                      '${INSTITUCION}', ${CIUDAD}, ${ESTADO_ESTUDIO}, ${FECHA_INICIO}, ${FECHA_FINALIZACION}, 
                                                                      ${FECHA_GRADO_TENTATIVO}, ${MODALIDAD_ESTUDIO}, '${PROMEDIO}', 1, ${PAI_CODIGO},
                                                                      ${DTO_CODIGO}, ${URL})`;
                                               
                              const result = await pool.query(sql);                            
                              return result.recordset;

    }

    public async actualizarRegistro(
      EDUCACION_CODIGO: number,
      NIVEL_ESTUDIO: number,
      TITULO: string,
      INSTITUCION: string,
      CIUDAD: number,
      ESTADO_ESTUDIO: number,
      FECHA_INICIO: string,
      FECHA_FINALIZACION: string,
      FECHA_GRADO_TENTATIVO: string,
      MODALIDAD_ESTUDIO: number,
      PROMEDIO: string,
      PAI_CODIGO: number,
      DTO_CODIGO: number,
      URL: string): Promise<any>{
      const pool = await mssqlEsmad;
      const sql = `
        UPDATE dbo.ESMAD_EDUCACION 
          SET
            NIVEL_ESTUDIO = ${NIVEL_ESTUDIO},
            TITULO = '${TITULO}',
            INSTITUCION = '${INSTITUCION}',
            CIUDAD = ${CIUDAD},
            ESTADO_ESTUDIO = ${ESTADO_ESTUDIO},
            FECHA_INICIO = ${FECHA_INICIO},
            FECHA_FINALIZACION = ${FECHA_FINALIZACION},
            FECHA_GRADO_TENTATIVO = ${FECHA_GRADO_TENTATIVO},
            MODALIDAD_ESTUDIO = ${MODALIDAD_ESTUDIO},
            PROMEDIO = '${PROMEDIO}',
            PAI_CODIGO = ${PAI_CODIGO},
            DTO_CODIGO = ${DTO_CODIGO}
            ${URL}
        WHERE 
          EDUCACION_CODIGO = ${EDUCACION_CODIGO}
       `;
       
       const result = await pool.query(sql);
       return result.recordset;

  }

  public async eliminarRegistro(
      EDUCACION_CODIGO: number
    ): Promise<any>{
    const pool = await mssqlEsmad;
    const result = await pool.query`
      UPDATE dbo.ESMAD_EDUCACION 
        SET
          ESTADO = 0
      WHERE 
        EDUCACION_CODIGO = ${EDUCACION_CODIGO}
     `;
     return result.recordset;
  }
    
}