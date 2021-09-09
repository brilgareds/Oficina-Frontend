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

    } catch (error) {

      throw new Error(error.message);

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

    } catch (error) {

      throw new Error(error.message);

    }
  }

}
