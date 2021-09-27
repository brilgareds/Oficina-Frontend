import { AlertaHtml, capitalizarPalabras, currentDate, DateInText } from "../common/helpers/global";
import fs from 'fs';
import path from 'path';
import utf8 from 'utf8';
import md5 from 'md5';
import QRCode from 'qrcode';
import htmlPdf from 'html-pdf';
import axios from 'axios';
import pdfToBase64 from 'pdf-to-base64';

import { PresentationCardMSSQLRepository } from "./repositories/impl/mssql/presentationCard.repository";
import { PresentationCardRepository } from "./repositories/presentationCard.repository";
import { mssqlBiplus } from "../../services/mssql";

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

              <div class="line" style='margin-top: 1rem; margin-bottom: 2rem'>${capitalizarPalabras(nameCity || '')}, ${data.DateInText}</div>

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

    if (!resp) throw new Error('Error al crear solicitud de carta');

    const responsePdf = await new Promise(resolve => htmlPdf.create(html).toFile(pdfPath, err=>resolve(true)));
    if (!responsePdf) throw new Error('Error al crear el Pdf!');

    const ruta = pdfPath;
    const title2 = "Carta de ingreso de materiales";
    const filePath = pdfPath;

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


public async acceptCardWithOutMaterials(data:any) {

    const { identification, company, salesPointsInCity } = data;

    let html = this.encabezadoHtml;

    const mencion = (data.GENERO === 'M') ? 'al Sr.' : 'a la Sra.';

    data.DateInText

    data.salesPointsInCityText

    const contractLevel = (await this.presentationCardRepository.getContracLevel2({identification}) || [{}])[0];

    if (!contractLevel || !Object.keys(contractLevel).length) throw new Error('El usuario no tiene un jefe asignado');

    const { nom_empl, ape_empl, tel_resi, tel_movi, nom_nive2, nom_nive4, box_mail:emailBoss } = contractLevel;

    const dataCompany = (await this.presentationCardRepository.getCompanysData({company}) || [{}])[0];


    const nameBoss  = `${nom_empl} ${ape_empl}`;
    const phoneBoss = `${tel_resi.trim()}-${tel_movi.trim()}`;
    const nombreContrato = ((dataCompany?.EMP_CODIGO_KACTUS === 1) ? nom_nive4 : nom_nive2).trim();
    const date = currentDate({});
    
    let arrayIds = '';
    let resp = '';
    const pdfPath = `cartaDePresentacion_${identification}_${data.salesPointsFilter}Pendiente.pdf`;

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
  
                <div class="line" style='margin-top: 1rem; margin-bottom: 2rem'>${capitalizarPalabras(data.nameCity || '')}, ${data.DateInText}</div>
  
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
                    <p>${ (data.checkInTime) ? `El horario de permanencia en el punto será de ${data.checkInTime} a ${data.checkOutTime}.`: '' }</p>
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
  
        resp = await (this.presentationCardRepository.crearSolicitudCarta(data.title, identification, data.name, data.lastName, data.city, salePoint?.PDV_CODIGO,
        contractLevel.cod_empl, contractLevel.nom_empl, contractLevel.ape_empl, data.checkInTime, data.checkOutTime, `${data.name} ${data.lastName}`,
        pdfPath, data.phone, contractLevel?.tel_movi,
        salePoint?.PDV_NOMBRE, contractLevel?.cod_ccos, contractLevel?.nro_cont?.trim(), dataCompany?.EMP_CODIGO_KACTUS, date));
  
        const idSolicitudCarta = (await this.presentationCardRepository.getId('ESMAD_SOLICITUD_CARTA') || [{}])[0];
        arrayIds += ((arrayIds == '') ? '' : ',') + idSolicitudCarta?.CODIGO;
  
      }
  
      html += `</body></html>`;
  
      if (!resp) throw new Error('Error al crear solicitud de carta');


    return true;
}



public async acceptCardWithMaterials(data:any) {






    return true;
}


public async acceptCard(data: any) {

    const { checkInTime, checkOutTime, salesPoints, identification, company } = data;
    
    const hasMaterials = !!(data?.materiales?.length);
    const salesPointsText = salesPoints.join();
    data.salesPointsInCity = await this.presentationCardRepository.getSalesPointsData({salesPoints: salesPointsText});
    data.salesPointsInCityText = (data.salesPointsInCity.map(({PDV_NOMBRE}:any) => PDV_NOMBRE))?.join();

    const cardAccept = ((!hasMaterials) ?
        await this.ResquestApprovalWithOutMaterials(data) :
        await this.ResquestApprovalWithMaterials(data)
    );

    if (!cardAccept) throw new Error('Al intentar aceptar la carta de presentación!')

    data.status = 'Aprobado';
    
    const result = await this.presentationCardRepository.consultarEstadoAprobacion({SOLICITUD_CARTA_IDS: data.solicitudCarta});
    const correoJefe = data.Mail; // andres.sanchez@visionymarketing.com.co
    const celularJefe = data.Numero.trim(); // 3156165648
    const pdfFile = (await pdfToBase64(cardAccept?.[0]) || false);
    const urlbase64 = (pdfFile) ? `data:application/pdf;base64,${pdfFile}` : '';
    const textWhatsapp = `Señor(a) ${data.name} ${data.lastName}, se le informa que la ${data.typeCard} para el punto de venta ${data.salesPointsInCityText} ha sido aprobada.`;
    const descripcionPdf = 'Creación de carta';

    if (result?.length) {
        const estadoCambiado  = await this.presentationCardRepository.cambiarEstadoAprobacion(data);
        const responseMessage = await this.alertaMensajeWhatsApp(textWhatsapp, `+57${celularJefe}`);
        const responseFile    = await this.alertaArchivoWhatsApp(urlbase64, `+57${celularJefe}`, cardAccept?.[0], descripcionPdf);
    }

    const mensajeAprobacion = ((!result?.length) ?
        `La ${data.typeCard} solicitada por ${data.name} ${data.lastName} ya habia sido aprobada o rechazada` :
        `La ${data.typeCard} solicitada por ${data.name} ${data.lastName} para el punto de venta ${data.salesPointsInCityText} ha sido aprobada`
    );
    
    const asunto = 'Solicitud Carta Presentación';
    const body = AlertaHtml(asunto, mensajeAprobacion);
    const correoEnviado = await (this.presentationCardRepository.insertarAlertarAutomaticas(correoJefe, '', asunto, body, data.rutaCorreo, mssqlBiplus));

    return mensajeAprobacion;
}


public async rejectCard(data: any) {

    const { salesPoints } = data;
    
    const salesPointsText = salesPoints.join();
    data.salesPointsInCity = await this.presentationCardRepository.getSalesPointsData({salesPoints: salesPointsText});
    data.salesPointsInCityText = (data.salesPointsInCity.map(({PDV_NOMBRE}:any) => PDV_NOMBRE))?.join();

    data.status = 'RECHAZADO';
    
    const result = await this.presentationCardRepository.consultarEstadoAprobacion({SOLICITUD_CARTA_IDS: data.solicitudCarta});
    const correoUsuario = data.Mail;   //  data.Mail
    const celularUsuario = data.Numero.trim(); //  data.Numero.trim()
    const textWhatsapp = `Señor(a) ${data.name} ${data.lastName}, se le informa que la ${data.typeCard} para el punto de venta ${data.salesPointsInCityText} ha sido rechazada.`;

    if (result?.length) {
        const estadoCambiado  = await this.presentationCardRepository.cambiarEstadoAprobacion(data);
        const responseMessage = await this.alertaMensajeWhatsApp(textWhatsapp, `+57${celularUsuario}`);
    }

    const mensajeAprobacion = ((!result?.length) ?
        `La ${data.typeCard} solicitada por ${data.name} ${data.lastName} ya habia sido aprobada o rechazada` :
        `La ${data.typeCard} solicitada por ${data.name} ${data.lastName} para el punto de venta ${data.salesPointsInCityText} ha sido rechazada`
    );

    const asunto = 'Solicitud Carta Presentación';
    const body = AlertaHtml(asunto, mensajeAprobacion);
    const correoEnviado = await (this.presentationCardRepository.insertarAlertarAutomaticas(correoUsuario, '', asunto, body, data.rutaCorreo, mssqlBiplus));

    return mensajeAprobacion;
}




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

              <div class="line" style='margin-top: 1rem; margin-bottom: 2rem'>${capitalizarPalabras(nameCity || '')}, ${data.DateInText}</div>

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

    const responsePdf = await new Promise(resolve => htmlPdf.create(html).toFile(pdfPath, err=>resolve(true)));
    if (!responsePdf) throw new Error('Error al crear el Pdf!');

    const ruta = pdfPath;
    const title2 = (checkInTime) ? "Carta de presentación con ingreso fuera de horario":"Carta de presentación";
    const filePath = pdfPath;

    return [ruta, contractLevel.tel_movi, arrayIds, contractLevel.box_mail, title2, filePath];
  }


  public existFile(path:string) {
        let response = false;

        try {
            if (fs.existsSync(path)) response = true;
        } catch(e:any) {}

        return response;
  }


  public async enviarAlertaWhatapp(data:any, salesPoints:any, response:any, response2:any, city:any, checkInTime:any, checkOutTime:any, response3:any, hasMaterials:any, materials:any, response4:any, response5:any) {
    try {
      

      const salesPointsFilter = (salesPoints.map((salePoint:any) => salePoint))?.join()?.replaceAll(' ', '_');
      const moreThanOneSalePoint = (salesPointsFilter?.length || 0) > 1;
      const salesPointsInCity = (await this.presentationCardRepository.getSalesPointsData({salesPoints}) || []).map(({PDV_NOMBRE}:any) => capitalizarPalabras(PDV_NOMBRE));
      const salesPointsInCityWhatsapp = `. ${salesPointsInCity.join('\n. ')}`;
      const salesPointsInCityEmail    = `. ${salesPointsInCity.join('<br/>. ')}`;
      const salesPointsInCityUrl      = salesPointsInCity.join()?.replaceAll(' ', '_');

      // const nombreUrl = (`${data?.NOMBRE || ''}_${data?.APELLIDO || ''}`)?.replaceAll(' ', '_');

      const datosEnvio = {
        ...data,
        Nombre: '', // nombreUrl
        arrayIds: response2,
        salesPoints,
        salesPointsFilter,
        solicitudCarta: response3,
        materiales: materials || [],
        rutaCorreo: response
      };
      
      const firtBase   = Buffer.from(JSON.stringify({ ...datosEnvio, accion: 'Accept' })).toString('base64');
      const SecondBase = Buffer.from(JSON.stringify({ ...datosEnvio, accion: 'Reject' })).toString('base64');

      const linkAprobar    = await this.recortarUrl(`${data.backendUrl}acceptOrRejectCard/${firtBase}`);
      const linkDesaprobar = await this.recortarUrl(`${data.backendUrl}acceptOrRejectCard/${SecondBase}`);

      const textoWhatsapp = `Se le informa que ${data.name} ${data.lastName} ha solicitado la creación de una ${data.typeCard} para ${moreThanOneSalePoint ? 'los puntos de venta:' : 'el punto de venta:'}\n${salesPointsInCityWhatsapp}\n\n*APROBAR*: ${linkAprobar}\n\n*RECHAZAR*: ${linkDesaprobar}`;
      const textoEmail = `Se le informa que ${data.name} ${data.lastName} ha solicitado la creación de una ${data.typeCard} para ${moreThanOneSalePoint ? 'los puntos de venta:' : 'el punto de venta:'}<br/>${salesPointsInCityEmail}<br/><br/><br/>APROBAR: ${linkAprobar}<br/><br/>RECHAZAR: ${linkDesaprobar}`;
      const descripcion = 'Creación de carta';

      const existPdf = (response && this.existFile(response));
      if (!existPdf) throw new Error('Pdf no existe!');

      const pdfFile = await pdfToBase64(response);
      const celularJefe = response2; // response2    //   3156165648
      const nombre_archivo = response.split('/')?.[response.split('/').length-1];

      const responseMessage = await this.alertaMensajeWhatsApp(textoWhatsapp, `+57${celularJefe}`);
      const responseFile    = await this.alertaArchivoWhatsApp(`data:application/pdf;base64,${pdfFile}`, `+57${celularJefe}`, nombre_archivo, descripcion);

      const correo = response4; // response4  //    andres.sanchez@visionymarketing.com.co
      const copia = '';
      const asunto = 'Solicitud Carta Presentación';
      const body = AlertaHtml('Solicitud Carta Presentación', textoEmail);

      const correoEnviado = await (this.presentationCardRepository.insertarAlertarAutomaticas(correo, copia, asunto, body, response, mssqlBiplus));
      return [responseMessage, responseFile, correoEnviado];

    } catch (error:any) {
        console.log(error)
    }
  }


  public async alertaArchivoWhatsApp(body:any, phone:any, filename?:any, caption?:any) {

      const url = 'https://eu88.chat-api.com/instance170200/sendFile?token=ldl5v74ie9t2riwn';  // Make a POST request

      const data = {
          body,
          phone,
          caption,
          filename
      };

      const headers = { 'accept': '*/*', 'Content-Type': 'application/json' };

      const response = await axios.post(url, data, { headers });

      return response;    //    result = file_get_contents(url, false, options);
  }


  public async recortarUrl(longUrl:any) {

    const url = `http://tinyurl.com/api-create.php?url=${longUrl}`;
    const headers = { 'accept': '*/*', 'Content-Type': 'application/json' };

    //se invoca el archivo con parametro url
    const result = await axios.get(url, { headers });

    /*

    if($fp) {
        $tinyurl = fgets($fp);

        if($tinyurl && !empty($tinyurl)) {
            // si responde el servidor se anexa la url
            $results = $tinyurl;
            fclose($fp);
        }
    }

    */

    return result?.data || '';
}
  


  public async alertaMensajeWhatsApp(texto:any, usuNumTelefono:any, archivo?:any, descripcion?:any) {

      const url = 'https://eu88.chat-api.com/instance170200/sendMessage?token=ldl5v74ie9t2riwn';  // Make a POST request

      const data = {
          phone: usuNumTelefono,
          body: texto,
          filename: archivo,
          caption: descripcion
      };

      const headers = { 'accept': '*/*', 'Content-Type': 'application/json' };

      const response = await axios.post(url, data, { headers });

      return response;    //    result = file_get_contents(url, false, options);
  }



  public async ResquestApproval(data: any) {

    try {

      const requiredApproval = !!((await this.presentationCardRepository.getAllCitiesByUser(data.identification))?.length);
      const { materials, unrelatedsalesPoints,  } = data;
      const salesPoints = [ ...data.salesPoints, ...data.unrelatedsalesPoints ];

      const userInfo = await this.presentationCardRepository.findUserByIdentification(data.identification);
      const typeCard = (
          (data.typeCard === 'cartaPuntoVenta') ? 'Carta de presentación a punto de venta' : 
          (data.typeCard === 'cartaIngresoMateriales') ? 'Carta de ingreso de materiales a punto de venta' :
          (data.typeCard === 'cartaPuntoVentaFueraHorario') ? 'Carta de presentación a punto de venta con ingreso fuera de horario' : ''
      );

      const newData = {
        ...data,
        ...userInfo,
        typeCard,
        salesPoints,
        requiredApproval,
        lastName: data.last_name,
        DateInText: DateInText()
      };

      const hasMaterials = (materials && materials.length);

      const responseApproval = ((!hasMaterials) ?
        await this.ResquestApprovalWithOutMaterials(newData) :
        await this.ResquestApprovalWithMaterials(newData)
      );

      let response = responseApproval[5];

      if (requiredApproval || hasMaterials || data.checkInTime || unrelatedsalesPoints.length) {
          const sentMessage = await this.enviarAlertaWhatapp(newData, salesPoints, responseApproval[0], responseApproval[1], data.city, data.checkInTime, data.checkOutTime, responseApproval[2], hasMaterials, data.materials, responseApproval[3], responseApproval[4]);
          response = { error: 'La solicitud se ha creado exitosamente.' };
      }

      return response;
      
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
}