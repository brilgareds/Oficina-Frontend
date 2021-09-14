import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import validationMiddleware from "../common/middlewares/validation";
import { SaludDatosDto } from "./dto/saludDatos.dto";
import { SaludService } from "./salud.service";
import { uploadFileBlob } from "../../services/azure-blob";
import { uploadSingle } from "../common/middlewares/uploadFile";
import { v4 } from "uuid";

/**
 * @swagger
 * tags:
 *  name: salud
 */
@route("/api/v1/salud")
export class SaludController {
  constructor(private readonly saludService: SaludService) {}

  /**
   * @swagger
   * /api/v1/salud/buscarDatos:
   *  post:
   *    summary: Informacion basica del usuario
   *    tags: [salud]
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
  @route("/buscarDatos")
  @POST()
  @before([validationMiddleware(SaludDatosDto)])
  public async buscarDatos(req: Request, res: Response) {
    try {
      const buscarDatos = await this.saludService.buscarDatos(req.body);

      res.status(200).json(buscarDatos);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/salud/buscarDatosGrupoSanguineo:
   *  get:
   *    summary: Informacion de los grupos sanguineos
   *    tags: [salud]
   *    responses:
   *      200:
   *        description: Consulta exitosa de los grupos sanguineos
   *      401:
   *        description: Error en consultar informacion de los grupos sanguineos
   */
   @route("/buscarDatosGrupoSanguineo")
   @GET()
   public async buscarDatosGrupoSanguineo(req: Request, res: Response) {
     try {
       const buscarDatosGrupoSanguineo = await this.saludService.buscarDatosGrupoSanguineo();
 
       res.status(200).json(buscarDatosGrupoSanguineo);
     } catch (e: any) {
       res.status(401).json({ message: e.message });
     }
   }

   /**
   * @swagger
   * /api/v1/salud/buscarDatosFactor:
   *  get:
   *    summary: Informacion de los factores sanguineos
   *    tags: [salud]
   *    responses:
   *      200:
   *        description: Consulta exitosa de los factores sanguineos
   *      401:
   *        description: Error en consultar informacion de los factores sanguineos
   */
    @route("/buscarDatosFactor")
    @GET()
    public async buscarDatosFactor(req: Request, res: Response) {
      try {
        const buscarDatosFactor = await this.saludService.buscarDatosFactor();
  
        res.status(200).json(buscarDatosFactor);
      } catch (e: any) {
        res.status(401).json({ message: e.message });
      }
    }

   /**
   * @swagger
   * /api/v1/salud/buscarDatosRaza:
   *  get:
   *    summary: Informacion de las razas
   *    tags: [salud]
   *    responses:
   *      200:
   *        description: Consulta exitosa de las razas
   *      401:
   *        description: Error en consultar informacion de las razas
   */
    @route("/buscarDatosRaza")
    @GET()
    public async buscarDatosRaza(req: Request, res: Response) {
      try {
        const buscarDatosRaza = await this.saludService.buscarDatosRaza();
  
        res.status(200).json(buscarDatosRaza);
      } catch (e: any) {
        res.status(401).json({ message: e.message });
      }
    }

  /**
   * @swagger
   * /api/v1/salud/buscarDatosPlanSalud:
   *  get:
   *    summary: Informacion de los planes de salud
   *    tags: [salud]
   *    responses:
   *      200:
   *        description: Consulta exitosa de los planes de salud
   *      401:
   *        description: Error en consultar informacion de los planes de salud
   */
    @route("/buscarDatosPlanSalud")
    @GET()
    public async buscarDatosPlanSalud(req: Request, res: Response) {
      try {
        const buscarDatosPlanSalud = await this.saludService.buscarDatosPlanSalud();
   
        res.status(200).json(buscarDatosPlanSalud);
      } catch (e: any) {
        res.status(401).json({ message: e.message });
      }
    }

  /**
   * @swagger
   * /api/v1/salud/crearRegistroSalud:
   *  post:
   *    summary: Crear registro de salud
   *    tags: [salud]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              allData:
   *                type: object
   *                properties:
   *                    dataForm:
   *                        type: object
   *                        properties:
   *                            file:
   *                              type: object
   *                              description: Objeto de los archivos que se suben los certificados
   *                            EMPRESA:
   *                              type: integer
   *                              description: codigo de la empresa
   *                            NRO_DOCUMENTO:
   *                              type: integer
   *                              description: numero de documento del usuario
   *                            GRUPO_SANGUINEO:
   *                              type: string
   *                              description: siglas del grupo sanguineo
   *                            FACTOR:
   *                              type: string
   *                              description: RH factor sanguineo
   *                            ESTATURA:
   *                              type: string
   *                              description: estatura del usuario
   *                            PESO:
   *                              type: string
   *                              description: peso del usuario
   *                            RAZA:
   *                              type: string
   *                              description: raza del usuario
   *                            FUMADOR:
   *                              type: string
   *                              description: es o no funmador
   *                            BEBEDOR:
   *                              type: string
   *                              description: es o no bebedor
   *                            ANTEOJOS:
   *                              type: string
   *                              description: usa o no anteojos
   *                            ENFERMEDADES:
   *                              type: string
   *                              description: enfermedades que padece el usuario
   *                            RESTRICCIONES_MEDICAS:
   *                              type: string
   *                              description: restricciones médicas del usuario
   *                            FRECUENCIA_ASISTENCIA_MEDICA:
   *                              type: string
   *                              description: frecuencia con la que asiste al médico
   *                            SUFRE_ALERGIAS:
   *                              type: string
   *                              description: sufre si o no alergia
   *                            ALERGIAS:
   *                              type: string
   *                              description: alergias del usuario
   *                            CONTACTO_EMERGENCIA:
   *                              type: string
   *                              description: nombre del contacto de emergencia
   *                            NUMERO_CONTACTO_EMERGENCIA:
   *                              type: string
   *                              description: número del contacto de emergencia
   *                            ENFERMEDAD_LABORAL:
   *                              type: string
   *                              description: enfermedad laboral calificada
   *                            PERDIDA_CAPACIDAD_SALUD:
   *                              type: integer
   *                              description: porcentaje de perdida de capacidad de salud
   *                            PLAN_SALUD_NO_EPS:
   *                              type: string
   *                              description: si o no posee plan de salud aparte de la EPS
   *                            PLAN_SALUD:
   *                              type: string
   *                              description: cual plan salud posee aparte de la EPS
   *                            PLAN_SALUD_OTROS:
   *                              type: string
   *                              description: cual otro plan de salud tiene
   *                            ENTIDAD_OTROS:
   *                              type: string
   *                              description: entidad con la que posee el otro plan de salud
   *                            EMBARAZO_ALTO_RIESGO:
   *                              type: integer
   *                              description: Si(1) o No(0) es un embarazo de alto riesgo
   *                            FECHA_EXAMEN_EMBARAZO:
   *                              type: string
   *                              description: fecha del examen de embarazo
   *                            TIEMPO_GESTACION:
   *                              type: integer
   *                              description: tiempo de gestacion en semanas
   *                            FECHA_PARTO:
   *                              type: string
   *                              description: fecha probable de parto
   *                            OBSERVACION:
   *                              type: string
   *                              description: observacion del usuario
   *                required:
   *                 - allData
   *    responses:
   *      200:
   *        description: Creación exitosa del registro de salud
   *      401:
   *        description: Error en la creación del registro de salud
   */
   @route("/crearRegistroSalud")
   @POST()
   @before([uploadSingle])
   public async crearRegistroSalud(req: Request, res: Response) {
     try {
      const file = req.file as Express.Multer.File;
      let url = "";
      if(file){
        const folder = "salud";
        const fileName = `${folder}/${v4()}.${file.mimetype.split("/")[1]}`;
        url = "/vumoffice"+"/"+fileName;
        await uploadFileBlob(fileName, file.buffer);
      }
      const buscarDatosPlanSalud = await this.saludService.crearRegistroSalud(req.body, url);
 
      res.status(200).json(buscarDatosPlanSalud);
     } catch (e: any) {
       res.status(401).json({ message: e.message });
     }
   }

}
