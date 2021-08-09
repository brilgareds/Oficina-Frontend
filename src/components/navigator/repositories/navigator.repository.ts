export interface NavigatorRepository {
  
    findMainMenu(): Promise<any>;
    findSubMenus(menu: any): Promise<any>;
  
}
