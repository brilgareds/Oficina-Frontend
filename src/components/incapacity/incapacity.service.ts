import { EpsRepository } from "../eps/repositories/eps.repository";
import { IncapacityhRepository } from "./repositories/incapacity.repository";
import { AlertaHtml, CreateOrValidateFolder, extraerExtensionArchivo, getDateToday, limpiarNombreArchivo } from "../common/helpers/global";
import { mssqlBiplus, mssqlEsmad } from "../../services/mssql";
import { uploadFileBlob } from "../../services/azure-blob";
import fs from "fs";
import path from "path";
import { v4 } from "uuid";


export class IncapacityService {
  constructor(
    private readonly epsRepository: EpsRepository,
    private readonly incapacityRepository: IncapacityhRepository
  ) { }

  public async getEpsIncapacidad() {
    try {
      return await this.epsRepository.getEpsIncapacidad();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getTypesIncapacity(empresa: number) {
    try {
      return await this.incapacityRepository.getTypesIncapacity(empresa);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getDocumentsIncapacity(empresa: number, tipoIncapacidad: number) {
    try {
      return await this.incapacityRepository.getDocumentsIncapacity(empresa, tipoIncapacidad);
    } catch (error) {
      throw new Error(error.message);
    }
  }



  public async saveDisabilityFiling(reqData: any) {
    try {

      const { files, body } = reqData;
      const jsonBody = JSON.parse(body.allData);
      let { dataUser, dataForm } = jsonBody;
      const folder = "incapacity";
      let jsonFilesNames: any;
      let jsonFilesCodigos: any;

      if (!Array.isArray(body.filesCodigos)) {
        jsonFilesNames = [body.filesNames];
        jsonFilesCodigos = [body.filesCodigos];
      } else {
        jsonFilesNames = body.filesNames;
        jsonFilesCodigos = body.filesCodigos;
      }

      dataForm.otraEntidad.status = (dataForm.otraEntidad.status === true) ? 1 : 0;
      dataForm.otraEntidad.value = (dataForm.otraEntidad.value === 'null') ? null : `'${dataForm.otraEntidad.value}'`;
      dataForm.prorroga = (dataForm.prorroga === true) ? 1 : 0;

      const saveDisabilityFiling = await this.incapacityRepository.saveDisabilityFiling(dataUser.cedula, dataUser.nombres, dataUser.telefono, dataUser.correoElectronico, dataUser.eps, dataForm.otraEntidad.status, dataForm.otraEntidad.value, dataForm.tipoIncapacidad, dataForm.rangoFechas.fechaInicio, dataForm.rangoFechas.fechaFin, dataUser.empresa, dataForm.prorroga);
      const lastIdInsert = saveDisabilityFiling.INCAP_CODIGO;

      if (lastIdInsert) {

        let posibleError = 0;
        files.map(async (file: Express.Multer.File, key: any) => {

          let fileName = `${v4()}.${file.mimetype.split("/")[1]}`;
          let folderRouteWithFile = `${folder}/${jsonBody.dataUser.cedula}/${fileName}`;

          let { _response }: any = await uploadFileBlob(folderRouteWithFile, file.buffer);

          if (_response.status === 201) {

            let urlFile = _response.request.url.split('?')[0];

            let saveIncapacityFile = await this.incapacityRepository.saveIncapacityFile(Number(lastIdInsert), String(urlFile), String(dataUser.cedula), Number(jsonFilesCodigos[key]));
            (!saveIncapacityFile) && (posibleError++);

          }

        });


        if (posibleError === 0) {

          // const correo = dataUser.correoElectronico;
          const correo = `jose.avila@visionymarketing.com.co`;
          const asunto = `RADICACIÓN DOCUMENTOS`;
          const titulo = `RADICACIÓN DOCUMENTOS`;
          const mensaje = `Su incapacidad ha sido radicada con el numero de consecutivo #${lastIdInsert}. la Cual se encuentra pendiente por aprobacion.<br> Al momento de que su Incapacidad sea aprobada o rechazada se le informara por correo electronico.`;
          const copia = `jose.avila@visionymarketing.com.co`;
          // const copia = `info.visionymarketing@visionymarketing.com.co`;
          const body = AlertaHtml(titulo, mensaje);

          const responseSendCorreo = this.insertarAlertarAutomaticas(correo, copia, asunto, body, '', mssqlBiplus);

          return true;
        }

      }

      return false;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async updateDisabilityFiling(reqData: any) {
    try {

      const { files, body } = reqData;
      const { codigosArchivos, correoUsuario, numeroIncapacidad, cedulaUsuario } = body;

      const folder = "incapacity";
      let jsonFilesCodigos: any;

      if (!Array.isArray(codigosArchivos)) {
        jsonFilesCodigos = [codigosArchivos];
      } else {
        jsonFilesCodigos = codigosArchivos;
      }

      let posibleError = 0;
      files.map(async (file: Express.Multer.File, key: any) => {

        let fileName = `${v4()}.${file.mimetype.split("/")[1]}`;
        let folderRouteWithFile = `${folder}/${cedulaUsuario}/${fileName}`;

        let { _response }: any = await uploadFileBlob(folderRouteWithFile, file.buffer);

        if (_response.status === 201) {

          let urlFile = _response.request.url.split('?')[0];

          const responseUpdatefiles = await this.incapacityRepository.updateFilesIncapacity(jsonFilesCodigos[key], urlFile, numeroIncapacidad);
          (!responseUpdatefiles) && (posibleError++);

        }

      });


      if (posibleError === 0) {

        // const correo = correoUsuario;
        const correo = `jose.avila@visionymarketing.com.co`;
        const asunto = `RADICACIÓN DOCUMENTOS`;
        const titulo = `RADICACIÓN DOCUMENTOS`;
        const mensaje = `Lo documentos para su incapacidad radicada con el número #${numeroIncapacidad} fueron subidos nuevamente para su aprobación.`;
        const copia = `jose.avila@visionymarketing.com.co`;
        // const copia = `info.visionymarketing@visionymarketing.com.co`;
        const body = AlertaHtml(titulo, mensaje);

        const responseSendCorreo = this.insertarAlertarAutomaticas(correo, copia, asunto, body, '', mssqlBiplus);

        return true;
      }



      return false;

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


  public async getUserIncapacities(cedula: number) {
    try {
      return await this.incapacityRepository.getUserIncapacities(cedula);
    } catch (error) {
      throw new Error(error.message);
    }
  }


  public async getUserIncapacitiesFiles(numeroIncapacidad: number) {
    try {
      return await this.incapacityRepository.getUserIncapacitiesFiles(numeroIncapacidad);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getUserDataIncapacity(numeroIncapacidad: number) {
    try {
      return await this.incapacityRepository.getUserDataIncapacity(numeroIncapacidad);
    } catch (error) {
      throw new Error(error.message);
    }
  }


}



