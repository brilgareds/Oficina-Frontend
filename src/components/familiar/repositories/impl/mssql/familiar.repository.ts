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
    PAI_FAMI,DTO_FAMI) 
    VALUES (${COD_EMPL}, ${COD_EMPR}, ${TIP_IDEN}, ${COD_FAMI}, ${NOM_FAMI}, ${APE_FAMI}, ${TIP_RELA}, ${SEX_FAMI}, ${FEC_NACI}, ${EST_VIDA}, 
            ${FAM_DEPE}, ${EST_DISC}, ${TIP_DISC}, ${CONTACTO_EMER}, ${FAMILIAR_IN_HOME}, ${MPI_FAMI}, ${DIR_FAMI}, ${TEL_FAMI}, ${TRA_ESTU}, 
            ${GRA_ESCO}, ${BEN_CACO}, ${BEN_EEPS}, ${PARTICIPAR_ACTIV}, ${HOB_FAMI}, ${PAI_FAMI}, ${DTO_FAMI})`;   
    return result.recordset; 

  }

  public async consultarFamiliares(COD_EMPL: number, COD_EMPR: number): Promise<any>{
    const pool = await mssqlEsmad;
    const result = await pool.query`SELECT FAMILIARES_CODIGO, COD_EMPL, COD_EMPR, TIP_IDEN, COD_FAMI, NOM_FAMI, APE_FAMI, 
                                    TIP_RELA, SEX_FAMI, FEC_NACI, EST_VIDA, FAM_DEPE, EST_DISC, TIP_DISC, CONTACTO_EMER, FAMILIAR_IN_HOME, 
                                    MPI_FAMI, DIR_FAMI, TEL_FAMI, TRA_ESTU, GRA_ESCO, BEN_CACO, BEN_EEPS, PARTICIPAR_ACTIV, HOB_FAMI,
                                    PAI_FAMI,DTO_FAMI
                                    FROM ESMAD_FAMILIARES
                                    WHERE COD_EMPL = ${COD_EMPL} AND ESMAD_FAMILIARES.COD_EMPR = ${COD_EMPR}`;
    return result.recordset; 
  }
  

  public async consultarActividad(){
    const pool = await mssqlEsmad;
    const result = await pool.query`SELECT TIP_NOMBRE, TIP_ATRIBUTO1
                                    FROM ESMAD_TIPO
                                    WHERE ESMAD_TIPO.CLT_CODIGO = 63 AND ESMAD_TIPO.ESTADO = 1 ORDER BY TIP_NOMBRE ASC`;   
    return result.recordset;  
  }
  
}