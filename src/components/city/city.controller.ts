import { before, GET, route } from "awilix-express";
import { Request, Response } from "express";
import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { verifyJwt } from "../common/middlewares/jwt";
import { CityService } from "./city.service";

/**
 * @swagger
 * tags:
 *  name: Ciudades
 */
@route("/api/v1/cities")
export class BranchController {
  constructor(private readonly cityService: CityService) {}

  /**
   * @swagger
   * /api/v1/cities:
   *  get:
   *    summary: Retorna las ciudades
   *    tags: [Ciudades]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: Retorna las ciudades registradas en el sistema
   *      402:
   *        description: Token invalido
   */
  @route("/")
  @GET()
  @before([verifyJwt])
  public async getAllCities(req: Request, res: Response) {
    try {
      const cities = await this.cityService.getAllCities(
        req.user as JwtUserPayload
      );

      res.status(200).json(cities);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
}
