import { ConsultarFamiliares, FamiliarCrearDto } from "./dto/familiar.dto";
import { FamiliarRepository } from "./repositories/familiar.repository";

export class FamiliarService {

  constructor(private readonly familiarRepository: FamiliarRepository) {}

  public async consultarDiscapacidad() {
    try {
      let consultarDiscapacidad = await this.familiarRepository.consultarDiscapacidad();
      if(!consultarDiscapacidad[0]){
        consultarDiscapacidad = {"error":"No se encontraron datos"};
      }
      return consultarDiscapacidad;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async consultarTipoRelacion() {
    try {
      let consultarTipoRelacion = await this.familiarRepository.consultarTipoRelacion();
      if(!consultarTipoRelacion[0]){
        consultarTipoRelacion = {"error":"No se encontraron datos"};
      }
      return consultarTipoRelacion;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async crearFamiliar({COD_EMPL, COD_EMPR, TIP_IDEN, COD_FAMI, NOM_FAMI, APE_FAMI, TIP_RELA,
    SEX_FAMI, FEC_NACI, EST_VIDA, FAM_DEPE, EST_DISC, TIP_DISC, CONTACTO_EMER, FAMILIAR_IN_HOME,
    MPI_FAMI, DIR_FAMI, TEL_FAMI, TRA_ESTU, GRA_ESCO, BEN_CACO, BEN_EEPS, PARTICIPAR_ACTIV,
    HOB_FAMI}: FamiliarCrearDto){
      try {
        const crearFamiliar = await this.familiarRepository.crearFamiliar(COD_EMPL, COD_EMPR, TIP_IDEN, COD_FAMI, NOM_FAMI, APE_FAMI, TIP_RELA,
          SEX_FAMI, FEC_NACI, EST_VIDA, FAM_DEPE, EST_DISC, TIP_DISC, CONTACTO_EMER, FAMILIAR_IN_HOME,
          MPI_FAMI, DIR_FAMI, TEL_FAMI, TRA_ESTU, GRA_ESCO, BEN_CACO, BEN_EEPS, PARTICIPAR_ACTIV,
          HOB_FAMI);
        return crearFamiliar;      
      } catch (error) {
        throw new Error(error.message);  
      }
      

  }

  public async consultarFamiliares({COD_EMPL, COD_EMPR}: ConsultarFamiliares){
    try {
      let consultarFamiliares = await this.familiarRepository.consultarFamiliares(COD_EMPL, COD_EMPR);
      if(!consultarFamiliares[0]){
        consultarFamiliares = {"error":"No se encontraron datos"};
      }
      return consultarFamiliares;  
    } catch (error) {
      throw new Error(error.message);  
    }
  }
    
  public async consultarActividad(){
    try {
      let consultarActividad = await this.familiarRepository.consultarActividad();
      if(!consultarActividad[0]){
        consultarActividad = {"error":"No se encontraron datos"};
      }
      return consultarActividad;
    } catch (error) {
      throw new Error(error.message);
    }  
  }
}