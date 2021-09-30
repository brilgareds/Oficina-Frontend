import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import validationMiddleware from "../common/middlewares/validation";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { verifyJwt, verifyRefreshToken } from "../common/middlewares/jwt";

/**
 * @swagger
 * tags:
 *  name: Auth
 */
@route("/api/v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @swagger
   * /api/v1/auth/login:
   *  post:
   *    summary: Login de la aplicación
   *    tags: [Auth]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              identification:
   *                type: integer
   *                description: identificación del usuario
   *            required:
   *              - identification
   *    responses:
   *      200:
   *        description: Creación del token para acceder a la aplicación
   *      401:
   *        description: Error en las credenciales
   *      422:
   *        description: Entidades no procesables
   */
  @route("/login")
  @POST()
  @before([validationMiddleware(LoginDto)])
  public async login(req: Request, res: Response) {
    try {
      const login = await this.authService.login(req.body);

      res.status(200).json(login);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }



  /**
   * @swagger
   * /api/v1/auth/loginContratista:
   *  post:
   *    summary: Login de la aplicación para un contratista
   *    tags: [Auth]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              apellidos:
   *                type: string
   *                description: apellidos del usuario
   *              area:
   *                type: string
   *                description: area de trabajo del usuario
   *              cargo:
   *                type: string
   *                description: cargo del usuario
   *              cedula:
   *                type: integer
   *                description: cedula del usuario
   *              eps:
   *                type: string
   *                description: eps del usuario
   *              genero:
   *                type: string
   *                description: Genero del  usuario (F/M)
   *              mail:
   *                type: string
   *                description: correo del usuario
   *              nombres:
   *                type: string
   *                description: nombres del usuario
   *              numeroCelular:
   *                type: string
   *                description: celular del usuario
   *              tipoDocumento:
   *                type: string
   *                description: tipo de documento del usuario
   *            required:
   *              - identification
   *              - apellidos
   *              - area
   *              - cargo
   *              - cedula
   *              - eps
   *              - genero
   *              - mail
   *              - nombres
   *              - numeroCelular
   *              - tipoDocumento
   *    responses:
   *      200:
   *        description: Creación del token para acceder a la aplicación
   *      401:
   *        description: Error en las credenciales
   *      422:
   *        description: Entidades no procesables
   */
  @route("/loginContratista")
  @POST()
  public async loginContratista(req: Request, res: Response) {
    try {
      const login = await this.authService.loginContratista(req.body);

      res.status(200).json(login);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/auth/refresh:
   *  post:
   *    summary: Refresca el token para el acceso a la aplicación
   *    tags: [Auth]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: Creación del token actualizado para acceder a la aplicación
   *      402:
   *        description: Token invalido
   */
  @route("/refresh")
  @POST()
  @before([verifyRefreshToken])
  public async refresh(req: Request, res: Response) {
    try {
      const login = await this.authService.refreshToken(req.user!);

      res.status(200).json(login);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/auth/me:
   *  get:
   *    summary: Retorna el usuario logueado
   *    tags: [Auth]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description: Retorna la información del usuario logueado
   *      402:
   *        description: Token invalido
   */
  @route("/me")
  @GET()
  @before([verifyJwt])
  public async me(req: Request, res: Response) {
    try {
      const userInformation = await this.authService.userInformation(req.user!);

      res.status(200).json(userInformation);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
}
