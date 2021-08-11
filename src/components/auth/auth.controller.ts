import { Request, Response } from "express";
import { route, GET, POST, before } from "awilix-express";
import validationMiddleware from "../common/middlewares/validation";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { verifyJwt, verifyRefreshToken } from "../common/middlewares/jwt";
import RequestWithUser from "../common/interfaces/requestWithUser";
import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";

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
    } catch (e) {
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
  public async refresh(req: RequestWithUser, res: Response) {
    try {
      const user: JwtUserPayload = req.user;

      const login = await this.authService.refreshToken(user);

      res.status(200).json(login);
    } catch (e) {
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
  public async me(req: RequestWithUser, res: Response) {
    try {
      const user: JwtUserPayload = req.user;
      const userInformation = await this.authService.userInformation(user);

      res.status(200).json(userInformation);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
}
