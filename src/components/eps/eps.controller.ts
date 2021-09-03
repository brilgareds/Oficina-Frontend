import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import { EpsService } from "./eps.service";
import { verifyJwt } from "../common/middlewares/jwt";

/**
 * @swagger
 * tags:
 *  name: EPS
 */
@route("/api/v1/eps")
export class EpsController {
  constructor(private readonly epsService: EpsService) {}

  /**
   * @swagger
   * /api/v1/eps/get:
   *  get:
   *    summary: Retorna los generos de las personas
   *    tags: [EPS]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: Retorna la información de los generos
   *      402:
   *        description: Error en el consumo / Token Invalido
   */
  @route("/get")
  @GET()
  // @before([verifyJwt])
  public async getEps(req: Request, res: Response) {
    try {
      const response = await this.epsService.getEps();

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
}
