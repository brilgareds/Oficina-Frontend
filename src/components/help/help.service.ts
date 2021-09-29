import { mssqlBiplus } from "../../services/mssql";
import { CategoryRepository } from "../category/repositories/category.repository";
import { AlertaHtml } from "../common/helpers/global";
import { HelpRepository } from "./repositories/help.repository";

export class HelpService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly helpRepository: HelpRepository
  ) { }

  public async requestsHelpCategory() {
    try {
      const categories = await this.categoryRepository.findHelpCategory();

      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  public async saveFormHelp(data: any) {

    try {

      const dataForm = data.allData.dataForm;
      const dataUser = data.allData.dataUser;
      (dataForm.numeroTelefonico !== 0) && (dataUser.numeroCelular = dataForm.numeroTelefonico);

      const tipoContacto = this.validarTipoContacto(dataForm.tipoContacto, dataUser.numeroCelular, dataForm.correoEnvioRespuesta);
      const validarCategoria = this.validarCategoria(dataForm, dataUser, tipoContacto);

      let responseSaveInfo = await this.helpRepository.saveUserInfo(dataUser, dataForm, tipoContacto, validarCategoria);

      if (responseSaveInfo) {

        let correo = dataUser.correoEnvioRespuesta;
        const asunto = validarCategoria.cuerpoCorreo.asunto;
        const titulo = validarCategoria.cuerpoCorreo.titulo;
        const mensaje = validarCategoria.cuerpoCorreo.cuerpo;
        const copia = ``;
        const body = AlertaHtml(titulo, mensaje);

        this.helpRepository.insertarAlertarAutomaticas(correo, copia, asunto, body, '', mssqlBiplus);

        return true;
      }
      throw new Error("Error en el procedimiento");
    } catch (error) {
      throw new Error(error.message);

    }

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


}
