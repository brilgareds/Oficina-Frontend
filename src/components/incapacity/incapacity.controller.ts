import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import { verifyJwt } from "../common/middlewares/jwt";
import { IncapacityService } from "./incapacity.service";
import { uploadFile } from "../common/middlewares/uploadFile";


/**
 * @swagger
 * tags:
 *  name: INCAPACITY
 */
@route("/api/v1/incapacity")
export class CategoryController {
  constructor(private readonly incapacityService: IncapacityService) { }


  /**
   * @swagger
   * /api/v1/incapacity/getEpsIncapacidad:
   *  get:
   *    summary: Retorna las EPS habilitadas en el sistema para el módulo de incapacidades
   *    tags: [INCAPACITY]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: Consumo exitoso
   *      402:
   *        description: Error en el consumo / Token Invalido
   */
  @route("/getEpsIncapacidad")
  @GET()
  // @before([verifyJwt])
  public async getEpsIncapacidad(req: Request, res: Response) {
    try {

      const response = await this.incapacityService.getEpsIncapacidad();

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }


  /**
 * @swagger
 * /api/v1/incapacity/getTypesIncapacity:
 *  post:
 *    summary: Optiene el tipo de incapacidades
 *    tags: [INCAPACITY]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              empresa:
 *                type: integer
 *                description: empresa del usuario 
 *            required:
 *              - empresa
 *    responses:
 *      200:
 *        description: Consumo exitoso
 *      402:
 *        description: Error en el consumo / Token Invalido
 */
  @route("/getTypesIncapacity")
  @POST()
  // @before([verifyJwt])
  public async getTypesIncapacity(req: Request, res: Response) {
    try {

      const response = await this.incapacityService.getTypesIncapacity(req.body.empresa);

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }


  /**
 * @swagger
 * /api/v1/incapacity/getDocumentsIncapacity:
 *  post:
 *    summary: Optioene el tipo de documentos para incapacidades
 *    tags: [INCAPACITY]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              empresa:
 *                type: integer
 *                description: empresa del usuario 
 *              tipoIncapacidad:
 *                type: integer
 *                description: tipo de incapacidad que selecciona el usuario
 *            required:
 *              - empresa
 *              - tipoIncapacidad
 *    responses:
 *      200:
 *        description: Consumo exitoso
 *      402:
 *        description: Error en el consumo / Token Invalido
 */
  @route("/getDocumentsIncapacity")
  @POST()
  // @before([verifyJwt])
  public async getDocumentsIncapacity(req: Request, res: Response) {
    try {

      const response = await this.incapacityService.getDocumentsIncapacity(req.body.empresa, req.body.tipoIncapacidad);

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }



  /**
   * @swagger
   * /api/v1/incapacity/saveDisabilityFiling:
   *  post:
   *    summary: Guardado de información de los formularios de RRHH
   *    tags: [INCAPACITY]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              allData:
   *                 type: object
   *                 properties:
   *                     dataForm:
   *                         type: object
   *                         properties:
   *                             file:
   *                               type: object
   *                               description: Objeto de los archivos que se suben para constancia de la incapacidad
   *                             otraEntidad:
   *                               type: object
   *                               properties:
   *                                   status:
   *                                     type: boolean
   *                                     description: viene con otra entidad (true/false)
   *                                   value:
   *                                     type: string
   *                                     description: id del otro tipo de entidad
   *                             prorroga:
   *                               type: boolean
   *                               description: Si la incapacidad viene con prorroga (true/false)
   *                             rangoFechas:
   *                               type: object
   *                               properties:
   *                                   fechaFin:
   *                                     type: string
   *                                     description: fecha fin de la incapacidad
   *                                     format: "yyyy-mm-dd"
   *                                   value:
   *                                     type: string
   *                                     description: fecha inicial de la incapacidad
   *                                     format: "yyyy-mm-dd"
   *                             tipoIncapacidad:
   *                               type: integer
   *                               description: tipo de incapacidad que radica
   *                     dataUser:
   *                         type: object
   *                         properties:
   *                             cedula:
   *                               type: string
   *                               description: Número de identificación
   *                             correoElectronico:
   *                               type: string
   *                               description: Correo del usuario
   *                             eps:
   *                               type: string
   *                               description: Eps del usuario
   *                             nombres:
   *                               type: string
   *                               description: Nombre y apellido del usuario
   *                             telefono:
   *                               type: string
   *                               description: Número de telefóno del usuario
   *            required:
   *              - allData
   *    responses:
   *      200:
   *        description: Información guardada correctamente
   *      401:
   *        description: Error en la insercion
   */
  @route("/saveDisabilityFiling")
  @POST()
  @before([uploadFile])
  public async saveDisabilityFiling(req: Request, res: Response) {
    try {

      const response = await this.incapacityService.saveDisabilityFiling(req);

      res.status(200).json(response);

    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }



  /**
 * @swagger
 * /api/v1/incapacity/getUserIncapacities:
 *  post:
 *    summary: Obtiene todas las incapacidades del usuario
 *    tags: [INCAPACITY]
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
  @route("/getUserIncapacities")
  @POST()
  // @before([verifyJwt])
  public async getUserIncapacities(req: Request, res: Response) {
    try {

      const response = await this.incapacityService.getUserIncapacities(req.body.cedula);

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }


  /**
 * @swagger
 * /api/v1/incapacity/getUserIncapacitiesFiles:
 *  post:
 *    summary: Obtiene todas los archivos de una incapacidad
 *    tags: [INCAPACITY]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              numeroIncapacidad:
 *                type: integer
 *                description: consecutivo de la incapacidad 
 *            required:
 *              - numeroIncapacidad
 *    responses:
 *      200:
 *        description: Consumo exitoso
 *      402:
 *        description: Error en el consumo / Token Invalido
 */
  @route("/getUserIncapacitiesFiles")
  @POST()
  // @before([verifyJwt])
  public async getUserIncapacitiesFiles(req: Request, res: Response) {
    try {

      const response = await this.incapacityService.getUserIncapacitiesFiles(req.body.numeroIncapacidad);

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }


  /**
 * @swagger
 * /api/v1/incapacity/getUserDataIncapacity:
 *  post:
 *    summary: Obtiene todas los datos de la incapacidad
 *    tags: [INCAPACITY]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              numeroIncapacidad:
 *                type: integer
 *                description: consecutivo de la incapacidad 
 *            required:
 *              - numeroIncapacidad
 *    responses:
 *      200:
 *        description: Consumo exitoso
 *      402:
 *        description: Error en el consumo / Token Invalido
 */
  @route("/getUserDataIncapacity")
  @POST()
  // @before([verifyJwt])
  public async getUserDataIncapacity(req: Request, res: Response) {
    try {

      const response = await this.incapacityService.getUserDataIncapacity(req.body.numeroIncapacidad);

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }


}