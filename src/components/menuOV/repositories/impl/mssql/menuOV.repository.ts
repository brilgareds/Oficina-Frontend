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
public async formulariosCompletados(empresa: number, cedula: number): Promise<any> {
  const pool = await mssqlEsmad;
  const sql = `
              SELECT TOP 1
                ESMAD_INFORMACION_BASICA.INFORMACION_BASICA_CODIGO,
                ESMAD_EDUCACION.EDUCACION_CODIGO,
                ESMAD_FAMILIARES.FAMILIARES_CODIGO,
                ESMAD_DATOS_ADICIONALES.DATOS_ADICIONALES_CODIGO,
                ESMAD_SALUD.SALUD_CODIGO,
                ESMAD_VIVIENDA.VIVIENDA_CODIGO,
                ESMAD_TALLAS_EMPLEADO.TALLAS_EMPLEADO_CODIGO,
                ESMAD_REPORTE_EMBARAZO.REPORTE_EMBARAZO_CODIGO
              FROM
                SERVCLO09.kactus.dbo.nm_contr
                LEFT JOIN dbo.ESMAD_INFORMACION_BASICA
                  ON nm_contr.cod_empl = ESMAD_INFORMACION_BASICA.NRO_DOCUMENTO
                     AND nm_contr.cod_empr = ESMAD_INFORMACION_BASICA.CODIGO_EMPRESA
                LEFT JOIN dbo.ESMAD_EDUCACION
                  ON nm_contr.cod_empl = ESMAD_EDUCACION.INFORMACION_BASICA_CODIGO
                     AND ESMAD_EDUCACION.ESTADO = 1
                LEFT JOIN dbo.ESMAD_FAMILIARES
                  ON nm_contr.cod_empl = ESMAD_FAMILIARES.COD_EMPL
                     AND nm_contr.cod_empr = ESMAD_FAMILIARES.COD_EMPR
                     AND ESMAD_FAMILIARES.ESTADO = 1
                LEFT JOIN dbo.ESMAD_DATOS_ADICIONALES
                  ON nm_contr.cod_empl = ESMAD_DATOS_ADICIONALES.NRO_DOCUMENTO
                     AND nm_contr.cod_empr = ESMAD_DATOS_ADICIONALES.CODIGO_EMPRESA
                LEFT JOIN dbo.ESMAD_SALUD
                  ON nm_contr.cod_empl = ESMAD_SALUD.NRO_DOCUMENTO
                     AND nm_contr.cod_empr = ESMAD_SALUD.CODIGO_EMPRESA
                LEFT JOIN dbo.ESMAD_VIVIENDA
                  ON nm_contr.cod_empl = ESMAD_VIVIENDA.NRO_DOCUMENTO
                     AND nm_contr.cod_empr = ESMAD_VIVIENDA.CODIGO_EMPRESA
                LEFT JOIN dbo.ESMAD_TALLAS_EMPLEADO
                  ON nm_contr.cod_empl = ESMAD_TALLAS_EMPLEADO.NRO_DOCUMENTO
                     AND nm_contr.cod_empr = ESMAD_TALLAS_EMPLEADO.CODIGO_EMPRESA
                LEFT JOIN dbo.ESMAD_REPORTE_EMBARAZO
                  ON nm_contr.cod_empl = ESMAD_REPORTE_EMBARAZO.NRO_DOCUMENTO
                     AND nm_contr.cod_empr = ESMAD_REPORTE_EMBARAZO.CODIGO_EMPRESA
              WHERE
                nm_contr.cod_empl = ${cedula}
                AND nm_contr.cod_empr = ${empresa}
                AND nm_contr.ind_acti = 'A'
  `;
  const result = await pool.query(sql);
  return result.recordset;
  }
}
