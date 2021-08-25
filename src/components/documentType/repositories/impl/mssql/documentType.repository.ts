import { mssqlBiplus } from "../../../../../services/mssql";
import { DocumentTypeRepository } from "../../documentType.repository";

export class DocumentTypeMSSQLRepository implements DocumentTypeRepository {

  public async getDocumentType(): Promise<any> {

    const pool = await mssqlBiplus;
    const result = await pool.query`
      SELECT DISTINCT
          contratos_tipo_documento.nombre_documento
      FROM
          contratos_tipo_documento AS contratos_tipo_documento
      ORDER BY 
          contratos_tipo_documento.nombre_documento
    `;

    return result.recordset;

  }

}
