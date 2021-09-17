import { currentDate } from "../common/helpers/global";
import { PresentationCardRepository } from "./repositories/presentationCard.repository";

export class PresentationCardService {
  constructor(
    private readonly presentationCardRepository: PresentationCardRepository
  ) { }

  public async ResquestApprovalWithOutMaterials(data: any) {

    const { city, typeCard, materials, genre, requiredApproval, workPosition, salesPoints, identification, company } = data;

    const salesPointsInCity = await this.presentationCardRepository.getSalesPointsData({salesPoints});
    const contractLevel = (await this.presentationCardRepository.getContracLevel2({identification}) || [{}])[0];

    if (!contractLevel || !Object.keys(contractLevel).length) throw new Error('El usuario no tiene un jefe asignado');

    const { nom_empl, ape_empl, tel_resi, tel_movi, nom_nive2, nom_nive4, box_mail:emailBoss } = contractLevel;

    const nameBoss  = `${nom_empl} ${ape_empl}`;
    const phoneBoss = `${tel_resi.trim()}-${tel_movi.trim()}`;
    const dataCompany = (await this.presentationCardRepository.getCompanysData({company}) || [{}])[0]; // $this->conexionESMAD
    const nombreContrato = ((dataCompany?.EMP_CODIGO_KACTUS === 1) ? nom_nive4 : nom_nive2).trim();
    const date = currentDate({});

    salesPointsInCity.forEach(() => {

    });

    return true;
  }

  public async ResquestApprovalWithMaterials(data: any) {
    console.log('In function "ResquestApprovalWithMaterials"')
  }

  public async ResquestApproval(data: any) {
    try {

      const { city, typeCard, company, materials, salesPoints, identification, unrelatedsalesPoints } = data;

      const newData = {
        city,
        company,
        typeCard,
        materials,
        genre: 'M',
        identification,
        requiredApproval: true,
        workPosition: 'Desarrollador',
        salesPoints: [ ...salesPoints, ...unrelatedsalesPoints ]
      };

      const hasMaterials = (materials && materials.length);

      const response = await ((!hasMaterials) ?
        this.ResquestApprovalWithOutMaterials(newData) :
        this.presentationCardRepository.ResquestApprovalWithMaterials(newData)
      );

      return response;
      
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
}