import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import validationMiddleware from "../common/middlewares/validation";
import { BuscarDatosDto } from "./dto/buscarDatos.dto";
import { ActualizarDatosAdicionalesDto } from "./dto/actualizarDatosAdicionales.dto";
import { DatosAdicionalesService } from "./datosAdicionales.service";

/**
 * @swagger
 * tags:
 *  name: DatosAdicionales
 */
@route("/api/v1/datosAdicionales")
export class DatosAdicionalesController {
  constructor(private readonly datosAdicionalesService: DatosAdicionalesService) {}

 /**
  * @swagger
  * /api/v1/datosAdicionales/buscarDatos:
  *  post:
  *    summary: Informacion de datos adicionales del usuario
  *    tags: [DatosAdicionales]
  *    requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            type: object
  *            properties:
  *              CODIGO_EMPRESA:
  *                type: integer
  *                description: numero de empresa del usuario
  *              NRO_DOCUMENTO:
  *                type: integer
  *                description: identificación del usuario
  *            required:
  *              - CODIGO_EMPRESA
  *              - NRO_DOCUMENTO
  *    responses:
  *      200:
  *        description: Consulta exitosa de la informacion de datos adicionales del usuario
  *      401:
  *        description: Error en consultar informacion de datos adicionales del usuario
  */
  @route("/buscarDatos")
  @POST()
  @before([validationMiddleware(BuscarDatosDto)])
  public async buscarDatos(req: Request, res: Response) {
    try {
      const buscarDatos = await this.datosAdicionalesService.buscarDatos(req.body);

      res.status(200).json(buscarDatos);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

 /**
  * @swagger
  * /api/v1/datosAdicionales/buscarDatosFrecuencia:
  *  get:
  *    summary: Informacion de datos de tipo frecuencia
  *    tags: [DatosAdicionales]
  *    responses:
  *      200:
  *        description: Consulta exitosa de la informacion de datos de tipo frecuencia
  *      401:
  *        description: Error en consultar informacion de datos de tipo frecuencia
  */
  @route("/buscarDatosFrecuencia")
  @GET()
  public async buscarDatosFrecuencia(req: Request, res: Response) {
    try {
      const buscarDatos = await this.datosAdicionalesService.buscarDatosFrecuencia();

      res.status(200).json(buscarDatos);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

 /**
  * @swagger
  * /api/v1/datosAdicionales/buscarDatosVehiculos:
  *  get:
  *    summary: Informacion de datos de tipo vehiculo
  *    tags: [DatosAdicionales]
  *    responses:
  *      200:
  *        description: Consulta exitosa de la informacion de datos de tipo vehiculo
  *      401:
  *        description: Error en consultar informacion de datos de tipo vehiculo
  */
  @route("/buscarDatosVehiculos")
  @GET()
  public async buscarDatosVehiculos(req: Request, res: Response) {
    try {
      const buscarDatos = await this.datosAdicionalesService.buscarDatosVehiculos();

      res.status(200).json(buscarDatos);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

 /**
  * @swagger
  * /api/v1/datosAdicionales/buscarDatosLicenciaConduccion:
  *  get:
  *    summary: Informacion de datos de tipo licencia de conducción
  *    tags: [DatosAdicionales]
  *    responses:
  *      200:
  *        description: Consulta exitosa de la informacion de datos de tipo licencia de conducción
  *      401:
  *        description: Error en consultar informacion de datos de tipo licencia de conducción
  */
  @route("/buscarDatosLicenciaConduccion")
  @GET()
  public async buscarDatosLicenciaConduccion(req: Request, res: Response) {
    try {
      const buscarDatos = await this.datosAdicionalesService.buscarDatosLicenciaConduccion();

      res.status(200).json(buscarDatos);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

 /**
  * @swagger
  * /api/v1/datosAdicionales/buscarDatosCondicionEspecial:
  *  get:
  *    summary: Informacion de datos de tipo condición especial
  *    tags: [DatosAdicionales]
  *    responses:
  *      200:
  *        description: Consulta exitosa de la informacion de datos de tipo condición especial
  *      401:
  *        description: Error en consultar informacion de datos de tipo condición especial
  */
  @route("/buscarDatosCondicionEspecial")
  @GET()
  public async buscarDatosCondicionEspecial(req: Request, res: Response) {
    try {
      const buscarDatos = await this.datosAdicionalesService.buscarDatosCondicionEspecial();

      res.status(200).json(buscarDatos);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

 /**
  * @swagger
  * /api/v1/datosAdicionales/buscarDatosBienesServicios:
  *  get:
  *    summary: Informacion de datos de tipo bienes y servicios
  *    tags: [DatosAdicionales]
  *    responses:
  *      200:
  *        description: Consulta exitosa de la informacion de datos de tipo bienes y servicios
  *      401:
  *        description: Error en consultar informacion de datos de tipo bienes y servicios
  */
  @route("/buscarDatosBienesServicios")
  @GET()
  public async buscarDatosBienesServicios(req: Request, res: Response) {
    try {
      const buscarDatos = await this.datosAdicionalesService.buscarDatosBienesServicios();

      res.status(200).json(buscarDatos);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

 /**
  * @swagger
  * /api/v1/datosAdicionales/buscarDatosTemasInteres:
  *  get:
  *    summary: Informacion de datos de tipo temas de interes
  *    tags: [DatosAdicionales]
  *    responses:
  *      200:
  *        description: Consulta exitosa de la informacion de datos de tipo temas de interes
  *      401:
  *        description: Error en consultar informacion de datos de tipo temas de interes
  */
  @route("/buscarDatosTemasInteres")
  @GET()
  public async buscarDatosTemasInteres(req: Request, res: Response) {
    try {
      const buscarDatos = await this.datosAdicionalesService.buscarDatosTemasInteres();

      res.status(200).json(buscarDatos);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

 /**
  * @swagger
  * /api/v1/datosAdicionales/actualizarRegistroDatosAdicionales:
  *  post:
  *    summary: Informacion de datos adicionales del usuario
  *    tags: [DatosAdicionales]
  *    requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            type: object
  *            properties:
  *              NRO_DOCUMENTO:
  *                type: integer
  *                description: numero de documento del usuario
  *              CODIGO_EMPRESA:
  *                type: integer
  *                description: numero de empresa del usuario
  *              HOBBIES:
  *                type: string
  *                description: hobbies del usuario
  *              PROFESION:
  *                type: string
  *                description: profesion del usuario
  *              ANOS_PROFESION:
  *                type: integer
  *                description: numero de profesiones del usuario del usuario
  *              INGRESOS_ADICIONALES:
  *                type: integer
  *                description: ingresos adicionales del usuario
  *              MASCOTA:
  *                type: integer
  *                description: Si(1) o No(0) tiene mascota
  *              CUAL_MASCOTA:
  *                type: string
  *                description: tipo de mascota
  *              RECREACION:
  *                type: integer
  *                description: Si(1) o No(0) tiene recreación
  *              CUAL_RECREACION:
  *                type: string
  *                description: tipo de recreación
  *              FRECUENCIA_RECREACION:
  *                type: string
  *                description: frecuencia de la recreacion
  *              DEPORTE:
  *                type: integer
  *                description: Si(1) o No(0) hace deporte
  *              CUAL_DEPORTE:
  *                type: string
  *                description: tipo de deporte
  *              FRECUENCIA_DEPORTE:
  *                type: string
  *                description: frecuencia del deporte
  *              OTRO_TRABAJO:
  *                type: integer
  *                description: Si(1) o No(0) tiene otro trabajo
  *              CUAL_OTRO_TRABAJO:
  *                type: string
  *                description: tipo de otro trabajo
  *              FRECUENCIA_OTRO_TRABAJO:
  *                type: string
  *                description: frecuencia del otro trabajo
  *              VEHICULO:
  *                type: integer
  *                description: Si(1) o No(0) tiene vehiculo
  *              CUAL_VEHICULO:
  *                type: string
  *                description: tipo de vehiculo
  *              LICENCIA_CONDUCCION:
  *                type: integer
  *                description: Si(1) o No(0) tiene licencia de conducción
  *              LICENCIA_CONDUCCION_TIPO:
  *                type: string
  *                description: tipo de licencia de consucción
  *              GRUPO_SOCIAL:
  *                type: integer
  *                description: Si(1) o No(0) pertenece a un grupo social
  *              CUAL_GRUPO_SOCIAL:
  *                type: string
  *                description: tipo de grupo social
  *              AHORRO:
  *                type: integer
  *                description: Si(1) o No(0) ahorra
  *              PORCENTAJE_AHORRO_SALARIAL:
  *                type: integer
  *                description: porcentaje de ahorro salarial
  *              DESTINO_AHORROS:
  *                type: string
  *                description: destino de los ahorros
  *              INTERES_OTRO:
  *                type: string
  *                description: otro tema de interes
  *              CONVENIOS_ADICIONALES:
  *                type: string
  *                description: convenios extras
  *              DEPORTES_INTERES:
  *                type: string
  *                description: deportes de interes
  *              arrayCondicionEspecial:
  *                type: array
  *                items:
  *                  type: integer
  *                description: deportes de interes
  *              arrayDeudas:
  *                type: array
  *                items:
  *                  type: integer
  *                description: deportes de interes
  *              arrayDeudasFuturas:
  *                type: array
  *                items:
  *                  type: integer
  *                description: deportes de interes
  *              arrayTemasInteres:
  *                type: array
  *                items:
  *                  type: integer
  *                description: deportes de interes
  *            required:
  *              - NRO_DOCUMENTO
  *              - CODIGO_EMPRESA
  *    responses:
  *      200:
  *        description: Consulta exitosa de la informacion de datos adicionales del usuario
  *      401:
  *        description: Error en consultar informacion de datos adicionales del usuario
  */
  @route("/actualizarRegistroDatosAdicionales")
  @POST()
  @before([validationMiddleware(ActualizarDatosAdicionalesDto)])
  public async actualizarRegistroDatosAdicionales(req: Request, res: Response) {
    try {
      const buscarDatos = await this.datosAdicionalesService.actualizarRegistroDatosAdicionales(req.body);

      res.status(200).json(buscarDatos);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

}
