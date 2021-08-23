import { NavigatorRepository } from './repositories/navigator.repository';

export class NavigatorService {

    constructor(private readonly navigatorRepository: NavigatorRepository) {}

    public subMenus = async(menu: any) => ({
        titulo: menu.MENU_TITULO,
        descripcion: menu.MENU_DESCRIPCION,
        clasesIcono: menu.MENU_CLASES_ICONO,
        tipoAccion: menu.MENU_TIPO_ACCION,
        recurso: menu.MENU_RECURSO,
        redireccionar: menu.MENU_REDIRECCIONAR,
        subMenus: !(menu.tiene_submenu) ? [] : await Promise.all((await this.navigatorRepository.findSubMenus(menu)).map(this.subMenus))
    });

    public navigator = async() => (await Promise.all((await this.navigatorRepository.findMainMenu()).map(this.subMenus)))

}