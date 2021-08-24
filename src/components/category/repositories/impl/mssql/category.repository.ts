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
}
