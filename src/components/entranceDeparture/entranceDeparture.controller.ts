import { before, GET, POST, route } from "awilix-express";
import { Request, Response } from "express";
import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { verifyJwt } from "../common/middlewares/jwt";
import validationMiddleware from "../common/middlewares/validation";
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
  ) {}

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
  @before([verifyJwt, validationMiddleware(SaveEntranceDto)])
  public async saveEntrance(req: Request, res: Response) {
    try {
      const entrance = await this.entranceDepartureService.saveEntrance(
        req.body as SaveEntranceDto,
        req.user as JwtUserPayload
      );

      res.status(200).json(entrance);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
}
