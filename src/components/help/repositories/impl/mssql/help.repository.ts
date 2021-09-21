import { mssqlBiplus, mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
import { getDateToday } from "../../../../common/helpers/global";
import { HelpRepository } from "../../help.repository";

export class HelpMSSQLRepository implements HelpRepository {


  public async saveUserInfo(dataUser: any, dataForm: any, tipoContacto: any, validarCategoria: any,): Promise<any> {

    const now = getDateToday(false);
    const pool = await mssqlEsmad;

    const query = `
                  INSERT INTO dbo.ESMAD_OV_TICKETS (
                    ESMAD_OV_TICKETS.OVT_CEDULA, 
                    ESMAD_OV_TICKETS.OVT_NOMBRE, 
                    ESMAD_OV_TICKETS.OVT_CORREO, 
                    ESMAD_OV_TICKETS.OVT_CELULAR, 
                    ESMAD_OV_TICKETS.OVT_TIPO_OV,
                    ESMAD_OV_TICKETS.OVT_CATEGORIA, 
                    ESMAD_OV_TICKETS.OVT_DESCRIPCION, 
                    ESMAD_OV_TICKETS.OVT_RESPUESTA_ALTERNA, 
                    ESMAD_OV_TICKETS.FECHA_CREACION, 
                    ESMAD_OV_TICKETS.USUARIO_CREACION,  
                    ESMAD_OV_TICKETS.ESTADO,
                    ESMAD_OV_TICKETS.OVT_CREADO,
                    ESMAD_OV_TICKETS.OVT_TIPO_TICKET,
                    ESMAD_OV_TICKETS.OVT_ESTADO,
                    ESMAD_OV_TICKETS.OVT_EMPRESA,
                    ESMAD_OV_TICKETS.OVT_CENTRO_COSTOS,
                    ESMAD_OV_TICKETS.TIP_CODIGO
                  ) VALUES (
                    '${dataUser.cedula}',
                    '${dataUser.nombres} ${dataUser.apellidos}',
                    '${dataForm.correoEnvioRespuesta}',
                    '${dataUser.numeroCelular}',
                    '${validarCategoria.tipo_ov}',
                    ${validarCategoria.categoria},
                    '${dataForm.descripcion}',
                    ${(tipoContacto.otro !== null) ? "'" + tipoContacto.otro + "'," : tipoContacto.otro + ","}
                    '${now}',
                    '${dataUser.cedula}',
                    1,
                    1,
                    ${validarCategoria.tipo_ticket},
                    '${dataUser.estado}',
                    ${dataUser.empresa},
                    ${dataUser.cCostos},
                    380
                  )
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
