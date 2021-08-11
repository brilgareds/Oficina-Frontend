import { mssqlEsmad } from '../../../../../services/mssql';
import { NavigatorRepository } from '../../navigator.repository';

export class NavigatorMSSQLRepository implements NavigatorRepository {

    public async findMainMenu(): Promise<any> {
        // console.log('in "findMainMenu"\n\n');

        const pool = await mssqlEsmad;
        const result = await pool.query`
            SELECT
                (SELECT top 1 1 FROM menu_principal as submenu WHERE submenu.menu_padre = menu_principal.id and submenu.estado = 1) as tiene_submenu,
                menu_principal.*

            FROM menu_principal

            WHERE
                menu_padre IS NULL and estado = 1
            ORDER BY numero_orden, titulo 
        `;

        return result.recordset;
    }


    public async findSubMenus(menu: any): Promise<any> {
        // console.log('in "findSubMenus"');

        const pool = await mssqlEsmad;
        const result = await pool.query`
            SELECT
                (SELECT top 1 1 FROM menu_principal as submenu WHERE submenu.menu_padre = menu_principal.id and submenu.estado = 1) as tiene_submenu,
                menu_principal.*

            FROM menu_principal

            WHERE
                menu_padre = ${menu.id} and estado = 1
            ORDER BY numero_orden, titulo
        `;

        return result.recordset;
    }

}
