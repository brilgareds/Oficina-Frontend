import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import { verifyJwt } from "../common/middlewares/jwt";
import { InclusionBeneficiariosService } from "./inclusionBeneficiarios.service";
import { uploadFile } from "../common/middlewares/uploadFile";


/**
 * @swagger
 * tags:
 *  name: INCLUSION BENEFICIARIOS EPS/CAJA
 */
@route("/api/v1/inclusionBeneficiarios")
export class CategoryController {
  constructor(private readonly inclusionBeneficiariosService: InclusionBeneficiariosService) { }



  /**
 * @swagger
 * /api/v1/inclusionBeneficiarios/getBeneficiariesByUser:
 *  post:
 *    summary: Obtiene todas las incapacidades del usuario
 *    tags: [INCLUSION BENEFICIARIOS EPS/CAJA]
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
  @route("/getBeneficiariesByUser")
  @POST()
  // @before([verifyJwt])
  public async getBeneficiariesByUser(req: Request, res: Response) {
    try {

      const response = await this.inclusionBeneficiariosService.getBeneficiariesByUser(req.body.cedula);

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }


  /**
 * @swagger
 * /api/v1/inclusionBeneficiarios/getTipoDocumentoBeneficiario:
 *  get:
 *    summary: Obtiene todas las incapacidades del usuario
 *    tags: [INCLUSION BENEFICIARIOS EPS/CAJA]
 *    responses:
 *      200:
 *        description: Consumo exitoso
 *      402:
 *        description: Error en el consumo / Token Invalido
 */
  @route("/getTipoDocumentoBeneficiario")
  @GET()
  // @before([verifyJwt])
  public async getTipoDocumentoBeneficiario(req: Request, res: Response) {
    try {

      const response = await this.inclusionBeneficiariosService.getTipoDocumentoBeneficiario();

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }




  /**
 * @swagger
 * /api/v1/inclusionBeneficiarios/getCajasBeneficiario:
 *  post:
 *    summary: Obtiene todas las incapacidades del usuario
 *    tags: [INCLUSION BENEFICIARIOS EPS/CAJA]
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
  @route("/getCajasBeneficiario")
  @POST()
  // @before([verifyJwt])
  public async getCajasBeneficiario(req: Request, res: Response) {
    try {

      const response = await this.inclusionBeneficiariosService.getCajasBeneficiario(req.body.cedula);

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }




  /**
 * @swagger
 * /api/v1/inclusionBeneficiarios/consultarParentesco:
 *  post:
 *    summary: Obtiene todas las incapacidades del usuario
 *    tags: [INCLUSION BENEFICIARIOS EPS/CAJA]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              beneficioPara:
 *                type: string
 *                description: tipo de beneficio caja o eps
 *            required:
 *              - beneficioPara
 *    responses:
 *      200:
 *        description: Consumo exitoso
 *      402:
 *        description: Error en el consumo / Token Invalido
 */
  @route("/consultarParentesco")
  @POST()
  // @before([verifyJwt])
  public async consultarParentesco(req: Request, res: Response) {
    try {

      const response = await this.inclusionBeneficiariosService.consultarParentesco(req.body.beneficioPara);

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }





  /**
 * @swagger
 * /api/v1/inclusionBeneficiarios/consultarArchivosBeneficiarios:
 *  post:
 *    summary: Obtiene todas las incapacidades del usuario
 *    tags: [INCLUSION BENEFICIARIOS EPS/CAJA]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              beneficioPara:
 *                type: string
 *                description: beneficio para eps o caja
 *              tipParentesco:
 *                type: string
 *                description: tipo de parentesco
 *            required:
 *              - beneficioPara
 *              - tipParentesco
 *    responses:
 *      200:
 *        description: Consumo exitoso
 *      402:
 *        description: Error en el consumo / Token Invalido
 */
  @route("/consultarArchivosBeneficiarios")
  @POST()
  // @before([verifyJwt])
  public async consultarArchivosBeneficiarios(req: Request, res: Response) {
    try {

      const { beneficioPara, tipParentesco }: any = req.body;

      const response = await this.inclusionBeneficiariosService.consultarArchivosBeneficiarios(beneficioPara, tipParentesco);

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }



  /**
   * @swagger
   * /api/v1/inclusionBeneficiarios/saveInclusionBeneficios:
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
  @route("/saveInclusionBeneficios")
  @POST()
  @before([uploadFile])
  public async saveInclusionBeneficios(req: Request, res: Response) {
    try {

      const { files, body } = req;

      const response = await this.inclusionBeneficiariosService.saveInclusionBeneficios(files, body);

      res.status(200).json(response);

    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }


  /**
* @swagger
* /api/v1/inclusionBeneficiarios/consultarBeneficiarios:
*  post:
*    summary: Obtiene todas las incapacidades del usuario
*    tags: [INCLUSION BENEFICIARIOS EPS/CAJA]
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
  @route("/consultarBeneficiarios")
  @POST()
  // @before([verifyJwt])
  public async consultarBeneficiarios(req: Request, res: Response) {
    try {

      const response = await this.inclusionBeneficiariosService.consultarBeneficiarios(req.body.cedula);

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }


  /**
* @swagger
* /api/v1/inclusionBeneficiarios/consultarArchivosBenefactor:
*  post:
*    summary: Obtiene todas las incapacidades del usuario
*    tags: [INCLUSION BENEFICIARIOS EPS/CAJA]
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            type: object
*            properties:
*              codigoBenefactor:
*                type: integer
*                description: codigo del benefactor
*            required:
*              - codigoBenefactor
*    responses:
*      200:
*        description: Consumo exitoso
*      402:
*        description: Error en el consumo / Token Invalido
*/
  @route("/consultarArchivosBenefactor")
  @POST()
  // @before([verifyJwt])
  public async consultarArchivosBenefactor(req: Request, res: Response) {
    try {

      const response = await this.inclusionBeneficiariosService.consultarArchivosBenefactor(req.body.codigoBenefactor);

      res.status(200).json(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }



  /**
   * @swagger
   * /api/v1/inclusionBeneficiarios/updateArchivosInclusionBeneficiarios:
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
  @route("/updateArchivosInclusionBeneficiarios")
  @POST()
  @before([uploadFile])
  public async updateArchivosInclusionBeneficiarios(req: Request, res: Response) {
    try {

      const { files, body } = req;

      const response = await this.inclusionBeneficiariosService.updateArchivosInclusionBeneficiarios(files, body);

      res.status(200).json(response);

    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }



}