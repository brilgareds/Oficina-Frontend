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
 *    summary: Obtiene toda la información respecto a la billetera del usuario
 *    tags: [MYWALLET]
 *    security:
 *      - jwt: []
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
  @before([verifyJwt])
  public async getConsultarDatosUsuarioBilletera(req: Request, res: Response) {
    try {

      const response = await this.myWalletService.getConsultarDatosUsuarioBilletera(req.body.cedula);

      res.status(200).json(response);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }

  /**
 * @swagger
 * /api/v1/mywallet/deleteGastoBilletera:
 *  post:
 *    summary: Elimina un gasto en especifico de la billetera del usuario
 *    tags: [MYWALLET]
 *    security:
 *      - jwt: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              gastoId:
 *                type: integer
 *                description: Codigo del gasto de la billetera
 *              billCod:
 *                type: integer
 *                description: Codigo de la billetera
 *            required:
 *              - gastoId
 *              - billCod
 *    responses:
 *      200:
 *        description: Consumo exitoso
 *      402:
 *        description: Error en el consumo / Token Invalido
 */
  @route("/deleteGastoBilletera")
  @POST()
  @before([verifyJwt])
  public async deleteGastoBilletera(req: Request, res: Response) {
    try {

      const response = await this.myWalletService.deleteGastoBilletera(req.body.gastoId, req.body.billCod);

      res.status(200).json(response);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }

  /**
 * @swagger
 * /api/v1/mywallet/saveGastoBilletera:
 *  post:
 *    summary: Guarda un gasto nuevo a la billetera del usuario
 *    tags: [MYWALLET]
 *    security:
 *      - jwt: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              billCod:
 *                type: integer
 *                description: codigo de la billetera del usuario
 *              billeteraNueva:
 *                type: boolean
 *                description: Boleano para saber si es una billetera nueva o no
 *              cedula:
 *                type: integer
 *                description: cedula del usuario logueado
 *              salario:
 *                type: integer
 *                description: salario del usuario
 *              nombreUser:
 *                type: string
 *                description: nombre del usuario
 *              userDispo:
 *                type: integer
 *                description: dinero disponible del usuario
 *              userTotalGas:
 *                type: integer
 *                description: total de gastos del usuario
 *              conceptos:
 *                type: object
 *                properties:
 *                  gasto:
 *                    type: string
 *                    description: Nombre del tipo de gasto 
 *                  valor:
 *                    type: string
 *                    description: valor monetario del tipo gasto 
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
  @before([verifyJwt])
  public async saveGastoBilletera(req: Request, res: Response) {
    try {

      const response = await this.myWalletService.saveGastoBilletera(req.body);

      res.status(200).json(response);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }


}