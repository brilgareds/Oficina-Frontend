import { mssqlEsmad, mssqlVum } from "../../../../../services/mssql";
import { PresentationCardRepository } from "../../presentationCard.repository";

export class PresentationCardMSSQLRepository implements PresentationCardRepository {

  public async ResquestApproval(data: any): Promise<any> {

    const sql = '';

    return 432;
  }

  public async ResquestApprovalWithMaterials(data: any): Promise<any> {

    const sql = '';

    return 745;
  }

  public async getSalesPointsData(data: any): Promise<any> {

    try {

      const { salesPoints } = data;
      const pool = await mssqlVum;

      const result = await pool.query`
        SELECT
            SIM_PUNTO_VENTA.PDV_CODIGO,
            SIM_PUNTO_VENTA.PDV_NOMBRE,
            SIM_CIUDAD.CIU_NOMBRE

        FROM dbo.SIM_PUNTO_VENTA

        INNER JOIN dbo.SIM_CIUDAD ON
            (SIM_PUNTO_VENTA.CIU_CODIGO = SIM_CIUDAD.CIU_CODIGO)

        WHERE
            SIM_PUNTO_VENTA.PDV_CODIGO IN (${salesPoints})
                
        ORDER BY
            SIM_PUNTO_VENTA.PDV_NOMBRE
      `;
        
      return result.recordset;

    } catch(e:any) { throw new Error(e.message); }
  }

  public async getContracLevel2(data: any): Promise<any> {

    try {

      const { identification } = data;
      const pool = await mssqlEsmad;

      const result = await pool.query`
        SELECT
            nm_contr.cod_empl,
            nivelDos.nom_nive AS nom_nive2,
            nivelCuatro.nom_nive  AS nom_nive4,
            bi_cargo.nom_carg,
            bi_emple.tel_resi, 
            tel_movi,
            bi_emple.cod_empl,
            RTRIM (LTRIM (bi_emple.nom_empl)) as nom_empl,
            RTRIM (LTRIM (bi_emple.ape_empl)) as ape_empl,
            RTRIM (LTRIM (bi_emple.box_mail)) as box_mail,
            gn_ccost.cod_ccos,
            nm_contr.nro_cont
        FROM
            servclo09.kactus.dbo.nm_contr 
            INNER JOIN servclo09.kactus.dbo.gn_nivel AS nivelDos
                ON (nm_contr.cod_niv2 = nivelDos.cod_nive)
                    AND (nm_contr.cod_empr = nivelDos.cod_empr) 
                    AND (nivelDos.num_nive = 2)
                    AND (nivelDos.ide_arbo = 'BI')
            INNER JOIN servclo09.kactus.dbo.gn_nivel AS nivelCuatro
                ON (nm_contr.cod_niv4 = nivelCuatro.cod_nive)
                    AND (nm_contr.cod_empr = nivelCuatro.cod_empr) 
                    AND (nivelCuatro.num_nive = 4)
                    AND (nivelCuatro.ide_arbo = 'BI')
            INNER JOIN servclo09.kactus.dbo.nm_contr AS contratoJefe
                ON nm_contr.cod_frep = contratoJefe.cod_empl AND contratoJefe.ind_acti = 'A'
            INNER JOIN servclo09.kactus.dbo.bi_cargo
                ON contratoJefe.cod_carg = bi_cargo.cod_carg AND contratoJefe.cod_empr = bi_cargo.cod_empr
            INNER JOIN servclo09.kactus.dbo.bi_emple
                ON contratoJefe.cod_empl = bi_emple.cod_empl AND contratoJefe.cod_empr = bi_emple.cod_empr
            INNER JOIN SERVCLO09.Kactus.dbo.gn_ccost 
                ON (nm_contr.cod_ccos = gn_ccost.cod_ccos AND nm_contr.cod_empr = gn_ccost.cod_empr)
        WHERE
            nm_contr.cod_empl = ${identification} 
            and nm_contr.ind_acti = 'A'
      `;

      return result.recordset;

    } catch(e:any) { throw new Error(e.message); }
  }

  public async getCompanysData(data: any): Promise<any> {

    try {

      const { company } = data;
      const pool = await mssqlEsmad;

      const result = await pool.query`
        SELECT
            ESMAD_EMPRESA.EMP_CODIGO_KACTUS,
            ESMAD_EMPRESA.EMP_NOMBRE,
            ESMAD_EMPRESA.EMP_NIT
        FROM
            dbo.ESMAD_EMPRESA
        WHERE
            ESMAD_EMPRESA.EMP_CODIGO_KACTUS = ${company}
      `;

      return result.recordset;

    } catch(e:any) { throw new Error(e.message); }
  }
  
}