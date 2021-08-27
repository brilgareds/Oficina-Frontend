import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import validationMiddleware from "../common/middlewares/validation";
import { InformacionBasicaDto, DepartamentosDto, ActualizarInformacionBasicaDto } from "./dto/informacionBasica.dto";
import { InformacionBasicaService } from "./informacionBasica.service";

/**
 * @swagger
 * tags:
 *  name: InformacionBasica
 */
@route("/api/v1/informacionBasica")
export class InformacionBasicaController {
  constructor(private readonly informacionBasicaService: InformacionBasicaService) {}

  /**
   * @swagger
   * /api/v1/informacionBasica/consultaDatos:
   *  post:
   *    summary: Informacion basica del usuario
   *    tags: [InformacionBasica]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              cedula:
   *                type: integer
   *                description: identificación del usuario
   *              empresa:
   *                type: integer
   *                description: numero de empresa del usuario
   *            required:
   *              - cedula
   *              - empresa
   *    responses:
   *      200:
   *        description: Consulta exitosa de la informacion basica del usuario
   *      401:
   *        description: Error en consultar informacion basica del usuario
   */
  @route("/consultaDatos")
  @POST()
  @before([validationMiddleware(InformacionBasicaDto)])
  public async buscarMenu(req: Request, res: Response) {
    try {
      const buscarMenu = await this.informacionBasicaService.buscarMenu(req.body);

      res.status(200).json(buscarMenu);
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/informacionBasica/consultarPaises:
   *  get:
   *    summary: Lista de paises
   *    tags: [InformacionBasica]
   *    responses:
   *      200:
   *        description: Datos de los paises
   *      401:
   *        description: Error en consultar datos de los paises
   */
   @route("/consultarPaises")
   @GET()
   public async consultarPaises(req: Request, res: Response) {
     try {
       const paises = await this.informacionBasicaService.consultarPaises();
 
       res.status(200).json(paises);
     } catch (e) {
       res.status(401).json({ message: e.message });
     }
   }

   /**
   * @swagger
   * /api/v1/informacionBasica/consultaDepartamentos:
   *  post:
   *    summary: Lista de departamentos
   *    tags: [InformacionBasica]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              codPais:
   *                type: integer
   *                description: numero del pais del departamento
   *            required:
   *              - codPais
   *    responses:
   *      200:
   *        description: Datos de los departamentos
   *      401:
   *        description: Error en consultar datos de los departamentos
   */
  @route("/consultaDepartamentos")
  @POST()
  @before([validationMiddleware(DepartamentosDto)])
  public async consultarDepartamentos(req: Request, res: Response) {
    try {
      const departamentos = await this.informacionBasicaService.consultarDepartamentos(req.body);

      res.status(200).json(departamentos);
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/informacionBasica/consultarNomenclatura:
   *  get:
   *    summary: Lista de nomenclatura
   *    tags: [InformacionBasica]
   *    responses:
   *      200:
   *        description: Datos de la nomenclatura
   *      401:
   *        description: Error en consultar datos de la nomenclatura
   */
   @route("/consultarNomenclatura")
   @GET()
   public async consultarNomenclatura(req: Request, res: Response) {
     try {
       const paises = await this.informacionBasicaService.consultarNomenclatura();
 
       res.status(200).json(paises);
     } catch (e) {
       res.status(401).json({ message: e.message });
     }
   }

  /**
   * @swagger
   * /api/v1/informacionBasica/actualizacionDatos:
   *  post:
   *    summary: Actualización de datos
   *    tags: [InformacionBasica]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              codPais:
   *                type: integer
   *                description: numero del pais del departamento
   *            required:
   *              - codPais
   *    responses:
   *      200:
   *        description: Datos de los departamentos
   *      401:
   *        description: Error en consultar datos de los departamentos
   */
   @route("/actualizacionDatos")
   @POST()
   @before([validationMiddleware(ActualizarInformacionBasicaDto)])
   public async actualizacionDatos(req: Request, res: Response) {
     try {
       const departamentos = await this.informacionBasicaService.actualizacionDatos(req.body);
 
       res.status(200).json(departamentos);
     } catch (e) {
       res.status(401).json({ message: e.message });
     }
   }

}
