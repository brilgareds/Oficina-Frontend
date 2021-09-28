import { mssqlKactus } from "../../../../../services/mssql";
import { EpsRepository } from "../../eps.repository";

export class EpsMSSQLRepository implements EpsRepository {

  public async getEps(): Promise<any> {

    const pool = await mssqlKactus;
    const result = await pool.query`
      SELECT DISTINCT
          nm_entid.cod_empr,
          nm_entid.cod_enti,
          nm_entid.cod_sucu,
          nm_entid.nom_enti AS EPS
      FROM
          nm_cuent AS nm_cuent
          INNER JOIN 
          nm_entid AS nm_entid 
                  ON (nm_cuent.tip_enti = nm_entid.tip_enti) 
                  AND (nm_cuent.cod_enti = nm_entid.cod_enti)
                  AND (nm_entid.cod_empr = 1)
      WHERE
          nm_entid.cod_sucu = 0 AND 
          nm_cuent.tip_enti = 'EPS'
      ORDER BY 
          nm_entid.nom_enti
    `;

    return result.recordset;

  }

  public async getEpsIncapacidad(codigoEmpresaUsuario: number): Promise<any> {

    const pool = await mssqlKactus;
    const result = await pool.query`
                    SELECT DISTINCT
                      cod_enti,
                      tip_enti,
                      RTRIM(LTRIM(nom_enti)) AS nom_enti
                    FROM 
                      NM_ENTID
                    WHERE 
                      cod_sucu = 0 AND 
                      tip_enti = 'EPS' AND
                      cod_empr = ${codigoEmpresaUsuario}
                    AND NOM_ENTI NOT LIKE '%(NO USAR)%'
                    ORDER BY nom_enti ASC
    `;

    return result.recordset;

  }

}
