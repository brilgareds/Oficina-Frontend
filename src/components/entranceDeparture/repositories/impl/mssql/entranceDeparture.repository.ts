import { mssqlEsmad } from "../../../../../services/mssql";
import { JwtUserPayload } from "../../../../common/interfaces/jwtUserPayload";
import { SaveEntranceDto } from "../../../dto/saveEntrance.dto";
import { UserDataDto } from "../../../dto/userData.dto";
import { EntranceDepartureRepository } from "../../entranceDeparture.repository";

export class EntranceDepartureMSSQLRepository
  implements EntranceDepartureRepository
{
  public async findEntrance(user: JwtUserPayload, date: string): Promise<any> {
    const pool = await mssqlEsmad;

    const query = `SELECT
      ESMAD_CONTROL_INGRESO.SED_CODIGO,
      ESMAD_CONTROL_INGRESO.CIN_TEMPERATURA,
      ESMAD_CONTROL_INGRESO.CIN_MOTIVO_INGRESO,
      ESMAD_CONTROL_INGRESO.CIN_TIPO_INGRESO,
      ESMAD_CONTROL_INGRESO.CIN_CIU_CODIGO,
      ESMAD_CONTROL_INGRESO.CIN_PDV_CODIGO,
      ESMAD_CONTROL_INGRESO.CIN_PDV_OTROS
    FROM 
      dbo.ESMAD_CONTROL_INGRESO
    WHERE ESMAD_CONTROL_INGRESO.CIN_CEDULA = '${user.identification}'
    AND ESMAD_CONTROL_INGRESO.FECHA_CREACION BETWEEN '${date} 00:00:00' AND '${date} 23:59:59'`;

    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset;
    }

    throw new Error("Error de consulta");
  }

  public async saveEntrance(
    entranceData: SaveEntranceDto,
    user: UserDataDto
  ): Promise<any> {
    const {
      typeEntrance,
      temperature,
      longitude,
      latitude,
      reason,
      branch,
      city,
      salePoint,
      otherSalePoint,
    } = new SaveEntranceDto(entranceData);
    const pool = await mssqlEsmad;

    const query = `INSERT INTO dbo.ESMAD_CONTROL_INGRESO (
      ESMAD_CONTROL_INGRESO.SED_CODIGO,
      ESMAD_CONTROL_INGRESO.CIN_CEDULA,
      ESMAD_CONTROL_INGRESO.CIN_NOMBRE,
      ESMAD_CONTROL_INGRESO.CIN_APELLIDO,
      ESMAD_CONTROL_INGRESO.CIN_CARGO,
      ESMAD_CONTROL_INGRESO.CIN_AREA,
      ESMAD_CONTROL_INGRESO.CIN_JEFE_INMEDIATO,
      ESMAD_CONTROL_INGRESO.CIN_MOTIVO_INGRESO,
      ESMAD_CONTROL_INGRESO.USUARIO_CREACION,
      ESMAD_CONTROL_INGRESO.FECHA_CREACION,
      ESMAD_CONTROL_INGRESO.USUARIO_MODIFICACION,
      ESMAD_CONTROL_INGRESO.FECHA_MODIFICACION,
      ESMAD_CONTROL_INGRESO.ESTADO,
      ESMAD_CONTROL_INGRESO.CIN_LATITUD,
      ESMAD_CONTROL_INGRESO.CIN_LONGITUD,
      ESMAD_CONTROL_INGRESO.CIN_TEMPERATURA,
      ESMAD_CONTROL_INGRESO.CIN_TIPO_INGRESO,
      ESMAD_CONTROL_INGRESO.CIN_CIU_CODIGO,
      ESMAD_CONTROL_INGRESO.CIN_PDV_CODIGO,
      ESMAD_CONTROL_INGRESO.CIN_PDV_OTROS,
      ESMAD_CONTROL_INGRESO.CIN_FECHA_LOGUEO
    ) VALUES (
      ${branch},
      '${user.identification}',
      '${user.name}',
      '${user.lastname}',
      '${user.title}',
      '${user.area}',
      '${user.chief}',
      ${reason !== "NULL" ? `'${reason}'` : reason},
      '${user.identification}',
      getDate(),
      '${user.identification}',
      getDate(),
      1,
      ${latitude !== "NULL" ? `'${latitude}'` : latitude},
      ${longitude !== "NULL" ? `'${longitude}'` : longitude},
      ${temperature},
      ${typeEntrance},
      ${city},
      ${salePoint},
      ${otherSalePoint !== "NULL" ? `'${otherSalePoint}'` : otherSalePoint},
      getDate()
    );SELECT * from dbo.ESMAD_CONTROL_INGRESO WHERE CIN_CODIGO = SCOPE_IDENTITY()`;
    const result = await pool.query(query);

    if (result.rowsAffected) {
      return result.recordset;
    }

    throw new Error("Error de consulta");
  }
}
