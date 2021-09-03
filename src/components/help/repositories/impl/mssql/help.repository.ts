import { mssqlBiplus, mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
import { HelpRepository } from "../../help.repository";

export class HelpMSSQLRepository implements HelpRepository {

  public async saveFormHelp(data: any): Promise<any> {

    const dataForm = data.allData.dataForm;
    const dataUser = data.allData.dataUser;
    (dataForm.numeroTelefonico !== 0) && (dataUser.numeroCelular = dataForm.numeroTelefonico);

    const tipoContacto = this.validarTipoContacto(dataForm.tipoContacto, dataUser.numeroCelular, dataForm.correoEnvioRespuesta);
    const validarCategoria = this.validarCategoria(dataForm, dataUser, tipoContacto);

    let responseSaveInfo = await this.saveUserInfo(dataUser, dataForm, tipoContacto, validarCategoria);

    if (responseSaveInfo) {

      // let correo = dataUser.correoEnvioRespuesta;
      const correo = `jose.avila@visionymarketing.com.co`;
      const asunto = validarCategoria.cuerpoCorreo.asunto;
      const titulo = validarCategoria.cuerpoCorreo.titulo;
      const mensaje = validarCategoria.cuerpoCorreo.cuerpo;
      const copia = ``;

      this.AlertaHtml(correo, '', asunto, titulo, mensaje, copia, mssqlBiplus);

      return true;
    }

    return false;
  }


  private validarTipoContacto(tipoContacto: String, numero: any, mail: any) {
    let response: any = {};

    switch (tipoContacto) {
      case 'wpp':
        response = {
          otro: 'W',
          cuerpoCorreo: {
            mensajeContactoCorreo: `<p>El empleado desea que su respuesta sea via WhatsApp, al numero: ${numero} <p>`,
          }
        }
        break;

      case 'llamada':
        response = {
          otro: 'L',
          cuerpoCorreo: {
            mensajeContactoCorreo: `<p>El empleado desea que su respuesta sea por via llamada teléfonica, al numero: ${numero} <p>`,
          }
        }
        break;

      default:
        response = {
          otro: null,
          cuerpoCorreo: {
            mensajeContactoCorreo: `El empleado desea que su respuesta sea via correo electrónico, al correo: ${mail}`,
          }
        }
        break;
    }

    return response;
  }


  private validarCategoria(dataForm: any, dataUser: any, tipoContacto: any) {

    let response: any = {};
    const nombreUsuario = `${dataUser.nombres} ${dataUser.apellidos}`;
    const cedulaUsuario = dataUser.cedula;
    const mensajeContacto = tipoContacto.cuerpoCorreo.mensajeContactoCorreo;
    const descripcionUsuario = dataForm.descripcion;
    const categoriaFormulario = dataForm.categoriaTxt;

    switch (dataForm.formulario) {
      case 'felicitaciones':
        response = {
          tipo_ov: 'F',
          tipo_ticket: 372,
          categoria: 374,
          cuerpoCorreo: {
            asunto: `Felicitación - Oficina Virtual`,
            titulo: `Felicitación de ${nombreUsuario}`,
            cuerpo: `<p>El empleado ${nombreUsuario} identificado con la cédula: ${cedulaUsuario} ha generado una Felicitación desde la oficina virtual.</p><p>Descripción: ${descripcionUsuario}</p>`,
          }
        }
        break;

      case 'queja':
        response = {
          tipo_ov: 'Q',
          tipo_ticket: 371,
          categoria: 373,
          cuerpoCorreo: {
            asunto: `Queja - Oficina Virtual`,
            titulo: `Inconformidad de ${nombreUsuario}`,
            cuerpo: `<p>El empleado ${nombreUsuario} identificado con la cédula: ${cedulaUsuario} ha generado una queja desde la oficina virtual.</p><p>Descripción: ${descripcionUsuario}</p> ${mensajeContacto}`,
          }
        }
        break;

      case 'solicitud':
        response = {
          tipo_ov: 'S',
          tipo_ticket: 359,
          categoria: dataForm.categoria,
          cuerpoCorreo: {
            asunto: `Solicitud - Oficina Virtual`,
            titulo: `Solicitud de ${categoriaFormulario}`,
            cuerpo: `<p>El empleado ${nombreUsuario} identificado con la cédula: ${cedulaUsuario} ha generado una solicitud de: ${categoriaFormulario} desde la oficina virtual.</p><p>Descripción: ${descripcionUsuario}</p> ${mensajeContacto}`,
          }
        }
        break;

    }

    return response;
  }


  private async saveUserInfo(dataUser: any, dataForm: any, tipoContacto: any, validarCategoria: any,): Promise<any> {

    const now = this.getDateToday();
    const pool = await mssqlEsmad;

    const query = `
                  INSERT INTO dbo.ESMAD_OV_TICKETS (
                    ESMAD_OV_TICKETS.OVT_CEDULA, 
                    ESMAD_OV_TICKETS.OVT_NOMBRE, 
                    ESMAD_OV_TICKETS.OVT_CORREO, 
                    ESMAD_OV_TICKETS.OVT_CELULAR, 
                    ESMAD_OV_TICKETS.OVT_TIPO_OV,
                    ESMAD_OV_TICKETS.OVT_CATEGORIA, 
                    ESMAD_OV_TICKETS.OVT_DESCRIPCION, 
                    ESMAD_OV_TICKETS.OVT_RESPUESTA_ALTERNA, 
                    ESMAD_OV_TICKETS.FECHA_CREACION, 
                    ESMAD_OV_TICKETS.USUARIO_CREACION,  
                    ESMAD_OV_TICKETS.ESTADO,
                    ESMAD_OV_TICKETS.OVT_CREADO,
                    ESMAD_OV_TICKETS.OVT_TIPO_TICKET,
                    ESMAD_OV_TICKETS.OVT_ESTADO,
                    ESMAD_OV_TICKETS.OVT_EMPRESA,
                    ESMAD_OV_TICKETS.OVT_CENTRO_COSTOS,
                    ESMAD_OV_TICKETS.TIP_CODIGO
                  ) VALUES (
                    '${dataUser.cedula}',
                    '${dataUser.nombres} ${dataUser.apellidos}',
                    '${dataForm.correoEnvioRespuesta}',
                    '${dataUser.numeroCelular}',
                    '${validarCategoria.tipo_ov}',
                    ${validarCategoria.categoria},
                    '${dataForm.descripcion}',
                    ${(tipoContacto.otro !== null) ? "'" + tipoContacto.otro + "'," : tipoContacto.otro + ","}
                    '${now}',
                    '${dataUser.cedula}',
                    1,
                    1,
                    ${validarCategoria.tipo_ticket},
                    '${dataUser.estado}',
                    ${dataUser.empresa},
                    ${dataUser.cCostos},
                    380
                  )
    `;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return true;
    }

    return false;
  }


  private getDateToday = () => {

    let dateFormat = new Date();
    let day = ("0" + dateFormat.getDate()).slice(-2);
    let month = ("0" + (dateFormat.getMonth() + 1)).slice(-2);
    let year = dateFormat.getFullYear();

    return `${year}-${month}-${day}`;

  }


  public async AlertaHtml(correo: any, link: any, asunto: any, titulo: any, cuerpoMensaje: any, copia: any, bd: any): Promise<any> {
    let body = `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
  
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta charset="utf-8">
            <title>Notificaciones Administrativas</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
  
          <body style="margin: 0; padding: 0;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding: 10px 0 30px 0;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-collapse: collapse;">
                    <tr>
                      <td align="center" bgcolor="" style="padding: 0px 0 30px 0; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                        <img src="https://www.listos.com.co/modprueba/libs/imagenes/smadBKOSmall.png" alt="Creating Email Magic" style="display: block; width: 70%" />
                      </td>
                    </tr>
                    <tr>
                      <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;">
                              <b> ${titulo} </b>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                               ${cuerpoMensaje} <br>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="margin: auto">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <img src="https://www.listos.com.co/modprueba/libs/imagenes/smadFooterSmall.png" alt="Creating Email Magic" style="display: block; width: 70% " />
  
                          </tr>
                          <tr>
                            <p>Esta es una cuenta de correo no monitoreada, por favor no responda este mensaje.</p>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
  
          </html>
    `;

    return this.insertarAlertarAutomaticas(correo, copia, asunto, body, '', bd);

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


}
