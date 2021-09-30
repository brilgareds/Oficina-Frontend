import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import { verifyJwt } from "../common/middlewares/jwt";
import { RrhhService } from "./rrhh.service";

/**
 * @swagger
 * tags:
 *  name: RRHH
 */
@route("/api/v1/rrhh")
export class CategoryController {
  constructor(private readonly rrhhService: RrhhService) { }

  /**
   * @swagger
   * /api/v1/rrhh/for_you_categories:
   *  get:
   *    summary: Obtención del listado de categorías relacionadas al formulario estamos para ti de rrhh
   *    tags: [RRHH]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: listado de categorías relacionadas al formulario
   *      401:
   *        description: Error en las credenciales
   */
  @route("/for_you_categories")
  @GET()
  @before([verifyJwt])
  public async getForYouCategories(req: Request, res: Response) {
    try {
      const categories = await this.rrhhService.getWeAreForYouCategories();

      res.status(200).json({ data: categories });
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/rrhh/resource_request_categories:
   *  get:
   *    summary: Obtención del listado de categorías relacionadas al formulario solicitudes de rrhh
   *    tags: [RRHH]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: listado de categorías relacionadas al formulario
   *      401:
   *        description: Error en las credenciales
   */
  @route("/resource_request_categories")
  @GET()
  @before([verifyJwt])
  public async getResourceRequestCategories(req: Request, res: Response) {
    try {
      const categories =
        await this.rrhhService.getResourcesRequestCategoriesCategories();

      res.status(200).json({ data: categories });
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }




  /**
   * @swagger
   * /api/v1/rrhh/saveFormRRHH:
   *  post:
   *    summary: Guardado de información de los formularios de RRHH
   *    tags: [RRHH]
   *    security:
   *      - jwt: []
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
   *                             formulario:
   *                               type: string
   *                               description: Es el tipo de formulario de donde proviene (estamosParaTi, talkToUs, SolicitudesRRHH)
   *                             categoria:
   *                               type: integer
   *                               description: Es el tipo de categoria que se maneja para la solicitud de RRHH
   *                             descripcion:
   *                               type: string
   *                               description: Es la descripción de la solicitud del formulario
   *                             correoEnvioRespuesta:
   *                               type: string
   *                               description: Correo electrónico de la persona solicitante
   *                             otroMedioRespuesta:
   *                               type: boolean
   *                               description: Es la confirmación de que él usuario desea ser contactado por algun medio de comunicación
   *                             numeroTelefonico:
   *                               type: integer
   *                               description: Número telefónico del usuario solicitante
   *                             tipoContacto:
   *                               type: string
   *                               description: Tipo de contacto seleccionado (wpp, llamada)
   *                     dataUser:
   *                         type: object
   *                         properties:
   *                             cedula:
   *                               type: string
   *                               description: Número de identificación
   *                             nombres:
   *                               type: string
   *                               description: Nombre del usuario
   *                             apellidos:
   *                               type: string
   *                               description: Apellido del usuario
   *                             empresa:
   *                               type: string
   *                               description: Empresa del usuario
   *                             cCostos:
   *                               type: string
   *                               description: Centro de costos del usuario
   *                             numeroCelular:
   *                               type: string
   *                               description: Número de telefóno del usuario
   *            required:
   *              - allData
   *    responses:
   *      200:
   *        description: Información guardada correctamente
   *      401:
   *        description: Error de credenciales
   */
  @route("/saveFormRRHH")
  @POST()
  @before([verifyJwt])
  public async saveFormRRHH(req: Request, res: Response) {
    try {
      const login = await this.rrhhService.saveFormRRHH(req.body);

      res.status(200).json(login);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

}
