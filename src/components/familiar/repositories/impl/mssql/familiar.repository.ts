import { mssqlEsmad } from "../../../../../services/mssql";
import { FamiliarRepository } from "../../familiar.repository";

export class FamiliarMssqlRepository implements FamiliarRepository {
  
  public async consultarDiscapacidad(): Promise<any> {
    const pool = await mssqlEsmad;
    const result = await pool.query`SELECT TIP_CODIGO, TIP_NOMBRE
                                    FROM ESMAD_TIPO
                                    WHERE ESMAD_TIPO.CLT_CODIGO = 55 AND ESMAD_TIPO.ESTADO = 1 ORDER BY TIP_NOMBRE ASC`;   
    return result.recordset;
  }

  public async consultarTipoRelacion(){
    const pool = await mssqlEsmad;
    const result = await pool.query`SELECT TIP_NOMBRE, TIP_ATRIBUTO1
                                    FROM ESMAD_TIPO
                                    WHERE ESMAD_TIPO.CLT_CODIGO = 56 AND ESMAD_TIPO.ESTADO = 1 ORDER BY TIP_NOMBRE ASC`;   
    return result.recordset;  
  }

  public async crearFamiliar(COD_EMPL: number,
                              COD_EMPR: number,
                              TIP_IDEN: string,
                              COD_FAMI: number,
                              NOM_FAMI: string,
                              APE_FAMI: string,
                              TIP_RELA: string,
                              SEX_FAMI: string,
                              FEC_NACI: string,
                              EST_VIDA: string,
                              FAM_DEPE: string,
                              EST_DISC: string,
                              TIP_DISC: number,
                              CONTACTO_EMER: string,
                              FAMILIAR_IN_HOME: string,
                              MPI_FAMI: number,
                              DIR_FAMI: string,
                              TEL_FAMI: string,
                              TRA_ESTU: string,
                              GRA_ESCO: string,
                              BEN_CACO: string,
                              BEN_EEPS: string,
                              PARTICIPAR_ACTIV: string,
                              HOB_FAMI: string,
                              PAI_FAMI: number,
                              DTO_FAMI: number): Promise<any>{
    const pool = await mssqlEsmad;
    const result = await pool.query`INSERT INTO 
    ESMAD_FAMILIARES 
    (COD_EMPL, COD_EMPR, TIP_IDEN, COD_FAMI, NOM_FAMI, APE_FAMI, TIP_RELA, SEX_FAMI, FEC_NACI, EST_VIDA, FAM_DEPE, EST_DISC, TIP_DISC, 
    CONTACTO_EMER, FAMILIAR_IN_HOME, MPI_FAMI, DIR_FAMI, TEL_FAMI, TRA_ESTU, GRA_ESCO, BEN_CACO, BEN_EEPS, PARTICIPAR_ACTIV, HOB_FAMI,
    PAI_FAMI,DTO_FAMI,ESTADO) 
    VALUES (${COD_EMPL}, ${COD_EMPR}, ${TIP_IDEN}, ${COD_FAMI}, ${NOM_FAMI}, ${APE_FAMI}, ${TIP_RELA}, ${SEX_FAMI}, ${FEC_NACI}, ${EST_VIDA}, 
            ${FAM_DEPE}, ${EST_DISC}, ${TIP_DISC}, ${CONTACTO_EMER}, ${FAMILIAR_IN_HOME}, ${MPI_FAMI}, ${DIR_FAMI}, ${TEL_FAMI}, ${TRA_ESTU}, 
            ${GRA_ESCO}, ${BEN_CACO}, ${BEN_EEPS}, ${PARTICIPAR_ACTIV}, ${HOB_FAMI}, ${PAI_FAMI}, ${DTO_FAMI}, 1)`;   
    return result.recordset; 

  }

  public async consultarFamiliares(COD_EMPL: number, COD_EMPR: number): Promise<any>{
    const pool = await mssqlEsmad;
    const result = await pool.query`SELECT FAMILIARES_CODIGO,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.COD_EMPL IS NOT NULL
                                    THEN ESMAD_FAMILIARES.COD_EMPL
                                    ELSE bi_famil.cod_empl
                                    END AS COD_EMPL,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.COD_EMPR IS NOT NULL
                                    THEN ESMAD_FAMILIARES.COD_EMPR
                                    ELSE bi_famil.cod_empr
                                    END AS COD_EMPR,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.COD_FAMI IS NOT NULL
                                    THEN ESMAD_FAMILIARES.COD_FAMI
                                    ELSE bi_famil.cod_fami
                                    END AS COD_FAMI,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.NOM_FAMI IS NOT NULL
                                    THEN ESMAD_FAMILIARES.NOM_FAMI
                                    ELSE bi_famil.nom_fami
                                    END AS NOM_FAMI,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.APE_FAMI IS NOT NULL
                                    THEN ESMAD_FAMILIARES.APE_FAMI
                                    ELSE bi_famil.ape_fami
                                    END AS APE_FAMI,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.TIP_RELA IS NOT NULL
                                    THEN ESMAD_FAMILIARES.TIP_RELA
                                    ELSE bi_famil.tip_rela
                                    END AS TIP_RELA,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.SEX_FAMI IS NOT NULL
                                    THEN ESMAD_FAMILIARES.SEX_FAMI
                                    ELSE bi_famil.sex_fami
                                    END AS SEX_FAMI,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.FEC_NACI IS NOT NULL
                                    THEN ESMAD_FAMILIARES.FEC_NACI
                                    ELSE bi_famil.fec_naci
                                    END AS FEC_NACI,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.EST_VIDA IS NOT NULL
                                    THEN ESMAD_FAMILIARES.EST_VIDA
                                    ELSE bi_famil.est_vida
                                    END AS EST_VIDA,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.FAM_DEPE IS NOT NULL
                                    THEN ESMAD_FAMILIARES.FAM_DEPE
                                    ELSE bi_famil.FAM_DEPE
                                    END AS FAM_DEPE,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.EST_DISC IS NOT NULL
                                    THEN ESMAD_FAMILIARES.EST_DISC
                                    ELSE bi_famil.EST_DISC
                                    END AS EST_DISC,
                                    TIP_DISC,
                                    CONTACTO_EMER,
                                    FAMILIAR_IN_HOME,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.PAI_FAMI IS NOT NULL
                                    THEN ESMAD_FAMILIARES.PAI_FAMI
                                    ELSE bi_famil.cod_pais
                                    END AS PAI_FAMI,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.DTO_FAMI IS NOT NULL
                                    THEN ESMAD_FAMILIARES.DTO_FAMI
                                    ELSE bi_famil.dto_fami
                                    END AS DTO_FAMI,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.MPI_FAMI IS NOT NULL
                                    THEN ESMAD_FAMILIARES.MPI_FAMI
                                    ELSE bi_famil.mpi_fami
                                    END AS MPI_FAMI,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.DIR_FAMI IS NOT NULL
                                    THEN ESMAD_FAMILIARES.DIR_FAMI
                                    ELSE bi_famil.dir_fami
                                    END AS DIR_FAMI,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.TEL_FAMI IS NOT NULL
                                    THEN ESMAD_FAMILIARES.TEL_FAMI
                                    ELSE bi_famil.tel_fami
                                    END AS TEL_FAMI,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.TRA_ESTU IS NOT NULL
                                    THEN ESMAD_FAMILIARES.TRA_ESTU
                                    ELSE bi_famil.tra_estu
                                    END AS TRA_ESTU,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.GRA_ESCO IS NOT NULL
                                    THEN ESMAD_FAMILIARES.GRA_ESCO
                                    ELSE bi_famil.gra_esco
                                    END AS GRA_ESCO,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.BEN_CACO IS NOT NULL
                                    THEN ESMAD_FAMILIARES.BEN_CACO
                                    ELSE bi_famil.BEN_CACO
                                    END AS BEN_CACO,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.BEN_EEPS IS NOT NULL
                                    THEN ESMAD_FAMILIARES.BEN_EEPS
                                    ELSE bi_famil.ben_eeps
                                    END AS BEN_EEPS,
                                    PARTICIPAR_ACTIV,
                                    CASE
                                    WHEN ESMAD_FAMILIARES.HOB_FAMI IS NOT NULL
                                    THEN ESMAD_FAMILIARES.HOB_FAMI
                                    ELSE bi_famil.hob_fami
                                    END AS HOB_FAMI
                                    FROM ESMAD_FAMILIARES LEFT JOIN SERVCLO09.kactus.dbo.bi_famil
                                    ON(ESMAD_FAMILIARES.COD_EMPL = bi_famil.cod_empl) AND (ESMAD_FAMILIARES.COD_EMPR = bi_famil.cod_empr)
                                    WHERE ESMAD_FAMILIARES.COD_EMPL = ${COD_EMPL} and ESMAD_FAMILIARES.COD_EMPR = ${COD_EMPR} AND ESMAD_FAMILIARES.ESTADO = 1`;
    return result.recordset; 
  }
  

  public async consultarActividad(){
    const pool = await mssqlEsmad;
    const result = await pool.query`SELECT TIP_NOMBRE, TIP_ATRIBUTO1
                                    FROM ESMAD_TIPO
                                    WHERE ESMAD_TIPO.CLT_CODIGO = 63 AND ESMAD_TIPO.ESTADO = 1 ORDER BY TIP_NOMBRE ASC`;   
    return result.recordset;  
  }

  public async actualizarFamiliar(
                              TIP_IDEN: string,
                              COD_FAMI: number,
                              NOM_FAMI: string,
                              APE_FAMI: string,
                              TIP_RELA: string,
                              SEX_FAMI: string,
                              FEC_NACI: string,
                              EST_VIDA: string,
                              FAM_DEPE: string,
                              EST_DISC: string,
                              TIP_DISC: number,
                              CONTACTO_EMER: string,
                              FAMILIAR_IN_HOME: string,
                              MPI_FAMI: number,
                              DIR_FAMI: string,
                              TEL_FAMI: string,
                              TRA_ESTU: string,
                              GRA_ESCO: string,
                              BEN_CACO: string,
                              BEN_EEPS: string,
                              PARTICIPAR_ACTIV: string,
                              HOB_FAMI: string,
                              PAI_FAMI: number,
                              DTO_FAMI: number): Promise<any>{
    const pool = await mssqlEsmad;
    const result = await pool.query`UPDATE ESMAD_FAMILIARES SET  
                                    TIP_IDEN = ${TIP_IDEN}, NOM_FAMI = ${NOM_FAMI}, APE_FAMI = ${APE_FAMI}, 
                                    TIP_RELA = ${TIP_RELA}, SEX_FAMI = ${SEX_FAMI}, FEC_NACI = ${FEC_NACI}, EST_VIDA = ${EST_VIDA}, FAM_DEPE = ${FAM_DEPE}, EST_DISC = ${EST_DISC}, TIP_DISC = ${TIP_DISC}, 
                                    CONTACTO_EMER = ${CONTACTO_EMER}, FAMILIAR_IN_HOME = ${FAMILIAR_IN_HOME}, MPI_FAMI = ${MPI_FAMI}, DIR_FAMI = ${DIR_FAMI}, TEL_FAMI = ${TEL_FAMI}, TRA_ESTU = ${TRA_ESTU}, GRA_ESCO = ${GRA_ESCO}, 
                                    BEN_CACO = ${BEN_CACO}, BEN_EEPS = ${BEN_EEPS}, PARTICIPAR_ACTIV = ${PARTICIPAR_ACTIV}, HOB_FAMI = ${HOB_FAMI}, PAI_FAMI = ${PAI_FAMI}, DTO_FAMI = ${DTO_FAMI} 
                                    WHERE COD_FAMI = ${COD_FAMI}`;
    return result.recordset;
  }

  public async consultarFamiliaresIndividual(COD_FAMI: number): Promise<any>{
    const pool = await mssqlEsmad;
    const result = await pool.query`SELECT FAMILIARES_CODIGO, COD_EMPL, COD_EMPR, TIP_IDEN, COD_FAMI, NOM_FAMI, APE_FAMI, TIP_RELA, 
                                    SEX_FAMI, FEC_NACI, EST_VIDA, FAM_DEPE, EST_DISC, TIP_DISC, CONTACTO_EMER, FAMILIAR_IN_HOME, 
                                    MPI_FAMI, DIR_FAMI, TEL_FAMI, TRA_ESTU, GRA_ESCO, BEN_CACO, BEN_EEPS, PARTICIPAR_ACTIV, HOB_FAMI, PAI_FAMI, DTO_FAMI 
                                    FROM ESMAD_FAMILIARES
                                    WHERE COD_FAMI = ${COD_FAMI}`;
    return result.recordset;
  }

  public async eliminarFamiliaresIndividual(COD_FAMI: number): Promise<any>{
    const pool = await mssqlEsmad;
    const result = await pool.query`
      UPDATE ESMAD_FAMILIARES 
        SET
          ESTADO = 0
      WHERE COD_FAMI = ${COD_FAMI}`;
    return result.recordset;
  }
  
}