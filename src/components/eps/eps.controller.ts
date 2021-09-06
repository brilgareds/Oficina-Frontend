import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import { EpsService } from "./eps.service";
import { verifyJwt, verifyRefreshToken } from "../common/middlewares/jwt";
import RequestWithUser from "../common/interfaces/requestWithUser";

/**
 * @swagger
 * tags:
 *  name: EPS
 */
@route("/api/v1/eps")
export class EpsController {
  constructor(private readonly epsService: EpsService) { }

  /**
   * @swagger
   * /api/v1/eps/get:
   *  get:
   *    summary: Retorna las EPS habilitadas en el sistema
   *    tags: [EPS]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: Consumo exitoso
   *      402:
   *        description: Error en el consumo / Token Invalido
   */
  @route("/get")
  @GET()
  // @before([verifyJwt])
  public async getEps(req: RequestWithUser, res: Response) {
    try {

      const response = await this.epsService.getEps();

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

}
