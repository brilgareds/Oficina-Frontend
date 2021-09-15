import moment from "moment";
import { mssqlEsmad } from "../../services/mssql";
import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { CovidSurveyCreateDto } from "./dto/covidSurveyCreate.dto";
import { EpidemiologicalFenceSurveyCreateDto } from "./dto/epidemiologicalFenceSurveyCreate.dto";
import { HealthConditionSurveyCreateDto } from "./dto/healthConditionSurveyCreate.dto";
import { SurveyAnswersDto } from "./dto/surveyAnswers.dto";
import { SurveyHeadsDto } from "./dto/surveyHeads.dto";
import { SurveyQuestionsDto } from "./dto/surveyQuestions.dto";
import { SurveyResponsesDto } from "./dto/surveyResponses.dto";
import { SurveyRepository } from "./repositories/survey.repository";

export class SurveyService {
  constructor(private readonly surveyRepository: SurveyRepository) {}

  public async getCovidSurveyQuestions() {
    try {
      const surveyId = 3;
      let heads: any[] = [];
      let questions: any[] = [];
      let responses: any[] = [];

      heads = await this.surveyRepository.getSurveyHeads({
        surveyId: surveyId,
      } as SurveyHeadsDto);

      questions = await this.surveyRepository.getSurveyQuestions({
        surveyId: surveyId,
        clasifications: ["A", "S"],
      } as SurveyQuestionsDto);
      const questionIds = questions.map((question: any) => {
        return question.ID;
      });

      responses = await this.surveyRepository.getSurveyResponses({
        surveyId: surveyId,
        questionIds: questionIds,
      } as SurveyResponsesDto);

      const newQuestions = questions.map((question: any) => {
        return {
          ...question,
          responses: responses.filter((response: any) => {
            return question.ID === response.PREGUNTA_ID;
          }),
        };
      });

      const newHeads = heads.map((head: any) => {
        return {
          ...head,
          questions: newQuestions.filter((question: any) => {
            return question.CABECERA_ID === head.COD_EC;
          }),
        };
      });

      return newHeads;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async saveCovidSurveyAnswers(
    data: CovidSurveyCreateDto,
    user: JwtUserPayload
  ) {
    data.answers.map((answer) => {
      if (!answer.codeER || !answer.value) {
        throw new Error(
          "El arreglo de respuestas debe contener el código y valor de la respuesta"
        );
      }
    });

    const pool = await mssqlEsmad;
    const transaction = pool.transaction();

    try {
      transaction.begin();

      const survey = await this.surveyRepository.saveCovidSurveyAnswers(
        user.identification,
        user.company
      );

      const modifiedAnswers = data.answers.map((answer) => {
        return `('${answer.codeER}','${user.identification}',getDate(),1,'${answer.value}',NULL,${survey.id})`;
      });

      await this.surveyRepository.saveSurveyAnswers(
        "ENCUESTA_COVID",
        modifiedAnswers
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  }

  public async getEpidemiologicalFenceSurveyQuestions() {
    try {
      const surveyId = 4;
      let heads: any[] = [];
      let questions: any[] = [];
      let responses: any[] = [];

      heads = await this.surveyRepository.getSurveyHeads({
        surveyId: surveyId,
      } as SurveyHeadsDto);

      questions = await this.surveyRepository.getSurveyQuestions({
        surveyId: surveyId,
      } as SurveyQuestionsDto);
      const questionIds = questions.map((question: any) => {
        return question.ID;
      });

      responses = await this.surveyRepository.getSurveyResponses({
        surveyId: surveyId,
        questionIds: questionIds,
      } as SurveyResponsesDto);

      const newQuestions = questions.map((question: any) => {
        return {
          ...question,
          responses: responses.filter((response: any) => {
            return question.ID === response.PREGUNTA_ID;
          }),
        };
      });

      const newHeads = heads.map((head: any) => {
        return {
          ...head,
          questions: newQuestions.filter((question: any) => {
            return question.CABECERA_ID === head.COD_EC;
          }),
        };
      });

      return newHeads;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async saveEpidemiologicalFenceSurveyAnswers(
    data: EpidemiologicalFenceSurveyCreateDto,
    user: JwtUserPayload
  ) {
    let reporterIdentification: string = "";
    let reporterName: string = "";

    data.answers.map((answer) => {
      if (!answer.codeER || !answer.value) {
        throw new Error(
          "El arreglo de respuestas debe contener el código y valor de la respuesta"
        );
      }
    });

    data.answers.map((answer) => {
      if (answer.codeER === 58) {
        reporterIdentification = answer.value;
      }

      if (answer.codeER === 59) {
        reporterName = answer.value;
      }
    });

    const pool = await mssqlEsmad;
    const transaction = pool.transaction();

    try {
      transaction.begin();

      const survey =
        await this.surveyRepository.saveEpidemiologicalFenceSurveyAnswers(
          reporterIdentification,
          reporterName,
          user.company
        );

      const modifiedAnswers = data.answers.map((answer) => {
        return `('${answer.codeER}','${user.identification}',getDate(),1,'${answer.value}',NULL,${survey.id})`;
      });

      await this.surveyRepository.saveSurveyAnswers(
        "ENCUESTA_CERCO_EPIDEMIOLOGICO",
        modifiedAnswers
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  }

  public async getHealthConditionSurveyQuestions({
    identification,
  }: JwtUserPayload) {
    try {
      const surveyId = 6;
      let heads: any[] = [];
      let questions: any[] = [];
      let responses: any[] = [];

      const lastResponses = await this.surveyRepository.getSurveyAnswers({
        identification: identification,
      } as SurveyAnswersDto);
      const lastDate = lastResponses[0];

      if (lastDate.FECHA_CREACION === null) {
        const clasifications = ["I", "S"];
        heads = await this.surveyRepository.getSurveyHeads({
          surveyId: surveyId,
        } as SurveyHeadsDto);

        questions = await this.surveyRepository.getSurveyQuestions({
          surveyId: surveyId,
          clasifications: clasifications,
        } as SurveyQuestionsDto);
      } else {
        const frequencies = await this.surveyRepository.getSurveyFrecuency();

        for (const frequency of frequencies) {
          const numberOfFrecuency = `= ${frequency.EPR_FRECUENCIA}`;

          const dateOfLastAnswers =
            await this.surveyRepository.getSurveyAnswers({
              identification: identification,
              frecuency: numberOfFrecuency,
            } as SurveyAnswersDto);

          if (
            frequency.EPR_FRECUENCIA > 1 &&
            dateOfLastAnswers[0].FECHA_CREACION !== null
          ) {
            const daysPassed = this.daysPassed(
              dateOfLastAnswers[0].FECHA_CREACION
            );

            if (daysPassed >= frequency.EPR_FRECUENCIA) {
              const clasifications = ["A"];
              questions.push(
                ...(await this.surveyRepository.getSurveyQuestions({
                  surveyId: surveyId,
                  clasifications: clasifications,
                  frecuency: numberOfFrecuency,
                } as SurveyQuestionsDto))
              );

              heads.push(
                ...(await this.surveyRepository.getSurveyHeads({
                  surveyId: surveyId,
                  frecuency: numberOfFrecuency,
                } as SurveyHeadsDto))
              );
            }
          } else if (
            frequency.EPR_FRECUENCIA > 1 &&
            dateOfLastAnswers[0].FECHA_CREACION === null
          ) {
            const dateOfLastAnswers =
              await this.surveyRepository.getSurveyAnswers({
                identification: identification,
              } as SurveyAnswersDto);

            const daysPassed = this.daysPassed(
              dateOfLastAnswers[0].FECHA_CREACION
            );

            if (daysPassed >= frequency.EPR_FRECUENCIA) {
              const clasifications = ["A"];
              questions.push(
                ...(await this.surveyRepository.getSurveyQuestions({
                  surveyId: surveyId,
                  clasifications: clasifications,
                  frecuency: numberOfFrecuency,
                } as SurveyQuestionsDto))
              );

              heads.push(
                ...(await this.surveyRepository.getSurveyHeads({
                  surveyId: surveyId,
                  frecuency: numberOfFrecuency,
                } as SurveyHeadsDto))
              );
            }
          } else if (frequency.EPR_FRECUENCIA === 1) {
            const clasificationS = ["S"];
            questions.push(
              ...(await this.surveyRepository.getSurveyQuestions({
                surveyId: surveyId,
                clasifications: clasificationS,
              } as SurveyQuestionsDto))
            );
            heads.push(
              ...(await this.surveyRepository.getSurveyHeads({
                surveyId: surveyId,
                clasifications: clasificationS,
              } as SurveyHeadsDto))
            );

            const clasificationA = ["A"];
            questions.push(
              ...(await this.surveyRepository.getSurveyQuestions({
                surveyId: surveyId,
                clasifications: clasificationA,
                frecuency: numberOfFrecuency,
              } as SurveyQuestionsDto))
            );
            heads.push(
              ...(await this.surveyRepository.getSurveyHeads({
                surveyId: surveyId,
                clasifications: clasificationA,
                frecuency: numberOfFrecuency,
              } as SurveyHeadsDto))
            );
          }
        }
      }

      const uniqueHeads = [
        ...new Map(heads.map((head) => [head["COD_EC"], head])).values(),
      ];

      const questionIds = questions.map((question: any) => {
        return question.ID;
      });

      responses = await this.surveyRepository.getSurveyResponses({
        surveyId: surveyId,
        questionIds: questionIds,
      } as SurveyResponsesDto);

      const newQuestions = questions.map((question: any) => {
        return {
          ...question,
          responses: responses.filter((response: any) => {
            return question.ID === response.PREGUNTA_ID;
          }),
        };
      });

      const newHeads = uniqueHeads.map((head: any) => {
        return {
          ...head,
          questions: newQuestions.filter((question: any) => {
            return question.CABECERA_ID === head.COD_EC;
          }),
        };
      });

      return newHeads;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async saveHealthConditionSurveyAnswers(
    data: HealthConditionSurveyCreateDto,
    user: JwtUserPayload
  ) {
    data.answers.map((answer) => {
      if (!answer.codeER || !answer.value) {
        throw new Error(
          "El arreglo de respuestas debe contener el código y valor de la respuesta"
        );
      }
    });

    const pool = await mssqlEsmad;
    const transaction = pool.transaction();

    try {
      await transaction.begin();
      const survey =
        await this.surveyRepository.saveHealthConditionSurveyAnswers(
          user.identification,
          user.company
        );

      const modifiedAnswers = data.answers.map((answer) => {
        return `('${answer.codeER}','${user.identification}',getDate(),1,'${answer.value}',NULL,${survey.id})`;
      });

      await this.surveyRepository.saveSurveyAnswers(
        "ENCUESTA_COVID",
        modifiedAnswers
      );

      await transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
    }
  }

  private daysPassed(date: Date) {
    return moment().diff(moment(date), "days");
  }
}
