import { mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
import { QualificationRepository } from "../../qualification.repository";

export class QualificationMSSQLRepository implements QualificationRepository {

  public async consultarDatosUsuario(
    OVT_CEDULA: number
    ): Promise<any> {
    const pool = await mssqlKactus;
    const sql = `
      SELECT
        LTRIM(RTRIM(bi_emple.nom_empl)) AS nom_empl,
        LTRIM(RTRIM(bi_emple.ape_empl)) AS ape_empl,
        LTRIM(RTRIM(bi_emple.eee_mail)) AS eee_mail,
        bi_emple.tel_movi,
        bi_emple.cod_empr,
        nm_contr.cod_ccos
      FROM
        dbo.nm_contr
        INNER JOIN dbo.bi_emple
          ON nm_contr.cod_empr = bi_emple.cod_empr
             AND nm_contr.cod_empl = bi_emple.cod_empl
      WHERE
        nm_contr.cod_empl = ${OVT_CEDULA}
        AND nm_contr.ind_acti = 'A'
    `;
    
    const result = await pool.query(sql);
    
    return result.recordset;
  }
  public async crearRegistroQualification(
    OVT_CEDULA: number,
    OVT_NOMBRE: string,
    OVT_CORREO: string,
    OVT_CELULAR: number,
    OVT_EMPRESA: number,
    OVT_CENTRO_COSTOS: number,
    OVT_MEDIO_SOLICITUD: string,
    OVT_RESPUESTA_ALTERNA: string,
    CALIFICACION: number
    ): Promise<any> {
    const pool = await mssqlEsmad;
    const sql = `
    INSERT INTO dbo.ESMAD_OV_TICKETS (
      OVT_CEDULA, 
      OVT_NOMBRE, 
      OVT_CORREO, 
      OVT_CELULAR, 
      OVT_ESTADO, 
      OVT_EMPRESA, 
      OVT_CENTRO_COSTOS, 
      OVT_TIPO_TICKET, 
      OVT_CATEGORIA, 
      OVT_DESCRIPCION, 
      OVT_MEDIO_SOLICITUD, 
      OVT_RESPUESTA_ALTERNA, 
      FECHA_CREACION, 
      USUARIO_CREACION, 
      FECHA_MODIFICACION, 
      USUARIO_MODIFICACION, 
      ESTADO, 
      OVT_TIPO_OV, 
      TIP_CODIGO,
      CALIFICACION
    ) VALUES (
      '${OVT_CEDULA}',
      '${OVT_NOMBRE}',
      '${OVT_CORREO}',
      '${OVT_CELULAR}',
      'ACTIVO',
      ${OVT_EMPRESA},
      '${OVT_CENTRO_COSTOS}',
      1297,
      1297,
      '',
      '${OVT_MEDIO_SOLICITUD}',
      '${OVT_RESPUESTA_ALTERNA}',
      getDate(),
      '${OVT_CEDULA}',
      getDate(),
      '${OVT_CEDULA}',
      1,
      'S',
      380,
      ${CALIFICACION}
    )
    `;
    
    const result = await pool.query(sql);
    
    return result.recordset;
  }

}
