import { mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
import { ViviendaRepository } from "../../vivienda.repository";

export class ViviendaMSSQLRepository implements ViviendaRepository {
 
  public async consultarDatosVivienda(informacionBasica_codigo: number, EMP_CODIGO: number, NRO_DOCUMENTO: number): Promise<any> {
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
            ELSE bi_datad.PER_VIVI
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
          SERVCLO09.kactus.dbo.bi_datad
          LEFT JOIN dbo.ESMAD_VIVIENDA
            ON ESMAD_VIVIENDA.INFORMACION_BASICA_CODIGO = ${informacionBasica_codigo}
      WHERE
          bi_datad.cod_empr = ${EMP_CODIGO}
          AND bi_datad.cod_empl = ${NRO_DOCUMENTO}
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
    INFORMACION_BASICA_CODIGO: number,
    TIPO_VIVIENDA: string,
    PERIMETRO: string,
    ESTRATO: number,
    BENEFICIARIO_CREDITO_VIVIENDA: string,
    CREDITO_VIVIENDA_VIGENTE: string,
    SERVICIOS: string,
    HABITANTES_VIVIENDA: number
  ): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
    INSERT INTO dbo.ESMAD_VIVIENDA (
      MENU_CODIGO,
      INFORMACION_BASICA_CODIGO,
      TIPO_VIVIENDA,
      PERIMETRO,
      ESTRATO,
      BENEFICIARIO_CREDITO_VIVIENDA,
      CREDITO_VIVIENDA_VIGENTE,
      SERVICIOS,
      HABITANTES_VIVIENDA
  ) VALUES (
      6,
      ${INFORMACION_BASICA_CODIGO},
      '${TIPO_VIVIENDA}',
      '${PERIMETRO}',
      ${ESTRATO},
      '${BENEFICIARIO_CREDITO_VIVIENDA}',
      '${CREDITO_VIVIENDA_VIGENTE}',
      ${SERVICIOS},
      ${HABITANTES_VIVIENDA}
  )
    `;
    
    return result.recordset;
  }

}
