import { mssqlBiplus, mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
import { getDateToday } from "../../../../common/helpers/global";
import { RrhhRepository } from "../../rrhh.repository";

export class RrhhMSSQLRepository implements RrhhRepository {

  public async saveUserInfo(dataUser: any, dataForm: any, tipoSolicitud: any, tipoContacto: any,): Promise<any> {

    const now = getDateToday(false);
    const pool = await mssqlEsmad;

    const query = `
          INSERT INTO ESMAD_OV_TICKETS 
            ( OVT_CEDULA, OVT_NOMBRE, OVT_CORREO, OVT_CELULAR, OVT_ESTADO, OVT_EMPRESA, OVT_CENTRO_COSTOS, OVT_TIPO_TICKET, OVT_CATEGORIA, OVT_DESCRIPCION, OVT_MEDIO_SOLICITUD, OVT_RESPUESTA_ALTERNA, FECHA_CREACION, USUARIO_CREACION, FECHA_MODIFICACION, USUARIO_MODIFICACION, ESTADO, OVT_TIPO_OV, TIP_CODIGO ) 
          VALUES 
            ( '${dataUser.cedula}', '${dataUser.nombres}', '${dataForm.correoEnvioRespuesta}', '${dataUser.numeroCelular}', 'ACTIVO', ${dataUser.empresa}, '${dataUser.cCostos}', ${tipoSolicitud.tipoSolicitud}, ${tipoSolicitud.categoria}, '${dataForm.descripcion.replace("'", "")}', ${tipoContacto.alterno}, '${tipoContacto.otro}', '${now}', '${dataUser.cedula}', '${now}', '${dataUser.cedula}', 1, 'S', 380 )
    `;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return true;
    }

    return false;
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

}
