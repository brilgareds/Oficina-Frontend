import { mssqlEsmad, mssqlKactus } from '../../../../../services/mssql';
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
    const result = await pool.query`SELECT DISTINCT FAMILIARES_CODIGO, ESMAD_FAMILIARES.COD_EMPL, ESMAD_FAMILIARES.COD_EMPR, ESMAD_FAMILIARES.COD_FAMI,
                                      ESMAD_FAMILIARES.NOM_FAMI, ESMAD_FAMILIARES.APE_FAMI, ESMAD_FAMILIARES.TIP_RELA, ESMAD_FAMILIARES.SEX_FAMI,
                                      ESMAD_FAMILIARES.FEC_NACI, ESMAD_FAMILIARES.EST_VIDA, ESMAD_FAMILIARES.FAM_DEPE, ESMAD_FAMILIARES.EST_DISC, TIP_DISC, CONTACTO_EMER,
                                      FAMILIAR_IN_HOME, ESMAD_FAMILIARES.PAI_FAMI, ESMAD_FAMILIARES.DTO_FAMI, ESMAD_FAMILIARES.MPI_FAMI, ESMAD_FAMILIARES.DIR_FAMI,
                                      ESMAD_FAMILIARES.TEL_FAMI, ESMAD_FAMILIARES.TRA_ESTU, ESMAD_FAMILIARES.GRA_ESCO, ESMAD_FAMILIARES.BEN_CACO, ESMAD_FAMILIARES.BEN_EEPS,
                                      PARTICIPAR_ACTIV, ESMAD_FAMILIARES.HOB_FAMI, ESMAD_FAMILIARES.TIP_IDEN 
                                    FROM ESMAD_FAMILIARES 
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
                                    BEN_CACO = ${BEN_CACO}, BEN_EEPS = ${BEN_EEPS}, PARTICIPAR_ACTIV = ${PARTICIPAR_ACTIV}, HOB_FAMI = ${HOB_FAMI}, PAI_FAMI = ${PAI_FAMI}, DTO_FAMI = ${DTO_FAMI}, ESTADO = 1 
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

  public async consultarFamiliarKactus(COD_EMPL: number, COD_EMPR: number): Promise<any>{
    const pool = await mssqlKactus;
    const result = await pool.query`select COD_EMPL, COD_EMPR, COD_FAMI, NOM_FAMI, APE_FAMI, TIP_RELA, SEX_FAMI, FEC_NACI, EST_VIDA, FAM_DEPE, EST_DISC, cod_pais as PAI_FAMI, DTO_FAMI, MPI_FAMI,
                                    DIR_FAMI, TRA_ESTU, GRA_ESCO, BEN_CACO, BEN_EEPS, TIP_IDEN, HOB_FAMI
                                    from dbo.bi_famil
                                    where bi_famil.cod_empl = ${COD_EMPL} and COD_EMPR = ${COD_EMPR}`;
    return result.recordset;
  }
  
}