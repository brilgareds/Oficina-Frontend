import fs from "fs";

export const getDateToday = (getWithHours: boolean = false) => {

  const dateFormat = new Date();
  let day = ("0" + dateFormat.getDate()).slice(-2);
  let month = ("0" + (dateFormat.getMonth() + 1)).slice(-2);
  let year = dateFormat.getFullYear();
  let hours = `${dateFormat.getHours()}_${dateFormat.getMinutes()}_${dateFormat.getSeconds()}`;

  return (getWithHours) ? String(`${year}-${month}-${day}-${hours}`) : String(`${year}-${month}-${day}`);

}

export const DateInText = (date:any={}) => {
  const dateNow = new Date();
  const day = date?.day || dateNow.getDate();
  const month = date?.month || dateNow.getMonth();
  const year = date?.year || dateNow.getFullYear();

  const months = ['error', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const nameMonth = months[parseFloat(month+1)];

  const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const dayInWeek = days[new Date(year, month, day).getDay()];

  return `${dayInWeek}, ${day} de ${nameMonth} de ${year}`;
};

export const currentDate = (obj:any) => {

  const { format='english', withTime=true } = obj;

  const dateNow = new Date();
  const year    = dateNow.getFullYear();
  const day     = (`0${dateNow.getDate()}`).slice(-2);
  const hour    = (`0${dateNow.getHours()}`).slice(-2);
  const month   = (`0${dateNow.getMonth()+1}`).slice(-2);
  const minutes = (`0${dateNow.getMinutes()}`).slice(-2);
  const seconds = (`0${dateNow.getSeconds()}`).slice(-2);
  const time    = (withTime) ? ` ${hour}:${minutes}:${seconds}` : '';

  const fullDate = (
      (format === 'english') ? `${year}-${month}-${day}${time}` :
      (format === 'spanish') ? `${day}/${month}/${year}${time}` : ''
  );

  return fullDate;
}

export const getDatetime = () => {

  const dateFormat = new Date();
  let day = ("0" + dateFormat.getDate()).slice(-2);
  let month = ("0" + (dateFormat.getMonth() + 1)).slice(-2);
  let year = dateFormat.getFullYear();
  let hours = `${dateFormat.getHours()}:${dateFormat.getMinutes()}:${dateFormat.getSeconds()}`;

  return String(`${year}-${month}-${day} ${hours}`);

}

export const extraerExtensionArchivo = (fileName: string) => {
  const fileNameSplit = fileName.split('.');
  return fileNameSplit[fileNameSplit.length - 1];
}

export const limpiarNombreArchivo = (fileName: string) => {
  return fileName.replace(/ /g, "_");
}

export const CreateOrValidateFolder = (path: string) => {

  if (!fs.existsSync(path)) {
    fs.mkdir(path, (error) => {
      if (error) {
        return false;
      }
    });
  }

  return true;
}

export const AlertaHtml = (titulo: any, cuerpoMensaje: any) => {
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

  return body;

}