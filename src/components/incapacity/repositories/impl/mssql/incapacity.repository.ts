import { mssqlBiplus, mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
import { getDatetime, getDateToday } from "../../../../common/helpers/global";
import { IncapacityhRepository } from "../../incapacity.repository";



export class IncapacityMSSQLRepository implements IncapacityhRepository {

  public async getTypesIncapacity(empresa: number): Promise<any> {

    const pool = await mssqlEsmad;
    const result = await pool.query`
                        SELECT 
                          TIP_CODIGO, EMP_CODIGO, CLT_CODIGO, TIP_NOMBRE, TIP_ATRIBUTO1, TIP_ATRIBUTO2
                        FROM 
                          dbo.ESMAD_TIPO
                        WHERE 
                          CLT_CODIGO = 19 
                          AND EMP_CODIGO = ${empresa}
                        ORDER BY TIP_NOMBRE ASC
    `;

    return result.recordset;

  }

  public async getDocumentsIncapacity(empresa: number, tipoIncapacidad: number): Promise<any> {

    const pool = await mssqlEsmad;
    const result = await pool.query`
                        SELECT 
                          TIP_CODIGO, EMP_CODIGO, CLT_CODIGO, TIP_NOMBRE, TIP_ATRIBUTO1, TIP_ATRIBUTO2, TIP_CODIGO2
                        FROM 
                          dbo.ESMAD_TIPO
                        WHERE 
                          CLT_CODIGO = 20 
                          AND EMP_CODIGO = ${empresa} 
                          AND ESMAD_TIPO.TIP_CODIGO2 = ${tipoIncapacidad}
                        ORDER BY TIP_NOMBRE ASC
    `;

    return result.recordset;

  }

  public async searchLastIdIncapacity(): Promise<any> {

    const pool = await mssqlEsmad;
    const result = await pool.query`
                          SELECT 
                              DISTINCT IDENT_CURRENT('dbo.ESMAD_INCAPACIDADES') INCAP_CODIGO
                          FROM 
                              dbo.ESMAD_INCAPACIDADES
    `;

    return result.recordset[0];

  }

  public async saveDisabilityFiling(cedula: any, nombre: any, telefono: any, mail: any, eps: any, otraEnti: any, otraEntidad: any, tipInca: any, fechaInicio: any, fechaFin: any, empresa: any, prorroga: any): Promise<any> {

    try {

      const now = getDateToday(false);
      const pool = await mssqlEsmad;
      const query = `
                          INSERT INTO 
                            dbo.ESMAD_INCAPACIDADES
                            ( 
                                INCAP_CEDULA, 
                                INCAP_NOMBRE, 
                                INCAP_TELEFONO, 
                                INCAP_EMAIL, 
                                INCAP_EPS,
                                INCAP_OTRA_ENTID, 
                                INCAP_OTRA_ENTID_NOMBRE, 
                                INCAP_TIPO, 
                                INCAP_FECHA_INI, 
                                INCAP_FECHA_FIN, 
                                USUARIO_CREACION, 
                                FECHA_CREACION,
                                USUARIO_MODIFICACION, 
                                FECHA_MODIFICACION, 
                                ESTADO, 
                                INCAP_EMPRESA, 
                                INCAP_PRORROGA 
                            )
                            VALUES 
                            ( 
                                ${cedula}, 
                                '${nombre}', 
                                '${telefono}', 
                                '${mail}', 
                                '${eps}', 
                                ${otraEnti}, 
                                ${otraEntidad}, 
                                ${tipInca}, 
                                '${fechaInicio}', 
                                '${fechaFin}', 
                                '${cedula}', 
                                '${now}', 
                                '${cedula}', 
                                '${now}', 
                                1, 
                                ${empresa}, 
                                ${prorroga} 
                            )
        `;

      const result = await pool.query(query);

      if (result.rowsAffected) {
        return this.searchLastIdIncapacity();
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }

  }


  public async getUserIncapacities(cedula: number): Promise<any> {

    const pool = await mssqlEsmad;
    const result = await pool.query`
                          SELECT 
                              INCAP_CODIGO, 
                              INCAP_CEDULA, 
                              INCAP_NOMBRE, 
                              INCAP_TIPO, 
                              TIP_NOMBRE, 
                              ESMAD_INCAPACIDADES.FECHA_CREACION, 
                              ESMAD_INCAPACIDADES.ESTADO
                          FROM 
                              dbo.ESMAD_INCAPACIDADES 
                          INNER JOIN 
                              dbo.ESMAD_TIPO
                          ON 
                              ( 
                                  ESMAD_INCAPACIDADES.INCAP_TIPO = ESMAD_TIPO.TIP_CODIGO)
                          WHERE 
                              INCAP_CEDULA = ${cedula}
    `;

    return result.recordset;

  }


  public async saveIncapacityFile(lastIdInsert: number, ruta: string, cedula: string, codigoTipoArchivo: number): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                            INSERT INTO 
                              dbo.ESMAD_INCAPACIDADES_ARCHIVOS
                              ( 
                                  INCAP_CODIGO, 
                                  ARCH_RUTA, 
                                  USUARIO_CREACION, 
                                  FECHA_CREACION, 
                                  USUARIO_MODIFICACION, 
                                  FECHA_MODIFICACION, 
                                  ESTADO, 
                                  ARCH_ESTADO, 
                                  ARCH_CODIGO_DOCUMENTO 
                              )
                              VALUES 
                              ( 
                                  ${lastIdInsert}, 
                                  '${ruta}', 
                                  '${cedula}', 
                                  getDate(), 
                                  '${cedula}', 
                                  getDate(), 
                                  1, 
                                  1, 
                                  ${codigoTipoArchivo}
                              )
    `;

      const result = await pool.query(query);

      if (result.rowsAffected) {
        return result.recordset;
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }


  }



  public async getUserIncapacitiesFiles(numeroIncapacidad: number): Promise<any> {

    const pool = await mssqlEsmad;
    const result = await pool.query`
                            SELECT 
                                DISTINCT ARCH_CODIGO, 
                                ESMAD_INCAPACIDADES_ARCHIVOS.INCAP_CODIGO, 
                                ARCH_ESTADO, 
                                ARCH_MOTIVO_RECHAZO, 
                                TIPO_RECHAZO.TIP_NOMBRE AS RECHAZO, 
                                INCAP_TIPO, 
                                dbo.ESMAD_TIPO.TIP_NOMBRE, 
                                ARCH_RUTA
                            FROM 
                                dbo.ESMAD_INCAPACIDADES_ARCHIVOS 
                            INNER JOIN 
                                dbo.ESMAD_INCAPACIDADES
                            ON 
                                ( 
                                    ESMAD_INCAPACIDADES_ARCHIVOS.INCAP_CODIGO = ESMAD_INCAPACIDADES.INCAP_CODIGO) 
                            INNER JOIN 
                                dbo.ESMAD_TIPO
                            ON 
                                ( 
                                    ESMAD_INCAPACIDADES_ARCHIVOS.ARCH_CODIGO_DOCUMENTO = ESMAD_TIPO.TIP_CODIGO) 
                            LEFT JOIN 
                                dbo.ESMAD_TIPO AS TIPO_RECHAZO
                            ON 
                                ARCH_MOTIVO_RECHAZO = TIPO_RECHAZO.TIP_CODIGO
                            WHERE 
                                ESMAD_INCAPACIDADES_ARCHIVOS.INCAP_CODIGO = ${numeroIncapacidad}
    `;

    return result.recordset;

  }


  public async getUserDataIncapacity(numeroIncapacidad: number): Promise<any> {

    const pool = await mssqlEsmad;
    const result = await pool.query`
                            SELECT 
                                DISTINCT INCAP_CODIGO, 
                                INCAP_CEDULA, 
                                INCAP_NOMBRE, 
                                INCAP_TELEFONO, 
                                INCAP_EMAIL, 
                                INCAP_EPS, 
                                INCAP_OTRA_ENTID,
                                INCAP_OTRA_ENTID_NOMBRE, 
                                INCAP_TIPO, 
                                TIP_NOMBRE, 
                                INCAP_FECHA_INI, 
                                INCAP_FECHA_FIN, 
                                INCAP_EMPRESA
                            FROM 
                                dbo.ESMAD_INCAPACIDADES 
                            INNER JOIN 
                                dbo.ESMAD_TIPO
                            ON 
                                ( 
                                    ESMAD_INCAPACIDADES.INCAP_TIPO = ESMAD_TIPO.TIP_CODIGO)
                            WHERE 
                                ESMAD_INCAPACIDADES.INCAP_CODIGO = ${numeroIncapacidad}
    `;

    const documentsIncapacity = await this.getUserIncapacitiesFiles(numeroIncapacidad);

    return ({
      dataIncapacity: result.recordset,
      documentsIncapacity: documentsIncapacity
    });

  }


}
