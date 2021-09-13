import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import { verifyJwt } from "../common/middlewares/jwt";
import { MyWalletService } from "./myWallet.service";


/**
 * @swagger
 * tags:
 *  name: MYWALLET
 */
@route("/api/v1/myWallet")
export class CategoryController {
  constructor(private readonly myWalletService: MyWalletService) { }


  /**
 * @swagger
 * /api/v1/mywallet/getConsultarDatosUsuarioBilletera:
 *  post:
 *    summary: Obtiene toda la información respecto a la billetera
 *    tags: [MYWALLET]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              cedula:
 *                type: integer
 *                description: cedula del usuario
 *            required:
 *              - cedula
 *    responses:
 *      200:
 *        description: Consumo exitoso
 *      402:
 *        description: Error en el consumo / Token Invalido
 */
  @route("/getConsultarDatosUsuarioBilletera")
  @POST()
  // @before([verifyJwt])
  public async getConsultarDatosUsuarioBilletera(req: Request, res: Response) {
    try {

      const response = await this.myWalletService.getConsultarDatosUsuarioBilletera(req.body.cedula);

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  /**
 * @swagger
 * /api/v1/mywallet/deleteGastoBilletera:
 *  post:
 *    summary: Obtiene toda la información respecto a la billetera
 *    tags: [MYWALLET]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              cedula:
 *                type: integer
 *                description: cedula del usuario
 *            required:
 *              - cedula
 *    responses:
 *      200:
 *        description: Consumo exitoso
 *      402:
 *        description: Error en el consumo / Token Invalido
 */
  @route("/deleteGastoBilletera")
  @POST()
  // @before([verifyJwt])
  public async deleteGastoBilletera(req: Request, res: Response) {
    try {

      const response = await this.myWalletService.deleteGastoBilletera(req.body.gastoId, req.body.billCod);

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  /**
 * @swagger
 * /api/v1/mywallet/saveGastoBilletera:
 *  post:
 *    summary: Obtiene toda la información respecto a la billetera
 *    tags: [MYWALLET]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              cedula:
 *                type: integer
 *                description: cedula del usuario
 *            required:
 *              - cedula
 *    responses:
 *      200:
 *        description: Consumo exitoso
 *      402:
 *        description: Error en el consumo / Token Invalido
 */
  @route("/saveGastoBilletera")
  @POST()
  // @before([verifyJwt])
  public async saveGastoBilletera(req: Request, res: Response) {
    try {

      const response = await this.myWalletService.saveGastoBilletera(req.body);

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }


}