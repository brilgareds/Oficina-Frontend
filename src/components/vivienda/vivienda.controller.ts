import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import validationMiddleware from "../common/middlewares/validation";
import { ViviendaDto, CrearViviendaDto } from "./dto/vivienda.dto";
import { ViviendaService } from "./vivienda.service";

/**
 * @swagger
 * tags:
 *  name: vivienda
 */
@route("/api/v1/vivienda")
export class ViviendaController {
  constructor(private readonly viviendaService: ViviendaService) {}

  /**
   * @swagger
   * /api/v1/vivienda/consultarDatosVivienda:
   *  post:
   *    summary: Informacion de vivienda del usuario
   *    tags: [vivienda]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              informacionBasica_codigo:
   *                type: integer
   *                description: codigo de la informacion basica
   *              EMP_CODIGO:
   *                type: integer
   *                description: numero de empresa del usuario
   *              NRO_DOCUMENTO:
   *                type: integer
   *                description: numero de documento del usuario
   *            required:
   *              - EMP_CODIGO
   *              - NRO_DOCUMENTO
   *    responses:
   *      200:
   *        description: Consulta exitosa de la informacion de vivienda del usuario
   *      401:
   *        description: Error en consultar la informacion de vivienda del usuario
   */
  @route("/consultarDatosVivienda")
  @POST()
  @before([validationMiddleware(ViviendaDto)])
  public async consultarDatosVivienda(req: Request, res: Response) {
    try {
      const buscarDatos = await this.viviendaService.consultarDatosVivienda(req.body);

      res.status(200).json(buscarDatos);
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/vivienda/consultarDatosTipVivienda:
   *  get:
   *    summary: Informacion de los tipos de vivienda
   *    tags: [vivienda]
   *    responses:
   *      200:
   *        description: Consulta exitosa de los tipos de vivienda
   *      401:
   *        description: Error en consultar la informacion de los tipos de vivienda
   */
   @route("/consultarDatosTipVivienda")
   @GET()
   public async consultarDatosTipVivienda(req: Request, res: Response) {
     try {
       const buscarDatosTipVivienda = await this.viviendaService.consultarDatosTipVivienda();
 
       res.status(200).json(buscarDatosTipVivienda);
     } catch (e) {
       res.status(401).json({ message: e.message });
     }
   }

  /**
   * @swagger
   * /api/v1/vivienda/consultarDatosPerimetro:
   *  get:
   *    summary: Informacion de los perimetros
   *    tags: [vivienda]
   *    responses:
   *      200:
   *        description: Consulta exitosa de los perimetros
   *      401:
   *        description: Error en consultar la informacion de los perimetros
   */
   @route("/consultarDatosPerimetro")
   @GET()
   public async consultarDatosPerimetro(req: Request, res: Response) {
     try {
       const buscarDatosPerimetro = await this.viviendaService.consultarDatosPerimetro();
  
       res.status(200).json(buscarDatosPerimetro);
     } catch (e) {
       res.status(401).json({ message: e.message });
     }
   }

  /**
   * @swagger
   * /api/v1/vivienda/consultarDatosEstrato:
   *  get:
   *    summary: Informacion de los estratos
   *    tags: [vivienda]
   *    responses:
   *      200:
   *        description: Consulta exitosa de los estratos
   *      401:
   *        description: Error en consultar la informacion de los estratos
   */
   @route("/consultarDatosEstrato")
   @GET()
   public async consultarDatosEstrato(req: Request, res: Response) {
     try {
       const buscarDatosEstrato = await this.viviendaService.consultarDatosEstrato();
   
       res.status(200).json(buscarDatosEstrato);
     } catch (e) {
       res.status(401).json({ message: e.message });
     }
   }

  /**
   * @swagger
   * /api/v1/vivienda/consultarDatosServicios:
   *  get:
   *    summary: Informacion de los estratos
   *    tags: [vivienda]
   *    responses:
   *      200:
   *        description: Consulta exitosa de los estratos
   *      401:
   *        description: Error en consultar la informacion de los estratos
   */
   @route("/consultarDatosServicios")
   @POST()
   @before([validationMiddleware(CrearViviendaDto)])
   public async crearRegistroVivienda(req: Request, res: Response) {
     try {
       const buscarDatosServicio = await this.viviendaService.crearRegistroVivienda(req.body);
   
       res.status(200).json(buscarDatosServicio);
     } catch (e) {
       res.status(401).json({ message: e.message });
     }
   }

}
