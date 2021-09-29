import { mssqlBiplus } from "../../services/mssql";
import { CategoryParamsDto } from "../category/dto/category.params";
import { CategoryRepository } from "../category/repositories/category.repository";
import { AlertaHtml } from "../common/helpers/global";
import { SendAlertEmailRepository } from "../sendAlertEmail/repositories/sendAlertEmail.repository";
import { RrhhRepository } from "./repositories/rrhh.repository";

export class RrhhService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly rrhhRepository: RrhhRepository,
  ) { }

  public async getWeAreForYouCategories() {
    try {
      const categories = await this.categoryRepository.findCategoryByAttributes(
        { code: 31, type: 889 } as CategoryParamsDto
      );

      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getResourcesRequestCategoriesCategories() {
    try {
      const categories = await this.categoryRepository.findCategoryByAttributes(
        { code: 31, type: 888 } as CategoryParamsDto
      );

      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  public async saveFormRRHH(data: any) {
    try {
      const dataForm = data.allData.dataForm;
      const dataUser = data.allData.dataUser;
      (dataForm.numeroTelefonico !== 0) && (dataUser.numeroCelular = dataForm.numeroTelefonico);
      const tipoSolicitud = this.validarTipoSolicitud(dataForm.formulario, dataForm.categoria);
      const tipoContacto = this.validarTipoContacto(dataForm.tipoContacto);

      let responseSaveInfo = await this.rrhhRepository.saveUserInfo(dataUser, dataForm, tipoSolicitud, tipoContacto);

      if (responseSaveInfo) {
        const mensajeCorreo = this.validarMensajeCorreo(dataForm.tipoContacto, dataUser.numeroCelular, dataForm.correoEnvioRespuesta);

        // const correo = `andres.latorre@visionymarketing.com.co;cis.neiva@visionymarketing.com.co;Alexander.escobar@listos.com.co`; 
        const correo = `${dataForm.correoEnvioRespuesta}`;
        const asunto = `Solicitud - Oficina Virtual`;
        const titulo = `Solicitud de ${tipoSolicitud.tipoSol}`;
        const mensaje = `<p>El empleado  ${dataUser.nombres} ${dataUser.apellidos} identificado con la cédula: ${dataUser.cedula} ha generado una solicitud de:  ${tipoSolicitud.tipoSol} desde la oficina virtual.</p> <p>Descripción: ${dataForm.descripcion} </p> ${mensajeCorreo}`;
        const copia = ``;
        const body = AlertaHtml(titulo, mensaje);

        const responseSendCorreo = this.rrhhRepository.insertarAlertarAutomaticas(correo, copia, asunto, body, '', mssqlBiplus);

        return true;
      }

      throw new Error("error en el procedimiento");
    } catch (error) {
      throw new Error(error.message);
    }
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

}
