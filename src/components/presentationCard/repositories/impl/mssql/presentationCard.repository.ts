import { mssqlEsmad, mssqlKactus, mssqlVum } from "../../../../../services/mssql";
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

      const sql = `
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

      const result = await pool.query(sql);
        
      return result.recordset;

    } catch(e:any) { throw new Error(e.message); }
  }

  public async getContracLevel2(data: any): Promise<any> {

    try {

      const { identification } = data;
      const pool = await mssqlEsmad;

      const sql = `
        SELECT
            nm_contr.cod_empl AS cod_empl_1,
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

      const result = await pool.query(sql);

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

  public async getId(tableName: any) {

    try {

      const pool = await mssqlEsmad;

      const sql = `SELECT DISTINCT IDENT_CURRENT('${tableName}') CODIGO FROM ${tableName}`;

      const result = await pool.query(sql);

      return result.recordset;

    } catch(e:any) { throw new Error(e.message); }
  }


  public async getCity(data: any) {

    try {

      const pool = await mssqlVum;

      const sql = `
          SELECT
              dbo.SIM_CIUDAD.CIU_CODIGO,
              dbo.SIM_CIUDAD.CIU_NOMBRE

          FROM dbo.SIM_CIUDAD

          INNER JOIN dbo.SIM_DEPARTAMENTO ON SIM_DEPARTAMENTO.DEP_CODIGO = SIM_CIUDAD.DEP_CODIGO
          INNER JOIN dbo.SIM_PAIS ON SIM_PAIS.PAI_CODIGO = SIM_DEPARTAMENTO.PAI_CODIGO AND SIM_PAIS.PAI_CODIGO = 1

          WHERE
              dbo.SIM_CIUDAD.ESTADO = 1 AND
              dbo.SIM_PAIS.PAI_CODIGO = 1 AND
              dbo.SIM_CIUDAD.CIU_CODIGO = ${data.city}

          ORDER BY dbo.SIM_CIUDAD.CIU_NOMBRE ASC
      `;

      const result = await pool.query(sql);

      return result?.recordset?.[0]?.CIU_NOMBRE || '';

    } catch(e:any) { throw new Error(e.message); }
  }


  public async getAllCitiesByUser(identification: number): Promise<any> {
    const pool = await mssqlVum;
    const query = `SELECT DISTINCT
      SIM_CIUDAD.CIU_CODIGO,
      SIM_CIUDAD.CIU_NOMBRE
    FROM dbo.SIM_USUARIO
    INNER JOIN dbo.SIM_USUARIO_CLIENTE ON (dbo.SIM_USUARIO.USU_CODIGO=dbo.SIM_USUARIO_CLIENTE.USU_CODIGO)
    INNER JOIN dbo.SIM_USUARIO_ACTIVIIDAD ON (dbo.SIM_USUARIO_CLIENTE.USC_CODIGO=dbo.SIM_USUARIO_ACTIVIIDAD.USC_CODIGO)
    INNER JOIN dbo.SIM_USUARIO_PUNTO_VENTA ON (dbo.SIM_USUARIO_ACTIVIIDAD.USA_CODIGO=dbo.SIM_USUARIO_PUNTO_VENTA.USA_CODIGO)
    INNER JOIN dbo.SIM_PUNTO_VENTA_CLIENTE ON (dbo.SIM_USUARIO_PUNTO_VENTA.PDV_CODIGO=dbo.SIM_PUNTO_VENTA_CLIENTE.PDV_CODIGO)
    INNER JOIN dbo.SIM_PUNTO_VENTA ON (SIM_PUNTO_VENTA_CLIENTE.PDV_CODIGO = SIM_PUNTO_VENTA.PDV_CODIGO) 
    INNER JOIN dbo.SIM_CIUDAD ON (SIM_PUNTO_VENTA.CIU_CODIGO = SIM_CIUDAD.CIU_CODIGO)
    INNER JOIN dbo.SIM_DEPARTAMENTO ON SIM_DEPARTAMENTO.DEP_CODIGO = SIM_CIUDAD.DEP_CODIGO
    INNER JOIN dbo.SIM_PAIS ON SIM_PAIS.PAI_CODIGO = SIM_DEPARTAMENTO.PAI_CODIGO AND SIM_PAIS.PAI_CODIGO = 1      
    WHERE
    USU_NUMERO_DOCUMENTO IN(${identification}) AND
    dbo.SIM_USUARIO_PUNTO_VENTA.ESTADO = 1 AND
    SIM_USUARIO_PUNTO_VENTA.UPV_FECHA_INACTIVACION1 >= GETDATE ( )
    ORDER BY SIM_CIUDAD.CIU_NOMBRE`;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset;
    }

    return null;
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



  public async cambiarEstadoAprobacion(data:any) {

    try {

      const pool = await mssqlEsmad;

      const sql = `
          UPDATE ESMAD_SOLICITUD_CARTA SET 
              ESTADO_APROBACION = '${data.status}',
              FECHA_APROBACION = getDate(),
              FECHA_MODIFICACION = getDate()

          WHERE CEDULA_CREADOR = '${data.Cedula}'
              AND CODIGO_SOLCAR IN (${data.solicitudCarta})
              AND ESTADO = 1
              AND ESTADO_APROBACION = 'PENDIENTE'
      `;

      const response = await pool.query(sql);

      return response.rowsAffected;

    } catch (e) { console.log('Error: ', e) }
  }



  public async insertarAlertarAutomaticas(destinatario: any, copia: any, asunto: any, body: any, adjunto: any, bd: any): Promise<any> {

    const pool = await bd;
    const queryLastId = `select MAX(id) + 1 as id from dbo.alertas_automaticas2`;
    const resultLastId: any = await pool.query(queryLastId);

    if (resultLastId.rowsAffected) {

      const queryInsertAlert = `
            INSERT INTO alertas_automaticas2
              (destinatario, copia, asunto, body, estado, id, adjunto)
            VALUES 
              ('${destinatario}', '${copia}', '${asunto}', '${body}', 0, ${resultLastId.recordset[0].id}, '${adjunto}');
      `;

      const resultInsertAlert = await pool.query(queryInsertAlert);

      return (resultInsertAlert.rowsAffected) ? true : false;

    }

    return false;

  }



  public async consultarEstadoAprobacion(data:any) {

    const pool = await mssqlEsmad;

    const sql = `
        SELECT
            CODIGO_SOLCAR

        FROM
            dbo.ESMAD_SOLICITUD_CARTA

        WHERE
            CODIGO_SOLCAR IN (${data.SOLICITUD_CARTA_IDS}) AND
            ESTADO_APROBACION = 'PENDIENTE'
    `;

    const result = await pool.query(sql);

    return result.recordset;
  }


  public async crearSolicitudCarta(TIPO: any, CEDULA: any, NOMBRE: any, APELLIDO: any, CIUDAD: any, COD_PUNVEN: any, CEDULAJEFE: any, NOMBREJEFE: any, APELLIDOJEFE: any, FECHAINI: any, FECHAFIN: any, 
    USU: any, NOMBREARCHIVO: any, celularCreador: any, celularJefe: any, nombrePDV: any, centroCostos: any, noContrato: any, empresaCOD: any, date: any): Promise<any> {

    try {

      const pool = await mssqlEsmad;

      FECHAINI = (!FECHAINI) ? null : `'${FECHAINI}'`;
      FECHAFIN = (!FECHAFIN) ? null : `'${FECHAFIN}'`;

      const sql = `
        INSERT INTO dbo.ESMAD_SOLICITUD_CARTA (
          ESMAD_SOLICITUD_CARTA.TIPO,
          ESMAD_SOLICITUD_CARTA.CEDULA_CREADOR,
          ESMAD_SOLICITUD_CARTA.NOMBRE_CREADOR,
          ESMAD_SOLICITUD_CARTA.APELLIDO_CREADOR,
          ESMAD_SOLICITUD_CARTA.CIUDAD,
          ESMAD_SOLICITUD_CARTA.COD_PUNTO_VENTA,
          ESMAD_SOLICITUD_CARTA.CEDULA_JEFE,
          ESMAD_SOLICITUD_CARTA.NOMBRE_JEFE,
          ESMAD_SOLICITUD_CARTA.APELLIDO_JEFE,
          ESMAD_SOLICITUD_CARTA.FECHA_INICIO,
          ESMAD_SOLICITUD_CARTA.FECHA_FIN,
          ESMAD_SOLICITUD_CARTA.ESTADO_APROBACION,
          ESMAD_SOLICITUD_CARTA.USU_CREADOR,
          ESMAD_SOLICITUD_CARTA.FECHA_CREACION,
          ESMAD_SOLICITUD_CARTA.USU_MODIFICADOR,
          ESMAD_SOLICITUD_CARTA.FECHA_MODIFICACION,
          ESMAD_SOLICITUD_CARTA.ESTADO,
          ESMAD_SOLICITUD_CARTA.NOMBRE_ARCHIVO,
          ESMAD_SOLICITUD_CARTA.CELULAR_CREADOR,
          ESMAD_SOLICITUD_CARTA.CELULAR_JEFE,
          ESMAD_SOLICITUD_CARTA.NOMBRE_PUNTO_VENTA,
          ESMAD_SOLICITUD_CARTA.CENTRO_COSTOS,
          ESMAD_SOLICITUD_CARTA.CONTRATO_CREADOR,
          ESMAD_SOLICITUD_CARTA.COD_EMPRESA
          ) VALUES (
            '${TIPO}',
            '${CEDULA}',
            '${NOMBRE}',
            '${APELLIDO}',
            '${CIUDAD}',
            '${COD_PUNVEN}',
            '${CEDULAJEFE}',
            '${NOMBREJEFE}',
            '${APELLIDOJEFE}',
            ${FECHAINI},
            ${FECHAFIN},
            'PENDIENTE',
            '${USU}',
            '${date}',
            '${USU}',
            '${date}',
            1,
            '${NOMBREARCHIVO}',
            '${celularCreador}',
            '${celularJefe}',
            '${nombrePDV}',
            '${centroCostos}',
            '${noContrato}',
            '${empresaCOD}'
          )
      `;

      const result = await pool.query(sql);

      return result.rowsAffected;

    } catch(e:any) { throw new Error(e.message); }
  }
  
}