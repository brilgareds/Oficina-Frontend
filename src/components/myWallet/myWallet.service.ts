import { MyWalletRepository } from "./repositories/myWallet.repository";

export class MyWalletService {
  constructor(
    private readonly myWalletRepository: MyWalletRepository
  ) { }

  public async getConsultarDatosUsuarioBilletera(cedula: number) {
    try {
      return await this.myWalletRepository.getConsultarDatosUsuarioBilletera(cedula);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async deleteGastoBilletera(gastoId: number, billCod: number) {
    try {

      const consultarGastoInd = await this.myWalletRepository.consultarGastoInd(gastoId);

      if (consultarGastoInd) {

        const disponibleNuevo = Number(consultarGastoInd.GAST_VALOR_INT) + Number(consultarGastoInd.BILL_DISPONIBLE);
        const totalGastosNuevo = Number(consultarGastoInd.BILL_TOTAL_GASTOS) - Number(consultarGastoInd.GAST_VALOR_INT);

        const actualizarBilletera = await this.myWalletRepository.actualizarBilletera(billCod, disponibleNuevo, totalGastosNuevo);

        if (actualizarBilletera) {

          return await this.myWalletRepository.deleteRegistroBilletera(gastoId);

        }
      }

    } catch (error) {
      throw new Error(error.message);
    }
  }


  public async saveGastoBilletera(data: any) {
    try {

      let idQueryAffected: any = "";
      if (data.billeteraNueva === true) {
        idQueryAffected = await this.myWalletRepository.saveBilletera(data.cedula, data.nombreUser, data.salario, data.userDispo, data.userTotalGas);
        data.billCod = idQueryAffected;
      } else {
        idQueryAffected = await this.myWalletRepository.updateGastoBilletera(data.billCod, data.userDispo, data.userTotalGas);
      }

      if (idQueryAffected) {
        const guardarGastosDetalle = await this.myWalletRepository.guardarGastosDetalle(data.billCod, data.conceptos.gasto, data.conceptos.valor, data.conceptos.valor);

        if (guardarGastosDetalle) {
          return true;
        }
      }


    } catch (error) {
      throw new Error(error.message);
    }
  }
}



