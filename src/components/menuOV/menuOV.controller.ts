import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import validationMiddleware from "../common/middlewares/validation";
import { LoginDto } from "./dto/menuOV.dto";
import { MenuOVService } from "./menuOV.service";
import { verifyJwt, verifyRefreshToken } from "../common/middlewares/jwt";
import RequestWithUser from "../common/interfaces/requestWithUser";
import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";

/**
 * @swagger
 * tags:
 *  name: MenuOV
 */
@route("/api/v1/menuOV")
export class MenuOVController {
  constructor(private readonly menuOVService: MenuOVService) {}

  /**
   * @swagger
   * /api/v1/menuOV/:
   *  get:
   *    summary: Menu a cargar
   *    tags: [MenuOV]
   *    responses:
   *      200:
   *        description: Datos del menu
   *      401:
   *        description: Error en consultar datos de menu
   */
  @route("/")
  @GET()
  public async buscarMenu(req: Request, res: Response) {
    try {
      const buscarMenu = await this.menuOVService.buscarMenu();

      res.status(200).json(buscarMenu);
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/menuOV/formulariosCompletados:
   *  post:
   *    summary: Menus completados
   *    tags: [MenuOV]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              CODIGO_EMPRESA:
   *                type: integer
   *                description: codigo de la empresa
   *              NRO_DOCUMENTO:
   *                type: integer
   *                description: numero del documento
   *            required:
   *              - EMP_CODIGO
   *              - NRO_DOCUMENTO
   *    responses:
   *      200:
   *        description: Datos del menu
   *      401:
   *        description: Error en consultar datos de menu
   */
   @route("/formulariosCompletados")
   @POST()
   public async formulariosCompletados(req: Request, res: Response) {
     try {
       const buscarMenu = await this.menuOVService.formulariosCompletados(req.body);
 
       res.status(200).json(buscarMenu);
     } catch (e) {
       res.status(401).json({ message: e.message });
     }
   }
}
