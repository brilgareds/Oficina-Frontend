import { mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
import { InformacionBasicaRepository } from "../../informacionBasica.repository";

export class InformacionBasicaMSSQLRepository implements InformacionBasicaRepository {
  public async buscarDatos(cedula: number, empresa: number): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
    SELECT
        ESMAD_INFORMACION_BASICA.INFORMACION_BASICA_CODIGO,
        ESMAD_INFORMACION_BASICA.MENU_CODIGO,
        bi_emple.pai_resi AS PAI_RESI,
        CASE
          WHEN ESMAD_INFORMACION_BASICA.TIP_CODIGO_DOCUMENTO IS NOT NULL
            THEN ESMAD_INFORMACION_BASICA.TIP_CODIGO_DOCUMENTO
          ELSE bi_emple.tip_docu
        END AS TIP_CODIGO_DOCUMENTO,
        CASE
          WHEN ESMAD_INFORMACION_BASICA.NRO_DOCUMENTO IS NOT NULL
            THEN ESMAD_INFORMACION_BASICA.NRO_DOCUMENTO
          ELSE nm_contr.cod_empl
        END AS NRO_DOCUMENTO,
        CASE
          WHEN ESMAD_INFORMACION_BASICA.NOMBRES IS NOT NULL
            THEN ESMAD_INFORMACION_BASICA.NOMBRES
          ELSE RTRIM(LTRIM(bi_emple.nom_empl))
        END AS NOMBRES,
        CASE
          WHEN ESMAD_INFORMACION_BASICA.APELLIDOS IS NOT NULL
            THEN ESMAD_INFORMACION_BASICA.APELLIDOS
          ELSE RTRIM(LTRIM(bi_emple.ape_empl))
        END AS APELLIDOS,
        CASE
          WHEN ESMAD_INFORMACION_BASICA.SEXO IS NOT NULL
            THEN ESMAD_INFORMACION_BASICA.SEXO
          ELSE bi_emple.sex_empl
        END AS SEXO,
        CASE
          WHEN ESMAD_INFORMACION_BASICA.FECHA_NACIMIENTO IS NOT NULL
            THEN convert(varchar, ESMAD_INFORMACION_BASICA.FECHA_NACIMIENTO, 110)
          ELSE convert(varchar, bi_emple.fec_naci, 23)
        END AS FECHA_NACIMIENTO,
        CASE
          WHEN ESMAD_INFORMACION_BASICA.ESTADO_CIVIL IS NOT NULL
            THEN ESMAD_INFORMACION_BASICA.ESTADO_CIVIL
          ELSE bi_emple.est_civi
        END AS ESTADO_CIVIL,
        CASE
          WHEN ESMAD_INFORMACION_BASICA.DEPARTAMENTO_RESIDENCIA IS NOT NULL
            THEN ESMAD_INFORMACION_BASICA.DEPARTAMENTO_RESIDENCIA
          ELSE bi_emple.dto_resi
        END AS DEPARTAMENTO_RESIDENCIA,
        RTRIM(LTRIM(departamento.nom_mpio)) as nom_mpio,
        CASE
          WHEN ESMAD_INFORMACION_BASICA.CIUDAD_RESIDENCIA IS NOT NULL
            THEN ESMAD_INFORMACION_BASICA.CIUDAD_RESIDENCIA
          ELSE bi_emple.mpi_resi
        END AS CIUDAD_RESIDENCIA,
        RTRIM(LTRIM(Nivel3.nom_nive)) nomCiudad,
        CASE
          WHEN ESMAD_INFORMACION_BASICA.BARRIO_RESIDENCIA IS NOT NULL
            THEN ESMAD_INFORMACION_BASICA.BARRIO_RESIDENCIA
          ELSE RTRIM(LTRIM(bi_emple.bar_resi))
        END AS BARRIO_RESIDENCIA,
        ESMAD_INFORMACION_BASICA.LOCALIDAD_RESIDENCIA,
        CASE
          WHEN ESMAD_INFORMACION_BASICA.DIRECCION_COMPLETA IS NOT NULL
            THEN ESMAD_INFORMACION_BASICA.DIRECCION_COMPLETA
          ELSE RTRIM(LTRIM(bi_emple.dir_resi))
        END AS DIRECCION_COMPLETA,
        CASE
          WHEN ESMAD_INFORMACION_BASICA.EMAIL_PERSONAL IS NOT NULL
            THEN ESMAD_INFORMACION_BASICA.EMAIL_PERSONAL
          ELSE RTRIM(LTRIM(bi_emple.eee_mail))
        END AS EMAIL_PERSONAL,
        CASE
          WHEN ESMAD_INFORMACION_BASICA.EMAIL_CORPORATIVO IS NOT NULL
            THEN ESMAD_INFORMACION_BASICA.EMAIL_CORPORATIVO
          ELSE RTRIM(LTRIM(bi_emple.box_mail))
        END AS EMAIL_CORPORATIVO,
        CASE
          WHEN ESMAD_INFORMACION_BASICA.CELULAR_CONTACTO IS NOT NULL
            THEN ESMAD_INFORMACION_BASICA.CELULAR_CONTACTO
          ELSE RTRIM(LTRIM(bi_emple.tel_movi))
        END AS CELULAR_CONTACTO,
        CASE
          WHEN ESMAD_INFORMACION_BASICA.CELULAR_CORPORATIVO IS NOT NULL
            THEN ESMAD_INFORMACION_BASICA.CELULAR_CORPORATIVO
          ELSE RTRIM(LTRIM(bi_emple.tel_trab))
        END AS CELULAR_CORPORATIVO,
        RTRIM(LTRIM(nm_contr.cod_niv2)) AS NIVEL2,
        RTRIM(LTRIM(Nivel2.nom_nive)) AS nomNivel2,
        RTRIM(LTRIM(nm_contr.cod_niv4)) AS NIVEL4,
        RTRIM(LTRIM(Nivel4.nom_nive)) AS nomNivel4,
        RTRIM(LTRIM(nm_contr.cod_niv5)) AS NIVEL5,
        RTRIM(LTRIM(Nivel5.nom_nive)) AS nomNivel5,
        nm_contr.cod_carg AS CARGO_ACTUAL,
        RTRIM(LTRIM(bi_cargo.nom_carg)) AS nom_carg,
        ESMAD_INFORMACION_BASICA.ANTIGUEDAD_EMPRESA,
        ESMAD_INFORMACION_BASICA.PLAN_CARRERA,
        ESMAD_INFORMACION_BASICA.NRO_CARGOS,
        ESMAD_INFORMACION_BASICA.CARGOS_OCUPADOS,
        ESMAD_TALLAS_EMPLEADO.USA_UNIFORME,
        ESMAD_TALLAS_EMPLEADO.TALLA_CAMISA,
        ESMAD_TALLAS_EMPLEADO.TALLA_PANTALON,
        ESMAD_TALLAS_EMPLEADO.TALLA_CALZADO
    FROM
        SERVCLO09.kactus.dbo.nm_contr
        INNER JOIN SERVCLO09.kactus.dbo.bi_emple
          ON nm_contr.cod_empl = bi_emple.cod_empl
             AND nm_contr.cod_empr = bi_emple.cod_empr
        INNER JOIN SERVCLO09.kactus.dbo.gn_nivel AS Nivel2
          ON nm_contr.cod_empr = Nivel2.cod_empr
             AND nm_contr.cod_niv2 = Nivel2.cod_nive
             AND Nivel2.num_nive = 2
             AND Nivel2.ide_arbo = 'BI'
        INNER JOIN SERVCLO09.kactus.dbo.gn_nivel AS Nivel3
          ON nm_contr.cod_empr = Nivel3.cod_empr
             AND bi_emple.mpi_resi = Nivel3.cod_nive
             AND Nivel3.num_nive = 3
             AND Nivel3.ide_arbo = 'BI'
        INNER JOIN SERVCLO09.kactus.dbo.gn_nivel AS Nivel4
          ON nm_contr.cod_empr = Nivel4.cod_empr
             AND nm_contr.cod_niv4 = Nivel4.cod_nive
             AND Nivel4.num_nive = 4
             AND Nivel4.ide_arbo = 'BI'
        LEFT JOIN SERVCLO09.kactus.dbo.gn_nivel AS Nivel5
          ON nm_contr.cod_empr = Nivel5.cod_empr
             AND nm_contr.cod_niv5 = Nivel5.cod_nive
             AND Nivel5.num_nive = 5
             AND Nivel5.ide_arbo = 'BI'
        INNER JOIN SERVCLO09.kactus.dbo.bi_cargo
          ON nm_contr.cod_carg = bi_cargo.cod_carg
             AND nm_contr.cod_empr = bi_cargo.cod_empr
             AND bi_cargo.ind_acti = 'A'
        LEFT JOIN dbo.ESMAD_INFORMACION_BASICA
          ON nm_contr.cod_empl = ESMAD_INFORMACION_BASICA.NRO_DOCUMENTO
             AND ESMAD_INFORMACION_BASICA.MENU_CODIGO = 1
        LEFT JOIN dbo.ESMAD_TIPO
          ON ESMAD_INFORMACION_BASICA.TIP_CODIGO_DOCUMENTO = ESMAD_TIPO.TIP_CODIGO
        LEFT JOIN (SELECT
                          gn_paise.cod_pais,
                          gn_paise.nom_pais,
                          Departamento.cod_dpto,
                          Departamento.nom_mpio
                  FROM
                          SERVCLO09.kactus.dbo.gn_divip Departamento
                          INNER JOIN SERVCLO09.kactus.dbo.gn_paise
                                  ON Departamento.cod_pais = gn_paise.cod_pais
                  WHERE
                          Departamento.COD_LOCA = 0
                          AND Departamento.cod_mpio = 0) AS departamento
          ON bi_emple.pai_resi = departamento.cod_pais
             AND bi_emple.dto_resi = departamento.cod_dpto
        LEFT JOIN dbo.ESMAD_TALLAS_EMPLEADO
          ON nm_contr.cod_empl = ESMAD_TALLAS_EMPLEADO.NRO_DOCUMENTO
             AND nm_contr.cod_empr = ESMAD_TALLAS_EMPLEADO.CODIGO_EMPRESA
    WHERE
        nm_contr.cod_empl = ${cedula}
        AND nm_contr.cod_empr = ${empresa}
        AND nm_contr.ind_acti = 'A'
    `;
    
    return result.recordset;
  }

  public async consultarTipDocumento(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT
          ESMAD_TIPO.TIP_ATRIBUTO1,
          ESMAD_TIPO.TIP_NOMBRE
      FROM
          dbo.ESMAD_CLASE_TIPO
          INNER JOIN dbo.ESMAD_TIPO
                  ON ESMAD_CLASE_TIPO.CLT_CODIGO = ESMAD_TIPO.CLT_CODIGO
      WHERE
          ESMAD_CLASE_TIPO.CLT_CODIGO = 40
      ORDER BY ESMAD_TIPO.TIP_NOMBRE
    `;
    
    return result.recordset;
  }

  public async consultarEstadoCivil(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT
          ESMAD_TIPO.TIP_ATRIBUTO1,
          ESMAD_TIPO.TIP_NOMBRE
      FROM
          dbo.ESMAD_CLASE_TIPO
          INNER JOIN dbo.ESMAD_TIPO
                  ON ESMAD_CLASE_TIPO.CLT_CODIGO = ESMAD_TIPO.CLT_CODIGO
      WHERE
          ESMAD_CLASE_TIPO.CLT_CODIGO = 41
      ORDER BY ESMAD_TIPO.TIP_NOMBRE
    `;
    
    return result.recordset;
  }

  public async consultarPaises(): Promise<any> {
    const pool = await mssqlKactus;
    const result = await pool.query`
      SELECT * FROM (SELECT DISTINCT
                        gn_paise.cod_pais,
                        RTRIM(LTRIM(gn_paise.nom_pais)) as nom_pais
                      FROM
                          dbo.gn_divip Departamento
                          INNER JOIN
                          dbo.gn_paise
                                  ON Departamento.cod_pais = dbo.gn_paise.cod_pais
                      WHERE
                          Departamento.COD_LOCA = 0
                          AND Departamento.cod_mpio = 0
                          AND gn_paise.cod_pais <> 0) as listaPaises
      ORDER BY listaPaises.nom_pais
    `;
    
    return result.recordset;
  }

  public async consultarDepartamentos(codPais: number): Promise<any> {
    const pool = await mssqlKactus;
    const result = await pool.query`
    SELECT * FROM (SELECT DISTINCT
                        Departamento.cod_dpto,
                        RTRIM(LTRIM(Departamento.nom_mpio)) as nom_mpio
                    FROM
                        dbo.gn_divip Departamento
                        INNER JOIN dbo.gn_paise
                          ON Departamento.cod_pais = dbo.gn_paise.cod_pais
                             AND Departamento.cod_pais = ${codPais}
                    WHERE
                        Departamento.COD_LOCA = 0
                        AND Departamento.cod_mpio = 0) AS listaDepartamentos
    ORDER BY listaDepartamentos.nom_mpio
    `;
    
    return result.recordset;
  }

  public async consultarMunicipios(codDepartamento: number): Promise<any> {
    const pool = await mssqlKactus;
    const result = await pool.query`
      SELECT * FROM (SELECT DISTINCT
                          Municipio.cod_mpio,
                          RTRIM(LTRIM(Municipio.nom_mpio)) as nom_mpio
                      FROM
                              dbo.gn_divip Departamento
                      INNER JOIN
                              dbo.gn_paise
                              ON (Departamento.cod_pais = dbo.gn_paise.cod_pais)
                              INNER JOIN
                              dbo.gn_divip Municipio
                              ON (Departamento.cod_pais = Municipio.cod_pais)
                                  AND (Departamento.cod_dpto = Municipio.cod_dpto)
                                  AND Departamento.cod_dpto = ${codDepartamento}
                      WHERE
                              Municipio.COD_LOCA = 0
                              AND Municipio.ind_mpio <> 0
                              AND Departamento.COD_LOCA = 0
                              AND Departamento.cod_mpio = 0) AS listaMunicipios
      ORDER BY listaMunicipios.nom_mpio
    `;
    
    return result.recordset;
  }

  public async consultarNomenclatura(): Promise<any> {
    const pool = await mssqlKactus;
    const result = await pool.query`
      SELECT
        GN_NOMEN.COD_NOME,
        RTRIM(LTRIM(GN_NOMEN.NOM_NOME)) as NOM_NOME
      FROM
        dbo.GN_NOMEN
    `;
    
    return result.recordset;
  }

  public async consultarAntiguedad(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT
          ESMAD_TIPO.TIP_CODIGO,
          ESMAD_TIPO.TIP_NOMBRE
      FROM
          dbo.ESMAD_CLASE_TIPO
          INNER JOIN dbo.ESMAD_TIPO
                  ON ESMAD_CLASE_TIPO.CLT_CODIGO = ESMAD_TIPO.CLT_CODIGO
      WHERE
          ESMAD_CLASE_TIPO.CLT_CODIGO = 42
      ORDER BY ESMAD_TIPO.TIP_NOMBRE
    `;
    
    return result.recordset;
  }

  public async consultarTalla(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT
          ESMAD_TIPO.TIP_CODIGO,
          ESMAD_TIPO.TIP_NOMBRE,
          ESMAD_TIPO.TIP_CODIGO2
      FROM
          dbo.ESMAD_CLASE_TIPO
          INNER JOIN dbo.ESMAD_TIPO
                  ON ESMAD_CLASE_TIPO.CLT_CODIGO = ESMAD_TIPO.CLT_CODIGO
      WHERE
          ESMAD_CLASE_TIPO.CLT_CODIGO = 43
      ORDER BY ESMAD_TIPO.TIP_NOMBRE
    `;
    
    return result.recordset;
  }

  public async consultarLabelsNivel(
    empresa: number
  ): Promise<any> {
    const pool = await mssqlKactus;
    const result = await pool.query`
      SELECT
        gn_nivel.num_nive,
        RTRIM(LTRIM(gn_nivel.nom_nive)) AS nom_nive
      FROM
          dbo.gn_nivel
      WHERE
          gn_nivel.cod_empr = ${empresa}
          AND gn_nivel.num_nive IN (2,4,5)
          AND gn_nivel.cod_nive = 0 
          AND gn_nivel.ide_arbo = 'BI'
    `;
    
    return result.recordset;
  }

  public async existeRegistro(empresa: number, cedula: number): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT
        ESMAD_INFORMACION_BASICA.INFORMACION_BASICA_CODIGO
      FROM
        SERVCLO09.kactus.dbo.nm_contr
        LEFT JOIN dbo.ESMAD_INFORMACION_BASICA
          ON nm_contr.cod_empl = ESMAD_INFORMACION_BASICA.NRO_DOCUMENTO
             AND nm_contr.cod_empr = ESMAD_INFORMACION_BASICA.CODIGO_EMPRESA
      WHERE
        nm_contr.cod_empl = ${cedula}
        AND nm_contr.cod_empr = ${empresa}
        AND nm_contr.ind_acti = 'A'
    `;
    
    return result.recordset;
  }

  public async crearRegistro(
    TIP_CODIGO_DOCUMENTO: string,
    NRO_DOCUMENTO: string,
    NOMBRES: string,
    APELLIDOS: string,
    SEXO: string,
    FECHA_NACIMIENTO: string,
    ESTADO_CIVIL: string,
    DEPARTAMENTO_RESIDENCIA: string,
    CIUDAD_RESIDENCIA: string,
    BARRIO_RESIDENCIA: string,
    LOCALIDAD_RESIDENCIA: string,
    DIRECCION_COMPLETA: string,
    EMAIL_PERSONAL: string,
    EMAIL_CORPORATIVO: string,
    CELULAR_CONTACTO: string,
    CELULAR_CORPORATIVO: string,
    ANTIGUEDAD_EMPRESA: string,
    PLAN_CARRERA: string,
    NRO_CARGOS: string,
    CARGOS_OCUPADOS: string,
    EMP_CODIGO: number): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
      INSERT INTO dbo.ESMAD_INFORMACION_BASICA (
        MENU_CODIGO,
        TIP_CODIGO_DOCUMENTO,
        NRO_DOCUMENTO,
        NOMBRES,
        APELLIDOS,
        SEXO,
        FECHA_NACIMIENTO,
        ESTADO_CIVIL,
        DEPARTAMENTO_RESIDENCIA,
        CIUDAD_RESIDENCIA,
        BARRIO_RESIDENCIA,
        LOCALIDAD_RESIDENCIA,
        DIRECCION_COMPLETA,
        EMAIL_PERSONAL,
        EMAIL_CORPORATIVO,
        CELULAR_CONTACTO,
        CELULAR_CORPORATIVO,
        ANTIGUEDAD_EMPRESA,
        PLAN_CARRERA,
        NRO_CARGOS,
        CARGOS_OCUPADOS,
        CODIGO_EMPRESA
    ) VALUES (
        2,
        ${TIP_CODIGO_DOCUMENTO},
        ${NRO_DOCUMENTO},
        ${NOMBRES},
        ${APELLIDOS},
        ${SEXO},
        ${FECHA_NACIMIENTO},
        ${ESTADO_CIVIL},
        ${DEPARTAMENTO_RESIDENCIA},
        ${CIUDAD_RESIDENCIA},
        ${BARRIO_RESIDENCIA},
        ${LOCALIDAD_RESIDENCIA},
        ${DIRECCION_COMPLETA},
        ${EMAIL_PERSONAL},
        ${EMAIL_CORPORATIVO},
        ${CELULAR_CONTACTO},
        ${CELULAR_CORPORATIVO},
        ${ANTIGUEDAD_EMPRESA},
        ${PLAN_CARRERA},
        ${NRO_CARGOS},
        ${CARGOS_OCUPADOS},
        ${EMP_CODIGO}
    )
    `;

    const result = await pool.query(sql);
    return result.recordset;

  }

  public async actualizacionRegistro(
    INFORMACION_BASICA_CODIGO: number,
    TIP_CODIGO_DOCUMENTO: string,
    NRO_DOCUMENTO: string,
    NOMBRES: string,
    APELLIDOS: string,
    SEXO: string,
    FECHA_NACIMIENTO: string,
    ESTADO_CIVIL: string,
    DEPARTAMENTO_RESIDENCIA: string,
    CIUDAD_RESIDENCIA: string,
    BARRIO_RESIDENCIA: string,
    LOCALIDAD_RESIDENCIA: string,
    DIRECCION_COMPLETA: string,
    EMAIL_PERSONAL: string,
    EMAIL_CORPORATIVO: string,
    CELULAR_CONTACTO: string,
    CELULAR_CORPORATIVO: string,
    ANTIGUEDAD_EMPRESA: string,
    PLAN_CARRERA: string,
    NRO_CARGOS: string,
    CARGOS_OCUPADOS: string,
    EMP_CODIGO:number): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
      UPDATE dbo.ESMAD_INFORMACION_BASICA 
        SET 
          TIP_CODIGO_DOCUMENTO = ${TIP_CODIGO_DOCUMENTO},
          NRO_DOCUMENTO = ${NRO_DOCUMENTO},
          NOMBRES = ${NOMBRES},
          APELLIDOS = ${APELLIDOS},
          SEXO = ${SEXO},
          FECHA_NACIMIENTO = ${FECHA_NACIMIENTO},
          ESTADO_CIVIL = ${ESTADO_CIVIL},
          DEPARTAMENTO_RESIDENCIA = ${DEPARTAMENTO_RESIDENCIA},
          CIUDAD_RESIDENCIA = ${CIUDAD_RESIDENCIA},
          BARRIO_RESIDENCIA = ${BARRIO_RESIDENCIA},
          LOCALIDAD_RESIDENCIA = ${LOCALIDAD_RESIDENCIA},
          DIRECCION_COMPLETA = ${DIRECCION_COMPLETA},
          EMAIL_PERSONAL = ${EMAIL_PERSONAL},
          EMAIL_CORPORATIVO = ${EMAIL_CORPORATIVO},
          CELULAR_CONTACTO = ${CELULAR_CONTACTO},
          CELULAR_CORPORATIVO = ${CELULAR_CORPORATIVO},
          ANTIGUEDAD_EMPRESA = ${ANTIGUEDAD_EMPRESA},
          PLAN_CARRERA = ${PLAN_CARRERA},
          NRO_CARGOS = ${NRO_CARGOS},
          CARGOS_OCUPADOS = ${CARGOS_OCUPADOS},
          CODIGO_EMPRESA = ${EMP_CODIGO}
      WHERE 
          INFORMACION_BASICA_CODIGO = ${INFORMACION_BASICA_CODIGO}
    `;
    
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async actualizacionBi_emple(
    EMP_CODIGO: number,
    NRO_DOCUMENTO_string: string,
    ESTADO_CIVIL: string,
    DEPARTAMENTO_RESIDENCIA: string,
    CIUDAD_RESIDENCIA: string,
    BARRIO_RESIDENCIA: string,
    DIRECCION_COMPLETA: string,
    EMAIL_PERSONAL: string,
    EMAIL_CORPORATIVO: string,
    CELULAR_CONTACTO: string,
    CELULAR_CORPORATIVO: string): Promise<any> {
    const pool = await mssqlKactus
    const sql = `
      UPDATE dbo.bi_emple 
        SET 
          est_civi = ${ESTADO_CIVIL},
          dto_resi = ${DEPARTAMENTO_RESIDENCIA},
          mpi_resi = ${CIUDAD_RESIDENCIA},
          bar_resi = ${BARRIO_RESIDENCIA},
          dir_resi = ${DIRECCION_COMPLETA},
          eee_mail = ${EMAIL_PERSONAL},
          box_mail = ${EMAIL_CORPORATIVO},
          tel_movi = ${CELULAR_CONTACTO},
          tel_trab = ${CELULAR_CORPORATIVO}
      WHERE 
        cod_empr = ${EMP_CODIGO}
        AND cod_empl = ${NRO_DOCUMENTO_string}
    `;
    
    const result = await pool.query(sql);
    return result.recordset;
  }

  public async existeRegistroTallas(empresa: number, cedula: number): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`
      SELECT
        ESMAD_TALLAS_EMPLEADO.TALLAS_EMPLEADO_CODIGO
      FROM
        SERVCLO09.kactus.dbo.nm_contr
        LEFT JOIN dbo.ESMAD_TALLAS_EMPLEADO
          ON nm_contr.cod_empl = ESMAD_TALLAS_EMPLEADO.NRO_DOCUMENTO
             AND nm_contr.cod_empr = ESMAD_TALLAS_EMPLEADO.CODIGO_EMPRESA
      WHERE
        nm_contr.cod_empl = ${cedula}
        AND nm_contr.cod_empr = ${empresa}
        AND nm_contr.ind_acti = 'A'
    `;
    
    return result.recordset;
  }

  public async crearRegistroTallas(
    EMP_CODIGO: number,
    NRO_DOCUMENTO: string,
    USA_UNIFORME: number,
    TALLA_CAMISA: string,
    TALLA_PANTALON: string,
    TALLA_CALZADO: string
    ): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
      INSERT INTO dbo.ESMAD_TALLAS_EMPLEADO (
        NRO_DOCUMENTO,
        CODIGO_EMPRESA,
        USA_UNIFORME,
        TALLA_CAMISA,
        TALLA_PANTALON,
        TALLA_CALZADO
    ) VALUES (
        ${NRO_DOCUMENTO},
        ${EMP_CODIGO},
        ${USA_UNIFORME},
        ${TALLA_CAMISA},
        ${TALLA_PANTALON},
        ${TALLA_CALZADO}
    )
    `;

    const result = await pool.query(sql);
    return result.recordset;

  }

  public async actualizacionRegistroTallas(
    TALLAS_EMPLEADO_CODIGO: number,
    USA_UNIFORME: number,
    TALLA_CAMISA: string,
    TALLA_PANTALON: string,
    TALLA_CALZADO: string
    ): Promise<any> {
    const pool = await mssqlEsmad
    const sql = `
      UPDATE dbo.ESMAD_TALLAS_EMPLEADO 
        SET 
          USA_UNIFORME = ${USA_UNIFORME},
          TALLA_CAMISA = ${TALLA_CAMISA},
          TALLA_PANTALON = ${TALLA_PANTALON},
          TALLA_CALZADO = ${TALLA_CALZADO}
      WHERE 
        TALLAS_EMPLEADO_CODIGO = ${TALLAS_EMPLEADO_CODIGO}
    `;
    
    const result = await pool.query(sql);
    return result.recordset;
  }

}
