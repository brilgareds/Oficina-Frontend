import { mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
import { RrhhRepository } from "../../rrhh.repository";

export class RrhhMSSQLRepository implements RrhhRepository {

  public async saveFormRRHH(data: any): Promise<any> {

    const dataForm = data.allData.dataForm;
    const dataUser = data.allData.dataUser;

    let tipoSolicitud = this.validarTipoSolicitud(dataForm.formulario, dataForm.categoria);
    let tipoContacto = this.validarTipoContacto(dataForm.tipoContacto);

    let responseSaveInfo = await this.saveUserInfo(dataUser, dataForm, tipoSolicitud, tipoContacto);

    if (responseSaveInfo) {
      console.log("insercion");
    } else {
      console.log("no insercion");
    }


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
    let response = {};

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
            ( '${dataUser.cedula}', '${dataUser.nombres}', '${dataForm.correoEnvioRespuesta}', '${dataUser.numeroCelular}', 'ACTIVO', ${dataUser.empresa}, '${dataUser.cCostos}', ${tipoSolicitud.tipoSolicitud}, ${tipoSolicitud.categoria}, '${dataForm.descripcion}', ${tipoContacto.alterno}, '${tipoContacto.otro}', '${now}', '${dataUser.cedula}', '${now}', '${dataUser.cedula}', 1, 'S', 380 )
    `;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return true;
    }

    return false;
  }

}
