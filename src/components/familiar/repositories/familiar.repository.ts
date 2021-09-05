export interface FamiliarRepository {
  consultarDiscapacidad(): Promise<any>;
  consultarTipoRelacion(): Promise<any>;
  crearFamiliar(COD_EMPL: number,
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
                HOB_FAMI: string): Promise<any>;
  consultarFamiliares(COD_EMPL: number, COD_EMPR: number): Promise<any>
  consultarActividad(): Promise<any>;              
}