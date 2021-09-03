import { mssqlEsmad } from "../../../../../services/mssql";
import { CategoryParamsDto } from "../../../dto/category.params";
import { CategoryRepository } from "../../category.repository";

export class CategoryMSSQLRepository implements CategoryRepository {
  public async findCategoryByAttributes({
    code,
    type,
  }: CategoryParamsDto): Promise<any> {
    const pool = await mssqlEsmad;
    let query = `SELECT TIP_CODIGO as codigo, TIP_NOMBRE as nombre FROM ESMAD_TIPO WHERE 1=1`;

    if (code) {
      query += ` AND CLT_CODIGO = ${code}`;
    }

    if (type) {
      query += ` AND TIP_CODIGO2 = ${type}`;
    }

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset;
    }

    throw new Error("Error de consulta");
  }


  public async findHelpCategory(): Promise<any> {
    const pool = await mssqlEsmad;
    let query = `
            SELECT 
                ESMAD_TIPO.TIP_CODIGO, ESMAD_TIPO.TIP_NOMBRE
            FROM 
              dbo.ESMAD_TIPO
            INNER JOIN 
                dbo.ESMAD_CLASE_TIPO ON (ESMAD_TIPO.CLT_CODIGO = ESMAD_CLASE_TIPO.CLT_CODIGO)
            AND ESMAD_CLASE_TIPO.CLT_CODIGO = 3  
            AND ESMAD_TIPO.TIP_CODIGO2 = 359 
            AND ESMAD_TIPO.EMP_CODIGO = 1 
            AND ESMAD_CLASE_TIPO.ESTADO = 1 
            AND ESMAD_TIPO.ESTADO = 1
            ORDER BY ESMAD_TIPO.TIP_NOMBRE
    `;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset;
    }

    throw new Error("Error de consulta");
  }
}
