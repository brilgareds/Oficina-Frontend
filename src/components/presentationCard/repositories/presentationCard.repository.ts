export interface PresentationCardRepository {
  ResquestApproval(data:any): Promise<any>;
  ResquestApprovalWithMaterials(data:any): Promise<any>;
  getSalesPointsData(data:any): Promise<any>;
  getContracLevel2(data:any): Promise<any>;
  getCompanysData(data:any): Promise<any>;
}