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
import { EducacionMssqlRepository } from "./components/educacion/repositories/impl/mssql/educacion.repository";
import { EducacionService } from "./components/educacion/educacion.service";
import { ViviendaMSSQLRepository } from "./components/vivienda/repositories/impl/mssql/vivienda.repository";
import { ViviendaService } from "./components/vivienda/vivienda.service";
import { FamiliarMssqlRepository } from "./components/familiar/repositories/impl/mssql/familiar.repository";
import { FamiliarService } from "./components/familiar/familiar.service";
import { SaludMSSQLRepository } from "./components/salud/repositories/impl/mssql/salud.repository";
import { SaludService } from "./components/salud/salud.service";
import { DatosAdicionalesMSSQLRepository } from "./components/datosAdicionales/repositories/impl/mssql/datosAdicionales.repository";
import { DatosAdicionalesService } from "./components/datosAdicionales/datosAdicionales.service";
import { IncapacityMSSQLRepository } from "./components/incapacity/repositories/impl/mssql/incapacity.repository";
import { IncapacityService } from "./components/incapacity/incapacity.service";
import { SurveyService } from "./components/survey/survey.service";
import { MyWalletMSSQLRepository } from "./components/myWallet/repositories/impl/mssql/myWallet.repository";
import { MyWalletService } from "./components/myWallet/myWallet.service";
import { InclusionBeneficiariosMSSQLRepository } from "./components/inclusionBeneficiarios/repositories/impl/mssql/inclusionBeneficiarios.repository";
import { InclusionBeneficiariosService } from "./components/inclusionBeneficiarios/inclusionBeneficiarios.service";
import { PresentationCardMSSQLRepository } from "./components/presentationCard/repositories/impl/mssql/presentationCard.repository";
import { PresentationCardService } from "./components/presentationCard/PresentationCard.service";
import { BranchMSSQLRepository } from "./components/brach/repositories/impl/mssql/brach.repository";
import { BranchService } from "./components/brach/brach.service";
import { CityMSSQLRepository } from "./components/city/repositories/impl/mssql/city.repository";
import { CityService } from "./components/city/city.service";
import { SalePointMSSQLRepository } from "./components/salePoint/repositories/impl/mssql/salePoint.repository";
import { SalePointService } from "./components/salePoint/salePoint.service";
import { CheckInAndCheckOutMSSQLRepository } from "./components/checkInAndCheckOut/repositories/impl/checkInAndCheckOut.repository";
import { CheckInAndCheckOutService } from "./components/checkInAndCheckOut/checkInAndCheckOut.services";
import { EntranceDepartureMSSQLRepository } from "./components/entranceDeparture/repositories/impl/mssql/entranceDeparture.repository";
import { EntranceDepartureService } from "./components/entranceDeparture/entranceDeparture.service";
import { QualificationMSSQLRepository } from "./components/qualification/repositories/impl/mssql/qualification.repository";
import { QualificationService } from "./components/qualification/qualification.service";

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
    informacionBasicaRepository: asClass(InformacionBasicaMSSQLRepository).scoped(),
    helpRepository: asClass(HelpMSSQLRepository).scoped(),
    educacionRepository: asClass(EducacionMssqlRepository).scoped(),
    viviendaRepository: asClass(ViviendaMSSQLRepository).scoped(),
    saludRepository: asClass(SaludMSSQLRepository).scoped(),
    familiarRepository: asClass(FamiliarMssqlRepository).scoped(),
    datosAdicionalesRepository: asClass(DatosAdicionalesMSSQLRepository).scoped(),
    incapacityRepository: asClass(IncapacityMSSQLRepository).scoped(),
    surveyRepository: asClass(SurveyMSSQLRepository).scoped(),
    myWalletRepository: asClass(MyWalletMSSQLRepository).scoped(),
    inclusionBeneficiariosRepository: asClass(InclusionBeneficiariosMSSQLRepository).scoped(),
    presentationCardRepository: asClass(PresentationCardMSSQLRepository).scoped(),
    branchRepository: asClass(BranchMSSQLRepository).scoped(),
    cityRepository: asClass(CityMSSQLRepository).scoped(),
    salePointRepository: asClass(SalePointMSSQLRepository).scoped(),
    checkInAndCheckOutRepository: asClass(CheckInAndCheckOutMSSQLRepository).scoped(),
    entranceDepartureRepository: asClass(EntranceDepartureMSSQLRepository).scoped(),
    qualificationRepository: asClass(QualificationMSSQLRepository).scoped(),

    // services
    authService: asClass(AuthService).scoped(),
    navigatorService: asClass(NavigatorService).scoped(),
    rrhhService: asClass(RrhhService).scoped(),
    documentTypeService: asClass(DocumentTypeService).scoped(),
    epsService: asClass(EpsService).scoped(),
    menuOVService: asClass(MenuOVService).scoped(),
    informacionBasicaService: asClass(InformacionBasicaService).scoped(),
    helpService: asClass(HelpService).scoped(),
    educacionService: asClass(EducacionService).scoped(),
    viviendaService: asClass(ViviendaService).scoped(),
    saludService: asClass(SaludService).scoped(),
    familiarService: asClass(FamiliarService).scoped(),
    datosAdicionalesService: asClass(DatosAdicionalesService).scoped(),
    incapacityService: asClass(IncapacityService).scoped(),
    surveyService: asClass(SurveyService).scoped(),
    myWalletService: asClass(MyWalletService).scoped(),
    inclusionBeneficiariosService: asClass(InclusionBeneficiariosService).scoped(),
    presentationCardService: asClass(PresentationCardService).scoped(),
    branchService: asClass(BranchService).scoped(),
    cityService: asClass(CityService).scoped(),
    salePointService: asClass(SalePointService).scoped(),
    checkInAndCheckOutService: asClass(CheckInAndCheckOutService).scoped(),
    entranceDepartureService: asClass(EntranceDepartureService).scoped(),
    qualificationService: asClass(QualificationService).scoped(),
    
  });

  app.use(scopePerRequest(container));
};
