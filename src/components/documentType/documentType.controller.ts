import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import { DocumentTypeService } from "./documentType.service";
import { verifyJwt } from "../common/middlewares/jwt";

/**
 * @swagger
 * tags:
 *  name: Document Type
 */
@route("/api/v1/documentType")
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  /**
   * @swagger
   * /api/v1/documentType/get:
   *  get:
   *    summary: Retorna los tipos de documento de las personas
   *    tags: [Document Type]
   *    responses:
   *      200:
   *        description: Retorna la información de los tipos de documento
   *      402:
   *        description: Error en el consumo / Token Invalido
   */
  @route("/get")
  @GET()
  // @before([verifyJwt])
  public async getDocumentType(req: Request, res: Response) {
    try {
      const response = await this.documentTypeService.getDocumentType();

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
}
