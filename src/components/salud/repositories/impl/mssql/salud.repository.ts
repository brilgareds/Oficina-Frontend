import { mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
import { SaludRepository } from "../../salud.repository";

export class SaludMSSQLRepository implements SaludRepository {
  public async buscarDatos(cedula: number, empresa: number): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
    SELECT TOP 1
        CASE
          WHEN ESMAD_SALUD.GRUPO_SANGUINEO IS NOT NULL
            THEN ESMAD_SALUD.GRUPO_SANGUINEO
          ELSE RTRIM(LTRIM(bi_datad.gru_sang))
        END AS GRUPO_SANGUINEO,
        CASE
          WHEN ESMAD_SALUD.FACTOR IS NOT NULL
            THEN ESMAD_SALUD.FACTOR
          ELSE RTRIM(LTRIM(bi_datad.fac_sang))
        END AS FACTOR,
        CASE
          WHEN ESMAD_SALUD.ESTATURA IS NOT NULL
            THEN ESMAD_SALUD.ESTATURA
          ELSE RTRIM(LTRIM(bi_datad.est_empl))
        END AS ESTATURA,
        CASE
          WHEN ESMAD_SALUD.PESO IS NOT NULL
            THEN ESMAD_SALUD.PESO
          ELSE RTRIM(LTRIM(bi_datad.est_peso))
        END AS PESO,
        CASE
          WHEN ESMAD_SALUD.RAZA IS NOT NULL
            THEN ESMAD_SALUD.RAZA
          ELSE RTRIM(LTRIM(bi_datad.COD_RAZA))
        END AS RAZA,
        CASE
          WHEN ESMAD_SALUD.FUMADOR IS NOT NULL
            THEN ESMAD_SALUD.FUMADOR
          ELSE bi_datad.est_fuma
        END AS FUMADOR,
        CASE
          WHEN ESMAD_SALUD.BEBEDOR IS NOT NULL
            THEN ESMAD_SALUD.BEBEDOR
          ELSE bi_datad.est_bebe
        END AS BEBEDOR,
        CASE
          WHEN ESMAD_SALUD.ANTEOJOS IS NOT NULL
            THEN ESMAD_SALUD.ANTEOJOS
          ELSE bi_datad.usa_ante
        END AS ANTEOJOS,
        CASE
          WHEN ESMAD_SALUD.ENFERMEDADES IS NOT NULL
            THEN ESMAD_SALUD.ENFERMEDADES
          ELSE RTRIM(LTRIM(bi_datad.enf_aler))
        END AS ENFERMEDADES,
        ESMAD_SALUD.RESTRICCIONES_MEDICAS,
        ESMAD_SALUD.FRECUENCIA_ASISTENCIA_MEDICA,
        CASE
          WHEN ESMAD_SALUD.SUFRE_ALERGIAS IS NOT NULL
            THEN ESMAD_SALUD.SUFRE_ALERGIAS
          ELSE bi_datad.ALE_RGIC
        END AS SUFRE_ALERGIAS,
        CASE
          WHEN ESMAD_SALUD.ALERGIAS IS NOT NULL
            THEN ESMAD_SALUD.ALERGIAS
          ELSE RTRIM(LTRIM(bi_datad.ALE_OTRO))
        END AS ALERGIAS,
        ESMAD_SALUD.CONTACTO_EMERGENCIA,
        CASE
          WHEN ESMAD_SALUD.NUMERO_CONTACTO_EMERGENCIA IS NOT NULL
            THEN ESMAD_SALUD.NUMERO_CONTACTO_EMERGENCIA
          ELSE RTRIM(LTRIM(bi_datad.TEL_EMER))
        END AS NUMERO_CONTACTO_EMERGENCIA,
        CASE
          WHEN ESMAD_SALUD.ENFERMEDAD_LABORAL IS NOT NULL
            THEN ESMAD_SALUD.ENFERMEDAD_LABORAL
          ELSE bi_datad.ENF_LACA
        END AS ENFERMEDAD_LABORAL,
        CASE
          WHEN ESMAD_SALUD.PERDIDA_CAPACIDAD_SALUD IS NOT NULL
            THEN ESMAD_SALUD.PERDIDA_CAPACIDAD_SALUD
          ELSE bi_datad.GRA_PCSA
        END AS PERDIDA_CAPACIDAD_SALUD,
        ESMAD_SALUD.PLAN_SALUD_NO_EPS,
        CASE
          WHEN ESMAD_SALUD.PLAN_SALUD IS NOT NULL
            THEN ESMAD_SALUD.PLAN_SALUD
          ELSE bi_datad.PLA_SALU
        END AS PLAN_SALUD,
        CASE
          WHEN ESMAD_SALUD.PLAN_SALUD_OTROS IS NOT NULL
            THEN ESMAD_SALUD.PLAN_SALUD_OTROS
          ELSE RTRIM(LTRIM(bi_datad.OTR_POLI))
        END AS PLAN_SALUD_OTROS,
        CASE
          WHEN ESMAD_SALUD.ENTIDAD_OTROS IS NOT NULL
            THEN ESMAD_SALUD.ENTIDAD_OTROS
          ELSE RTRIM(LTRIM(bi_datad.OTR_PLAN))
        END AS ENTIDAD_OTROS,
        ESMAD_REPORTE_EMBARAZO.EMBARAZO_ALTO_RIESGO,
        ESMAD_REPORTE_EMBARAZO.FECHA_EXAMEN_EMBARAZO,
        ESMAD_REPORTE_EMBARAZO.TIEMPO_GESTACION,
        ESMAD_REPORTE_EMBARAZO.FECHA_PARTO,
        ESMAD_REPORTE_EMBARAZO.OBSERVACION
    FROM
        SERVCLO09.kactus.dbo.nm_contr
        LEFT JOIN SERVCLO09.kactus.dbo.bi_datad
          ON nm_contr.cod_empl = bi_datad.cod_empl
             AND nm_contr.cod_empr = bi_datad.cod_empr
        LEFT JOIN dbo.ESMAD_SALUD
          ON nm_contr.cod_empl = ESMAD_SALUD.NRO_DOCUMENTO
             AND nm_contr.cod_empr = ESMAD_SALUD.CODIGO_EMPRESA
        LEFT JOIN dbo.ESMAD_REPORTE_EMBARAZO
          ON nm_contr.cod_empl = ESMAD_REPORTE_EMBARAZO.NRO_DOCUMENTO
             AND nm_contr.cod_empr = ESMAD_REPORTE_EMBARAZO.CODIGO_EMPRESA
    WHERE
        nm_contr.cod_empl = ${cedula}
        AND nm_contr.cod_empr = ${empresa}
        AND nm_contr.ind_acti = 'A'
    `;
    
    return result.recordset;
  }

  public async buscarDatosGrupoSanguineo(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
    SELECT
        ESMAD_TIPO.TIP_NOMBRE
    FROM
        dbo.ESMAD_CLASE_TIPO
        INNER JOIN dbo.ESMAD_TIPO
          ON ESMAD_CLASE_TIPO.CLT_CODIGO = ESMAD_TIPO.CLT_CODIGO
             AND ESMAD_TIPO.ESTADO = 1
    WHERE
        ESMAD_CLASE_TIPO.CLT_CODIGO = 48
        AND ESMAD_CLASE_TIPO.ESTADO = 1
    `;
    
    return result.recordset;
  }

  public async buscarDatosFactor(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
    SELECT
        ESMAD_TIPO.TIP_NOMBRE
    FROM
        dbo.ESMAD_CLASE_TIPO
        INNER JOIN dbo.ESMAD_TIPO
          ON ESMAD_CLASE_TIPO.CLT_CODIGO = ESMAD_TIPO.CLT_CODIGO
             AND ESMAD_TIPO.ESTADO = 1
    WHERE
        ESMAD_CLASE_TIPO.CLT_CODIGO = 49
        AND ESMAD_CLASE_TIPO.ESTADO = 1
    `;
    
    return result.recordset;
  }

  public async buscarDatosRaza(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
    SELECT
        ESMAD_TIPO.TIP_NOMBRE
    FROM
        dbo.ESMAD_CLASE_TIPO
        INNER JOIN dbo.ESMAD_TIPO
          ON ESMAD_CLASE_TIPO.CLT_CODIGO = ESMAD_TIPO.CLT_CODIGO
             AND ESMAD_TIPO.ESTADO = 1
    WHERE
        ESMAD_CLASE_TIPO.CLT_CODIGO = 50
        AND ESMAD_CLASE_TIPO.ESTADO = 1
    ORDER BY ESMAD_TIPO.TIP_NOMBRE
    `;
    
    return result.recordset;
  }

  public async buscarDatosPlanSalud(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
    SELECT
        ESMAD_TIPO.TIP_ATRIBUTO1,
        ESMAD_TIPO.TIP_NOMBRE
    FROM
        dbo.ESMAD_CLASE_TIPO
        INNER JOIN dbo.ESMAD_TIPO
          ON ESMAD_CLASE_TIPO.CLT_CODIGO = ESMAD_TIPO.CLT_CODIGO
             AND ESMAD_TIPO.ESTADO = 1
    WHERE
        ESMAD_CLASE_TIPO.CLT_CODIGO = 51
        AND ESMAD_CLASE_TIPO.ESTADO = 1
    ORDER BY ESMAD_TIPO.TIP_NOMBRE
    `;
    
    return result.recordset;
  }

  public async tieneRegistroSalud(empresa:number, cedula: number): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
    SELECT
        ESMAD_SALUD.SALUD_CODIGO
    FROM
        SERVCLO09.kactus.dbo.nm_contr
        LEFT JOIN dbo.ESMAD_SALUD
          ON nm_contr.cod_empl = ESMAD_SALUD.NRO_DOCUMENTO
             AND nm_contr.cod_empr = ESMAD_SALUD.CODIGO_EMPRESA
    WHERE
        nm_contr.cod_empl = ${cedula}
        AND nm_contr.cod_empr = ${empresa}
        AND nm_contr.ind_acti = 'A'
    `;
    
    return result.recordset;
  }

  public async crearRegistroSalud(
    NRO_DOCUMENTO: number,
    GRUPO_SANGUINEO: string,
    FACTOR: string,
    ESTATURA: string,
    PESO: string,
    RAZA: string,
    FUMADOR: string,
    BEBEDOR: string,
    ANTEOJOS: string,
    ENFERMEDADES: string,
    RESTRICCIONES_MEDICAS: string,
    FRECUENCIA_ASISTENCIA_MEDICA: string,
    SUFRE_ALERGIAS: string,
    ALERGIAS: string,
    CONTACTO_EMERGENCIA: string,
    NUMERO_CONTACTO_EMERGENCIA: string,
    ENFERMEDAD_LABORAL: string,
    PERDIDA_CAPACIDAD_SALUD: string,
    PLAN_SALUD_NO_EPS: string,
    PLAN_SALUD: string,
    PLAN_SALUD_OTROS: string,
    ENTIDAD_OTROS: string,
    CODIGO_EMPRESA: number
  ): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    INSERT INTO dbo.ESMAD_SALUD (
      MENU_CODIGO,
      NRO_DOCUMENTO,
      GRUPO_SANGUINEO,
      FACTOR,
      ESTATURA,
      PESO,
      RAZA,
      FUMADOR,
      BEBEDOR,
      ANTEOJOS,
      ENFERMEDADES,
      RESTRICCIONES_MEDICAS,
      FRECUENCIA_ASISTENCIA_MEDICA,
      SUFRE_ALERGIAS,
      ALERGIAS,
      CONTACTO_EMERGENCIA,
      NUMERO_CONTACTO_EMERGENCIA,
      ENFERMEDAD_LABORAL,
      PERDIDA_CAPACIDAD_SALUD,
      PLAN_SALUD_NO_EPS,
      PLAN_SALUD,
      PLAN_SALUD_OTROS,
      ENTIDAD_OTROS,
      CODIGO_EMPRESA
    ) VALUES (
      5,
      ${NRO_DOCUMENTO},
      '${GRUPO_SANGUINEO}',
      '${FACTOR}',
      '${ESTATURA}',
      '${PESO}',
      '${RAZA}',
      ${FUMADOR},
      ${BEBEDOR},
      ${ANTEOJOS},
      ${ENFERMEDADES},
      ${RESTRICCIONES_MEDICAS},
      ${FRECUENCIA_ASISTENCIA_MEDICA},
      ${SUFRE_ALERGIAS},
      ${ALERGIAS},
      ${CONTACTO_EMERGENCIA},
      ${NUMERO_CONTACTO_EMERGENCIA},
      ${ENFERMEDAD_LABORAL},
      ${PERDIDA_CAPACIDAD_SALUD},
      ${PLAN_SALUD_NO_EPS},
      ${PLAN_SALUD},
      ${PLAN_SALUD_OTROS},
      ${ENTIDAD_OTROS},
      ${CODIGO_EMPRESA}
    )
    `;
    const result = await pool.query(sql);
    
    return result.recordset;
  }

  public async modificarRegistroSalud(
    NRO_DOCUMENTO: number,
    GRUPO_SANGUINEO: string,
    FACTOR: string,
    ESTATURA: string,
    PESO: string,
    RAZA: string,
    FUMADOR: string,
    BEBEDOR: string,
    ANTEOJOS: string,
    ENFERMEDADES: string,
    RESTRICCIONES_MEDICAS: string,
    FRECUENCIA_ASISTENCIA_MEDICA: string,
    SUFRE_ALERGIAS: string,
    ALERGIAS: string,
    CONTACTO_EMERGENCIA: string,
    NUMERO_CONTACTO_EMERGENCIA: string,
    ENFERMEDAD_LABORAL: string,
    PERDIDA_CAPACIDAD_SALUD: string,
    PLAN_SALUD_NO_EPS: string,
    PLAN_SALUD: string,
    PLAN_SALUD_OTROS: string,
    ENTIDAD_OTROS: string,
    CODIGO_EMPRESA: number
  ): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    UPDATE dbo.ESMAD_SALUD 
      SET 
        GRUPO_SANGUINEO = '${GRUPO_SANGUINEO}',
        FACTOR = '${FACTOR}',
        ESTATURA = '${ESTATURA}',
        PESO = '${PESO}',
        RAZA = '${RAZA}',
        FUMADOR = ${FUMADOR},
        BEBEDOR = ${BEBEDOR},
        ANTEOJOS = ${ANTEOJOS},
        ENFERMEDADES = ${ENFERMEDADES},
        RESTRICCIONES_MEDICAS = ${RESTRICCIONES_MEDICAS},
        FRECUENCIA_ASISTENCIA_MEDICA = ${FRECUENCIA_ASISTENCIA_MEDICA},
        SUFRE_ALERGIAS = ${SUFRE_ALERGIAS},
        ALERGIAS = ${ALERGIAS},
        CONTACTO_EMERGENCIA = ${CONTACTO_EMERGENCIA},
        NUMERO_CONTACTO_EMERGENCIA = ${NUMERO_CONTACTO_EMERGENCIA},
        ENFERMEDAD_LABORAL = ${ENFERMEDAD_LABORAL},
        PERDIDA_CAPACIDAD_SALUD = ${PERDIDA_CAPACIDAD_SALUD},
        PLAN_SALUD_NO_EPS = ${PLAN_SALUD_NO_EPS},
        PLAN_SALUD = ${PLAN_SALUD},
        PLAN_SALUD_OTROS = ${PLAN_SALUD_OTROS},
        ENTIDAD_OTROS = ${ENTIDAD_OTROS}
    WHERE 
        NRO_DOCUMENTO = ${NRO_DOCUMENTO}
        AND CODIGO_EMPRESA = ${CODIGO_EMPRESA}
    `;
    
    const result = await pool.query(sql);
    
    return result.recordset;
  }

  public async tieneRegistroSaludKactus(cedula: number, empresa: number): Promise<any> {
    const pool = await mssqlKactus;
    const sql = `
    SELECT
        bi_datad.cod_empr,
        bi_datad.cod_empl
    FROM
        dbo.nm_contr
        INNER JOIN dbo.bi_datad
          ON nm_contr.cod_empr = bi_datad.cod_empr
             AND nm_contr.cod_empl = bi_datad.cod_empl
    WHERE
        nm_contr.cod_empr = ${empresa}
        AND nm_contr.cod_empl = ${cedula}
        AND nm_contr.ind_acti = 'A'
    `;
    
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async crearRegistroSaludKactus(
    cedula: number, 
    empresa: number,
    GRUPO_SANGUINEO: string,
    FACTOR: string,
    ESTATURA: string,
    PESO: string,
    RAZA: string,
    FUMADOR: string,
    BEBEDOR: string,
    ANTEOJOS: string,
    ENFERMEDADES: string,
    SUFRE_ALERGIAS: string,
    ALERGIAS: string,
    NUMERO_CONTACTO_EMERGENCIA: string,
    ENFERMEDAD_LABORAL: string,
    PERDIDA_CAPACIDAD_SALUD: string,
    PLAN_SALUD: string,
    PLAN_SALUD_OTROS: string,
    ENTIDAD_OTROS: string,
    USU_creacion: string,
    act_hora: string
    ): Promise<any> {
    const pool = await mssqlKactus;
    const sql = `
    INSERT INTO dbo.bi_datad (
      cod_empr,
      cod_empl,
      gru_sang,
      fac_sang,
      est_empl,
      est_peso,
      COD_RAZA,
      est_fuma,
      est_bebe,
      usa_ante,
      enf_aler,
      ALE_RGIC,
      ALE_OTRO,
      TEL_EMER,
      ENF_LACA,
      GRA_PCSA,
      PLA_SALU,
      OTR_POLI,
      OTR_PLAN,
      act_usua,
      act_hora,
      act_esta
    ) VALUES (
      ${empresa},
      ${cedula},
      '${GRUPO_SANGUINEO}',
      '${FACTOR}',
      '${ESTATURA}',
      '${PESO}',
      '${RAZA}',
      ${FUMADOR},
      ${BEBEDOR},
      ${ANTEOJOS},
      ${ENFERMEDADES},
      ${SUFRE_ALERGIAS},
      ${ALERGIAS},
      ${NUMERO_CONTACTO_EMERGENCIA},
      ${ENFERMEDAD_LABORAL},
      ${PERDIDA_CAPACIDAD_SALUD},
      ${PLAN_SALUD},
      ${PLAN_SALUD_OTROS},
      ${ENTIDAD_OTROS},
      '${USU_creacion}',
      '${act_hora}',
      'M'
    )
    `;
    const result = await pool.query(sql);

    return result.recordset;
  }

  public async modificarRegistroSaludKactus(
    cedula: number, 
    empresa: number,
    GRUPO_SANGUINEO: string,
    FACTOR: string,
    ESTATURA: string,
    PESO: string,
    RAZA: string,
    USU_creacion: string,
    act_hora: string
  ): Promise<any> {
    const pool = await mssqlKactus;
    const sql = `
    UPDATE dbo.bi_datad 
      SET 
        gru_sang = '${GRUPO_SANGUINEO}',
        fac_sang = '${FACTOR}',
        est_empl = '${ESTATURA}',
        est_peso = '${PESO}',
        cod_raza = '${RAZA}',
        act_usua = '${USU_creacion}',
        act_hora = '${act_hora}'
    WHERE 
        cod_empr = ${empresa}
        AND cod_empl = ${cedula}
    `;
    const result = await pool.query(sql);
    
    return result.recordset;
  }

  public async tieneRegistroReporteEmbarazo(empresa: number, cedula: number): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    SELECT
        ESMAD_REPORTE_EMBARAZO.REPORTE_EMBARAZO_CODIGO
    FROM
        SERVCLO09.kactus.dbo.nm_contr
        LEFT JOIN dbo.ESMAD_REPORTE_EMBARAZO
          ON nm_contr.cod_empr = ESMAD_REPORTE_EMBARAZO.CODIGO_EMPRESA
             AND nm_contr.cod_empl = ESMAD_REPORTE_EMBARAZO.NRO_DOCUMENTO
    WHERE
        nm_contr.cod_empr = ${empresa}
        AND nm_contr.cod_empl = ${cedula}
        AND nm_contr.ind_acti = 'A'
    `;
    
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async crearRegistroReporteEmbarazo(
    CODIGO_EMPRESA: number,
    NRO_DOCUMENTO: number,
    EMBARAZO_ALTO_RIESGO: string,
    FECHA_EXAMEN_EMBARAZO: string,
    TIEMPO_GESTACION: string,
    FECHA_PARTO: string,
    OBSERVACION: string
    ): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    INSERT INTO dbo.ESMAD_REPORTE_EMBARAZO (
      CODIGO_EMPRESA,
      NRO_DOCUMENTO,
      EMBARAZO_ALTO_RIESGO,
      FECHA_EXAMEN_EMBARAZO,
      TIEMPO_GESTACION,
      FECHA_PARTO,
      OBSERVACION
    ) VALUES (
      ${CODIGO_EMPRESA},
      ${NRO_DOCUMENTO},
      ${EMBARAZO_ALTO_RIESGO},
      ${FECHA_EXAMEN_EMBARAZO},
      ${TIEMPO_GESTACION},
      ${FECHA_PARTO},
      ${OBSERVACION}
    )
    `;
    
    const result = await pool.query(sql);

    return result.recordset;
  }

  public async actualizarRegistroReporteEmbarazo(
    REPORTE_EMBARAZO_CODIGO: number,
    EMBARAZO_ALTO_RIESGO: string,
    FECHA_EXAMEN_EMBARAZO: string,
    TIEMPO_GESTACION: string,
    FECHA_PARTO: string,
    OBSERVACION: string
    ): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    UPDATE dbo.ESMAD_REPORTE_EMBARAZO 
      SET
        EMBARAZO_ALTO_RIESGO = ${EMBARAZO_ALTO_RIESGO},
        FECHA_EXAMEN_EMBARAZO = ${FECHA_EXAMEN_EMBARAZO},
        TIEMPO_GESTACION = ${TIEMPO_GESTACION},
        FECHA_PARTO = ${FECHA_PARTO},
        OBSERVACION = ${OBSERVACION}
    WHERE 
      REPORTE_EMBARAZO_CODIGO = ${REPORTE_EMBARAZO_CODIGO}
    `;
    const result = await pool.query(sql);

    return result.recordset;
  }

}
