import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import { verifyJwt } from "../common/middlewares/jwt";
import { PresentationCardService } from "./PresentationCard.service";

/**
 * @swagger
 * tags:
 *  name: presentationCard
 */
 @route("/api/v1/presentationCard")
 export class CategoryController {
   constructor(private readonly presentationCardService: PresentationCardService) { }
 
 
/**
  * @swagger
  * /api/v1/presentationCard/ResquestApproval:
  *  post:
  *    summary: Solicitar aprobación de carta de presentación
  *    tags: [presentationCard]
  *    security:
  *      - jwt: []
  *    requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            type: object
  *            properties:
  *              typeCard:
  *                type: string
  *                description: tipo de carta de presentación
  *              city:
  *                type: string
  *                description: Ciudad
  *              materials:
  *                type: array
  *                items:
  *                  type: object
  *                description: Materiales para ingreso
  *              salesPoints:
  *                type: array
  *                items:
  *                  type: object
  *                description: Puntos de venta
  *              unrelatedsalesPoints:
  *                type: array
  *                items:
  *                  type: object
  *                description: Puntos de venta no relacionados
  *            required:
  *              - typeCard  
  *              - city
  *    responses:
  *      200:
  *        description: Solicitud aceptada
  *      401:
  *        description: Error al crear solicitud
  */
  @route("/ResquestApproval")
  @POST()
  @before([verifyJwt])
  public async ResquestApproval(req: Request, res: Response) {
   try {
     console.log(req.user);
     const data = { ...req.user, ...req.body };

     /*
        $_SESSION['Cargo'];
        $_SESSION['Genero'];
        $_SESSION['necesitaAprovacion'];
     */

     const response = await this.presentationCardService.ResquestApproval(data);

     res.status(200).json(response);
   } catch (e:any) {
     res.status(400).json({ message: e.message });
   }
  }
}