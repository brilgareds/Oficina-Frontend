import { before, GET, route } from "awilix-express";
import { Request, Response } from "express";
import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { verifyJwt } from "../common/middlewares/jwt";
import { SalePointService } from "./salePoint.service";

/**
 * @swagger
 * tags:
 *  name: Puntos de venta
 */
export class SalePointController {
  constructor(private readonly salePointService: SalePointService) {}

  /**
   * @swagger
   * /api/v1/cities/{cityId}/salePoints:
   *  get:
   *    summary: Retorna los puntos de venta
   *    tags: [Puntos de venta]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: Retorna los puntos de venta registrados en el sistema
   *      402:
   *        description: Token invalido
   */
  @route("/api/v1/cities/:cityId/salePoints")
  @GET()
  @before([verifyJwt])
  public async getAllSalePoints(req: Request, res: Response) {
    try {
      const cityId = parseInt(req.params.cityId);
      if (!cityId) {
        throw new Error("El id de la ciudad es requerida");
      }

      const salePoints = await this.salePointService.getAllSalePoints(
        cityId,
        req.user as JwtUserPayload
      );

      res.status(200).json(salePoints);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
}
