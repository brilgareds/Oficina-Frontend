import { mssqlVum } from "../../../../../services/mssql";
import { SalePointRepository } from "../../salePoint.repository";

export class SalePointMSSQLRepository implements SalePointRepository {
  public async getAllSalePoints(cityId: number): Promise<any> {
    const pool = await mssqlVum;
    const query = `SELECT DISTINCT
      dbo.SIM_PUNTO_VENTA.PDV_CODIGO,
      RTRIM(LTRIM(dbo.SIM_PUNTO_VENTA_CLIENTE.PVC_NOMBRE_PDV)) as PVC_NOMBRE_PDV,
      SIM_CIUDAD.CIU_CODIGO
    FROM dbo.SIM_PUNTO_VENTA
    INNER JOIN dbo.SIM_CIUDAD ON (SIM_PUNTO_VENTA.CIU_CODIGO = SIM_CIUDAD.CIU_CODIGO)
    INNER JOIN dbo.SIM_PUNTO_VENTA_CLIENTE ON (dbo.SIM_PUNTO_VENTA.PDV_CODIGO=dbo.SIM_PUNTO_VENTA_CLIENTE.PDV_CODIGO)
    WHERE SIM_CIUDAD.CIU_CODIGO IN (${cityId})
    AND SIM_PUNTO_VENTA.TIP_CODIGO <> 4376
    AND dbo.SIM_PUNTO_VENTA.ESTADO=1
    AND SIM_PUNTO_VENTA_CLIENTE.FECHA_INACTIVACION >= GETDATE ( )
    AND SIM_PUNTO_VENTA_CLIENTE.ESTADO = 1
    AND PVC_NOMBRE_PDV != ''
    ORDER BY PVC_NOMBRE_PDV`;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset;
    }

    return null;
  }

  public async getAllSalePointsByUser(
    cityId: number,
    identification: number
  ): Promise<any> {
    const pool = await mssqlVum;
    const query = `SELECT
      DISTINCT dbo.SIM_PUNTO_VENTA.PDV_CODIGO,
      dbo.SIM_PUNTO_VENTA_CLIENTE.PVC_NOMBRE_PDV,
      SIM_CIUDAD.CIU_CODIGO
    FROM dbo.SIM_USUARIO_PUNTO_VENTA
    INNER JOIN dbo.SIM_PUNTO_VENTA_CLIENTE ON (dbo.SIM_USUARIO_PUNTO_VENTA.PDV_CODIGO = dbo.SIM_PUNTO_VENTA_CLIENTE.PDV_CODIGO)
    INNER JOIN dbo.SIM_USUARIO_ACTIVIIDAD ON (dbo.SIM_USUARIO_PUNTO_VENTA.USA_CODIGO = dbo.SIM_USUARIO_ACTIVIIDAD.USA_CODIGO) AND (dbo.SIM_PUNTO_VENTA_CLIENTE.ACT_CODIGO = dbo.SIM_USUARIO_ACTIVIIDAD.ACT_CODIGO)
    INNER JOIN dbo.SIM_USUARIO_CLIENTE ON (dbo.SIM_USUARIO_ACTIVIIDAD.USC_CODIGO = dbo.SIM_USUARIO_CLIENTE.USC_CODIGO)
    INNER JOIN dbo.SIM_USUARIO ON (dbo.SIM_USUARIO_CLIENTE.USU_CODIGO = dbo.SIM_USUARIO.USU_CODIGO)
    INNER JOIN dbo.SIM_PUNTO_VENTA ON (dbo.SIM_USUARIO_PUNTO_VENTA.PDV_CODIGO = dbo.SIM_PUNTO_VENTA.PDV_CODIGO)
    INNER JOIN dbo.SIM_ACTIVIDAD ON (dbo.SIM_USUARIO_ACTIVIIDAD.ACT_CODIGO = dbo.SIM_ACTIVIDAD.ACT_CODIGO)
    INNER JOIN dbo.SIM_CIUDAD ON (SIM_PUNTO_VENTA.CIU_CODIGO = SIM_CIUDAD.CIU_CODIGO)
    WHERE SIM_USUARIO_PUNTO_VENTA.ESTADO = 1
    AND dbo.SIM_PUNTO_VENTA_CLIENTE.ESTADO = 1
    AND dbo.SIM_USUARIO_ACTIVIIDAD.ESTADO = 1
    AND dbo.SIM_USUARIO_CLIENTE.ESTADO = 1
    AND dbo.SIM_USUARIO.ESTADO = 1
    AND dbo.SIM_PUNTO_VENTA.ESTADO = 1
    AND dbo.SIM_USUARIO.USU_NUMERO_DOCUMENTO = ${identification}
    AND SIM_CIUDAD.CIU_CODIGO IN (${cityId})
    and SIM_PUNTO_VENTA.TIP_CODIGO <> 4376
    AND dbo.SIM_PUNTO_VENTA_CLIENTE.FECHA_INACTIVACION >= GETDATE()
    AND dbo.SIM_USUARIO_PUNTO_VENTA.UPV_FECHA_INACTIVACION1 >= GETDATE()
    AND dbo.SIM_ACTIVIDAD.ESTADO = 1
    ORDER BY PVC_NOMBRE_PDV`;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset;
    }

    return null;
  }
}
