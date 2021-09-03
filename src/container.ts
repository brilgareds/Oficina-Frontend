import express from "express";
import { createContainer, asClass } from "awilix";
import { scopePerRequest } from "awilix-express";
import { AuthMSSQLRepository } from "./components/auth/repositories/impl/mssql/auth.repository";
import { NavigatorMSSQLRepository } from "./components/navigator/repositories/impl/mssql/navigator.repository";
import { CategoryMSSQLRepository } from "./components/category/repositories/impl/mssql/category.repository";
import { SurveyMSSQLRepository } from "./components/survey/repositories/impl/mssql/survey.repository";
import { AuthService } from "./components/auth/auth.service";
import { NavigatorService } from "./components/navigator/navigator.service";
import { RrhhService } from "./components/rrhh/rrhh.service";
import { DocumentTypeMSSQLRepository } from "./components/documentType/repositories/impl/mssql/documentType.repository";
import { DocumentTypeService } from "./components/documentType/documentType.service";
import { EpsMSSQLRepository } from "./components/eps/repositories/impl/mssql/eps.repository";
import { EpsService } from "./components/eps/eps.service";
import { MenuOVMSSQLRepository } from "./components/menuOV/repositories/impl/mssql/menuOV.repository";
import { MenuOVService } from "./components/menuOV/menuOV.service";
import { RrhhMSSQLRepository } from "./components/rrhh/repositories/impl/mssql/rrhh.repository";
import { SendAlertEmailMSSQLRepository } from "./components/sendAlertEmail/repositories/impl/mssql/sendAlertEmail.repository";
import { InformacionBasicaMSSQLRepository } from "./components/informacionBasica/repositories/impl/mssql/informacionBasica.repository";
import { InformacionBasicaService } from "./components/informacionBasica/informacionBasica.service";
import { HelpService } from "./components/help/help.service";
import { HelpMSSQLRepository } from "./components/help/repositories/impl/mssql/help.repository";
import { ViviendaMSSQLRepository } from "./components/vivienda/repositories/impl/mssql/vivienda.repository";
import { ViviendaService } from "./components/vivienda/vivienda.service";
import { SurveyService } from "./components/survey/survey.service";

export default (app: express.Application): void => {
  const container = createContainer({
    injectionMode: "CLASSIC",
  });

  container.register({
    // repositories
    authRepository: asClass(AuthMSSQLRepository).scoped(),
    navigatorRepository: asClass(NavigatorMSSQLRepository).scoped(),
    categoryRepository: asClass(CategoryMSSQLRepository).scoped(),
    documentTypeRepository: asClass(DocumentTypeMSSQLRepository).scoped(),
    epsRepository: asClass(EpsMSSQLRepository).scoped(),
    menuOVRepository: asClass(MenuOVMSSQLRepository).scoped(),
    rrhhRepository: asClass(RrhhMSSQLRepository).scoped(),
    sendAlertEmailRepository: asClass(SendAlertEmailMSSQLRepository).scoped(),
    informacionBasicaRepository: asClass(
      InformacionBasicaMSSQLRepository
    ).scoped(),
    helpRepository: asClass(HelpMSSQLRepository).scoped(),
    viviendaRepository: asClass(ViviendaMSSQLRepository).scoped(),
    surveyRepository: asClass(SurveyMSSQLRepository).scoped(),

    // services
    authService: asClass(AuthService).scoped(),
    navigatorService: asClass(NavigatorService).scoped(),
    rrhhService: asClass(RrhhService).scoped(),
    documentTypeService: asClass(DocumentTypeService).scoped(),
    epsService: asClass(EpsService).scoped(),
    menuOVService: asClass(MenuOVService).scoped(),
    informacionBasicaService: asClass(InformacionBasicaService).scoped(),
    helpService: asClass(HelpService).scoped(),
    viviendaService: asClass(ViviendaService).scoped(),
    surveyService: asClass(SurveyService).scoped(),
  });

  app.use(scopePerRequest(container));
};
