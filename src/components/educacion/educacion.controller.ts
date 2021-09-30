import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import validationMiddleware from "../common/middlewares/validation";
import { uploadFileBlob } from "../../services/azure-blob";
import { uploadFile, uploadSingle } from "../common/middlewares/uploadFile";
import { v4 } from "uuid";

import { EducacionService } from "./educacion.service";

/**
 * @swagger
 * tags:
 *  name: Educacion
 */
 @route("/api/v1/educacion")
 export class EducacionController {

  constructor(private readonly educacionService: EducacionService) {}

  /**
   * @swagger
   * /api/v1/educacion/consultarNivelEstudio:
   *  get:
   *    summary: Lista de tipos de documento
   *    tags: [Educacion]
   *    responses:
   *      200:
   *        description: Datos de los niveles de estudio
   *      401:
   *        description: Error en consultar datos de los niveles de estudio
   */
   @route("/consultarNivelEstudio")
   @GET()
   public async consultarNivelEstudio(req: Request, res: Response) {
    try {
      const consultarNivelEstudio = await this.educacionService.consultarNivelEstudio();

      res.status(200).json(consultarNivelEstudio);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/educacion/consultarEstadoEstudio:
   *  get:
   *    summary: Lista de tipos de documento
   *    tags: [Educacion]
   *    responses:
   *      200:
   *        description: Datos del estado
   *      401:
   *        description: Error en consultar datos de el estado de estudio
   */
   @route("/consultarEstadoEstudio")
   @GET()
   public async consultarEstadoEstudio(req: Request, res: Response) {
     try {

       const consultarEstadoEstudio = await this.educacionService.consultarEstadoEstudio();
       res.status(200).json(consultarEstadoEstudio); 
        
     } catch (e: any) {
      res.status(401).json({ message: e.message });  
     }  
   }
  

   /**
   * @swagger
   * /api/v1/educacion/consultarModalidadEstudio:
   *  get:
   *    summary: Lista los tipos de modalidades de estudio
   *    tags: [Educacion]
   *    responses:
   *      200:
   *        description: Datos de la modalidad
   *      401:
   *        description: Error en consultar datos de la modalidad
   */
   @route("/consultarModalidadEstudio")
   @GET()
   public async consultarModalidadEstudio(req: Request, res: Response) {
    try {

      const consultarModalidadEstudio = await this.educacionService.consultarModalidadEstudio();
      res.status(200).json(consultarModalidadEstudio); 
       
    } catch (e: any) {
     res.status(401).json({ message: e.message });  
    }  
  }
  

  /**
   * @swagger
   * /api/v1/educacion/consultarDatosEstudio:
   *  post:
   *    summary: Informacion de estudio de los usuarios
   *    tags: [Educacion]
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
   *            required:
   *              - cedula
   *    responses:
   *      200:
   *        description: Consulta exitosa de la informacion de estudio del usuario
   *      401:
   *        description: Error en consultar informacion basica del usuario
   */
   @route("/consultarDatosEstudio")
   @POST()
   public async consultarDatosEstudio(req: Request, res: Response){
     try {
       const consultarDatosEstudio = await this.educacionService.consultarDatosEstudios(req.body);
       res.status(200).json(consultarDatosEstudio);
     } catch (error: any) {
      res.status(401).json({ message: error.message });  
     } 
   }

  /**
   * @swagger
   *  /api/v1/educacion/crearRegistro:
   *  post:
   *    summary: Guardado de los estudios del usuario
   *    tags: [Educacion]
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
   *                               description: Objeto de los archivos que se suben los certificados
   *                             MENU_CODIGO:
   *                               type: integer
   *                               description: Codigo del menu al cual pertenece
   *                             INFORMACION_BASICA_CODIGO:
   *                               type: integer
   *                               description: Cedula del usuario
   *                             NIVEL_ESTUDIO:
   *                               type: integer
   *                               description: Nivel de estudio alcanzado por el usuario
   *                             TITULO:
   *                               type: string
   *                               description: Titulo obtenido por el usuario
   *                             INSTITUCION:
   *                               type: string
   *                               description: Lugar de estudio
   *                             CIUDAD:
   *                               type: number
   *                               description: Ciudad donde estudio
   *                             ESTADO_ESTUDIO:
   *                               type: number
   *                               description: Estado en el que se encuentra el estudio del usuario
   *                             FECHA_INICIO:
   *                               type: string
   *                               description: Fecha de inicio de estudio
   *                             FECHA_FINALIZACION:
   *                               type: string
   *                               description: Fecha en que finaliza el estudio el usuario
   *                             FECHA_GRADO_TENTATIVO:
   *                               type: string
   *                               description: Posible fecha en la que el usuario se graduara
   *                             MODALIDAD_ESTUDIO:
   *                               type: number
   *                               description: Forma como realiza sus estudios el usuario
   *                             PROMEDIO:
   *                               type: string
   *                               description: Promedio
   *                             PAI_CODIGO:
   *                               type: number
   *                               description: Codigo del pais
   *                             DTO_CODIGO:
   *                               type: number
   *                               description: Codigo del departamento
   *            required:
   *              - allData
   *    responses:
   *      200:
   *        description: Información guardada correctamente
   *      401:
   *        description: Error en la insercion
   */
   @route("/crearRegistro")
   @POST()
   @before([uploadSingle])
   public async crearRegistro(req: Request, res: Response) {
     try {
      const file = req.file as Express.Multer.File;
      let url = "";
      if(file){
        const folder = "educacion";
        const fileName = `${folder}/${v4()}.${file.mimetype.split("/")[1]}`;
        //console.log(fileName);
        url = "https://controlfdata.blob.core.windows.net/vumoffice"+"/"+fileName;
        //console.log(url);
        await uploadFileBlob(fileName, file.buffer);
      }
      const buscarMenu = await this.educacionService.crearRegistro(req.body, url);
      res.status(200).json(buscarMenu);
      //res.status(200).json({ data: { message: "ok" } });  
     } catch (e: any) {
      res.status(401).json({ message: e.message });  
     }
   }

  /**
   * @swagger
   * /api/v1/educacion/actualizarRegistro:
   *  post:
   *    summary: Actualización de información de estudios
   *    tags: [Educacion]
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
   *                               description: Objeto de los archivos que se suben para los certificados
   *                             EDUCACION_CODIGO:
   *                               type: integer
   *                               description: Codigo del registro de educación
   *                             NIVEL_ESTUDIO:
   *                               type: integer
   *                               description: Nivel de estudio alcanzado por el usuario
   *                             TITULO:
   *                                type: string
   *                                description: Titulo obtenido por el usuario
   *                             INSTITUCION:
   *                                type: string
   *                                description: Lugar de estudio
   *                             CIUDAD:
   *                                type: number
   *                                description: Ciudad donde estudio
   *                             ESTADO_ESTUDIO:
   *                                type: number
   *                                description: Estado en el que se encuentra el estudio del usuario
   *                             FECHA_INICIO:
   *                                type: string
   *                                description: Fecha de inicio de estudio
   *                             FECHA_FINALIZACION:
   *                                type: string
   *                                description: Fecha en que finaliza el estudio el usuario
   *                             FECHA_GRADO_TENTATIVO:
   *                                type: string
   *                                description: Posible fecha en la que el usuario se graduara
   *                             MODALIDAD_ESTUDIO:
   *                                type: number
   *                                description: Forma como realiza sus estudios el usuario
   *                             PROMEDIO:
   *                                type: string
   *                                description: Promedio
   *                             PAI_CODIGO:
   *                                type: number
   *                                description: Codigo del pais
   *                             DTO_CODIGO:
   *                                type: number
   *                                description: Codigo del departamento      
   *            required:
   *              - allData
   *    responses:
   *      200:
   *        description: Información guardada correctamente
   *      401:
   *        description: Error en la insercion
   */
   @route("/actualizarRegistro")
   @POST()
   @before([uploadSingle])
   public async actualizarRegistro(req: Request, res: Response) {
     try {
      const file = req.file as Express.Multer.File;
      let url = "";
      if(file){
        const folder = "educacion";
        const fileName = `${folder}/${v4()}.${file.mimetype.split("/")[1]}`;
        url = "https://controlfdata.blob.core.windows.net/vumoffice"+"/"+fileName;
        await uploadFileBlob(fileName, file.buffer);
      }
      
      const buscarMenu = await this.educacionService.actualizarRegistro(req.body, url);
      res.status(200).json(buscarMenu);  
     } catch (e: any) {
      res.status(401).json({ message: e.message });  
     }
   }

  /**
   * @swagger
   * /api/v1/educacion/eliminarRegistro:
   *  post:
   *    summary: Eliminar registro de educación
   *    tags: [Educacion]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              EDUCACION_CODIGO:
   *                type: integer
   *                description: Codigo del registro de educación
   *            required:
   *              - EDUCACION_CODIGO
   *    responses:
   *      200:
   *        description: Registros eliminados de manera exitosa
   *      401:
   *        description: Error al eliminar el registro de educación
   */
   @route("/eliminarRegistro")
   @POST()
   public async eliminarRegistro(req: Request, res: Response) {
     try {
      const eliminarRegistro = await this.educacionService.eliminarRegistro(req.body);
      res.status(200).json(eliminarRegistro);  
     } catch (e: any) {
      res.status(401).json({ message: e.message });  
     }
   }

 }