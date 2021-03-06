import { MenuOVDto } from "./dto/menuOV.dto";
import { MenuOVRepository } from "./repositories/menuOV.repository";

export class MenuOVService {
  constructor(private readonly menuOVRepository: MenuOVRepository) {}

  public async buscarMenu() {
    try {
      let menu = await this.menuOVRepository.buscarMenu();
      if(!menu[0]){
        menu = {"error":"No se encontraron datos"};
      }
      return menu;

    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async formulariosCompletados({ CODIGO_EMPRESA,NRO_DOCUMENTO }:MenuOVDto) {
    try {
      let menu = await this.menuOVRepository.formulariosCompletados(
        CODIGO_EMPRESA,
        NRO_DOCUMENTO
        );
      if(!menu[0]){
        menu = {"error":"No se encontraron datos"};
      }
      return menu;

    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

}
