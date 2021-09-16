import { InclusionBeneficiariosRepository } from "./repositories/inclusionBeneficiarios.repository";
import { v4 } from "uuid";
import { AlertaHtml } from "../common/helpers/global";
import { uploadFileBlob } from "../../services/azure-blob";
import { mssqlBiplus } from "../../services/mssql";

export class InclusionBeneficiariosService {
  constructor(
    private readonly inclusionBeneficiariosRepository: InclusionBeneficiariosRepository
  ) { }


  public async getBeneficiariesByUser(cedula: number) {
    try {
      return await this.inclusionBeneficiariosRepository.getBeneficiariesByUser(cedula);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getTipoDocumentoBeneficiario() {
    try {
      return await this.inclusionBeneficiariosRepository.getTipoDocumentoBeneficiario();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getCajasBeneficiario(cedula: number) {
    try {
      return await this.inclusionBeneficiariosRepository.getCajasBeneficiario(cedula);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async consultarParentesco(beneficioPara: string) {
    try {

      let condicionDinamica = (beneficioPara === "eps") ? " AND TIP_ATRIBUTO1 = 1" : " AND TIP_ATRIBUTO2 = 1";

      return await this.inclusionBeneficiariosRepository.consultarParentesco(condicionDinamica);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async consultarArchivosBeneficiarios(beneficioPara: string, tipParentesco: number) {
    try {

      let condicionDinamica = (beneficioPara === "eps") ? " AND TIP_ATRIBUTO1 = 1" : " AND TIP_ATRIBUTO2 = 1";

      return await this.inclusionBeneficiariosRepository.consultarArchivosBeneficiarios(condicionDinamica, tipParentesco);
    } catch (error) {
      throw new Error(error.message);
    }
  }




  public async saveInclusionBeneficios(files: any, body: any) {
    try {

      const jsonBody = JSON.parse(body.allData);
      const { dataColaborador, dataNuevoBeneficiario } = jsonBody;
      const { cedula, correoElectronico, nombreUsuario, telefono, empresa } = dataColaborador;
      const { apellidoBeneficiario, cedulaBeneficiario, fechaNacimientoBeneficiario, nombreBeneficiario, beneficiarioPara, tipoParentesco, tipoDocumento } = dataNuevoBeneficiario;
      const inclusion = (beneficiarioPara === "eps") ? "SERVICIO DE SALUD (EPS)" : "CAJA DE COMPENSACION FAMILIAR";
      const eps = (beneficiarioPara === "eps") ? "1" : "0";
      const caja = (beneficiarioPara === "caja") ? "1" : "0";
      const folder = "archivosBeneficiarios";
      let jsonFilesNames: any;
      let jsonFilesCodigos: any;

      if (!Array.isArray(body.filesCodigos)) {
        jsonFilesNames = [body.filesNames];
        jsonFilesCodigos = [body.filesCodigos];
      } else {
        jsonFilesNames = body.filesNames;
        jsonFilesCodigos = body.filesCodigos;
      }


      const resultGuardarSolicitud = await this.inclusionBeneficiariosRepository.guardarSolicitud(cedula, nombreUsuario, telefono, correoElectronico, empresa);
      const idsolicitud = resultGuardarSolicitud.BENEF_CODIGO;

      if (idsolicitud) {
        const resultGuardarBeneficiario = await this.inclusionBeneficiariosRepository.guardarBeneficiario(idsolicitud, tipoDocumento, cedulaBeneficiario, nombreBeneficiario, apellidoBeneficiario, eps, caja, fechaNacimientoBeneficiario, cedula, tipoParentesco);
        const codigoBeneficiario = resultGuardarBeneficiario.BENEF_CODIGO;

        if (codigoBeneficiario) {
          let posibleError = 0;
          files.map(async (file: Express.Multer.File, key: any) => {

            let fileName = `${v4()}.${file.mimetype.split("/")[1]}`;
            let folderRouteWithFile = `${folder}/${cedula}/${fileName}`;

            let { _response }: any = await uploadFileBlob(folderRouteWithFile, file.buffer);

            if (_response.status === 201) {

              const urlFile = _response.request.url.split('?')[0];
              const responseUpdatefiles = await this.inclusionBeneficiariosRepository.guardarBeneficiarioArchivos(codigoBeneficiario, urlFile, cedula, jsonFilesCodigos[key]);
              (!responseUpdatefiles) && (posibleError++);

            }

          });

          if (posibleError === 0) {

            // const correo = correoElectronico;
            const correo = `jose.avila@visionymarketing.com.co`;
            const asunto = `RADICACIÓN DOCUMENTOS`;
            const titulo = `RADICACIÓN DOCUMENTOS`;
            const mensaje = `Su solicitud para la inclusion del usuario ${nombreBeneficiario} ${apellidoBeneficiario} con numero de cedula ${cedulaBeneficiario}." a ${inclusion}.", fue radicada con exito. Al correo se le estara informando del avance de este proceso.`;
            const copia = `jose.avila@visionymarketing.com.co`;
            // const copia = `info.visionymarketing@visionymarketing.com.co`;
            const body = AlertaHtml(titulo, mensaje);

            const responseSendCorreo = this.inclusionBeneficiariosRepository.insertarAlertarAutomaticas(correo, copia, asunto, body, '', mssqlBiplus);

            return true;
          }

        }
      }

      return false;

    } catch (error) {
      throw new Error(error.message);
    }
  }


  public async consultarBeneficiarios(cedula: number) {
    try {
      return await this.inclusionBeneficiariosRepository.consultarBeneficiarios(cedula);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async consultarArchivosBenefactor(codigoBenefactor: number) {
    try {
      return await this.inclusionBeneficiariosRepository.consultarArchivosBenefactor(codigoBenefactor);
    } catch (error) {
      throw new Error(error.message);
    }
  }


  public async updateArchivosInclusionBeneficiarios(files: any, body: any) {
    try {

      const { codigosArchivos, beneficiarioCedula, cedulaColaborador, beneficiarioCodigo } = body;
      const folder = "archivosBeneficiarios";
      let jsonFilesCodigos: any;
      let posibleError = 0;

      if (!Array.isArray(codigosArchivos)) {
        jsonFilesCodigos = [codigosArchivos];
      } else {
        jsonFilesCodigos = codigosArchivos;
      }

      files.map(async (file: Express.Multer.File, key: any) => {

        const fileName = `${v4()}.${file.mimetype.split("/")[1]}`;
        const folderRouteWithFile = `${folder}/${cedulaColaborador}/${fileName}`;

        const { _response }: any = await uploadFileBlob(folderRouteWithFile, file.buffer);

        if (_response.status === 201) {

          const urlFile = _response.request.url.split('?')[0];

          const responseUpdatefiles = await this.inclusionBeneficiariosRepository.updateArchivosInclusionBeneficiarios(jsonFilesCodigos[key], urlFile, beneficiarioCodigo);
          (!responseUpdatefiles) && (posibleError++);

        }

      });

      if (posibleError === 0) {
        return true;
      } else {
        return false;
      }

    } catch (error) {
      throw new Error(error.message);
    }
  }


}



