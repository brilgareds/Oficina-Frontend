import { currentDate } from "../common/helpers/global";
import { PresentationCardRepository } from "./repositories/presentationCard.repository";

export class PresentationCardService {
  constructor(
    private readonly presentationCardRepository: PresentationCardRepository
  ) { }

  public async ResquestApprovalWithOutMaterials(data: any) {

    const { city, typeCard, materials, genre, checkInTime, checkOutTime, requiredApproval, workPosition, salesPoints, identification, company } = data;

    const salesPointsInCity = await this.presentationCardRepository.getSalesPointsData({salesPoints});
    const contractLevel = (await this.presentationCardRepository.getContracLevel2({identification}) || [{}])[0];

    if (!contractLevel || !Object.keys(contractLevel).length) throw new Error('El usuario no tiene un jefe asignado');

    const { nom_empl, ape_empl, tel_resi, tel_movi, nom_nive2, nom_nive4, box_mail:emailBoss } = contractLevel;

    const nameBoss  = `${nom_empl} ${ape_empl}`;
    const phoneBoss = `${tel_resi.trim()}-${tel_movi.trim()}`;
    const dataCompany = (await this.presentationCardRepository.getCompanysData({company}) || [{}])[0]; // ESMAD DB
    const nombreContrato = ((dataCompany?.EMP_CODIGO_KACTUS === 1) ? nom_nive4 : nom_nive2).trim();
    const date = currentDate({});
    const title = (!!checkInTime) ? 'Carta de presentación a punto de venta con ingreso fuera de horario':'Carta de presentación a punto de venta';
    let arrayIds = '';
    const salesPointsFilter = salesPointsInCity.map((salePoint:any) => (salePoint.PDV_CODIGO)).join();

    salesPointsInCity.forEach((salePoint:any) => {

      const resp = this.presentationCardRepository.crearSolicitudCarta(title, identification, data.name, data.lastName, data.city, salePoint?.PDV_CODIGO,
      contractLevel.cod_empl, contractLevel.nom_empl, contractLevel.ape_empl, checkInTime, checkOutTime, `${data.name} ${data.lastName}`,
      `cartaDePresentacion_${identification}_${salesPointsFilter?.replaceAll(' ', '_')}Pendiente.pdf`, 42332, contractLevel?.tel_movi,
      salePoint?.PDV_NOMBRE, contractLevel?.cod_ccos, contractLevel?.nro_cont?.trim(), dataCompany?.EMP_CODIGO_KACTUS, date); // ESMAD DB

      const idSolicitudCarta = (this.presentationCardRepository.getId('ESMAD_SOLICITUD_CARTA') || [{}])[0];
      arrayIds += ((arrayIds == '') ? '' : ',') + idSolicitudCarta?.CODIGO;
    });

    return true;
  }

  public async ResquestApprovalWithMaterials(data: any) {
    console.log('In function "ResquestApprovalWithMaterials"')
  }

  public async ResquestApproval(data: any) {
    try {

      const { materials, salesPoints, unrelatedsalesPoints } = data;

      const newData = {
        ...data,
        genre: 'M',
        requiredApproval: true,
        lastName: data.last_name,
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