import { mssqlBiplus, mssqlEsmad, mssqlKactus } from "../../../../../services/mssql";
import { MyWalletRepository } from "../../myWallet.repository";

export class MyWalletMSSQLRepository implements MyWalletRepository {

  public async getConsultarDatosUsuarioBilletera(cedula: number): Promise<any> {

    try {

      const pool = await mssqlKactus;
      const result = await pool.query`
                              SELECT 
                                  DISTINCT LTRIM(RTRIM( (Empleado.ape_empl)))                         AS Apellidos,
                                  LTRIM(RTRIM( (Empleado.nom_empl)))                                  AS Nombres,
                                  LTRIM(RTRIM( (dbo.bi_cargo.nom_carg)))                              AS Cargo,
                                  LTRIM(RTRIM( (dbo.gn_nivel.nom_nive)))                              AS Area,
                                  LTRIM(RTRIM( (jefe.nom_empl)))+ ' '+ LTRIM(RTRIM( (jefe.ape_empl))) AS Jefe,
                                  LTRIM(RTRIM( (nm_contr.cod_empl)))                                  AS Cedula,
                                  LTRIM(RTRIM( (Empleado.box_mail)))                                  AS Mail,
                                  ( 
                                  CASE 
                                      WHEN Empleado.tel_movi IS NULL 
                                      THEN Empleado.tel_resi 
                                      ELSE Empleado.tel_movi 
                                  END)                                   AS Numero,
                                  LTRIM(RTRIM( (nm_contr.cod_empr)))     AS Empresa,
                                  nm_contr.cod_ccos                      AS C_COSTOS,
                                  nm_contr.ind_acti                      AS ESTADO,
                                  nm_contr.sue_basi                      AS SALARIO,
                                  CONVERT(VARCHAR,nm_contr.fec_ingr,111) AS FECHA_INGRESO,
                                  CONVERT(VARCHAR,nm_contr.fec_venc,111) AS FECHA_VENCIMIENTO,
                                  nm_contr.nro_cont                      AS NUMERO_CONTRATO,
                                  dbo.NM_ENTID.nom_enti                  AS Entidad
                              FROM 
                                  dbo.nm_contr
                              LEFT JOIN 
                                  dbo.gn_nivel 
                              ON
                                  ( 
                                      dbo.nm_contr.cod_empr = dbo.gn_nivel.cod_empr) 
                              AND
                                  ( 
                                      dbo.nm_contr.cod_niv4 = dbo.gn_nivel.cod_nive)
                              INNER JOIN 
                                  dbo.bi_cargo 
                              ON
                                  ( 
                                      dbo.nm_contr.cod_empr = dbo.bi_cargo.cod_empr) 
                              AND
                                  ( 
                                      dbo.nm_contr.cod_carg = dbo.bi_cargo.cod_carg)
                              INNER JOIN 
                                  dbo.bi_emple Empleado 
                              ON
                                  ( 
                                      dbo.nm_contr.cod_empr = Empleado.cod_empr) 
                              AND
                                  ( 
                                      dbo.nm_contr.cod_empl = Empleado.cod_empl)
                              LEFT JOIN 
                                  dbo.bi_emple jefe 
                              ON
                                  ( 
                                      dbo.nm_contr.cod_frep = jefe.cod_empl)
                              LEFT JOIN 
                                  dbo.NM_CUENT 
                              ON
                                  dbo.nm_contr.cod_empr = dbo.NM_CUENT.cod_empr 
                              AND dbo.nm_contr.cod_empl = dbo.NM_CUENT.cod_empl 
                              AND dbo.nm_contr.nro_cont = dbo.NM_CUENT.nro_cont 
                              AND dbo.NM_CUENT.tip_enti = 'EPS'
                              LEFT JOIN 
                                  dbo.NM_ENTID 
                              ON
                                  dbo.NM_CUENT.cod_empr = dbo.NM_ENTID.cod_empr 
                              AND dbo.NM_CUENT.cod_enti = dbo.NM_ENTID.cod_enti 
                              AND dbo.NM_CUENT.tip_enti = dbo.NM_ENTID.tip_enti 
                              AND dbo.NM_ENTID.cod_sucu = 0
                              WHERE 
                                  dbo.nm_contr.ind_acti = 'A'
                              AND dbo.nm_contr.cod_empl = ${cedula}
                              AND dbo.gn_nivel.num_nive = 4 
                              AND dbo.gn_nivel.ide_arbo = 'bi'
                              AND dbo.gn_nivel.cod_arbo = 1
                              ORDER BY 
                                  nm_contr.nro_cont DESC
      `;

      if (result.rowsAffected) {

        const consultarGastosUsuario = await this.consultarGastosUsuario(cedula);

        return ({
          dataUsuario: result.recordset[0],
          gastosUsuario: consultarGastosUsuario
        });

      }

      throw new Error("Error en la consulta");

    } catch (error: any) {
      throw new Error(error.message);
    }


  }

  public async consultarGastosUsuario(cedula: number): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const result = await pool.query`
                              SELECT 
                                  *
                              FROM 
                                  dbo.ESMAD_BILLETERA 
                              INNER JOIN 
                                  dbo.ESMAD_BILLETERA_GASTOS
                              ON 
                                  ( 
                                      ESMAD_BILLETERA.BILL_CODIGO = ESMAD_BILLETERA_GASTOS.BILL_CODIGO)
                              WHERE 
                                  ESMAD_BILLETERA.BILL_CEDULA = ${cedula}
      `;

      if (result.rowsAffected) {
        return result.recordset;
      }

      throw new Error("Error en la consulta");

    } catch (error: any) {
      throw new Error(error.message);
    }

  }

  public async consultarGastoInd(gastoId: number): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const result = await pool.query`
                              SELECT 
                                  GAST_CODIGO, 
                                  ESMAD_BILLETERA_GASTOS.BILL_CODIGO, 
                                  GAST_NOMBRE, 
                                  GAST_VALOR, 
                                  GAST_VALOR_INT,
                                  BILL_SALARIO, 
                                  BILL_DISPONIBLE, 
                                  BILL_TOTAL_GASTOS
                              FROM 
                                  ESMAD_BILLETERA_GASTOS 
                              INNER JOIN 
                                  dbo.ESMAD_BILLETERA
                              ON 
                                  ( 
                                      ESMAD_BILLETERA_GASTOS.BILL_CODIGO = ESMAD_BILLETERA.BILL_CODIGO)
                              WHERE 
                                  GAST_CODIGO = ${gastoId}
      `;

      if (result.rowsAffected) {
        return result.recordset[0];
      }

      throw new Error("Error en la consulta");

    } catch (error: any) {
      throw new Error(error.message);
    }

  }

  public async actualizarBilletera(billCod: number, disponibleNuevo: number, totalGastosNuevo: number): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                              UPDATE 
                                  ESMAD_BILLETERA
                              SET 
                                  BILL_DISPONIBLE = '${disponibleNuevo}', 
                                  BILL_TOTAL_GASTOS = '${totalGastosNuevo}'
                              WHERE 
                                  BILL_CODIGO = ${billCod}
      `;
      const result = await pool.query(query);

      if (result.rowsAffected) {
        return true;
      }

      throw new Error("Error en la consulta");

    } catch (error: any) {
      throw new Error(error.message);
    }

  }


  public async deleteRegistroBilletera(gastoId: number): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                              DELETE FROM 
                                  ESMAD_BILLETERA_GASTOS
                              WHERE 
                                  GAST_CODIGO = ${gastoId}
      `;
      const result = await pool.query(query);

      if (result.rowsAffected) {
        return true;
      }

      throw new Error("Error en la consulta");

    } catch (error: any) {
      throw new Error(error.message);
    }

  }

  public async saveBilletera(cedula: any, nombreUser: any, salario: any, userDispo: any, userTotalGas: any): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                              INSERT INTO 
                                ESMAD_BILLETERA
                                ( 
                                    BILL_CEDULA, 
                                    BILL_NOMBRE, 
                                    BILL_SALARIO, 
                                    BILL_DISPONIBLE, 
                                    BILL_TOTAL_GASTOS 
                                )
                                VALUES 
                                ( 
                                    ${cedula}, 
                                    '${nombreUser}', 
                                    '${salario}', 
                                    '${userDispo}', 
                                    '${userTotalGas}' 
                                )
      `;
      const result = await pool.query(query);

      if (result.rowsAffected) {
        return await this.consultaConsecutivoBilletera();
      }

      throw new Error("Error en la consulta");

    } catch (error: any) {
      throw new Error(error.message);
    }

  }


  public async updateGastoBilletera(billCod: any, disponibleNuevo: any, totalGastosNuevo: any): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                            UPDATE 
                                ESMAD_BILLETERA
                            SET 
                                BILL_DISPONIBLE = '${disponibleNuevo}', 
                                BILL_TOTAL_GASTOS = '${totalGastosNuevo}'
                            WHERE 
                                BILL_CODIGO = ${billCod}
      `;
      const result = await pool.query(query);

      if (result.rowsAffected) {
        return true;
      }

      throw new Error("Error en la consulta");

    } catch (error: any) {
      throw new Error(error.message);
    }

  }


  private async consultaConsecutivoBilletera(): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                              SELECT 
                                  DISTINCT IDENT_CURRENT('dbo.ESMAD_BILLETERA') BILL_CODIGO
                              FROM 
                                  dbo.ESMAD_BILLETERA
      `;
      const result = await pool.query(query);

      if (result.rowsAffected) {
        return result.recordset[0].BILL_CODIGO;
      }

    } catch (error: any) {
      throw new Error(error.message);
    }

  }

  public async guardarGastosDetalle(billCod: any, gasto: any, gastoVal: any, gastoEntero: any): Promise<any> {

    try {

      const pool = await mssqlEsmad;
      const query = `
                              INSERT INTO 
                                ESMAD_BILLETERA_GASTOS
                                ( 
                                    BILL_CODIGO, 
                                    GAST_NOMBRE, 
                                    GAST_VALOR, 
                                    GAST_VALOR_INT 
                                )
                                VALUES 
                                ( 
                                    ${billCod}, 
                                    '${gasto}', 
                                    '${gastoVal}', 
                                    ${gastoEntero}
                                )
      `;
      const result = await pool.query(query);

      if (result.rowsAffected) {
        return true;
      }

    } catch (error: any) {
      throw new Error(error.message);
    }

  }


}
