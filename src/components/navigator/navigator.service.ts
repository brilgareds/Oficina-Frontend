import { NavigatorRepository } from './repositories/navigator.repository';

export class NavigatorService {

    constructor(private readonly navigatorRepository: NavigatorRepository) {}

    public subMenus = async(menu: any) => ({
        titulo: menu.titulo,
        descripcion: menu.descripcion,
        clasesIcono: menu.clases_icono,
        tipoAccion: menu.tipo_accion,
        recurso: menu.recurso,
        redireccionar: menu.redireccionar,
        subMenus: !(menu.tiene_submenu) ? [] : await Promise.all((await this.navigatorRepository.findSubMenus(menu)).map(this.subMenus))
    });

    public navigator = async() => (await Promise.all((await this.navigatorRepository.findMainMenu()).map(this.subMenus)))

}