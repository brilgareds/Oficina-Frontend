export interface PresentationCardRepository {
  ResquestApproval(data:any): Promise<any>;
  ResquestApprovalWithMaterials(data:any): Promise<any>;
  getSalesPointsData(data:any): Promise<any>;
  getContracLevel2(data:any): Promise<any>;
  getCompanysData(data:any): Promise<any>;
  crearSolicitudCarta(TIPO: any, CEDULA: any, NOMBRE: any, APELLIDO: any, CIUDAD: any, COD_PUNVEN: any, CEDULAJEFE: any, NOMBREJEFE: any, APELLIDOJEFE: any, FECHAINI: any, FECHAFIN: any, 
    USU: any, NOMBREARCHIVO: any, celularCreador: any, celularJefe: any, nombrePDV: any, centroCostos: any, noContrato: any, empresaCOD: any, date: any): Promise<any>;
}