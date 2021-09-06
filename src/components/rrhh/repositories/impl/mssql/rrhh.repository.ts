import { mssqlBiplus, mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
import { RrhhRepository } from "../../rrhh.repository";

export class RrhhMSSQLRepository implements RrhhRepository {

  public async saveFormRRHH(data: any): Promise<any> {

    const dataForm = data.allData.dataForm;
    const dataUser = data.allData.dataUser;
    (dataForm.numeroTelefonico !== 0) && (dataUser.numeroCelular = dataForm.numeroTelefonico);
    const tipoSolicitud = this.validarTipoSolicitud(dataForm.formulario, dataForm.categoria);
    const tipoContacto = this.validarTipoContacto(dataForm.tipoContacto);

    let responseSaveInfo = await this.saveUserInfo(dataUser, dataForm, tipoSolicitud, tipoContacto);

    if (responseSaveInfo) {
      let mensajeCorreo = this.validarMensajeCorreo(dataForm.tipoContacto, dataUser.numeroCelular, dataForm.correoEnvioRespuesta);

      // let correo = `andres.latorre@visionymarketing.com.co;cis.neiva@visionymarketing.com.co;Alexander.escobar@listos.com.co`;
      let correo = `jose.avila@visionymarketing.com.co`;
      let asunto = `Solicitud - Oficina Virtual`;
      let titulo = `Solicitud de ${tipoSolicitud.tipoSol}`;
      let mensaje = `<p>El empleado  ${dataUser.nombres} ${dataUser.apellidos} identificado con la cédula: ${dataUser.cedula} ha generado una solicitud de:  ${tipoSolicitud.tipoSol} desde la oficina virtual.</p> <p>Descripción: ${dataForm.descripcion} </p> ${mensajeCorreo}`;
      let copia = ``;

      this.AlertaHtml(correo, '', asunto, titulo, mensaje, copia, mssqlBiplus);

      return true;
    }

    return false;
  }


  private validarTipoContacto(data: String) {
    let response = {};

    switch (data) {
      case 'wpp':
        response = {
          otro: 'W',
          alterno: 'NULL',
          otroD: 1,
        }
        break;

      case 'llamada':
        response = {
          otro: 'L',
          alterno: 'NULL',
          otroD: 1,
        }
        break;

      default:
        response = {
          otro: '',
          alterno: 377,
        }
        break;
    }

    return response;
  }


  private validarTipoSolicitud(data: String, categoria: any) {
    let response: any = {};

    switch (data) {
      case 'estamosParaTi':
        response = {
          tipoSolicitud: 889,
          tipoSol: 'ESTAMOS PARA TI',
          categoria,
        }
        break;

      case 'SolicitudesRRHH':
        response = {
          tipoSolicitud: 888,
          tipoSol: 'SOLICITUDES RRHH',
          categoria,
        }
        break;

      case 'talkToUs':
        response = {
          tipoSolicitud: 890,
          tipoSol: 'TALK TO US',
          categoria: 890,
        }
        break;
    }

    return response;
  }


  private getDateToday = () => {

    let dateFormat = new Date();
    let day = ("0" + dateFormat.getDate()).slice(-2);
    let month = ("0" + (dateFormat.getMonth() + 1)).slice(-2);
    let year = dateFormat.getFullYear();

    return `${year}-${month}-${day}`;

  }


  private async saveUserInfo(dataUser: any, dataForm: any, tipoSolicitud: any, tipoContacto: any,): Promise<any> {

    const now = this.getDateToday();
    const pool = await mssqlEsmad;

    const query = `
          INSERT INTO ESMAD_OV_TICKETS 
            ( OVT_CEDULA, OVT_NOMBRE, OVT_CORREO, OVT_CELULAR, OVT_ESTADO, OVT_EMPRESA, OVT_CENTRO_COSTOS, OVT_TIPO_TICKET, OVT_CATEGORIA, OVT_DESCRIPCION, OVT_MEDIO_SOLICITUD, OVT_RESPUESTA_ALTERNA, FECHA_CREACION, USUARIO_CREACION, FECHA_MODIFICACION, USUARIO_MODIFICACION, ESTADO, OVT_TIPO_OV, TIP_CODIGO ) 
          VALUES 
            ( '${dataUser.cedula}', '${dataUser.nombres}', '${dataForm.correoEnvioRespuesta}', '${dataUser.numeroCelular}', 'ACTIVO', ${dataUser.empresa}, '${dataUser.cCostos}', ${tipoSolicitud.tipoSolicitud}, ${tipoSolicitud.categoria}, '${dataForm.descripcion.replace("'", "")}', ${tipoContacto.alterno}, '${tipoContacto.otro}', '${now}', '${dataUser.cedula}', '${now}', '${dataUser.cedula}', 1, 'S', 380 )
    `;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return true;
    }

    return false;
  }


  private validarMensajeCorreo(tipoContacto: String, numero: any, mail: any) {
    let response = '';

    switch (tipoContacto) {
      case 'llamada':
        response = `<p>El empleado desea que su respuesta sea por via llamada teléfonica, al numero: ${numero} <p>`;
        break;

      case 'wpp':
        response = `<p>El empleado desea que su respuesta sea via WhatsApp, al numero: ${numero} <p>`;
        break;

      default:
        response = `El empleado desea que su respuesta sea via correo electrónico, al correo: ${mail}`;
        break;
    }

    return response;
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
                        <img src="https://www.listos.com.co/modprueba/libs/imagenes/oficinavirtual/header.jpg" alt="Creating Email Magic" style="display: block; width: 70%" />
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
                            <img src="https://www.listos.com.co/modprueba/libs/imagenes/oficinavirtual/footer.jpg" alt="Creating Email Magic" style="display: block; width: 70% " />
  
                          </tr>
                          <tr style="text-align: center;">
                            <p style="font-size: 10px;">Esta es una cuenta de correo no monitoreada, por favor no responda este mensaje.</p>
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
