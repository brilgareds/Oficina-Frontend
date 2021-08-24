import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import { verifyJwt } from "../common/middlewares/jwt";
import { RrhhService } from "./rrhh.service";

/**
 * @swagger
 * tags:
 *  name: RRHH
 */
@route("/api/v1/rrhh")
export class CategoryController {
  constructor(private readonly rrhhService: RrhhService) {}

  /**
   * @swagger
   * /api/v1/rrhh/for_you_categories:
   *  get:
   *    summary: Obtención del listado de categorías relacionadas al formulario estamos para ti de rrhh
   *    tags: [RRHH]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: listado de categorías relacionadas al formulario
   *      401:
   *        description: Error en las credenciales
   */
  @route("/for_you_categories")
  @GET()
  @before([verifyJwt])
  public async getForYouCategories(req: Request, res: Response) {
    try {
      const categories = await this.rrhhService.getWeAreForYouCategories();

      res.status(200).json({ data: categories });
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/rrhh/resource_request_categories:
   *  get:
   *    summary: Obtención del listado de categorías relacionadas al formulario solicitudes de rrhh
   *    tags: [RRHH]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: listado de categorías relacionadas al formulario
   *      401:
   *        description: Error en las credenciales
   */
  @route("/resource_request_categories")
  @GET()
  @before([verifyJwt])
  public async getResourceRequestCategories(req: Request, res: Response) {
    try {
      const categories =
        await this.rrhhService.getResourcesRequestCategoriesCategories();

      res.status(200).json({ data: categories });
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }
}
