import { before, GET, route } from "awilix-express";
import { Request, Response } from "express";
import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { verifyJwt } from "../common/middlewares/jwt";
import { CheckInAndCheckOutService } from "./checkInAndCheckOut.services";
// import { SalePointService } from "./salePoint.service";

/**
 * @swagger
 * tags:
 *  name: checkInAndCheckOut
 */
@route("/api/v1/checkInAndCheckOut")
export class CheckInAndCheckOutController {
  constructor(private readonly checkInAndCheckOutService: CheckInAndCheckOutService) {}

  /**
   * @swagger
   * /api/v1/checkInAndCheckOut/getMainInfo:
   *  get:
   *    summary: Retorna información general requerida para cargar modulo de ingreso y salida
   *    tags: [checkInAndCheckOut]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: Información encontrada con exito
   *      402:
   *        description: Token invalido
   */
   @route("/getMainInfo")
   @GET()
   @before([verifyJwt])
   public async getMainInfo(req: Request, res: Response) {
    try {

      console.log('req.user: ', req.user);
      const data = { ...req.user, ...req.body };

      const response = await this.checkInAndCheckOutService.getMainInfo(data);

      res.status(200).json(response);
    }
    catch(e:any) {
      res.status(400).json({ message: e.message });
    }
   }
}