import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import { verifyJwt } from "../common/middlewares/jwt";
import { PresentationCardService } from "./PresentationCard.service";
import { DateInText } from "../common/helpers/global";

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
     const backendUrl = `${req.protocol}://${req.get('host')}${req.path.split('/', 4).join('/')}/`;
     const data = { ...req.user, ...req.body, backendUrl };

     const response = await this.presentationCardService.ResquestApproval(data);

     res.status(200).json(response);
   } catch (e:any) {
     res.status(400).json({ message: e.message });
   }
  }


  /**
   * @swagger
   * /api/v1/presentationCard/acceptOrRejectCard/{data}:
   *  get:
   *    summary:
   *    tags: [presentationCard]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description:
   *      401:
   *        description: Error en las credenciales
   */
   @route('/acceptOrRejectCard/:data')
   @GET()
   public async acceptOrRejectCard(req: Request, res: Response) {
      try {
          const data = { ...JSON.parse(Buffer.from(req?.params?.data || '', 'base64').toString('utf8')), DateInText: DateInText() };
          const response = (
              (data?.accion === 'Accept') ?
                  await this.presentationCardService.acceptCard(data) :
              (data?.accion === 'Reject') ?
                  await this.presentationCardService.rejectCard(data) :
              false
          );

          if (!response) throw new Error('Error al procesar la carta!');

          const html = `<script>alert('${response}');javascript:;window.close()</script>`;
          res.status(200).send(html);
      }
      catch (e:any){
          console.log(e)
          res.status(400).json({ message: e.message });
      }
  }
}