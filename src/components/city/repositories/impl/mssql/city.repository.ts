import { mssqlVum } from "../../../../../services/mssql";
import { CityRepository } from "../../city.repository";

export class CityMSSQLRepository implements CityRepository {
  public async getAllCities(): Promise<any> {
    const pool = await mssqlVum;
    const query = `SELECT
      dbo.SIM_CIUDAD.CIU_CODIGO,
      dbo.SIM_CIUDAD.CIU_NOMBRE
    FROM dbo.SIM_CIUDAD
    INNER JOIN dbo.SIM_DEPARTAMENTO ON SIM_DEPARTAMENTO.DEP_CODIGO = SIM_CIUDAD.DEP_CODIGO
    INNER JOIN dbo.SIM_PAIS ON SIM_PAIS.PAI_CODIGO = SIM_DEPARTAMENTO.PAI_CODIGO AND SIM_PAIS.PAI_CODIGO = 1
    WHERE dbo.SIM_CIUDAD.ESTADO = 1
    AND dbo.SIM_PAIS.PAI_CODIGO = 1
    ORDER BY dbo.SIM_CIUDAD.CIU_NOMBRE ASC`;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset;
    }

    return null;
  }

  public async getAllCitiesByUser(identification: number): Promise<any> {
    const pool = await mssqlVum;
    const query = `SELECT DISTINCT
      SIM_CIUDAD.CIU_CODIGO,
      SIM_CIUDAD.CIU_NOMBRE
    FROM dbo.SIM_USUARIO
    INNER JOIN dbo.SIM_USUARIO_CLIENTE ON (dbo.SIM_USUARIO.USU_CODIGO=dbo.SIM_USUARIO_CLIENTE.USU_CODIGO)
    INNER JOIN dbo.SIM_USUARIO_ACTIVIIDAD ON (dbo.SIM_USUARIO_CLIENTE.USC_CODIGO=dbo.SIM_USUARIO_ACTIVIIDAD.USC_CODIGO)
    INNER JOIN dbo.SIM_USUARIO_PUNTO_VENTA ON (dbo.SIM_USUARIO_ACTIVIIDAD.USA_CODIGO=dbo.SIM_USUARIO_PUNTO_VENTA.USA_CODIGO)
    INNER JOIN dbo.SIM_PUNTO_VENTA_CLIENTE ON (dbo.SIM_USUARIO_PUNTO_VENTA.PDV_CODIGO=dbo.SIM_PUNTO_VENTA_CLIENTE.PDV_CODIGO)
    INNER JOIN dbo.SIM_PUNTO_VENTA ON (SIM_PUNTO_VENTA_CLIENTE.PDV_CODIGO = SIM_PUNTO_VENTA.PDV_CODIGO) 
    INNER JOIN dbo.SIM_CIUDAD ON (SIM_PUNTO_VENTA.CIU_CODIGO = SIM_CIUDAD.CIU_CODIGO)
    INNER JOIN dbo.SIM_DEPARTAMENTO ON SIM_DEPARTAMENTO.DEP_CODIGO = SIM_CIUDAD.DEP_CODIGO
    INNER JOIN dbo.SIM_PAIS ON SIM_PAIS.PAI_CODIGO = SIM_DEPARTAMENTO.PAI_CODIGO AND SIM_PAIS.PAI_CODIGO = 1      
    WHERE USU_NUMERO_DOCUMENTO IN(${identification})
    AND dbo.SIM_USUARIO_PUNTO_VENTA.ESTADO = 1
    AND SIM_USUARIO_PUNTO_VENTA.UPV_FECHA_INACTIVACION1 >= GETDATE ( )
    ORDER BY SIM_CIUDAD.CIU_NOMBRE`;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset;
    }

    return null;
  }
}
