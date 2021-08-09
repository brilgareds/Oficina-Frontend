import { mssqlAuth, mssqlEsmad } from "../../../../../services/mssql";
import { AuthRepository } from "../../auth.repository";

export class AuthMSSQLRepository implements AuthRepository {
  public async findAuth(username: string): Promise<any> {
    const pool = await mssqlAuth;
    const result = await pool.query`
    SELECT
      USU_NUMERO_DOCUMENTO,
      USU_CODIGO,
      USU_LOGIN,
      USU_CLAVE_ESMAD2
    FROM
      AUT_USUARIO 
    WHERE USU_LOGIN = ${username} AND ESTADO = 1
  `;

    if (result.rowsAffected[0]) {
      return result.recordset[0];
    }

    throw new Error("Error en las credenciales");
  }

  public async findUserByIdentification(identification: number): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
    SELECT 
      nm_contr.cod_empl, 
      USUARIO_LOGUEADO.USU_NOMBRES AS EMPLEADO, 
      USUARIO_JEFE.USU_NOMBRES AS JEFE, 
      gn_nivel.nom_nive,
      NM_FAPAR.NOM_CLIE, 
      NM_FAPAR.COD_CLIE, 
      NM_FAPAR.ACT_ECON, 
      bi_cargo.nom_carg, 
      ESMAD_NIVEL_CARGO.NIV_CARGO, 
      USUARIO_LOGUEADO.USU_MONEDAS_BENEFICIO,
      nm_contr.sue_basi, 
      nm_contr.fec_cont, 
      nm_contr.nro_cont,
      floor((((cast(datediff(day, nm_contr.fec_cont, getdate()) as float)/365-(floor(cast(datediff(day, nm_contr.fec_cont, getdate()) as float)/365)))*12)-floor((cast(datediff(day, nm_contr.fec_cont, getdate()) as float)/365-(floor(cast(datediff(day, nm_contr.fec_cont, getdate()) as float)/365)))*12))*(365/12)) AS dias, 
      floor((cast(datediff(day, nm_contr.fec_cont, getdate()) as float)/365-(floor(cast(datediff(day, nm_contr.fec_cont, getdate()) as float)/365)))*12) AS meses, 
      floor(cast(datediff(day, nm_contr.fec_cont, getdate()) as float)/365) AS anios,
      USU_FOTO
    FROM servclo09.kactus.dbo.nm_contr 
    INNER JOIN servclo09.kactus.dbo.gn_nivel ON (nm_contr.cod_niv4 = gn_nivel.cod_nive) 
    AND (nm_contr.cod_empr = gn_nivel.cod_empr) 
    AND (gn_nivel.num_nive = 4) 
    INNER JOIN servclo09.kactus.dbo.NM_FAPAR ON (nm_contr.cod_empr = NM_FAPAR.COD_EMPR) 
    AND (nm_contr.cod_ccos = NM_FAPAR.COD_CLIE) 
    INNER JOIN servclo09.kactus.dbo.bi_cargo ON (nm_contr.cod_empr = bi_cargo.cod_empr) 
    AND (nm_contr.cod_carg = bi_cargo.cod_carg) 
    INNER JOIN ESMAD_ESTRUCTURA_APROBACION ON (nm_contr.cod_empr = ESMAD_ESTRUCTURA_APROBACION.EMP_CODIGO) 
    AND (nm_contr.cod_empl = ESMAD_ESTRUCTURA_APROBACION.ESTR_CEDULA) 
    INNER JOIN ESMAD_NIVEL_CARGO ON (ESMAD_ESTRUCTURA_APROBACION.ESTR_NIVEL = ESMAD_NIVEL_CARGO.NIV_CODIGO) 
    INNER JOIN ESMAD_USUARIO AS USUARIO_LOGUEADO ON (nm_contr.cod_empl = USUARIO_LOGUEADO.USU_NUMERO_DOCUMENTO) 
    INNER JOIN ESMAD_USUARIO AS USUARIO_JEFE ON (ESMAD_ESTRUCTURA_APROBACION.ESTR_LIDER = USUARIO_JEFE.USU_CODIGO)
    INNER JOIN [SeguridadAUT].[dbo].[AUT_USUARIO] ON (nm_contr.cod_empl = AUT_USUARIO.USU_NUMERO_DOCUMENTO)
    WHERE nm_contr.cod_empl = ${identification} and nm_contr.ind_acti = 'A'
  `;

    if (result.rowsAffected) {
      return result.recordset[0];
    }

    throw new Error("Error de consulta");
  }
}
