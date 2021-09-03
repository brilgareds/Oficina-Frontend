import { Request, Response } from "express";
import { before, GET, POST, route } from "awilix-express";
import { verifyJwt } from "../common/middlewares/jwt";
import validationMiddleware from "../common/middlewares/validation";
import { CovidSurveyCreateDto } from "./dto/covidSurveyCreate.dto";
import { SurveyService } from "./survey.service";

/**
 * @swagger
 * tags:
 *  name: Encuestas
 */
@route("/api/v1/surveys")
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

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
  // @before([verifyJwt])
  public async getCovidSurveyQuestions(req: Request, res: Response) {
    try {
      const questions = await this.surveyService.getCovidSurveyQuestions();

      res.status(200).json({ data: questions });
    } catch (e) {
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
  public async saveCovidSurveyResponses(req: Request, res: Response) {
    try {
      res.status(200).json({ data: "response" });
    } catch (e) {
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
  // @before([verifyJwt])
  public async getEpidemiologicalFenceSurveyQuestions(
    req: Request,
    res: Response
  ) {
    try {
      const questions =
        await this.surveyService.getEpidemiologicalFenceSurveyQuestions();

      res.status(200).json({ data: questions });
    } catch (e) {
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
  // @before([verifyJwt])
  public async getHealthConditionSurveyQuestions(req: Request, res: Response) {
    try {
      const questions =
        await this.surveyService.getHealthConditionSurveyQuestions();

      res.status(200).json({ data: questions });
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }
}
