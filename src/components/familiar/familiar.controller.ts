import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import validationMiddleware from "../common/middlewares/validation";

import { FamiliarService } from "./familiar.service";

/**
 * @swagger
 * tags:
 *  name: Familiar
 */
 @route("/api/v1/familiar")
 export class FamiliarController {
  
  constructor(private readonly familiarService: FamiliarService) {}

  /**
   * @swagger
   * /api/v1/familiar/consultarDiscapacidad:
   *  get:
   *    summary: Lista los tipos de Discapacidades
   *    tags: [Familiar]
   *    responses:
   *      200:
   *        description: Datos de los tipos de discapacidades
   *      401:
   *        description: Error en consultar datos de tipos de discapacidades
   */
   @route("/consultarDiscapacidad")
   @GET()
   public async consultarDiscapacidad(req: Request, res: Response) {
    try {
      const consultarDiscapacidad = await this.familiarService.consultarDiscapacidad();

      res.status(200).json(consultarDiscapacidad);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }


  /**
   * @swagger
   * /api/v1/familiar/consultarTipoRelacion:
   *  get:
   *    summary: Lista los tipos de Relaciones familiares
   *    tags: [Familiar]
   *    responses:
   *      200:
   *        description: Datos de los tipos de relacion familiar
   *      401:
   *        description: Error en consultar tipos de relacion familiar
   */
   @route("/consultarTipoRelacion")
   @GET()
   public async consultarTipoRelacion(req: Request, res: Response) {
    try {
      const consultarTipoRelacion = await this.familiarService.consultarTipoRelacion();

      res.status(200).json(consultarTipoRelacion);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }
  

  /**
   * @swagger
   * /api/v1/familiar/crearFamiliar:
   *  post:
   *    summary: Informacion de estudio de los usuarios
   *    tags: [Familiar]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              COD_EMPL:
   *                type: integer
   *                description: identificaci??n del usuario
   *              COD_EMPR:
   *                type: integer
   *                description:
   *              TIP_IDEN:
   *                type: string
   *                description:
   *              COD_FAMI:
   *                type: integer
   *                description:
   *              NOM_FAMI:
   *                type: string
   *                description:
   *              APE_FAMI:
   *                type: string
   *                description:
   *              TIP_RELA:
   *                type: string
   *                description:
   *              SEX_FAMI:
   *                type: string
   *                description:
   *              FEC_NACI:
   *                type: string
   *                description:
   *              EST_VIDA:
   *                type: string
   *                description:
   *              FAM_DEPE:
   *                type: string
   *                description:
   *              EST_DISC:
   *                type: string
   *                description:
   *              TIP_DISC:
   *                type: integer
   *                description:
   *              CONTACTO_EMER:
   *                type: string
   *                description:
   *              FAMILIAR_IN_HOME:
   *                type: string
   *                description:
   *              MPI_FAMI:
   *                type: integer
   *                description:
   *              DIR_FAMI:
   *                type: string
   *                description:
   *              TEL_FAMI:
   *                type: string
   *                description:
   *              TRA_ESTU:
   *                type: string
   *                description:
   *              GRA_ESCO:
   *                type: string
   *                description:
   *              BEN_CACO:
   *                type: string
   *                description:
   *              BEN_EEPS:
   *                type: string
   *                description:
   *              PARTICIPAR_ACTIV:
   *                type: string
   *                description:
   *              HOB_FAMI:
   *                type: string
   *                description:
   *              PAI_FAMI:
   *                type: integer
   *                description:
   *              DTO_FAMI:
   *                type: integer
   *                description:
   *            required:
   *              - cedula
   *    responses:
   *      200:
   *        description: Consulta exitosa de la informacion de estudio del usuario
   *      401:
   *        description: Error en consultar informacion basica del usuario
   */
  @route("/crearFamiliar")
  @POST()
  public async crearFamiliar(req: Request, res: Response){

    try {
      const crearFamiliar = await this.familiarService.crearFamiliar(req.body);
      res.status(200).json(crearFamiliar);
    } catch (error: any) {
      res.status(401).json({ message: error.message });  
    }

  }
  
  
  /**
   * @swagger
   * /api/v1/familiar/consultarFamiliares:
   *  post:
   *    summary: Familiares del trabajador
   *    tags: [Familiar]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              COD_EMPL:
   *                type: integer
   *                description: identificaci??n del usuario
   *              COD_EMPR:
   *                type: integer
   *                description:
   *            required:
   *              - COD_EMPL
   *              - COD_EMPR
   *    responses:
   *      200:
   *        description: Consulta exitosa de la informacion de estudio del usuario
   *      401:
   *        description: Error en consultar informacion basica del usuario
   */
  @route("/consultarFamiliares")
  @POST()
  public async consultarFamiliares(req: Request, res: Response){
    try {
      const consultarFamiliares = await this.familiarService.consultarFamiliares(req.body);
      res.status(200).json(consultarFamiliares);    
    } catch (error: any) {
      res.status(401).json({ message: error.message });  
    }
  }

  /**
   * @swagger
   * /api/v1/familiar/consultarActividad:
   *  get:
   *    summary: Lista los tipos de actividades de los familiares
   *    tags: [Familiar]
   *    responses:
   *      200:
   *        description: Tipos de actividad familiar
   *      401:
   *        description: Error en consultar tipos de actividades del familiar
   */
   @route("/consultarActividad")
   @GET()
   public async consultarActividad(req: Request, res: Response) {
    try {
      const consultarActividad = await this.familiarService.consultarActividad();
      res.status(200).json(consultarActividad);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/familiar/actualizarFamiliar:
   *  post:
   *    summary: Actualizar Familiar
   *    tags: [Familiar]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              FAMILIARES_CODIGO:
   *                type: integer
   *                description: Codigo del registro del familiar
   *            required:
   *              - COD_EMPL
   *    responses:
   *      200:
   *        description: Actualizacion correcta
   *      401:
   *        description: Error en la actualizacion
   */
   @route("/actualizarFamiliar")
   @POST()
   public async actualizarFamiliar(req: Request, res: Response) {
    try {
      const actualizarFamiliar = await this.familiarService.actualizarFamiliar(req.body);
      res.status(200).json(actualizarFamiliar);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/familiar/eliminarFamiliaresIndividual:
   *  post:
   *    summary: Eliminar familiares del usuario
   *    tags: [Familiar]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              COD_FAMI:
   *                type: integer
   *                description: numero de documento del familiar
   *            required:
   *              - COD_FAMI
   *    responses:
   *      200:
   *        description: Eliminaci??n exitosa del familiares del usuario
   *      401:
   *        description: Error en eliminar el familiar del usuario
   */
   @route("/eliminarFamiliaresIndividual")
   @POST()
   public async eliminarFamiliaresIndividual(req: Request, res: Response){
     try {
       const eliminarFamiliares = await this.familiarService.eliminarFamiliaresIndividual(req.body);
       res.status(200).json(eliminarFamiliares);    
     } catch (error: any) {
       res.status(401).json({ message: error.message });  
     }
   }

 }