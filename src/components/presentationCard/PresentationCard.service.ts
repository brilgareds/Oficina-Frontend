import { currentDate, DateInText } from "../common/helpers/global";
import fs from 'fs';
import path from 'path';
import utf8 from 'utf8';
import md5 from 'md5';
import QRCode from 'qrcode';
import htmlPdf from 'html-pdf';

import { PresentationCardMSSQLRepository } from "./repositories/impl/mssql/presentationCard.repository";
import { PresentationCardRepository } from "./repositories/presentationCard.repository";

export class PresentationCardService {
  constructor(
    private readonly presentationCardRepository: PresentationCardMSSQLRepository
  ) { }

  public async ResquestApprovalWithMaterials(data: any) {
    console.log('In function "ResquestApprovalWithMaterials"');

    const { checkInTime, checkOutTime, salesPoints, identification, company } = data;

    let html = this.encabezadoHtml;
    const nameCity = await this.presentationCardRepository.getCity({city: data.city});
    const mencion = (data.Genero === 'M') ? 'al Sr.' : 'a la Sra.';

    const salesPointsFilter = (salesPoints.map((salePoint:any) => salePoint))?.join()?.replaceAll(' ', '_');
    const salesPointsInCity = await this.presentationCardRepository.getSalesPointsData({salesPoints});
    const contractLevel = (await this.presentationCardRepository.getContracLevel2({identification}) || [{}])[0];

    if (!contractLevel || !Object.keys(contractLevel).length) throw new Error('El usuario no tiene un jefe asignado');

    const { nom_empl, ape_empl, tel_resi, tel_movi, nom_nive2, nom_nive4, box_mail:emailBoss } = contractLevel;

    const dataCompany = (await this.presentationCardRepository.getCompanysData({company}) || [{}])[0];
    const nombreContrato = ((dataCompany?.EMP_CODIGO_KACTUS === 1) ? nom_nive4 : nom_nive2).trim();

    const nameBoss  = `${nom_empl} ${ape_empl}`;
    const phoneBoss = `${tel_resi.trim()}-${tel_movi.trim()}`;
    let arrayIds = '';
    let resp = '';
    const title = 'Carta de ingreso de materiales a punto de venta';
    const date = currentDate({});
    const listMaterials = data.materials.map(({material, cantidad, accion}:any) => `<div class="line">- ${material} X${cantidad} ${(accion == 1) ? 'Ingreso' : 'Salida'}</div>`)?.join('');
    const pdfPath = `ingresoMaterial_${identification}_${salesPointsFilter}Pendiente.pdf`;

    for (const salePoint of salesPointsInCity) {

      const QRCODE = await QRCode.toDataURL(`Carta de ingreso de materiales a punto de venta creada por - ${data.name} ${data.lastName}, Cedula - ${identification}, Fecha - ${data.DateInText}, Punto de venta - ${salePoint?.PDV_NOMBRE}, Estado de aprobación: 'PENDIENTE'`, {scale: 2});

      html += `
          <div class="page">
              <div class="line">
                  <div style="text-align: center;">
                      <img src="https://controlfdata.blob.core.windows.net/vumoffice/MicrosoftTeams-image%20(10).png" style='height: 7rem; margin-top: 2rem;' alt='Logo'>
                  </div>
              </div>

              <div class="line" style="text-align: center;">NIT ${dataCompany.EMP_NIT.toString()}</div>

              <div class="line" style='margin-top: 1rem; margin-bottom: 2rem'>${nameCity}, ${data.DateInText}</div>

              <div class="group" style='line-height: 1.2rem;'>
                  <div><b>SEÑORES</b></div>
                  <div><b>${salePoint.PDV_NOMBRE}</b></div>
                  <div><b>${salePoint.CIU_NOMBRE}</b></div>
              </div>

              <div class="group" style='margin-top: 2rem; margin-bottom: 2rem'>
                  <b>ASUNTO: INGRESO Y RETIRO DE MATERIAL Y DEGUSTACIÓN</b>
              </div>

              <div class="group">
                  <p style='text-align: justify; line-height: 1.4rem;'>
                      Por medio de la presente nos permitimos presentar ${mencion} ${data.name} ${data.lastName}
                      quien se identifica con cédula de ciudadanía No. ${data.identification}, quien se desempeña como
                      ${data.Cargo}, y presta servicio para la marca ${nombreContrato}
                  </p>
              </div>

              <div class="group" style='margin-top: 2rem; margin-bottom: 1.5rem'>
                  <p style='text-align: justify;'>
                      La presente es con el fin de solicitar el ingreso y/o salida del siguiente material al punto de venta.
                  </p>
              </div>

              <div class="group">
                ${listMaterials}            
              </div>

              <div class="group" style='margin-top: 1.5rem; margin-bottom: 1rem;'>
                  <p>Jefe inmediato: ${nameBoss}, número de contacto ${phoneBoss}</p>
              </div>

              <div class="group" style='margin-top: 4rem; margin-bottom: 1rem;'>
                  <div style="width: 49%; display: inline-block">
                      <div>Cordialmente,</div>
                      <div><img src='https://controlfdata.blob.core.windows.net/vumoffice/MicrosoftTeams-image%20(9).png' style='width: 7rem;' /></div>
                      <div>Recursos Humanos.</div>
                  </div>
                  <div style="width: 49%; display: inline-block; text-align: right;">
                    <div style='text-align: right;margin-right: 0.4rem;'>
                        <span style='text-align: center'>Verificar valides<br/>Escaneando QR</span>
                    </div>
                    <div style='text-align: right'>
                      <img src='${QRCODE}'/>
                    </div>
                  </div>
              </div>

              <div style='margin-bottom: 1rem;'>
                  
              </div>
          </div>
      `;

      resp = await (this.presentationCardRepository.crearSolicitudCarta(title, identification, data.name, data.lastName, data.city, salePoint?.PDV_CODIGO,
      contractLevel.cod_empl, contractLevel.nom_empl, contractLevel.ape_empl, checkInTime, checkOutTime, `${data.name} ${data.lastName}`,
      pdfPath, data.phone, contractLevel?.tel_movi,
      salePoint?.PDV_NOMBRE, contractLevel?.cod_ccos, contractLevel?.nro_cont?.trim(), dataCompany?.EMP_CODIGO_KACTUS, date));

      const idSolicitudCarta = (await this.presentationCardRepository.getId('ESMAD_SOLICITUD_CARTA') || [{}])[0];
      arrayIds += ((arrayIds == '') ? '' : ',') + idSolicitudCarta?.CODIGO;

    }

    html += `</body></html>`;

    console.log('Html is: ', html);

    if (!resp) throw new Error('Error al crear solicitud de carta');

    htmlPdf.create(html).toFile('test.pdf', ()=>{}); //    pdfPath

    const ruta = `/oficinaVirtual/temporales/CartasDePresentacion/ingresoMaterial_${identification}_${salesPointsFilter}Pendiente.pdf`;
    const title2 = "Carta de ingreso de materiales";
    const filePath = `../../temporales/CartasDePresentacion/ingresoMaterial_${identification}_${salesPointsFilter}Pendiente.pdf`;

    return [ruta, contractLevel.tel_movi, arrayIds, contractLevel.box_mail, title2, filePath];
  }






  public async generateQR(title:any, name:any, identification:any, dateInText:any, PDV_NOMBRE:any, estado:any) {

    const level = "M"; //Nivel de encriptacion QR LMQH de menor a mayor
    const size = 4; //Tamaño de la imagen que genera
    const data = `${title} creada por - ${name}, Cedula - ${identification}, Fecha - ${dateInText}, Punto de venta - ${PDV_NOMBRE}, Estado de aprobación: ${estado}`; //Datos que se van a guardar en el QR

    //set it to writable location, a place for temp generated PNG files
    const PNG_TEMP_DIR = "../../temporales/CartasDePresentacion/qrCartaPresentacion/";

    //html PNG location prefix
    const PNG_WEB_DIR = 'qrCartaPresentacion/';

    //ofcourse we need rights to create temp dir
    try {
        fs.existsSync(PNG_TEMP_DIR);
    } catch(err) {
        fs.mkdir(path.join(__dirname, PNG_TEMP_DIR), err => {  if (err) return console.error(err); });
    }

    let filename = `${PNG_TEMP_DIR}test.png`;
    filename = `${PNG_TEMP_DIR}test${md5(`${utf8.encode(data)}|${level}|${size}`)}.png`;

    await QRCode.toDataURL(filename);
    
    // QRCode::png(data, filename, level, size, 2);

    return filename;
  }



  public encabezadoHtml = `
      <html>
          <head>
              <meta charset="utf8">
              <title>PDF</title>
              <style>
                  html, body {
                      margin: 0;
                      padding: 0;
                      -webkit-print-color-adjust: exact;
                      box-sizing: border-box;
                      font-size: 17px;
                  }

                  body {
                      padding: 0 3rem;
                  }

                  .page {
                      position: relative;
                      display: block;
                      page-break-after: auto;
                      padding: 0;
                      margin: 0 50px 0 50px;
                      overflow: hidden;
                  }

                  @media print {
                      .page {
                        margin: 0;
                        height: 100%;
                        width: 100%;
                      }
                  }

                  .page.first {
                      border-left: 5px solid green;
                  }

                  .bottom {
                      position: absolute;
                      left: 5mm;
                      right: 5mm;
                      bottom: 5mm;
                  }

                  .group {
                      margin-top: 3mm;
                  }

                  .line {
                      position: relative;
                  }

                  .center {
                      text-align: center;
                  }

                  .logo {
                      position: relative;
                      width: 80%;
                      left: 10%;
                      top: 15%;
                  }

                  b {
                      font-size: 14px;
                  }
              </style>
          </head>
      <body>
`;



  public async ResquestApprovalWithOutMaterials(data: any) {

    let html = this.encabezadoHtml;
    const nameCity = await this.presentationCardRepository.getCity({city: data.city});

    const { checkInTime, checkOutTime, salesPoints, identification, company } = data;

    const salesPointsFilter = (salesPoints.map((salePoint:any) => salePoint))?.join()?.replaceAll(' ', '_');

    const mencion = (data.Genero === 'M') ? 'al Sr.' : 'a la Sra.';
    const salesPointsInCity = await this.presentationCardRepository.getSalesPointsData({salesPoints});
    const contractLevel = (await this.presentationCardRepository.getContracLevel2({identification}) || [{}])[0];

    if (!contractLevel || !Object.keys(contractLevel).length) throw new Error('El usuario no tiene un jefe asignado');

    const { nom_empl, ape_empl, tel_resi, tel_movi, nom_nive2, nom_nive4, box_mail:emailBoss } = contractLevel;

    const nameBoss  = `${nom_empl} ${ape_empl}`;
    const phoneBoss = `${tel_resi.trim()}-${tel_movi.trim()}`;
    const dataCompany = (await this.presentationCardRepository.getCompanysData({company}) || [{}])[0];
    const nombreContrato = ((dataCompany?.EMP_CODIGO_KACTUS === 1) ? nom_nive4 : nom_nive2).trim();
    const date = currentDate({});
    const title = (!!checkInTime) ? 'Carta de presentación a punto de venta con ingreso fuera de horario':'Carta de presentación a punto de venta';
    let arrayIds = '';
    let resp = '';
    const pdfPath = `cartaDePresentacion_${identification}_${salesPointsFilter}Pendiente.pdf`;

    /*
        ${data.city}, ${ martes, 21 de septiembre de 2021 }
    */

    for (const salePoint of salesPointsInCity) {

      const QRCODE = await QRCode.toDataURL(`Carta de ingreso de materiales a punto de venta creada por - ${data.name} ${data.lastName}, Cedula - ${identification}, Fecha - ${data.DateInText}, Punto de venta - ${salePoint?.PDV_NOMBRE}, Estado de aprobación: 'PENDIENTE'`, {scale: 2});

      html += `
          <div class="page">
              <div class="line">
                  <div style="text-align: center;">
                      <img src="https://controlfdata.blob.core.windows.net/vumoffice/MicrosoftTeams-image%20(10).png" style='height: 7rem; margin-top: 2rem;' alt='Logo'>
                  </div>
              </div>

              <div class="line" style="text-align: center;">NIT ${dataCompany.EMP_NIT.toString()}</div>

              <div class="line" style='margin-top: 1rem; margin-bottom: 2rem'>${nameCity}, ${data.DateInText}</div>

              <div class="group" style='line-height: 1.2rem;'>
                  <div><b>SEÑORES</b></div>
                  <div><b>${salePoint.PDV_NOMBRE}</b></div>
                  <div><b>${salePoint.CIU_NOMBRE}</b></div>
              </div>

              <div class="group" style='margin-top: 2rem; margin-bottom: 2rem'>
                  <b>ASUNTO: CARTA DE PRESENTACIÓN</b>
              </div>

              <div class="group">
                  <p style='text-align: justify; line-height: 1.4rem;'>
                      Por medio de la presente nos permitimos presentar ${mencion} ${data.name} ${data.lastName}
                      quien se identifica con cédula de ciudadanía No. ${data.identification}, quien se desempeña como
                      ${data.Cargo}, y presta servicio para la marca ${nombreContrato}, el
                      colaborador deberá portar el uniforme de la marca que representa y su carné de ARL en un lugar
                      visible.
                  </p>
              </div>

              <div class="group" style='margin-top: 2rem; margin-bottom: 1.5rem'>
                  <p style='text-align: justify;'>
                      Solicitamos autorización para el ingreso de su dispositivo móvil, el cual es una herramienta de trabajo y
                      se utilizará solamente para fines laborales.
                  </p>
              </div>

              <div class="group">
                  <p>${ (checkInTime) ? `El horario de permanencia en el punto será de ${checkInTime} a ${checkOutTime}.`: '' }</p>
              </div>

              <div class="group" style='margin-top: 1.5rem; margin-bottom: 1rem;'>
                  <p>Jefe inmediato: ${nameBoss}, número de contacto ${phoneBoss}</p>
              </div>

              <div class="group" style='margin-top: 4rem; margin-bottom: 1rem;'>
                  <div style="width: 49%; display: inline-block">
                      <div>Cordialmente,</div>
                      <div><img src='https://controlfdata.blob.core.windows.net/vumoffice/MicrosoftTeams-image%20(9).png' style='width: 7rem;' /></div>
                      <div>Recursos Humanos.</div>
                  </div>
                  <div style="width: 49%; display: inline-block; text-align: right;">
                    <div style='text-align: right;margin-right: 0.4rem;'>
                        <span style='text-align: center'>Verificar valides<br/>Escaneando QR</span>
                    </div>
                    <div style='text-align: right'>
                      <img src='${QRCODE}'/>
                    </div>
                  </div>
              </div>

              <div style='margin-bottom: 1rem;'>
                  
              </div>
          </div>
      `;

      resp = await (this.presentationCardRepository.crearSolicitudCarta(title, identification, data.name, data.lastName, data.city, salePoint?.PDV_CODIGO,
      contractLevel.cod_empl, contractLevel.nom_empl, contractLevel.ape_empl, checkInTime, checkOutTime, `${data.name} ${data.lastName}`,
      pdfPath, data.phone, contractLevel?.tel_movi,
      salePoint?.PDV_NOMBRE, contractLevel?.cod_ccos, contractLevel?.nro_cont?.trim(), dataCompany?.EMP_CODIGO_KACTUS, date));

      const idSolicitudCarta = (await this.presentationCardRepository.getId('ESMAD_SOLICITUD_CARTA') || [{}])[0];
      arrayIds += ((arrayIds == '') ? '' : ',') + idSolicitudCarta?.CODIGO;

    }

    html += `</body></html>`;

    if (!resp) throw new Error('Error al crear solicitud de carta');

    htmlPdf.create(html).toFile(pdfPath, ()=>{}); //    pdfPath

    const ruta = `/oficinaVirtual/temporales/CartasDePresentacion/cartaDePresentacion_${identification}_${salesPointsFilter}Pendiente.pdf`;
    const title2 = (checkInTime) ? "Carta de presentación con ingreso fuera de horario":"Carta de presentación";
    const filePath = `../../temporales/CartasDePresentacion/cartaDePresentacion_${identification}_${salesPointsFilter}Pendiente.pdf`;

    return [ruta, contractLevel.tel_movi, arrayIds, contractLevel.box_mail, title2, filePath];
  }

  public async enviarAlertaWhatapp(data:any, salesPoints:any, response:any, response2:any, city:any, checkInTime:any, checkOutTime:any, response3:any, hasMaterials:any, materials:any, response4:any, response5:any) {
    try {
      

      const salesPointsFilter = (salesPoints.map((salePoint:any) => salePoint))?.join()?.replaceAll(' ', '_');
      const salesPointsInCity = await this.presentationCardRepository.getSalesPointsData({salesPoints});
      const salesPointsInCityString = (salesPointsInCity.map((salePoint:any) => salePoint))?.join()?.replaceAll(' ', '_');

      // const nombreUrl = (`${data?.NOMBRE || ''}_${data?.APELLIDO || ''}`)?.replaceAll(' ', '_');

      const datosEnvioAprobar = {
        Cedula: data.CEDULA,
        NombreArchivo: data.nombre_archivo,
        Numero: data.NUMERO,
        Nombre: '', // nombreUrl
        PuntoVenta: data.wherePDV_CODIGO,
        Ciudad: data.ciudad,
        horaInicio: data.checkInTime,
        horaFin: data.checkOutTime,
        solicitudCarta: response3,
        ingresoMaterial: hasMaterials,
        materiales: JSON.stringify(materials),
        correo: data.CORREO,
        rutaCorreo: response,
        tipoCarta: data.tipoCarta,
        EMPRESA_COD: data.EMPRESA_COD,
        NombreUsu: data.NOMBRE,
        ApellidoUsu: data.APELLIDO,
        GENERO: data.GENERO,
        CARGO: data.CARGO
      };
        
      const datosEnvioDesaprobar = {
        Cedula: data.CEDULA,
        Numero: data.NUMERO,
        Nombre: '', // nombreUrl
        PuntoVenta: salesPointsFilter,
        solicitudCarta: response3,
        correo: data.CORREO,
        tipoCarta: data.tipoCarta
      };

      
      const firtBase   = Buffer.from(JSON.stringify(datosEnvioAprobar)).toString('base64');
      const SecondBase = Buffer.from(JSON.stringify(datosEnvioDesaprobar)).toString('base64');

      const linkAprobar    = `http://www.listos.com.co:8080/oficinaVirtualPrueba/controlador/utilidades/redireccionesProcesos.php?Action=aprobarCarta&datosEnvio=${firtBase}`;
      const linkDesaprobar = `http://www.listos.com.co:8080/oficinaVirtualPrueba/controlador/utilidades/redireccionesProcesos.php?Action=rechazarCarta&datosEnvio=${SecondBase}`;

      // const linkCortoAprobar = ($utilidades->recortarUrl($linkAprobar))['data']['url'];
      // const linkCortoDesaprobar = ($utilidades->recortarUrl($linkDesaprobar))['data']['url'];
      const linkCortoAprobar = '';
      const linkCortoDesaprobar = '';

      const texto = `Se le informa que ${data.NOMBRE} ${data.APELLIDO} ha solicitado la creación de una ${data.tipoCarta} para el punto de venta ${salesPointsInCityString}, para *APROBAR* ${linkCortoAprobar} para *RECHAZAR* ${linkCortoDesaprobar}`;
      const descripcion = 'Creación de carta';
      
      
      
      const celularJefe = '3142272228';
      const urlbase64 = '';
      const nombre_archivo = '';

      const responseMessage = this.alertaMensajeWhatsApp(texto, `+57${celularJefe}`);
      const responseFile    = this.alertaMensajeWhatsApp(urlbase64, `+57${celularJefe}`, nombre_archivo, descripcion);


      return true;

    } catch (error:any) {
      throw new Error(error.message);
    }
  }


  public alertaMensajeWhatsApp(texto:any, usuNumTelefono:any, archivo?:any, descripcion?:any) {

      const data = {
          phone: usuNumTelefono,
          body: texto,
          filename: archivo,
          caption: descripcion
      };

      const json = JSON.stringify(data);  // URL for request POST /message
      const url = 'https://eu88.chat-api.com/instance170200/sendFile?token=ldl5v74ie9t2riwn';  // Make a POST request
      const options = {};
      /*
      const options = stream_context_create({
          http: {
              method: 'POST',
              header: 'Content-type: application/json',
              content: json
          }
      });   // Send a request
      */

      return true;    //    result = file_get_contents(url, false, options);
  }



  public async ResquestApproval(data: any) {

    try {

      const requiredApproval = !!((await this.presentationCardRepository.getAllCitiesByUser(data.identification))?.length);
      const { materials, unrelatedsalesPoints,  } = data;
      const salesPoints = [ ...data.salesPoints, ...data.unrelatedsalesPoints ];

      const userInfo = await this.presentationCardRepository.findUserByIdentification(data.identification);

      const newData = {
        ...data,
        ...userInfo,
        salesPoints,
        requiredApproval,
        lastName: data.last_name,
        DateInText: DateInText()
      };

      const hasMaterials = (materials && materials.length);

      const responseApproval = await ((!hasMaterials) ?
        this.ResquestApprovalWithOutMaterials(newData) :
        this.ResquestApprovalWithMaterials(newData)
      );

      let response = responseApproval[5];

      if (requiredApproval || hasMaterials || data.checkInTime || unrelatedsalesPoints.length) {
          this.enviarAlertaWhatapp(data, salesPoints, responseApproval[0], responseApproval[1], data.city, data.checkInTime, data.checkOutTime, responseApproval[2], hasMaterials, data.materials, responseApproval[3], responseApproval[4]);
          response = { error: 'La solicitud se ha creado exitosamente.' };
      }

      return response;
      
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
}