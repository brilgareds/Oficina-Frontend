import { mssqlEsmad } from "../../../../../services/mssql";
import { MenuOVRepository } from "../../menuOV.repository";

export class MenuOVMSSQLRepository implements MenuOVRepository {
  public async buscarMenu(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`SELECT
                        MENU_CODIGO,
                        MENU_NOMBRE,
                        MENU_POSICION,
                        ESTADO
                      FROM
                        ESMAD_MENU_OV 
                      WHERE
                        ESTADO = 1
                      ORDER BY 
                        MENU_POSICION ASC`;
    
    return result.recordset;
  }
}
