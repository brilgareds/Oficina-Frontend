import { before, GET, route } from "awilix-express";
import { Request, Response } from "express";
import { verifyJwt } from "../common/middlewares/jwt";
import { BranchService } from "./brach.service";

/**
 * @swagger
 * tags:
 *  name: Sedes
 */
@route("/api/v1/branches")
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  /**
   * @swagger
   * /api/v1/branches:
   *  get:
   *    summary: Retorna las sedes
   *    tags: [Sedes]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: Retorna las sedes registradas en el sistema
   *      402:
   *        description: Token invalido
   */
  @route("/")
  @GET()
  @before([verifyJwt])
  public async me(req: Request, res: Response) {
    try {
      const userInformation = await this.branchService.getAllBranches();

      res.status(200).json(userInformation);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
}
