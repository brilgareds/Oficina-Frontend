import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import validationMiddleware from "../common/middlewares/validation";
import { InformacionBasicaDto, DepartamentosDto, CiudadesDto, ActualizarInformacionBasicaDto } from "./dto/informacionBasica.dto";
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
   * /api/v1/informacionBasica/consultarTipDocumento:
   *  get:
   *    summary: Lista de tipos de documento
   *    tags: [InformacionBasica]
   *    responses:
   *      200:
   *        description: Datos de los paises
   *      401:
   *        description: Error en consultar datos de los paises
   */
   @route("/consultarTipDocumento")
   @GET()
   public async consultarTipDocumento(req: Request, res: Response) {
     try {
       const paises = await this.informacionBasicaService.consultarTipDocumento();
 
       res.status(200).json(paises);
     } catch (e) {
       res.status(401).json({ message: e.message });
     }
   }

   /**
   * @swagger
   * /api/v1/informacionBasica/consultarEstadoCivil:
   *  get:
   *    summary: Lista de estados civiles
   *    tags: [InformacionBasica]
   *    responses:
   *      200:
   *        description: Datos de los estados civiles
   *      401:
   *        description: Error en consultar los estados civiles
   */
    @route("/consultarEstadoCivil")
    @GET()
    public async consultarEstadoCivil(req: Request, res: Response) {
      try {
        const paises = await this.informacionBasicaService.consultarEstadoCivil();
  
        res.status(200).json(paises);
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
   * /api/v1/informacionBasica/consultarCiudades:
   *  post:
   *    summary: Lista de municipios
   *    tags: [InformacionBasica]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              codDepartamento:
   *                type: integer
   *                description: codigo del departamento
   *            required:
   *              - codDepartamento
   *    responses:
   *      200:
   *        description: Datos de los municipios
   *      401:
   *        description: Error en consultar datos de los departamentos
   */
   @route("/consultarCiudades")
   @POST()
   @before([validationMiddleware(CiudadesDto)])
   public async consultarCiudades(req: Request, res: Response) {
     try {
       const departamentos = await this.informacionBasicaService.consultarMunicipios(req.body);
 
       res.status(200).json(departamentos);
     } catch (e) {
       res.status(401).json({ message: e.message });
     }
   }

  /**
   * @swagger
   * /api/v1/informacionBasica/consultarNomenclatura:
   *  get:
   *    summary: Lista de nomenclaturas
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
   * /api/v1/informacionBasica/consultarAntiguedad:
   *  get:
   *    summary: Lista de opciones de antiguedad
   *    tags: [InformacionBasica]
   *    responses:
   *      200:
   *        description: Datos de las opciones de antiguedad
   *      401:
   *        description: Error en consultar las opciones de antiguedad
   */
   @route("/consultarAntiguedad")
   @GET()
   public async consultarAntiguedad(req: Request, res: Response) {
     try {
       const paises = await this.informacionBasicaService.consultarAntiguedad();

       res.status(200).json(paises);
     } catch (e) {
       res.status(401).json({ message: e.message });
     }
   }

  /**
   * @swagger
   * /api/v1/informacionBasica/consultarTalla:
   *  get:
   *    summary: Lista de tallas uniforme
   *    tags: [InformacionBasica]
   *    responses:
   *      200:
   *        description: Datos de las tallas uniforme
   *      401:
   *        description: Error en consultar las tallas uniforme
   */
    @route("/consultarTalla")
    @GET()
    public async consultarTalla(req: Request, res: Response) {
      try {
        const paises = await this.informacionBasicaService.consultarTalla();
 
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
   *              INFORMACION_BASICA_CODIGO:
   *                type: integer
   *                description: codigo del registro de informacion basica
   *              TIP_CODIGO_DOCUMENTO:
   *                type: integer
   *                description: codigo del tipo de documento
   *              EMP_CODIGO:
   *                type: integer
   *                description: codigo de la empresa
   *              NRO_DOCUMENTO:
   *                type: integer
   *                description: numero del documento
   *              NOMBRES:
   *                type: string
   *                description: nombre del usuario
   *              APELLIDOS:
   *                type: string
   *                description: apellido del usuario
   *              SEXO:
   *                type: string
   *                description: sigla del sexo
   *              FECHA_NACIMIENTO:
   *                type: string
   *                description: fecha de nacimiento
   *              ESTADO_CIVIL:
   *                type: string
   *                description: sigla del estado civil
   *              DEPARTAMENTO_RESIDENCIA:
   *                type: integer
   *                description: codigo del departamento de residencia
   *              CIUDAD_RESIDENCIA:
   *                type: integer
   *                description: codigo de la ciudad de residencia
   *              BARRIO_RESIDENCIA:
   *                type: string
   *                description: nombre del barrio de residencia
   *              LOCALIDAD_RESIDENCIA:
   *                type: string
   *                description: nombre de la localidad de residencia
   *              DIRECCION_COMPLETA:
   *                type: string
   *                description: direccion de residencia
   *              EMAIL_PERSONAL:
   *                type: string
   *                description: email personal
   *              EMAIL_CORPORATIVO:
   *                type: string
   *                description: email corporativo
   *              CELULAR_CONTACTO:
   *                type: integer
   *                description: celular de contacto
   *              CELULAR_CORPORATIVO:
   *                type: integer
   *                description: celular corporativo
   *              ANTIGUEDAD_EMPRESA:
   *                type: integer
   *                description: codigo de tipo antiguedad
   *              PLAN_CARRERA:
   *                type: integer
   *                description: 1 o 0 si posee plan carrera
   *              NRO_CARGOS:
   *                type: integer
   *                description: cantidad de cargos
   *              CARGOS_OCUPADOS:
   *                type: string
   *                description: cargos que se han ocupado
   *            required:
   *              - INFORMACION_BASICA_CODIGO
   *              - TIP_CODIGO_DOCUMENTO
   *              - EMP_CODIGO
   *              - NRO_DOCUMENTO
   *              - NOMBRES
   *              - APELLIDOS
   *              - SEXO
   *              - FECHA_NACIMIENTO
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
