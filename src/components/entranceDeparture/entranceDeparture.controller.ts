import { before, GET, POST, route } from "awilix-express";
import { Request, Response } from "express";
import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { JwtUserPayloadExternal } from "../common/interfaces/jwtUserPayloadExternal";
import { verifyJwt, verifyJwtExternal } from "../common/middlewares/jwt";
import validationMiddleware from "../common/middlewares/validation";
import { SaveDepartureDto } from "./dto/saveDeparture.dto";
import { SaveEntranceDto } from "./dto/saveEntrance.dto";
import { EntranceDepartureService } from "./entranceDeparture.service";

/**
 * @swagger
 * tags:
 *  name: Ingreso/Salida
 */
@route("/api/v1")
export class EntranceDepartureController {
  constructor(
    private readonly entranceDepartureService: EntranceDepartureService
  ) { }

  /**
   * @swagger
   * /api/v1/entrance:
   *  post:
   *    summary: realiza el ingreso
   *    tags: [Ingreso/Salida]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: Realiza el ingreso a al sistema
   *      402:
   *        description: Token invalido
   */
  @route("/entrance")
  @POST()
  @before([verifyJwtExternal])
  public async saveEntrance(req: Request, res: Response) {
    try {
      const entrance = await this.entranceDepartureService.saveEntrance(
        req.body as SaveEntranceDto,
        req.user as JwtUserPayloadExternal
      );

      res.status(200).json(entrance);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/entrance:
   *  get:
   *    summary: obtiene el ingreso
   *    tags: [Ingreso/Salida]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: obtiene el ingreso del día en el sistema
   *      402:
   *        description: Token invalido
   */
  @route("/entrance")
  @GET()
  @before([verifyJwt])
  public async getEntrance(req: Request, res: Response) {
    try {
      const entrance = await this.entranceDepartureService.getEntrance(
        req.user as JwtUserPayload
      );

      res.status(200).json(entrance);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/departure:
   *  post:
   *    summary: realiza la salida
   *    tags: [Ingreso/Salida]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: Realiza la salida en el sistema
   *      402:
   *        description: Token invalido
   */
  @route("/departure")
  @POST()
  @before([verifyJwtExternal])
  public async saveDeparture(req: Request, res: Response) {
    try {
      const departure = await this.entranceDepartureService.saveDeparture(
        req.body as SaveEntranceDto,
        req.user as JwtUserPayloadExternal
      );

      res.status(200).json(departure);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
}
