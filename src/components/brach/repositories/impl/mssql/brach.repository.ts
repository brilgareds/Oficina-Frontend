import { mssqlEsmad } from "../../../../../services/mssql";
import { BranchRepository } from "../../brach.repository";

export class BranchMSSQLRepository implements BranchRepository {
  public async getAllBranches(): Promise<any> {
    const pool = await mssqlEsmad;
    const query = `SELECT 
      ESMAD_SEDES.SED_CODIGO, 
      ESMAD_SEDES.SED_CIUDAD
    FROM dbo.ESMAD_SEDES
    WHERE ESMAD_SEDES.ESTADO = 1
    ORDER BY ESMAD_SEDES.SED_CIUDAD`;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset;
    }

    return null;
  }
}
