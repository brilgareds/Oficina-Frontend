import { mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
import { InclusionBeneficiariosRepository } from "../../inclusionBeneficiarios.repository";



export class InclusionBeneficiariosMSSQLRepository implements InclusionBeneficiariosRepository {

  public async getBeneficiariesByUser(cedula: number): Promise<any> {

    try {

      const pool = await mssqlKactus;
      const query = `
                              SELECT 
                                  cod_empr, 
                                  cod_empl, 
                                  tip_rela, 
                                  est_vida, 
                                  cod_fami, 
                                  tip_iden, 
                                  ape_fami, 
                                  nom_fami, 
                                  sex_fami, 
                                  DATEDIFF(YEAR,fec_naci,GETDATE()) AS Edad, 
                                  CONVERT(DATE,fec_naci)            AS fec_naci, 
                                  BEN_CACO, 
                                  ben_eeps
                              FROM 
                                  dbo.bi_famil
                              WHERE 
                                  bi_famil.cod_empl = ${cedula}
      `;

      const result = await pool.query(query);

      if (result.rowsAffected) {
        return result.recordset;
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }

  }



  public async getTipoDocumentoBeneficiario(): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                              SELECT 
                                  TIP_CODIGO, 
                                  TIP_NOMBRE
                              FROM 
                                  dbo.ESMAD_TIPO
                              WHERE 
                                  CLT_CODIGO = 26 
                              AND ESTADO = 1
      `;

      const result = await pool.query(query);

      if (result.rowsAffected) {
        return result.recordset;
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }

  }

  public async getCajasBeneficiario(cedula: number): Promise<any> {

    try {

      const pool = await mssqlKactus;
      const query = `
                              SELECT 
                                  nm_cuent.cod_enti, 
                                  nom_enti
                              FROM 
                                  dbo.nm_cuent 
                              LEFT JOIN 
                                  dbo.nm_entid
                              ON 
                                  ( 
                                      nm_cuent.cod_empr = nm_entid.cod_empr) 
                              AND 
                                  ( 
                                      nm_cuent.cod_enti = nm_entid.cod_enti) 
                              AND 
                                  ( 
                                      nm_cuent.tip_enti = nm_entid.tip_enti)
                              WHERE 
                                  cod_empl = ${cedula}
                              AND nm_cuent.tip_enti = 'CCF' 
                              AND nm_entid.cod_sucu = 0
      `;

      const result = await pool.query(query);

      if (result.rowsAffected) {
        return result.recordset;
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }

  }



  public async consultarParentesco(condicionDinamica: string): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                              SELECT 
                                  TIP_CODIGO, 
                                  TIP_NOMBRE
                              FROM 
                                  dbo.ESMAD_TIPO
                              WHERE 
                                  ESMAD_TIPO.CLT_CODIGO = 27 ${condicionDinamica}
      `;

      const result = await pool.query(query);

      if (result.rowsAffected) {
        return result.recordset;
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }

  }



  public async consultarArchivosBeneficiarios(condicionDinamica: string, tipParentesco: number): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                              SELECT 
                                  TIP_CODIGO, 
                                  TIP_CODIGO2, 
                                  EMP_CODIGO, 
                                  CLT_CODIGO, 
                                  TIP_NOMBRE, 
                                  TIP_ATRIBUTO3
                              FROM 
                                  dbo.ESMAD_TIPO
                              WHERE 
                                  CLT_CODIGO = 28 
                              AND TIP_CODIGO2 = ${tipParentesco}
                              AND ESTADO = 1 ${condicionDinamica}; 
      `;

      const result = await pool.query(query);

      if (result.rowsAffected) {
        return result.recordset;
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }

  }



  public async guardarSolicitud(cedula: any, nombreUsuario: any, telefono: any, correoElectronico: any, empresa: any): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                            INSERT INTO 
                              dbo.ESMAD_BENEFICIARIOS_SOLICITUD
                              ( 
                                  BENEF_CEDULA, 
                                  BENEF_NOMBRE, 
                                  BENEF_TEL, 
                                  BENEF_CORREO, 
                                  USUARIO_CREACION, 
                                  FECHA_CREACION, 
                                  USUARIO_MODIFICACION, 
                                  FECHA_MODIFICACION, 
                                  ESTADO, 
                                  BENEF_EMP 
                              )
                              VALUES 
                              ( 
                                  ${cedula},
                                  '${nombreUsuario}',
                                  '${telefono}',
                                  '${correoElectronico}',
                                  '${cedula}',
                                  GETDATE(),
                                  '${cedula}',
                                  GETDATE(),
                                  1,
                                  ${empresa}
                              )
      `;

      const result = await pool.query(query);

      if (result.rowsAffected) {
        return await this.consultaConsecutivoSolicitud();
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }

  }


  private async consultaConsecutivoSolicitud(): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                              SELECT 
                                  DISTINCT IDENT_CURRENT('dbo.ESMAD_BENEFICIARIOS_SOLICITUD') BENEF_CODIGO
                              FROM 
                                  dbo.ESMAD_BENEFICIARIOS_SOLICITUD
      `;

      const result = await pool.query(query);

      if (result.rowsAffected) {
        return result.recordset[0];
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }

  }


  public async guardarBeneficiario(idsolicitud: any, tipoDocumento: any, cedulaBeneficiario: any, nombreBeneficiario: any, apellidoBeneficiario: any, eps: any, caja: any, fechaNacimientoBeneficiario: any, cedula: any, tipoParentesco: any): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                            INSERT INTO 
                              dbo.ESMAD_BENEFICIARIOS
                              ( 
                                  BENEF_SOLICITUD_COD, 
                                  BENEF_TIPO_DOCUMENTO, 
                                  BENEF_NUMERO_DOCUMENTO, 
                                  BENEF_NOMBRES, 
                                  BENEF_APELLIDOS, 
                                  BENEF_EPS, 
                                  BENEF_CAJA, 
                                  BENEF_FECHA_NACIMIENTO, 
                                  USUARIO_CREACION, 
                                  FECHA_CREACION, 
                                  USUARIO_MODIFICACION, 
                                  FECHA_MODIFICACION, 
                                  ESTADO, 
                                  BENEF_PARENTESCO 
                              )
                              VALUES 
                              ( 
                                  ${idsolicitud}, 
                                  '${tipoDocumento}', 
                                  ${cedulaBeneficiario}, 
                                  '${nombreBeneficiario}', 
                                  '${apellidoBeneficiario}', 
                                  '${eps}', 
                                  '${caja}', 
                                  '${fechaNacimientoBeneficiario}', 
                                  '${cedula}', 
                                  GETDATE(), 
                                  '${cedula}', 
                                  GETDATE(), 
                                  1, 
                                  ${tipoParentesco} 
                              )
      `;

      const result = await pool.query(query);

      if (result.rowsAffected) {
        return await this.consultaConsecutivoBeneficiario();
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }

  }


  private async consultaConsecutivoBeneficiario(): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                              SELECT 
                                  DISTINCT IDENT_CURRENT('dbo.ESMAD_BENEFICIARIOS_SOLICITUD') BENEF_CODIGO
                              FROM 
                                  dbo.ESMAD_BENEFICIARIOS_SOLICITUD
      `;

      const result = await pool.query(query);

      if (result.rowsAffected) {
        return result.recordset[0];
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }

  }


  public async guardarBeneficiarioArchivos(codigoBeneficiario: any, urlFile: any, cedula: any, codigoTipoArchivo: any): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                            INSERT INTO 
                              dbo.ESMAD_BENEFICIARIOS_ARCHIVOS
                              ( 
                                  BENEF_CODIGO, 
                                  ARCH_RUTA, 
                                  USUARIO_CREACION, 
                                  FECHA_CREACION, 
                                  USUARIO_MODIFICACION, 
                                  FECHA_MODIFICACION, 
                                  ESTADO, 
                                  ARCH_ESTADO, 
                                  ARCH_CODIGO_DOCUMENTO 
                              )
                              VALUES 
                              ( 
                                  ${codigoBeneficiario}, 
                                  '${urlFile}', 
                                  '${cedula}', 
                                  GETDATE(), 
                                  '${cedula}', 
                                  GETDATE(), 
                                  1, 
                                  1, 
                                  ${codigoTipoArchivo} 
                              )
      `;

      const result = await pool.query(query);

      if (result.rowsAffected) {
        return true;
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }

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


  public async consultarBeneficiarios(cedula: number): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                                SELECT 
                                    ESMAD_BENEFICIARIOS_SOLICITUD.BENEF_CODIGO, 
                                    ESMAD_BENEFICIARIOS_SOLICITUD.BENEF_CEDULA, 
                                    ESMAD_BENEFICIARIOS_SOLICITUD.BENEF_NOMBRE, 
                                    ESMAD_BENEFICIARIOS_SOLICITUD.FECHA_CREACION,
                                    ESMAD_BENEFICIARIOS_SOLICITUD.ESTADO, 
                                    BENEF_NUMERO_DOCUMENTO, 
                                    BENEF_NOMBRES, 
                                    BENEF_APELLIDOS, 
                                    BENEF_EPS, 
                                    BENEF_CAJA, 
                                    BENEF_FECHA_NACIMIENTO, 
                                    ESMAD_BENEFICIARIOS.BENEF_PARENTESCO, 
                                    TIP_NOMBRE
                                FROM 
                                    dbo.ESMAD_BENEFICIARIOS_SOLICITUD 
                                INNER JOIN 
                                    dbo.ESMAD_BENEFICIARIOS
                                ON 
                                    ( 
                                        ESMAD_BENEFICIARIOS_SOLICITUD.BENEF_CODIGO = ESMAD_BENEFICIARIOS.BENEF_SOLICITUD_COD) 
                                INNER JOIN 
                                    dbo.ESMAD_TIPO
                                ON 
                                    ( 
                                        ESMAD_BENEFICIARIOS.BENEF_PARENTESCO = ESMAD_TIPO.TIP_CODIGO)
                                WHERE 
                                    BENEF_CEDULA = ${cedula}
      `;

      const result = await pool.query(query);

      if (result.rowsAffected) {
        return result.recordset;
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }

  }


  public async consultarArchivosBenefactor(codigoBenefactor: number): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                                SELECT 
                                    ARCH_CODIGO, 
                                    ESMAD_BENEFICIARIOS_ARCHIVOS.BENEF_CODIGO, 
                                    ARCH_ESTADO, 
                                    ARCH_MOTIVO_RECHAZO,
                                    TIPO_RECHAZO.TIP_NOMBRE   AS RECHAZO, 
                                    dbo.ESMAD_TIPO.TIP_NOMBRE AS NOMBRE, 
                                    ARCH_RUTA, 
                                    BENEF_CEDULA
                                FROM 
                                    dbo.ESMAD_BENEFICIARIOS_ARCHIVOS 
                                INNER JOIN 
                                    dbo.ESMAD_TIPO
                                ON 
                                    ( 
                                        ESMAD_BENEFICIARIOS_ARCHIVOS.ARCH_CODIGO = ESMAD_TIPO.TIP_CODIGO) 
                                LEFT JOIN 
                                    dbo.ESMAD_TIPO AS TIPO_RECHAZO
                                ON 
                                    ARCH_MOTIVO_RECHAZO = TIPO_RECHAZO.TIP_CODIGO 
                                INNER JOIN 
                                    dbo.ESMAD_BENEFICIARIOS_SOLICITUD
                                ON 
                                    ( 
                                        ESMAD_BENEFICIARIOS_ARCHIVOS.BENEF_CODIGO = ESMAD_BENEFICIARIOS_SOLICITUD.BENEF_CODIGO)
                                WHERE 
                                    ESMAD_BENEFICIARIOS_ARCHIVOS.BENEF_CODIGO = ${codigoBenefactor}
      `;

      const result = await pool.query(query);

      if (result.rowsAffected) {
        return result.recordset;
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }

  }


  public async updateArchivosInclusionBeneficiarios(codigoArchivo: any, urlFile: string, beneficiarioCodigo: any): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                            UPDATE 
                                ESMAD_BENEFICIARIOS_ARCHIVOS
                            SET 
                                ARCH_RUTA = '${urlFile}', 
                                ARCH_ESTADO = 1
                            WHERE 
                                ARCH_CODIGO = ${codigoArchivo}
      `;

      const result = await pool.query(query);

      if (result.rowsAffected) {

        const actualizarEstadoBeneficia = await this.actualizarEstadoBeneficiario(beneficiarioCodigo);
        if (actualizarEstadoBeneficia) {
          return true;
        }
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }

  }

  private async actualizarEstadoBeneficiario(beneficiarioCodigo: any): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                              UPDATE 
                                  dbo.ESMAD_BENEFICIARIOS_SOLICITUD
                              SET 
                                  ESTADO = 1
                              WHERE 
                                  ESMAD_BENEFICIARIOS_SOLICITUD.BENEF_CODIGO = ${beneficiarioCodigo}
      `;

      const result = await pool.query(query);

      if (result.rowsAffected) {
        return true;
      }

      throw new Error("Error en la consulta");

    } catch (error) {
      throw new Error(error.message);
    }

  }

}
