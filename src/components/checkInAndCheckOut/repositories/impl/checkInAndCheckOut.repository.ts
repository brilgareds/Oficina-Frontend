
import { mssqlEsmad, mssqlKactus } from "../../../../services/mssql";
import { CheckInAndCheckOutRepository } from "../checkInAndCheckOut.repository";

export class CheckInAndCheckOutMSSQLRepository implements CheckInAndCheckOutRepository {

  public async getSurvey({date, documentId}: any): Promise<any> {

    const pool = await mssqlEsmad;
    const query = `
      SELECT
          TOP 1
          *

      FROM dbo.ESMAD_OV_ENCUESTA_COVID

      WHERE
          ENC_CEDULA = '${documentId}' AND
          FECHA_CREACION BETWEEN '${date} 00:00:00' and '${date} 23:59:59'

      ORDER BY
          FECHA_CREACION DESC
    `;

    try {
      const result = await pool.query(query);

      if (result.rowsAffected) {
        return result?.recordset?.[0] || {};
      }

      throw new Error('Error en la consulta');
    }
    catch(e:any) {
      throw new Error(e.message);
    }
  }

  public async userHasCheckIn({date, documentId}: any): Promise<any> {

    const pool = await mssqlEsmad;
    const query = `
        SELECT
            TOP 1
            *
        FROM 
            dbo.ESMAD_CONTROL_INGRESO
        WHERE
            ESMAD_CONTROL_INGRESO.ESTADO = 1
            AND ESMAD_CONTROL_INGRESO.CIN_CEDULA = '${documentId}'
            AND ESMAD_CONTROL_INGRESO.FECHA_CREACION BETWEEN '${date} 00:00:00' AND '${date} 23:59:59'
        
        ORDER BY
            FECHA_CREACION DESC
    `;

    try {
      const result = await pool.query(query);

      console.log('\nCheckIn Sql: ', query);

      if (result.rowsAffected) {
        return result?.recordset?.[0] || {};
      }

      throw new Error('Error en la consulta');
    }
    catch(e:any) {
      throw new Error(e.message);
    }
    
  }

  public async userHasCheckOut({date, documentId}: any): Promise<any> {

    const pool = await mssqlEsmad;
    const query = `
        SELECT
            TOP 1
            *
        FROM 
            dbo.ESMAD_CONTROL_INGRESO
        WHERE
            ESMAD_CONTROL_INGRESO.ESTADO = 1 AND
            ESMAD_CONTROL_INGRESO.CIN_CEDULA = '${documentId}'
            AND ESMAD_CONTROL_INGRESO.FECHA_CREACION BETWEEN '${date} 00:00:00' AND '${date} 23:59:59'
            AND ESMAD_CONTROL_INGRESO.CIN_FECHA_SALIDA IS NOT NULL

        ORDER BY
            FECHA_CREACION DESC            
    `;

    try {
      const result = await pool.query(query);

      console.log('\n\nCheckOut Sql: ', query);

      if (result.rowsAffected) {
        return result?.recordset?.[0] || {};
      }

      throw new Error('Error en la consulta');
    }
    catch(e:any) {
      throw new Error(e.message);
    }
    
  }

}