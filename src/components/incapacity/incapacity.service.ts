import { EpsRepository } from "../eps/repositories/eps.repository";
import { IncapacityhRepository } from "./repositories/incapacity.repository";
import fs from "fs";
import path from "path";
import { AlertaHtml, CreateOrValidateFolder, extraerExtensionArchivo, getDateToday, limpiarNombreArchivo } from "../common/helpers/global";
import { mssqlBiplus, mssqlEsmad } from "../../services/mssql";


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
      let jsonFilesNames: any;
      let jsonFilesCodigos: any;

      if (!Array.isArray(body.filesCodigos)) {
        jsonFilesNames = [body.filesNames];
        jsonFilesCodigos = [body.filesCodigos];
      } else {
        jsonFilesNames = body.filesNames;
        jsonFilesCodigos = body.filesCodigos;
      }

      let publicIncapacitiyFolder = path.join(__dirname, '..', '..', '..', 'temp', 'incapacity');
      if (CreateOrValidateFolder(publicIncapacitiyFolder)) {

        let publicUserFolder = path.join(__dirname, '..', '..', '..', 'temp', 'incapacity', jsonBody.dataUser.cedula);
        if (CreateOrValidateFolder(publicUserFolder)) {

          let { dataUser, dataForm } = jsonBody;

          dataForm.otraEntidad.status = (dataForm.otraEntidad.status === true) ? 1 : 0;
          dataForm.otraEntidad.value = (dataForm.otraEntidad.value === 'null') ? null : `'${dataForm.otraEntidad.value}'`;
          dataForm.prorroga = (dataForm.prorroga === true) ? 1 : 0;

          const saveDisabilityFiling = await this.incapacityRepository.saveDisabilityFiling(
            dataUser.cedula,
            dataUser.nombres,
            dataUser.telefono,
            dataUser.correoElectronico,
            dataUser.eps,
            dataForm.otraEntidad.status,
            dataForm.otraEntidad.value,
            dataForm.tipoIncapacidad,
            dataForm.rangoFechas.fechaInicio,
            dataForm.rangoFechas.fechaFin,
            dataUser.empresa,
            dataForm.prorroga
          );

          const lastIdInsert = saveDisabilityFiling.INCAP_CODIGO;

          if (lastIdInsert) {

            let posibleError = 0;

            files.forEach(async (file: any, key: any) => {

              let extension = extraerExtensionArchivo(file.originalname.toLowerCase());
              let nameFile = `SolicitudNum_${lastIdInsert}_Cc_${jsonBody.dataUser.cedula}_${limpiarNombreArchivo(jsonFilesNames[key])}_${getDateToday(true)}.${extension}`;
              let publicRoute = path.join(__dirname, '..', '..', '..', 'temp', 'incapacity', jsonBody.dataUser.cedula, nameFile);

              if (!fs.createWriteStream(publicRoute).write(file.buffer)) {

                let routeFile = path.join('temp', 'incapacity', jsonBody.dataUser.cedula, nameFile);
                await this.incapacityRepository.saveIncapacityFile(Number(lastIdInsert), String(routeFile), String(dataUser.cedula), Number(jsonFilesCodigos[key]));

              } else {
                posibleError++;
              }

            });

            if (posibleError === 0) {

              // const correo = dataUser.correoElectronico;
              const correo = `jose.avila@visionymarketing.com.co`;
              const asunto = `RADICACION DOCUMENTOS`;
              const titulo = `RADICACION DOCUMENTOS`;
              const mensaje = `Su incapacidad ha sido radicada con el numero de consecutivo #${lastIdInsert}. la Cual se encuentra pendiente por aprobacion.<br> Al momento de que su Incapacidad sea aprobada o rechazada se le informara por correo electronico.`;
              const copia = `jose.avila@visionymarketing.com.co`;
              // const copia = `info.visionymarketing@visionymarketing.com.co`;
              const body = AlertaHtml(titulo, mensaje);

              const responseSendCorreo = this.insertarAlertarAutomaticas(correo, copia, asunto, body, '', mssqlBiplus);

              return true;
            }
          }
        }
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



