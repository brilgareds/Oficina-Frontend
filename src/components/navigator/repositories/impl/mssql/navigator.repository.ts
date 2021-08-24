import { mssqlEsmad } from '../../../../../services/mssql';
import { NavigatorRepository } from '../../navigator.repository';

export class NavigatorMSSQLRepository implements NavigatorRepository {

    public async findMainMenu(): Promise<any> {

        const pool = await mssqlEsmad;
        const result = await pool.query`
            SELECT
                (SELECT top 1 1 FROM ESMAD_MENU_PRINCIPAL_OV as submenu WHERE submenu.MENU_PADRE = ESMAD_MENU_PRINCIPAL_OV.MENU_CODIGO and submenu.ESTADO = 1) as tiene_submenu,
                ESMAD_MENU_PRINCIPAL_OV.*

            FROM ESMAD_MENU_PRINCIPAL_OV

            WHERE
                MENU_PADRE IS NULL and ESTADO = 1
            ORDER BY MENU_ORDEN, MENU_TITULO 
        `;

        return result.recordset;
    }


    public async findSubMenus(menu: any): Promise<any> {

        const pool = await mssqlEsmad;
        const result = await pool.query`
            SELECT
                (SELECT top 1 1 FROM ESMAD_MENU_PRINCIPAL_OV as submenu WHERE submenu.MENU_PADRE = ESMAD_MENU_PRINCIPAL_OV.MENU_CODIGO and submenu.ESTADO = 1) as tiene_submenu,
                ESMAD_MENU_PRINCIPAL_OV.*

            FROM ESMAD_MENU_PRINCIPAL_OV

            WHERE
                MENU_PADRE = ${menu.MENU_CODIGO} and ESTADO = 1
            ORDER BY MENU_ORDEN, MENU_TITULO
        `;

        return result.recordset;
    }

}
