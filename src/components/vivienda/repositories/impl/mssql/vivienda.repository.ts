import { mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
import { ViviendaRepository } from "../../vivienda.repository";

export class ViviendaMSSQLRepository implements ViviendaRepository {
 
  public async consultarDatosVivienda(EMP_CODIGO: number, NRO_DOCUMENTO: number): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT
          CASE 
            WHEN ESMAD_VIVIENDA.TIPO_VIVIENDA IS NOT NULL
              THEN ESMAD_VIVIENDA.TIPO_VIVIENDA
            ELSE bi_datad.viv_prop
          END AS TIPO_VIVIENDA,
          CASE
            WHEN ESMAD_VIVIENDA.PERIMETRO IS NOT NULL
              THEN ESMAD_VIVIENDA.PERIMETRO
            ELSE bi_datad.PER_VIVI
          END AS PERIMETRO,
          CASE
            WHEN ESMAD_VIVIENDA.ESTRATO IS NOT NULL
              THEN ESMAD_VIVIENDA.ESTRATO
            ELSE bi_datad.EST_VIVI
          END AS ESTRATO,
          CASE
            WHEN ESMAD_VIVIENDA.BENEFICIARIO_CREDITO_VIVIENDA IS NOT NULL
              THEN ESMAD_VIVIENDA.BENEFICIARIO_CREDITO_VIVIENDA
            ELSE bi_datad.NOM_BECR
          END AS BENEFICIARIO_CREDITO_VIVIENDA,
          CASE
            WHEN ESMAD_VIVIENDA.CREDITO_VIVIENDA_VIGENTE IS NOT NULL
              THEN ESMAD_VIVIENDA.CREDITO_VIVIENDA_VIGENTE
            ELSE bi_datad.CRE_VGVI
          END AS CREDITO_VIVIENDA_VIGENTE,
          ESMAD_VIVIENDA.SERVICIOS,
          CASE
            WHEN ESMAD_VIVIENDA.HABITANTES_VIVIENDA IS NOT NULL
              THEN ESMAD_VIVIENDA.HABITANTES_VIVIENDA
            ELSE bi_datad.NRO_HABI
          END AS HABITANTES_VIVIENDA
      FROM
          SERVCLO09.kactus.dbo.nm_contr
          LEFT JOIN SERVCLO09.kactus.dbo.bi_datad
            ON nm_contr.cod_empl = bi_datad.cod_empl
               AND nm_contr.cod_empr = bi_datad.cod_empr
          LEFT JOIN dbo.ESMAD_VIVIENDA
            ON nm_contr.cod_empr = ESMAD_VIVIENDA.CODIGO_EMPRESA
               AND nm_contr.cod_empl = ESMAD_VIVIENDA.NRO_DOCUMENTO
      WHERE
          nm_contr.cod_empr = ${EMP_CODIGO}
          AND nm_contr.cod_empl = ${NRO_DOCUMENTO}
          AND nm_contr.ind_acti = 'A'
    `;
    
    return result.recordset;
  }

  public async consultarDatosTipVivienda(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT
          ESMAD_TIPO.TIP_ATRIBUTO1,
          ESMAD_TIPO.TIP_NOMBRE
      FROM
          dbo.ESMAD_TIPO
          INNER JOIN dbo.ESMAD_CLASE_TIPO
            ON ESMAD_TIPO.CLT_CODIGO = ESMAD_CLASE_TIPO.CLT_CODIGO
               AND ESMAD_CLASE_TIPO.ESTADO = 1
      WHERE
      ESMAD_TIPO.CLT_CODIGO = 44
          AND ESMAD_TIPO.ESTADO = 1
    `;
    
    return result.recordset;
  }

  public async consultarDatosPerimetro(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT
          ESMAD_TIPO.TIP_ATRIBUTO1,
          ESMAD_TIPO.TIP_NOMBRE
      FROM
          dbo.ESMAD_TIPO
          INNER JOIN dbo.ESMAD_CLASE_TIPO
            ON ESMAD_TIPO.CLT_CODIGO = ESMAD_CLASE_TIPO.CLT_CODIGO
               AND ESMAD_CLASE_TIPO.ESTADO = 1
      WHERE
      ESMAD_TIPO.CLT_CODIGO = 45
          AND ESMAD_TIPO.ESTADO = 1
    `;
    
    return result.recordset;
  }

  public async consultarDatosEstrato(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT
          ESMAD_TIPO.TIP_NOMBRE
      FROM
          dbo.ESMAD_TIPO
          INNER JOIN dbo.ESMAD_CLASE_TIPO
            ON ESMAD_TIPO.CLT_CODIGO = ESMAD_CLASE_TIPO.CLT_CODIGO
               AND ESMAD_CLASE_TIPO.ESTADO = 1
      WHERE
      ESMAD_TIPO.CLT_CODIGO = 46
          AND ESMAD_TIPO.ESTADO = 1
    `;
    
    return result.recordset;
  }

  public async consultarDatosServicios(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT
          ESMAD_TIPO.TIP_NOMBRE
      FROM
          dbo.ESMAD_TIPO
          INNER JOIN dbo.ESMAD_CLASE_TIPO
            ON ESMAD_TIPO.CLT_CODIGO = ESMAD_CLASE_TIPO.CLT_CODIGO
               AND ESMAD_CLASE_TIPO.ESTADO = 1
      WHERE
      ESMAD_TIPO.CLT_CODIGO = 47
          AND ESMAD_TIPO.ESTADO = 1
    `;
    
    return result.recordset;
  }

  public async crearRegistroVivienda(
    NRO_DOCUMENTO: number,
    TIPO_VIVIENDA: string,
    PERIMETRO: string,
    ESTRATO: number,
    BENEFICIARIO_CREDITO_VIVIENDA: string,
    CREDITO_VIVIENDA_VIGENTE: string,
    SERVICIOS: string,
    HABITANTES_VIVIENDA: number,
    CODIGO_EMPRESA: number
  ): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
      INSERT INTO dbo.ESMAD_VIVIENDA (
        MENU_CODIGO,
        NRO_DOCUMENTO,
        TIPO_VIVIENDA,
        PERIMETRO,
        ESTRATO,
        BENEFICIARIO_CREDITO_VIVIENDA,
        CREDITO_VIVIENDA_VIGENTE,
        SERVICIOS,
        HABITANTES_VIVIENDA,
        CODIGO_EMPRESA
      ) VALUES (
          6,
          ${NRO_DOCUMENTO},
          '${TIPO_VIVIENDA}',
          '${PERIMETRO}',
          ${ESTRATO},
          '${BENEFICIARIO_CREDITO_VIVIENDA}',
          '${CREDITO_VIVIENDA_VIGENTE}',
          ${SERVICIOS},
          ${HABITANTES_VIVIENDA},
          ${CODIGO_EMPRESA}
      )
    `;

    const result = await pool.query(sql);
    return result.recordset;
  }

  public async existeRegistroVivienda(EMP_CODIGO: number, NRO_DOCUMENTO: number): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT
          ESMAD_VIVIENDA.VIVIENDA_CODIGO
      FROM
          SERVCLO09.kactus.dbo.nm_contr
          LEFT JOIN dbo.ESMAD_VIVIENDA
            ON nm_contr.cod_empr = ESMAD_VIVIENDA.CODIGO_EMPRESA
               AND nm_contr.cod_empl = ESMAD_VIVIENDA.NRO_DOCUMENTO
      WHERE
          nm_contr.cod_empr = ${EMP_CODIGO}
          AND nm_contr.cod_empl = ${NRO_DOCUMENTO}
          AND nm_contr.ind_acti = 'A'
    `;
    
    return result.recordset;
  }

  public async actualizarRegistroVivienda(
      VIVIENDA_CODIGO: number,
      TIPO_VIVIENDA: string,
      PERIMETRO: string,
      ESTRATO: number,
      BENEFICIARIO_CREDITO_VIVIENDA: string,
      CREDITO_VIVIENDA_VIGENTE: string,
      SERVICIOS: string,
      HABITANTES_VIVIENDA: number
    ): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
      UPDATE dbo.ESMAD_VIVIENDA 
      SET 
        TIPO_VIVIENDA = '${TIPO_VIVIENDA}',
        PERIMETRO = '${PERIMETRO}',
        ESTRATO = ${ESTRATO},
        BENEFICIARIO_CREDITO_VIVIENDA = '${BENEFICIARIO_CREDITO_VIVIENDA}',
        CREDITO_VIVIENDA_VIGENTE = '${CREDITO_VIVIENDA_VIGENTE}',
        SERVICIOS = ${SERVICIOS},
        HABITANTES_VIVIENDA = ${HABITANTES_VIVIENDA}
    WHERE 
        VIVIENDA_CODIGO = ${VIVIENDA_CODIGO}
    `;
    
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async existeRegistroViviendaKactus(EMP_CODIGO: number, NRO_DOCUMENTO: number): Promise<any> {
    const pool = await mssqlKactus;
    const result = await pool.query`
      SELECT
          bi_datad.cod_empr,
          bi_datad.cod_empl
      FROM
          dbo.nm_contr
          LEFT JOIN dbo.bi_datad
            ON nm_contr.cod_empr = bi_datad.cod_empr
               AND nm_contr.cod_empl = bi_datad.cod_empl
      WHERE
          nm_contr.cod_empr = ${EMP_CODIGO}
          AND nm_contr.cod_empl = ${NRO_DOCUMENTO}
          AND nm_contr.ind_acti = 'A'
    `;
    
    return result.recordset;
  }

  public async crearRegistroViviendaKactus(
    CODIGO_EMPRESA: number,
    NRO_DOCUMENTO: number,
    TIPO_VIVIENDA: string,
    PERIMETRO: string,
    ESTRATO: number,
    BENEFICIARIO_CREDITO_VIVIENDA: string,
    CREDITO_VIVIENDA_VIGENTE: string,
    HABITANTES_VIVIENDA: number,
    USU_creacion: string,
    act_hora: string
  ): Promise<any> {
    const pool = await mssqlKactus;
    const sql = `
      INSERT INTO dbo.bi_datad (
        cod_empr,
        cod_empl,
        viv_prop,
        PER_VIVI,
        EST_VIVI,
        NOM_BECR,
        CRE_VGVI,
        NRO_HABI,
        act_usua,
        act_hora,
        act_esta
      ) VALUES (
        ${CODIGO_EMPRESA},
        ${NRO_DOCUMENTO},
        '${TIPO_VIVIENDA}',
        '${PERIMETRO}',
        ${ESTRATO},
        '${BENEFICIARIO_CREDITO_VIVIENDA}',
        '${CREDITO_VIVIENDA_VIGENTE}',
        ${HABITANTES_VIVIENDA},
        ${USU_creacion},
        ${act_hora},
        'M'
      )
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async actualizarRegistroViviendaKactus(
    CODIGO_EMPRESA: number,
    NRO_DOCUMENTO: number,
    TIPO_VIVIENDA: string,
    PERIMETRO: string,
    ESTRATO: number,
    BENEFICIARIO_CREDITO_VIVIENDA: string,
    CREDITO_VIVIENDA_VIGENTE: string,
    HABITANTES_VIVIENDA: number
  ): Promise<any> {
  const pool = await mssqlKactus;
  const sql = `
    UPDATE dbo.bi_datad 
      SET 
        viv_prop = '${TIPO_VIVIENDA}',
        PER_VIVI = '${PERIMETRO}',
        EST_VIVI = ${ESTRATO},
        NOM_BECR = '${BENEFICIARIO_CREDITO_VIVIENDA}',
        CRE_VGVI = '${CREDITO_VIVIENDA_VIGENTE}',
        NRO_HABI = ${HABITANTES_VIVIENDA}
    WHERE 
        cod_empr = ${CODIGO_EMPRESA}
        AND cod_empl = ${NRO_DOCUMENTO}
  `;
  const result = await pool.query(sql);
  return result.recordset;
}

}
