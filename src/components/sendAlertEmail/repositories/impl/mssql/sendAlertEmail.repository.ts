
import { SendAlertEmailRepository } from "../../sendAlertEmail.repository";

export class SendAlertEmailMSSQLRepository implements SendAlertEmailRepository {

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
    const query = ``;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return true;
    }

    return false;

  }

}
