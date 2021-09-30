import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import { verifyJwt } from "../common/middlewares/jwt";
import { HelpService } from "./help.service";

/**
 * @swagger
 * tags:
 *  name: HELP
 */
@route("/api/v1/help")
export class HelpController {
  constructor(private readonly helpService: HelpService) { }

  /**
   * @swagger
   * /api/v1/help/requestsHelpCategory:
   *  get:
   *    summary: Obtención del listado de categorías relacionadas al formulario de Ayuda
   *    tags: [HELP]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: listado de categorías relacionadas al formulario
   *      401:
   *        description: Error en las credenciales
   */
  @route("/requestsHelpCategory")
  @GET()
  @before([verifyJwt])
  public async requestsHelpCategory(req: Request, res: Response) {
    try {
      const categories = await this.helpService.requestsHelpCategory();

      res.status(200).json({ data: categories });
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }




  /**
   * @swagger
   * /api/v1/help/saveFormHelp:
   *  post:
   *    summary: Guardado de información de los formularios de Help
   *    tags: [HELP]
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
   *                               description: Es el tipo de formulario de donde proviene (felicitaciones, solicitud, queja)
   *                             categoria:
   *                               type: integer
   *                               description: Es el tipo de categoria que se maneja para la solicitud de Help
   *                             categoriaTxt:
   *                               type: string
   *                               description: Texto de del tipo de categoria que se maneja para la solicitud de Help
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
   *                             estado:
   *                               type: string
   *                               description: Estado del usuario
   *            required:
   *              - allData
   *    responses:
   *      200:
   *        description: Información guardada correctamente
   *      401:
   *        description: Error de credenciales
   */
  @route("/saveFormHelp")
  @POST()
  @before([verifyJwt])
  public async saveFormHelp(req: Request, res: Response) {
    try {
      const login = await this.helpService.saveFormHelp(req.body);

      res.status(200).json(login);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

}
