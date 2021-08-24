import { Request, Response } from "express";
import { route, POST, before } from "awilix-express";
import validationMiddleware from "../common/middlewares/validation";
import { InformacionBasicaDto } from "./dto/informacionBasica.dto";
import { InformacionBasicaService } from "./informacionBasica.service";

/**
 * @swagger
 * tags:
 *  name: InformacionBasica
 */
@route("/api/v1/informacionBasica")
export class InformacionBasicaController {
  constructor(private readonly informacionBasicaService: InformacionBasicaService) {}

  /**
   * @swagger
   * /api/v1/informacionBasica/consulta:
   *  post:
   *    summary: Menu a cargar
   *    tags: [InformacionBasica]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              cedula:
   *                type: integer
   *                description: identificación del usuario
   *              empresa:
   *                type: integer
   *                description: numero de empresa del usuario
   *            required:
   *              - cedula
   *              - empresa
   *    responses:
   *      200:
   *        description: Datos del menu
   *      401:
   *        description: Error en consultar datos de menu
   */
  @route("/consulta")
  @POST()
  @before([validationMiddleware(InformacionBasicaDto)])
  public async buscarMenu(req: Request, res: Response) {
    try {
      const buscarMenu = await this.informacionBasicaService.buscarMenu(req.body);

      res.status(200).json(buscarMenu);
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }
}
