import { mssqlBiplus, mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
import { getDateToday } from "../../../../common/helpers/global";
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

      return false;
    } catch (error) {

      console.log(error);

      return false;
    }

  }

}
