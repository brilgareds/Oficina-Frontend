import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import validationMiddleware from "../common/middlewares/validation";
import { QualificationService } from "./qualification.service";
import { CrearRegistroSaludDto } from "./dto/saveQualification.dto";
import { v4 } from "uuid";

/**
 * @swagger
 * tags:
 *  name: qualification
 */
@route("/api/v1/qualification")
export class QualificationController {
  constructor(private readonly qualificationService: QualificationService) {}

  /**
   * @swagger
   * /api/v1/qualification/crearRegistroQualification:
   *  post:
   *    summary: Actualización de datos
   *    tags: [qualification]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              OVT_CEDULA:
   *                type: integer
   *                description: codigo del tipo de documento
   *              input_add:
   *                type: any
   *                description: codigo de la empresa
   *              sendNotification:
   *                type: any
   *                description: numero del documento
   *              CALIFICACION:
   *                type: integer
   *                description: numero del documento
   *            required:
   *              - OVT_CEDULA
   *              - CALIFICACION
   *    responses:
   *      200:
   *        description: Datos de los departamentos
   *      401:
   *        description: Error en consultar datos de los departamentos
   */
   @route("/crearRegistroQualification")
   @POST()
   @before(validationMiddleware(CrearRegistroSaludDto))
   public async crearRegistroSalud(req: Request, res: Response) {
     try {
      
      const buscarDatosPlanSalud = await this.qualificationService.crearRegistroQualification(req.body);
 
      res.status(200).json(buscarDatosPlanSalud);
     } catch (e: any) {
       res.status(401).json({ message: e.message });
     }
   }

}
