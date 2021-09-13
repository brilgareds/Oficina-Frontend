export interface MyWalletRepository {
  getConsultarDatosUsuarioBilletera(cedula: number): Promise<any>;
  deleteRegistroBilletera(gastoId: number): Promise<any>;
  consultarGastoInd(gastoId: number): Promise<any>;
  actualizarBilletera(billCod: number, disponibleNuevo: number, totalGastosNuevo: number): Promise<any>;
  saveBilletera(cedula: any, nombreUser: any, salario: any, userDispo: any, userTotalGas: any): Promise<any>;
  updateGastoBilletera(billCod: any, disponibleNuevo: any, totalGastosNuevo: any): Promise<any>;
  guardarGastosDetalle(billCod: any, gasto: any, gastoVal: any, gastoEntero: any): Promise<any>;
}
