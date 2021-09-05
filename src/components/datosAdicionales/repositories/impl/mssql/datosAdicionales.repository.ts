import { mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
import { DatosAdicionalesRepository } from "../../datosAdicionales.repository";

export class DatosAdicionalesMSSQLRepository implements DatosAdicionalesRepository {
  public async buscarDatos(CODIGO_EMPRESA: number, NRO_DOCUMENTO: number): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT
          ESMAD_DATOS_ADICIONALES.DATOS_ADICIONALES_CODIGO,
          CASE
            WHEN ESMAD_DATOS_ADICIONALES.HOBBIES IS NOT NULL
              THEN ESMAD_DATOS_ADICIONALES.HOBBIES
            ELSE bi_datad.hob_empl
          END AS HOBBIES,
          CASE
            WHEN ESMAD_DATOS_ADICIONALES.PROFESION IS NOT NULL
              THEN ESMAD_DATOS_ADICIONALES.PROFESION
            ELSE bi_datad.pro_fesi
          END AS PROFESION,
          CASE
            WHEN ESMAD_DATOS_ADICIONALES.ANOS_PROFESION IS NOT NULL
              THEN ESMAD_DATOS_ADICIONALES.ANOS_PROFESION
            ELSE bi_datad.ano_expe
          END AS ANOS_PROFESION,
          ESMAD_DATOS_ADICIONALES.INGRESOS_ADICIONALES,
          ESMAD_DATOS_ADICIONALES.MASCOTA,
          CASE
            WHEN ESMAD_DATOS_ADICIONALES.CUAL_MASCOTA IS NOT NULL
              THEN ESMAD_DATOS_ADICIONALES.CUAL_MASCOTA
            ELSE bi_datad.TIE_MASC
          END AS CUAL_MASCOTA,
          ESMAD_DATOS_ADICIONALES.RECREACION,
          CASE
            WHEN ESMAD_DATOS_ADICIONALES.CUAL_RECREACION IS NOT NULL
              THEN ESMAD_DATOS_ADICIONALES.CUAL_RECREACION
            ELSE bi_datad.REC_REAC
          END AS CUAL_RECREACION,
          CASE
            WHEN ESMAD_DATOS_ADICIONALES.FRECUENCIA_RECREACION IS NOT NULL
              THEN ESMAD_DATOS_ADICIONALES.FRECUENCIA_RECREACION
            ELSE bi_datad.PER_RECR
          END AS FRECUENCIA_RECREACION,
          ESMAD_DATOS_ADICIONALES.DEPORTE,
          CASE
            WHEN ESMAD_DATOS_ADICIONALES.CUAL_DEPORTE IS NOT NULL
              THEN ESMAD_DATOS_ADICIONALES.CUAL_DEPORTE
            ELSE bi_datad.DEP_ORTE
          END AS CUAL_DEPORTE,
          CASE
            WHEN ESMAD_DATOS_ADICIONALES.FRECUENCIA_DEPORTE IS NOT NULL
              THEN ESMAD_DATOS_ADICIONALES.FRECUENCIA_DEPORTE
            ELSE bi_datad.per_depo
          END AS FRECUENCIA_DEPORTE,
          ESMAD_DATOS_ADICIONALES.OTRO_TRABAJO,
          CASE
            WHEN ESMAD_DATOS_ADICIONALES.CUAL_OTRO_TRABAJO IS NOT NULL
              THEN ESMAD_DATOS_ADICIONALES.CUAL_OTRO_TRABAJO
            ELSE bi_datad.OTR_TRAB
          END AS CUAL_OTRO_TRABAJO,
          CASE
            WHEN ESMAD_DATOS_ADICIONALES.CUAL_OTRO_TRABAJO IS NOT NULL
              THEN ESMAD_DATOS_ADICIONALES.CUAL_OTRO_TRABAJO
            ELSE bi_datad.PER_TRAB
          END AS CUAL_OTRO_TRABAJO,
          ESMAD_DATOS_ADICIONALES.VEHICULO,
          CASE
            WHEN ESMAD_DATOS_ADICIONALES.CUAL_VEHICULO IS NOT NULL
              THEN ESMAD_DATOS_ADICIONALES.CUAL_VEHICULO
            ELSE bi_datad.VEH_PROP
          END AS CUAL_VEHICULO,
          ESMAD_DATOS_ADICIONALES.LICENCIA_CONDUCCION,
          CASE
            WHEN ESMAD_DATOS_ADICIONALES.LICENCIA_CONDUCCION_TIPO IS NOT NULL
              THEN ESMAD_DATOS_ADICIONALES.LICENCIA_CONDUCCION_TIPO
            ELSE bi_datad.TIP_LICC
          END AS LICENCIA_CONDUCCION_TIPO,
          ESMAD_DATOS_ADICIONALES.GRUPO_SOCIAL,
          CASE
            WHEN ESMAD_DATOS_ADICIONALES.CUAL_GRUPO_SOCIAL IS NOT NULL
              THEN ESMAD_DATOS_ADICIONALES.CUAL_GRUPO_SOCIAL
            ELSE bi_datad.GRU_SOCI
          END AS CUAL_GRUPO_SOCIAL,
          CASE
            WHEN ESMAD_DATOS_ADICIONALES.CONDICION_ESPECIAL IS NOT NULL
              THEN ESMAD_DATOS_ADICIONALES.CONDICION_ESPECIAL
            ELSE bi_datad.CON_ESPE
          END AS CONDICION_ESPECIAL,
          CASE
            WHEN ESMAD_DATOS_ADICIONALES.CONDICION_ESPECIAL_LGTB IS NOT NULL
              THEN ESMAD_DATOS_ADICIONALES.CONDICION_ESPECIAL_LGTB
            ELSE bi_datad.COM_LGTB
          END AS CONDICION_ESPECIAL_LGTB,
          ESMAD_DATOS_ADICIONALES.AHORRO,
          ESMAD_DATOS_ADICIONALES.PORCENTAJE_AHORRO_SALARIAL,
          ESMAD_DATOS_ADICIONALES.DESTINO_AHORROS,
          ESMAD_DATOS_ADICIONALES.INTERES_OTRO,
          ESMAD_DATOS_ADICIONALES.CONVENIOS_ADICIONALES,
          ESMAD_DATOS_ADICIONALES.DEPORTES_INTERES
      FROM
          SERVCLO09.kactus.dbo.nm_contr
          LEFT JOIN SERVCLO09.kactus.dbo.bi_datad
            ON nm_contr.cod_empl = bi_datad.cod_empl
               AND nm_contr.cod_empr = bi_datad.cod_empr
          LEFT JOIN dbo.ESMAD_DATOS_ADICIONALES
            ON nm_contr.cod_empl = ESMAD_DATOS_ADICIONALES.NRO_DOCUMENTO
               AND nm_contr.cod_empr = ESMAD_DATOS_ADICIONALES.CODIGO_EMPRESA
      WHERE
          nm_contr.cod_empl = ${NRO_DOCUMENTO}
          AND nm_contr.cod_empr = ${CODIGO_EMPRESA}
          AND nm_contr.ind_acti = 'A'
    `;
    
    return result.recordset;
  }

  public async buscarDatosListaDatosAdicionales(DATOS_ADICIONALES_CODIGO: number): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
      SELECT
        ESMAD_LISTA_DATOS_ADICIONAES.TIP_CODIGO,
        ESMAD_LISTA_DATOS_ADICIONAES.CONDICION_ESPECIAL
        ESMAD_LISTA_DATOS_ADICIONAES.DEUDAS
        ESMAD_LISTA_DATOS_ADICIONAES.DEUDAS_FUTURAS
      FROM
        dbo.ESMAD_TIPO
        INNER JOIN dbo.ESMAD_LISTA_DATOS_ADICIONAES
          ON ESMAD_LISTA_DATOS_ADICIONAES.DATOS_ADICIONALES_CODIGO = ${DATOS_ADICIONALES_CODIGO}
             AND ESMAD_TIPO.TIP_CODIGO = ESMAD_LISTA_DATOS_ADICIONAES.TIP_CODIGO
             AND ESMAD_LISTA_DATOS_ADICIONAES.ESTADO = 1
      WHERE
        ESMAD_TIPO.CLT_CODIGO IN (60,61,62)
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async buscarDatosFrecuencia(): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    SELECT
      ESMAD_TIPO.TIP_ATRIBUTO1,
      ESMAD_TIPO.TIP_NOMBRE
    FROM
      dbo.ESMAD_CLASE_TIPO
      INNER JOIN dbo.ESMAD_TIPO
        ON ESMAD_CLASE_TIPO.CLT_CODIGO = ESMAD_TIPO.CLT_CODIGO
           AND ESMAD_TIPO.ESTADO = 1
    WHERE
      ESMAD_CLASE_TIPO.CLT_CODIGO = 57
      AND ESMAD_CLASE_TIPO.ESTADO = 1
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async buscarDatosVehiculos(): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    SELECT
      ESMAD_TIPO.TIP_ATRIBUTO1,
      ESMAD_TIPO.TIP_NOMBRE
    FROM
      dbo.ESMAD_CLASE_TIPO
      INNER JOIN dbo.ESMAD_TIPO
        ON ESMAD_CLASE_TIPO.CLT_CODIGO = ESMAD_TIPO.CLT_CODIGO
           AND ESMAD_TIPO.ESTADO = 1
    WHERE
      ESMAD_CLASE_TIPO.CLT_CODIGO = 58
      AND ESMAD_CLASE_TIPO.ESTADO = 1
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async buscarDatosLicenciaConduccion(): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    SELECT
      ESMAD_TIPO.TIP_NOMBRE
    FROM
      dbo.ESMAD_CLASE_TIPO
      INNER JOIN dbo.ESMAD_TIPO
        ON ESMAD_CLASE_TIPO.CLT_CODIGO = ESMAD_TIPO.CLT_CODIGO
           AND ESMAD_TIPO.ESTADO = 1
    WHERE
      ESMAD_CLASE_TIPO.CLT_CODIGO = 59
      AND ESMAD_CLASE_TIPO.ESTADO = 1
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async buscarDatosCondicionEspecial(): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    SELECT
      ESMAD_TIPO.TIP_CODIGO,
      ESMAD_TIPO.TIP_NOMBRE
    FROM
      dbo.ESMAD_CLASE_TIPO
      INNER JOIN dbo.ESMAD_TIPO
        ON ESMAD_CLASE_TIPO.CLT_CODIGO = ESMAD_TIPO.CLT_CODIGO
           AND ESMAD_TIPO.ESTADO = 1
    WHERE
      ESMAD_CLASE_TIPO.CLT_CODIGO = 60
      AND ESMAD_CLASE_TIPO.ESTADO = 1
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async buscarDatosBienesServicios(): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    SELECT
      ESMAD_TIPO.TIP_CODIGO,
      ESMAD_TIPO.TIP_NOMBRE
    FROM
      dbo.ESMAD_CLASE_TIPO
      INNER JOIN dbo.ESMAD_TIPO
        ON ESMAD_CLASE_TIPO.CLT_CODIGO = ESMAD_TIPO.CLT_CODIGO
           AND ESMAD_TIPO.ESTADO = 1
    WHERE
      ESMAD_CLASE_TIPO.CLT_CODIGO = 61
      AND ESMAD_CLASE_TIPO.ESTADO = 1
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async buscarDatosTemasInteres(): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    SELECT
      ESMAD_TIPO.TIP_CODIGO,
      ESMAD_TIPO.TIP_NOMBRE
    FROM
      dbo.ESMAD_CLASE_TIPO
      INNER JOIN dbo.ESMAD_TIPO
        ON ESMAD_CLASE_TIPO.CLT_CODIGO = ESMAD_TIPO.CLT_CODIGO
           AND ESMAD_TIPO.ESTADO = 1
    WHERE
      ESMAD_CLASE_TIPO.CLT_CODIGO = 62
      AND ESMAD_CLASE_TIPO.ESTADO = 1
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async existeRegistroDatosAdicionales(CODIGO_EMPRESA: number, NRO_DOCUMENTO: number): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    SELECT
      ESMAD_DATOS_ADICIONALES.DATOS_ADICIONALES_CODIGO
    FROM
      SERVCLO09.kactus.dbo.nm_contr
      LEFT JOIN dbo.ESMAD_DATOS_ADICIONALES
        ON nm_contr.cod_empr = ESMAD_DATOS_ADICIONALES.CODIGO_EMPRESA
           AND nm_contr.cod_empl = ESMAD_DATOS_ADICIONALES.NRO_DOCUMENTO
    WHERE
      nm_contr.cod_empr = ${CODIGO_EMPRESA}
      AND nm_contr.cod_empl = ${NRO_DOCUMENTO}
      AND nm_contr.ind_acti = 'A'
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async crearRegistroDatosAdicionales(
      NRO_DOCUMENTO: number,
      CODIGO_EMPRESA: number,
      HOBBIES: string,
      PROFESION: string,
      ANOS_PROFESION: string,
      INGRESOS_ADICIONALES: string,
      MASCOTA: string, 
      CUAL_MASCOTA: string,
      RECREACION: string,
      CUAL_RECREACION: string,
      FRECUENCIA_RECREACION: string,
      DEPORTE: string,
      CUAL_DEPORTE: string,
      FRECUENCIA_DEPORTE: string,
      OTRO_TRABAJO: string,
      CUAL_OTRO_TRABAJO: string,
      FRECUENCIA_OTRO_TRABAJO: string,
      VEHICULO: string,
      CUAL_VEHICULO: string,
      LICENCIA_CONDUCCION: string,
      LICENCIA_CONDUCCION_TIPO: string,
      GRUPO_SOCIAL: string,
      CUAL_GRUPO_SOCIAL: string,
      AHORRO: string,
      PORCENTAJE_AHORRO_SALARIAL: string,
      DESTINO_AHORROS: string,
      INTERES_OTRO: string,
      CONVENIOS_ADICIONALES: string,
      DEPORTES_INTERES: string
  ): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    INSERT INTO dbo.ESMAD_DATOS_ADICIONALES (
      CODIGO_EMPRESA,
      NRO_DOCUMENTO,
      HOBBIES,
      PROFESION,
      ANOS_PROFESION,
      INGRESOS_ADICIONALES,
      MASCOTA,
      CUAL_MASCOTA,
      RECREACION,
      CUAL_RECREACION,
      FRECUENCIA_RECREACION,
      DEPORTE,
      CUAL_DEPORTE,
      FRECUENCIA_DEPORTE,
      OTRO_TRABAJO,
      CUAL_OTRO_TRABAJO,
      FRECUENCIA_OTRO_TRABAJO,
      VEHICULO,
      CUAL_VEHICULO,
      LICENCIA_CONDUCCION,
      LICENCIA_CONDUCCION_TIPO,
      GRUPO_SOCIAL,
      CUAL_GRUPO_SOCIAL,
      AHORRO,
      PORCENTAJE_AHORRO_SALARIAL,
      DESTINO_AHORROS,
      INTERES_OTRO,
      CONVENIOS_ADICIONALES,
      DEPORTES_INTERES
  ) VALUES (
      ${CODIGO_EMPRESA},
      ${NRO_DOCUMENTO},
      ${HOBBIES},
      ${PROFESION},
      ${ANOS_PROFESION},
      ${INGRESOS_ADICIONALES},
      ${MASCOTA},
      ${CUAL_MASCOTA},
      ${RECREACION},
      ${CUAL_RECREACION},
      ${FRECUENCIA_RECREACION},
      ${DEPORTE},
      ${CUAL_DEPORTE},
      ${FRECUENCIA_DEPORTE},
      ${OTRO_TRABAJO},
      ${CUAL_OTRO_TRABAJO},
      ${FRECUENCIA_OTRO_TRABAJO},
      ${VEHICULO},
      ${CUAL_VEHICULO},
      ${LICENCIA_CONDUCCION},
      ${LICENCIA_CONDUCCION_TIPO},
      ${GRUPO_SOCIAL},
      ${CUAL_GRUPO_SOCIAL},
      ${AHORRO},
      ${PORCENTAJE_AHORRO_SALARIAL},
      ${DESTINO_AHORROS},
      ${INTERES_OTRO},
      ${CONVENIOS_ADICIONALES},
      ${DEPORTES_INTERES}
  )
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async consultarIdUltimoRegistro(
    tableName: string
  ): Promise<any> {
  const pool = await mssqlEsmad;
  const sql = `
  SELECT DISTINCT 
    IDENT_CURRENT('${tableName}') AS CODIGO 
  FROM 
    ${tableName}
  `;
  const result = await pool.query(sql);
  return result.recordset;
  }

  public async desactivarListaCondicionEspecial(DATOS_ADICIONALES_CODIGO: number): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    UPDATE dbo.ESMAD_LISTA_DATOS_ADICIONALES 
      SET 
        ESTADO = 0
    WHERE 
      DATOS_ADICIONALES_CODIGO = ${DATOS_ADICIONALES_CODIGO}
      AND CONDICION_ESPECIAL = 1
      AND ESTADO = 1
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async desactivarListaDeudas(DATOS_ADICIONALES_CODIGO: number): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    UPDATE dbo.ESMAD_LISTA_DATOS_ADICIONALES 
      SET 
        ESTADO = 0
    WHERE 
      DATOS_ADICIONALES_CODIGO = ${DATOS_ADICIONALES_CODIGO}
      AND DEUDAS = 1
      AND ESTADO = 1
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async desactivarListaDeudasFuturas(DATOS_ADICIONALES_CODIGO: number): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    UPDATE dbo.ESMAD_LISTA_DATOS_ADICIONALES 
      SET 
        ESTADO = 0
    WHERE 
      DATOS_ADICIONALES_CODIGO = ${DATOS_ADICIONALES_CODIGO}
      AND DEUDAS_FUTURAS = 1
      AND ESTADO = 1
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async desactivarListaTemasInteres(DATOS_ADICIONALES_CODIGO: number): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    UPDATE dbo.ESMAD_LISTA_DATOS_ADICIONALES 
      SET 
        ESTADO = 0
    WHERE 
      DATOS_ADICIONALES_CODIGO = ${DATOS_ADICIONALES_CODIGO}
      AND CONDICION_ESPECIAL = 0
      AND DEUDAS = 0
      AND DEUDAS_FUTURAS = 0
      AND ESTADO = 1
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async existeRegistroListaDatosAdicionales(DATOS_ADICIONALES_CODIGO: number): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    SELECT
      ESMAD_LISTA_DATOS_ADICIONALES.LISTA_DATOS_ADICIONALES_CODIGO
    FROM
      dbo.ESMAD_LISTA_DATOS_ADICIONALES
    WHERE
      ESMAD_LISTA_DATOS_ADICIONALES.DATOS_ADICIONALES_CODIGO = ${DATOS_ADICIONALES_CODIGO}
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async buscarRegistroListaDatosAdicionales(DATOS_ADICIONALES_CODIGO: number, TIP_CODIGO:number): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    SELECT
      ESMAD_LISTA_DATOS_ADICIONALES.LISTA_DATOS_ADICIONALES_CODIGO
    FROM
      dbo.ESMAD_DATOS_ADICIONALES
      LEFT JOIN dbo.ESMAD_LISTA_DATOS_ADICIONALES
        ON ESMAD_DATOS_ADICIONALES.DATOS_ADICIONALES_CODIGO = ESMAD_LISTA_DATOS_ADICIONALES.DATOS_ADICIONALES_CODIGO
           AND ESMAD_LISTA_DATOS_ADICIONALES.TIP_CODIGO = ${TIP_CODIGO}
    WHERE
      ESMAD_DATOS_ADICIONALES.DATOS_ADICIONALES_CODIGO = ${DATOS_ADICIONALES_CODIGO}
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async crearRegistroListaDatosAdicionales(
    DATOS_ADICIONALES_CODIGO: number,
    TIP_CODIGO: number,
    CONDICION_ESPECIAL: number,
    DEUDAS: number,
    DEUDAS_FUTURAS: number,
    ESTADO: number,
  ): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
      INSERT INTO dbo.ESMAD_LISTA_DATOS_ADICIONALES (
        DATOS_ADICIONALES_CODIGO,
        TIP_CODIGO,
        CONDICION_ESPECIAL,
        DEUDAS,
        DEUDAS_FUTURAS,
        ESTADO
      ) VALUES (
        ${DATOS_ADICIONALES_CODIGO},
        ${TIP_CODIGO},
        ${CONDICION_ESPECIAL},
        ${DEUDAS},
        ${DEUDAS_FUTURAS},
        ${ESTADO}
      )
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async activarListaDatosAdicionales(LISTA_DATOS_ADICIONALES_CODIGO: number): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    UPDATE dbo.ESMAD_LISTA_DATOS_ADICIONALES 
      SET 
        ESTADO = 1
    WHERE 
      LISTA_DATOS_ADICIONALES_CODIGO = ${LISTA_DATOS_ADICIONALES_CODIGO}
      AND ESTADO = 0
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async actualizarRegistroDatosAdicionales(
      DATOS_ADICIONALES_CODIGO: number,
      HOBBIES: string,
      PROFESION: string,
      ANOS_PROFESION: string,
      INGRESOS_ADICIONALES: string,
      MASCOTA: string, 
      CUAL_MASCOTA: string,
      RECREACION: string,
      CUAL_RECREACION: string,
      FRECUENCIA_RECREACION: string,
      DEPORTE: string,
      CUAL_DEPORTE: string,
      FRECUENCIA_DEPORTE: string,
      OTRO_TRABAJO: string,
      CUAL_OTRO_TRABAJO: string,
      FRECUENCIA_OTRO_TRABAJO: string,
      VEHICULO: string,
      CUAL_VEHICULO: string,
      LICENCIA_CONDUCCION: string,
      LICENCIA_CONDUCCION_TIPO: string,
      GRUPO_SOCIAL: string,
      CUAL_GRUPO_SOCIAL: string,
      AHORRO: string,
      PORCENTAJE_AHORRO_SALARIAL: string,
      DESTINO_AHORROS: string,
      INTERES_OTRO: string,
      CONVENIOS_ADICIONALES: string,
      DEPORTES_INTERES: string
    ): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    UPDATE dbo.ESMAD_DATOS_ADICIONALES 
      SET 
        HOBBIES = ${HOBBIES},
        PROFESION = ${PROFESION},
        ANOS_PROFESION = ${ANOS_PROFESION},
        INGRESOS_ADICIONALES = ${INGRESOS_ADICIONALES},
        MASCOTA = ${MASCOTA},
        CUAL_MASCOTA = ${CUAL_MASCOTA},
        RECREACION = ${RECREACION},
        CUAL_RECREACION = ${CUAL_RECREACION},
        FRECUENCIA_RECREACION = ${FRECUENCIA_RECREACION},
        DEPORTE = ${DEPORTE},
        CUAL_DEPORTE = ${CUAL_DEPORTE},
        FRECUENCIA_DEPORTE = ${FRECUENCIA_DEPORTE},
        OTRO_TRABAJO = ${OTRO_TRABAJO},
        CUAL_OTRO_TRABAJO = ${CUAL_OTRO_TRABAJO},
        FRECUENCIA_OTRO_TRABAJO = ${FRECUENCIA_OTRO_TRABAJO},
        VEHICULO = ${VEHICULO},
        CUAL_VEHICULO = ${CUAL_VEHICULO},
        LICENCIA_CONDUCCION = ${LICENCIA_CONDUCCION},
        LICENCIA_CONDUCCION_TIPO = ${LICENCIA_CONDUCCION_TIPO},
        GRUPO_SOCIAL = ${GRUPO_SOCIAL},
        CUAL_GRUPO_SOCIAL = ${CUAL_GRUPO_SOCIAL},
        AHORRO = ${AHORRO},
        PORCENTAJE_AHORRO_SALARIAL = ${PORCENTAJE_AHORRO_SALARIAL},
        DESTINO_AHORROS = ${DESTINO_AHORROS},
        INTERES_OTRO = ${INTERES_OTRO},
        CONVENIOS_ADICIONALES = ${CONVENIOS_ADICIONALES},
        DEPORTES_INTERES = ${DEPORTES_INTERES}
    WHERE 
      DATOS_ADICIONALES_CODIGO = ${DATOS_ADICIONALES_CODIGO}
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async existeRegistroDatosAdicionalesKactus(CODIGO_EMPRESA: number, NRO_DOCUMENTO: number): Promise<any> {
    const pool = await mssqlKactus;
    const sql = `
    SELECT
      bi_datad.cod_empr,
      bi_datad.cod_empl
    FROM
      dbo.nm_contr
      LEFT JOIN dbo.bi_datad
        ON nm_contr.cod_empr = bi_datad.cod_empr
           AND nm_contr.cod_empl = bi_datad.cod_empl
    WHERE
      nm_contr.cod_empr = ${CODIGO_EMPRESA}
      AND nm_contr.cod_empl = ${NRO_DOCUMENTO}
      AND nm_contr.ind_acti = 'A'
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async buscarValorTipo(TIP_CODIGO:number): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    SELECT
      ESMAD_TIPO.TIP_ATRIBUTO1
    FROM
      dbo.ESMAD_CLASE_TIPO
      LEFT JOIN dbo.ESMAD_TIPO
        ON ESMAD_CLASE_TIPO.CLT_CODIGO = ESMAD_TIPO.CLT_CODIGO
           AND ESMAD_TIPO.TIP_CODIGO = ${TIP_CODIGO}
    WHERE
      ESMAD_CLASE_TIPO.CLT_CODIGO = 60
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async crearRegistroDatosAdicionalesKactus(
    CODIGO_EMPRESA: number,
    NRO_DOCUMENTO: number,
    HOBBIES: string,
    PROFESION: string,
    ANOS_PROFESION: string,
    CUAL_MASCOTA: string,
    CUAL_RECREACION: string,
    FRECUENCIA_RECREACION: string,
    CUAL_DEPORTE: string,
    FRECUENCIA_DEPORTE: string,
    CUAL_OTRO_TRABAJO: string,
    FRECUENCIA_OTRO_TRABAJO: string,
    CUAL_VEHICULO: string,
    LICENCIA_CONDUCCION_TIPO: string,
    CUAL_GRUPO_SOCIAL: string,
    CONDICION_ESPECIAL: string,
    CONDICION_ESPECIAL_LGTB: string,
    USU_creacion: string,
    act_hora: string
  ): Promise<any> {
    const pool = await mssqlKactus;
    const sql = `
      INSERT INTO dbo.bi_datad (
        cod_empr,
        cod_empl,
        hob_empl,
        pro_fesi,
        ano_expe,
        TIE_MASC,
        REC_REAC,
        PER_RECR,
        DEP_ORTE,
        PER_DEPO,
        OTR_TRAB,
        PER_TRAB,
        VEH_PROP,
        TIP_LICC,
        GRU_SOCI,
        CON_ESPE,
        COM_LGTB,
        act_usua,
        act_hora,
        act_esta
      ) VALUES (
        ${CODIGO_EMPRESA},
        ${NRO_DOCUMENTO},
        ${HOBBIES},
        ${PROFESION},
        ${ANOS_PROFESION},
        ${CUAL_MASCOTA},
        ${CUAL_RECREACION},
        ${FRECUENCIA_RECREACION},
        ${CUAL_DEPORTE},
        ${FRECUENCIA_DEPORTE},
        ${CUAL_OTRO_TRABAJO},
        ${FRECUENCIA_OTRO_TRABAJO},
        ${CUAL_VEHICULO},
        ${LICENCIA_CONDUCCION_TIPO},
        ${CUAL_GRUPO_SOCIAL},
        ${CONDICION_ESPECIAL},
        ${CONDICION_ESPECIAL_LGTB},
        '${USU_creacion}',
        '${act_hora}',
        'M'
      )
    `;
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async actualizarRegistroDatosAdicionalesKactus(
    CODIGO_EMPRESA: number,
    NRO_DOCUMENTO: number,
    HOBBIES: string,
    PROFESION: string,
    ANOS_PROFESION: string,
    CUAL_MASCOTA: string,
    CUAL_RECREACION: string,
    FRECUENCIA_RECREACION: string,
    CUAL_DEPORTE: string,
    FRECUENCIA_DEPORTE: string,
    CUAL_OTRO_TRABAJO: string,
    FRECUENCIA_OTRO_TRABAJO: string,
    CUAL_VEHICULO: string,
    LICENCIA_CONDUCCION_TIPO: string,
    CUAL_GRUPO_SOCIAL: string,
    CONDICION_ESPECIAL: string,
    CONDICION_ESPECIAL_LGTB: string
  ): Promise<any> {
  const pool = await mssqlKactus;
  const sql = `
  UPDATE dbo.bi_datad 
    SET
      hob_empl = ${HOBBIES},
      pro_fesi = ${PROFESION},
      ano_expe = ${ANOS_PROFESION},
      TIE_MASC = ${CUAL_MASCOTA},
      REC_REAC = ${CUAL_RECREACION},
      PER_RECR = ${FRECUENCIA_RECREACION},
      DEP_ORTE = ${CUAL_DEPORTE},
      PER_DEPO = ${FRECUENCIA_DEPORTE},
      OTR_TRAB = ${CUAL_OTRO_TRABAJO},
      PER_TRAB = ${FRECUENCIA_OTRO_TRABAJO},
      VEH_PROP = ${CUAL_VEHICULO},
      TIP_LICC = ${LICENCIA_CONDUCCION_TIPO},
      GRU_SOCI = ${CUAL_GRUPO_SOCIAL},
      CON_ESPE = ${CONDICION_ESPECIAL},
      COM_LGTB = ${CONDICION_ESPECIAL_LGTB}
  WHERE 
    cod_empr = ${CODIGO_EMPRESA}
    AND cod_empl = ${NRO_DOCUMENTO}
  `;
  
  const result = await pool.query(sql);
  return result.recordset;
}

}
