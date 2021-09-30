import { Request, Response } from "express";
import { before, GET, POST, route } from "awilix-express";
import { verifyJwt, verifyJwtExternal } from "../common/middlewares/jwt";
import validationMiddleware from "../common/middlewares/validation";
import { CovidSurveyCreateDto } from "./dto/covidSurveyCreate.dto";
import { SurveyService } from "./survey.service";
import { HealthConditionSurveyCreateDto } from "./dto/healthConditionSurveyCreate.dto";
import { EpidemiologicalFenceSurveyCreateDto } from "./dto/epidemiologicalFenceSurveyCreate.dto";
import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { JwtUserPayloadExternal } from "../common/interfaces/jwtUserPayloadExternal";

/**
 * @swagger
 * tags:
 *  name: Encuestas
 */
@route("/api/v1/surveys")
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) { }

  /**
   * @swagger
   * /api/v1/surveys/covid:
   *  get:
   *    summary:
   *    tags: [Encuestas]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description:
   *      401:
   *        description: Error en las credenciales
   */
  @route("/covid")
  @GET()
  @before([verifyJwt])
  public async getCovidSurveyQuestions(req: Request, res: Response) {
    try {
      const questions = await this.surveyService.getCovidSurveyQuestions();

      res.status(200).json({ data: questions });
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/surveys/covid:
   *  post:
   *    summary:
   *    tags: [Encuestas]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description:
   *      401:
   *        description: Error en las credenciales
   */
  @route("/covid")
  @POST()
  @before([verifyJwt, validationMiddleware(CovidSurveyCreateDto)])
  public async saveCovidSurveyAnswers(req: Request, res: Response) {
    try {
      const answers = await this.surveyService.saveCovidSurveyAnswers(
        req.body as CovidSurveyCreateDto,
        req.user as JwtUserPayload
      );

      res.status(200).json({ data: answers });
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/surveys/epidemiologicalFence:
   *  get:
   *    summary:
   *    tags: [Encuestas]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description:
   *      401:
   *        description: Error en las credenciales
   */
  @route("/epidemiologicalFence")
  @GET()
  @before([verifyJwt])
  public async getEpidemiologicalFenceSurveyQuestions(
    req: Request,
    res: Response
  ) {
    try {
      const questions =
        await this.surveyService.getEpidemiologicalFenceSurveyQuestions();

      res.status(200).json({ data: questions });
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/surveys/epidemiologicalFence:
   *  post:
   *    summary:
   *    tags: [Encuestas]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description:
   *      401:
   *        description: Error en las credenciales
   */
  @route("/epidemiologicalFence")
  @POST()
  @before([
    verifyJwt,
    validationMiddleware(EpidemiologicalFenceSurveyCreateDto),
  ])
  public async saveEpidemiologicalFenceSurveyAnswers(
    req: Request,
    res: Response
  ) {
    try {
      const answers =
        await this.surveyService.saveEpidemiologicalFenceSurveyAnswers(
          req.body as EpidemiologicalFenceSurveyCreateDto,
          req.user as JwtUserPayload
        );

      res.status(200).json({ data: answers });
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/surveys/healthCondition:
   *  get:
   *    summary:
   *    tags: [Encuestas]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description:
   *      401:
   *        description: Error en las credenciales
   */
  @route("/healthCondition")
  @GET()
  @before([verifyJwt])
  public async getHealthConditionSurveyQuestions(req: Request, res: Response) {
    try {
      const questions =
        await this.surveyService.getHealthConditionSurveyQuestions(
          req.user as JwtUserPayload
        );

      res.status(200).json({ data: questions });
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

  /**
   * @swagger
   * /api/v1/surveys/healthCondition:
   *  post:
   *    summary:
   *    tags: [Encuestas]
   *    security:
   *      - jwt: []
   *    responses:
   *      200:
   *        description:
   *      401:
   *        description: Error en las credenciales
   */
  @route("/healthCondition")
  @POST()
  @before([verifyJwtExternal, validationMiddleware(HealthConditionSurveyCreateDto)])
  public async saveHealthConditionSurveyAnswers(req: Request, res: Response) {
    try {
      const answers = await this.surveyService.saveHealthConditionSurveyAnswers(
        req.body as any,
        req.user as any
      );

      res.status(200).json({ data: answers });
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
}
