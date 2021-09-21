import { mssqlKactus } from "../../../../../services/mssql";
import { AuthRepository } from "../../auth.repository";

export class AuthMSSQLRepository implements AuthRepository {
  public async findUserByIdentification(identification: number): Promise<any> {
    const condition = `dbo.nm_contr.ind_acti = 'A' AND dbo.nm_contr.cod_empl = ${identification}`;
    let user = await this.findUser(condition);

    if (!user) {
      user = await this.findInactiveUserByIdentification(identification);

      if (!user) {
        throw new Error("Error de consulta");
      }

      const allData = {
        Cedula: user[0].Cedula,
        usuarioInactivoConVariosContratos: true,
        contratos: user
      };

      return allData;
    }

    return user;
  }

  private async findInactiveUserByIdentification(
    identification: number
  ): Promise<any> {
    const condition = `dbo.nm_contr.cod_empl = ${identification}`;
    return await this.findUserInactiveWithManyContrats(condition);
  }

  private async findUser(condition: string) {
    const pool = await mssqlKactus;
    const query = `SELECT DISTINCT
      LTRIM(RTRIM( (Empleado.ape_empl)))     AS Apellidos,
      LTRIM(RTRIM( (Empleado.nom_empl)))     AS Nombres,
      LTRIM(RTRIM( (Empleado.dir_resi)))     AS dire,
      LTRIM(RTRIM( (Empleado.sex_empl)))     AS Genero,
      LTRIM(RTRIM( (dbo.bi_cargo.nom_carg))) AS Cargo,
      LTRIM(RTRIM( (dbo.gn_nivel.nom_nive))) AS Area,
      LTRIM(RTRIM( (jefe.nom_empl)))+ ' '+ LTRIM(RTRIM( (jefe.ape_empl))) as Jefe,
      LTRIM(RTRIM( (nm_contr.cod_empl)))     AS Cedula,
      LTRIM(RTRIM( (Empleado.box_mail)))     AS Mail,
      (CASE WHEN Empleado.tel_movi IS NULL THEN Empleado.tel_resi ELSE Empleado.tel_movi END) AS Numero,
      LTRIM(RTRIM( (nm_contr.cod_empr)))     AS Empresa,
      nm_contr.cod_ccos AS C_COSTOS,
      nm_contr.ind_acti AS ESTADO,
      CONVERT(varchar,nm_contr.fec_ingr,111) as FECHA_INGRESO,
      CONVERT(varchar,nm_contr.fec_venc,111) as FECHA_VENCIMIENTO,
      nm_contr.nro_cont AS NUMERO_CONTRATO,
      LTRIM(RTRIM(dbo.NM_ENTID.nom_enti)) as Entidad
    FROM
      dbo.nm_contr
    LEFT JOIN dbo.gn_nivel
      ON (dbo.nm_contr.cod_empr = dbo.gn_nivel.cod_empr)
      AND (dbo.nm_contr.cod_niv4 = dbo.gn_nivel.cod_nive)
    LEFT JOIN  dbo.bi_cargo
      ON (dbo.nm_contr.cod_empr = dbo.bi_cargo.cod_empr)
      AND (dbo.nm_contr.cod_carg = dbo.bi_cargo.cod_carg)
    INNER JOIN dbo.bi_emple Empleado
      ON (dbo.nm_contr.cod_empr = Empleado.cod_empr)
      AND (dbo.nm_contr.cod_empl = Empleado.cod_empl)
    LEFT JOIN dbo.bi_emple jefe
      ON (dbo.nm_contr.cod_frep = jefe.cod_empl)
    LEFT JOIN dbo.NM_CUENT
      ON dbo.nm_contr.cod_empr = dbo.NM_CUENT.cod_empr
      AND dbo.nm_contr.cod_empl = dbo.NM_CUENT.cod_empl
      AND dbo.nm_contr.nro_cont = dbo.NM_CUENT.nro_cont
      AND dbo.NM_CUENT.tip_enti = 'EPS'
    LEFT JOIN dbo.NM_ENTID
      ON dbo.NM_CUENT.cod_empr = dbo.NM_ENTID.cod_empr
      AND dbo.NM_CUENT.cod_enti = dbo.NM_ENTID.cod_enti
      AND dbo.NM_CUENT.tip_enti = dbo.NM_ENTID.tip_enti
      AND dbo.NM_ENTID.cod_sucu = 0
    WHERE ${condition}
    AND dbo.gn_nivel.num_nive = 4
    AND dbo.gn_nivel.ide_arbo = 'bi'
    AND dbo.gn_nivel.cod_arbo = 1
    ORDER BY nm_contr.nro_cont DESC`;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset[0];
    }

    return null;
  }


  private async findUserInactiveWithManyContrats(condition: string) {
    const pool = await mssqlKactus;
    const query = `SELECT DISTINCT
      LTRIM(RTRIM( (Empleado.ape_empl)))     AS Apellidos,
      LTRIM(RTRIM( (Empleado.nom_empl)))     AS Nombres,
      LTRIM(RTRIM( (Empleado.dir_resi)))     AS dire,
      LTRIM(RTRIM( (Empleado.sex_empl)))     AS Genero,
      LTRIM(RTRIM( (dbo.bi_cargo.nom_carg))) AS Cargo,
      LTRIM(RTRIM( (dbo.gn_nivel.nom_nive))) AS Area,
      LTRIM(RTRIM( (jefe.nom_empl)))+ ' '+ LTRIM(RTRIM( (jefe.ape_empl))) as Jefe,
      LTRIM(RTRIM( (nm_contr.cod_empl)))     AS Cedula,
      LTRIM(RTRIM( (Empleado.box_mail)))     AS Mail,
      (CASE WHEN Empleado.tel_movi IS NULL THEN Empleado.tel_resi ELSE Empleado.tel_movi END) AS Numero,
      LTRIM(RTRIM( (nm_contr.cod_empr)))     AS Empresa,
      nm_contr.cod_ccos AS C_COSTOS,
      nm_contr.ind_acti AS ESTADO,
      CONVERT(varchar,nm_contr.fec_ingr,111) as FECHA_INGRESO,
      CONVERT(varchar,nm_contr.fec_venc,111) as FECHA_VENCIMIENTO,
      nm_contr.nro_cont AS NUMERO_CONTRATO,
      LTRIM(RTRIM(dbo.NM_ENTID.nom_enti)) as Entidad
    FROM
      dbo.nm_contr
    LEFT JOIN dbo.gn_nivel
      ON (dbo.nm_contr.cod_empr = dbo.gn_nivel.cod_empr)
      AND (dbo.nm_contr.cod_niv4 = dbo.gn_nivel.cod_nive)
    LEFT JOIN  dbo.bi_cargo
      ON (dbo.nm_contr.cod_empr = dbo.bi_cargo.cod_empr)
      AND (dbo.nm_contr.cod_carg = dbo.bi_cargo.cod_carg)
    INNER JOIN dbo.bi_emple Empleado
      ON (dbo.nm_contr.cod_empr = Empleado.cod_empr)
      AND (dbo.nm_contr.cod_empl = Empleado.cod_empl)
    LEFT JOIN dbo.bi_emple jefe
      ON (dbo.nm_contr.cod_frep = jefe.cod_empl)
    LEFT JOIN dbo.NM_CUENT
      ON dbo.nm_contr.cod_empr = dbo.NM_CUENT.cod_empr
      AND dbo.nm_contr.cod_empl = dbo.NM_CUENT.cod_empl
      AND dbo.nm_contr.nro_cont = dbo.NM_CUENT.nro_cont
      AND dbo.NM_CUENT.tip_enti = 'EPS'
    LEFT JOIN dbo.NM_ENTID
      ON dbo.NM_CUENT.cod_empr = dbo.NM_ENTID.cod_empr
      AND dbo.NM_CUENT.cod_enti = dbo.NM_ENTID.cod_enti
      AND dbo.NM_CUENT.tip_enti = dbo.NM_ENTID.tip_enti
      AND dbo.NM_ENTID.cod_sucu = 0
    WHERE ${condition}
    AND dbo.gn_nivel.num_nive = 4
    AND dbo.gn_nivel.ide_arbo = 'bi'
    AND dbo.gn_nivel.cod_arbo = 1
    ORDER BY nm_contr.nro_cont DESC`;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset;
    }

    return null;
  }
}
