import { mssqlBiplus, mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
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

  public async saveDisabilityFiling(allData: any): Promise<any> {

    console.log("saveDisabilityFiling");

   
    return true;

  }

}
