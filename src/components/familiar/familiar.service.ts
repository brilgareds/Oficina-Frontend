import { ConsultarFamiliares, FamiliarCrearDto, ActualizarFamiliar } from './dto/familiar.dto';
import { EliminarFamiliares } from './dto/eliminarFamiliar.dto';
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
    } catch (error:any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");    
    }
  }

  public async consultarTipoRelacion() {
    try {
      let consultarTipoRelacion = await this.familiarRepository.consultarTipoRelacion();
      if(!consultarTipoRelacion[0]){
        consultarTipoRelacion = {"error":"No se encontraron datos"};
      }
      return consultarTipoRelacion;
    } catch (error:any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");    
    }
  }

  public async crearFamiliar({COD_EMPL, COD_EMPR, TIP_IDEN, COD_FAMI, NOM_FAMI, APE_FAMI, TIP_RELA,
    SEX_FAMI, FEC_NACI, EST_VIDA, FAM_DEPE, EST_DISC, TIP_DISC, CONTACTO_EMER, FAMILIAR_IN_HOME,
    MPI_FAMI, DIR_FAMI, TEL_FAMI, TRA_ESTU, GRA_ESCO, BEN_CACO, BEN_EEPS, PARTICIPAR_ACTIV,
    HOB_FAMI, PAI_FAMI, DTO_FAMI}: FamiliarCrearDto){
      try {

        let crearFamiliar = await this.familiarRepository.consultarFamiliaresIndividual(COD_FAMI);
        
        if(!crearFamiliar[0]){
          crearFamiliar = await this.familiarRepository.crearFamiliar(COD_EMPL, COD_EMPR, TIP_IDEN, COD_FAMI, NOM_FAMI, APE_FAMI, TIP_RELA,
            SEX_FAMI, FEC_NACI, EST_VIDA, FAM_DEPE, EST_DISC, TIP_DISC, CONTACTO_EMER, FAMILIAR_IN_HOME,
            MPI_FAMI, DIR_FAMI, TEL_FAMI, TRA_ESTU, GRA_ESCO, BEN_CACO, BEN_EEPS, PARTICIPAR_ACTIV,
            HOB_FAMI, PAI_FAMI, DTO_FAMI);
        }else{
          crearFamiliar = await this.familiarRepository.actualizarFamiliar(TIP_IDEN, COD_FAMI, NOM_FAMI, APE_FAMI, TIP_RELA,
            SEX_FAMI, FEC_NACI, EST_VIDA, FAM_DEPE, EST_DISC, TIP_DISC, CONTACTO_EMER, FAMILIAR_IN_HOME,
            MPI_FAMI, DIR_FAMI, TEL_FAMI, TRA_ESTU, GRA_ESCO, BEN_CACO, BEN_EEPS, PARTICIPAR_ACTIV,
            HOB_FAMI, PAI_FAMI, DTO_FAMI);  
        }
         
        return {"ok":"Familiar creado"};
      } catch (error:any) {
        console.log("error: ",error.message);
        throw new Error("No se pudo realizar el proceso");
      }
      

  }

  public async consultarFamiliares({COD_EMPL, COD_EMPR}: ConsultarFamiliares){
    try {
      let consultarFamiliares = await this.familiarRepository.consultarFamiliares(COD_EMPL, COD_EMPR);
      if(!consultarFamiliares[0]){
        consultarFamiliares = await this.familiarRepository.consultarFamiliarKactus(COD_EMPL, COD_EMPR);
        if(!consultarFamiliares[0]){
          consultarFamiliares = {"error":"No se encontraron datos"};
        }else{
          //console.log(consultarFamiliares.length);
          //console.log(consultarFamiliares[0]['NOM_FAMI']);
          let tamano = parseInt(consultarFamiliares.length);

          for (let i = 0; i < tamano; i++) {
            
            let TIP_IDEN = consultarFamiliares[i]['TIP_IDEN'];
            let COD_FAMI = consultarFamiliares[i]['COD_FAMI'];
            let NOM_FAMI = consultarFamiliares[i]['NOM_FAMI'];
            let APE_FAMI = consultarFamiliares[i]['APE_FAMI'];
            let TIP_RELA = consultarFamiliares[i]['TIP_RELA'];
            let SEX_FAMI = consultarFamiliares[i]['SEX_FAMI'];
            let FEC_NACI = consultarFamiliares[i]['FEC_NACI'];
            let EST_VIDA = consultarFamiliares[i]['EST_VIDA'];
            let FAM_DEPE = consultarFamiliares[i]['FAM_DEPE'];
            let EST_DISC = consultarFamiliares[i]['EST_DISC'];
            let TIP_DISC = 0;
            let CONTACTO_EMER = "N";
            let FAMILIAR_IN_HOME = "N";
            let MPI_FAMI = consultarFamiliares[i]['MPI_FAMI'];
            let DIR_FAMI = consultarFamiliares[i]['DIR_FAMI'];
            let TEL_FAMI = consultarFamiliares[i]['TEL_FAMI'];
            let TRA_ESTU = consultarFamiliares[i]['TRA_ESTU'];
            let GRA_ESCO = consultarFamiliares[i]['GRA_ESCO'];
            let BEN_CACO = consultarFamiliares[i]['BEN_CACO'];
            let BEN_EEPS = consultarFamiliares[i]['BEN_EEPS'];
            let PARTICIPAR_ACTIV = "N";
            let HOB_FAMI = consultarFamiliares[i]['HOB_FAMI'];
            let PAI_FAMI = consultarFamiliares[i]['PAI_FAMI'];
            let DTO_FAMI = consultarFamiliares[i]['DTO_FAMI'];

            let crearFamiliar = await this.familiarRepository.crearFamiliar(COD_EMPL, COD_EMPR, TIP_IDEN, COD_FAMI, NOM_FAMI, APE_FAMI, TIP_RELA,
              SEX_FAMI, FEC_NACI, EST_VIDA, FAM_DEPE, EST_DISC, TIP_DISC, CONTACTO_EMER, FAMILIAR_IN_HOME,
              MPI_FAMI, DIR_FAMI, TEL_FAMI, TRA_ESTU, GRA_ESCO, BEN_CACO, BEN_EEPS, PARTICIPAR_ACTIV,
              HOB_FAMI, PAI_FAMI, DTO_FAMI);

              //console.log(crearFamiliar);
              
          }

          consultarFamiliares = await this.familiarRepository.consultarFamiliares(COD_EMPL, COD_EMPR);

          return consultarFamiliares;
        }
        
      }
      return consultarFamiliares;  
    } catch (error:any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");    
    }
  }
    
  public async consultarActividad(){
    try {
      let consultarActividad = await this.familiarRepository.consultarActividad();
      if(!consultarActividad[0]){
        consultarActividad = {"error":"No se encontraron datos"};
      }
      return consultarActividad;
    } catch (error:any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");    
    }  
  }

  public async actualizarFamiliar({ TIP_IDEN, COD_FAMI, NOM_FAMI, APE_FAMI, TIP_RELA,
                                    SEX_FAMI, FEC_NACI, EST_VIDA, FAM_DEPE, EST_DISC, TIP_DISC, CONTACTO_EMER, FAMILIAR_IN_HOME,
                                    MPI_FAMI, DIR_FAMI, TEL_FAMI, TRA_ESTU, GRA_ESCO, BEN_CACO, BEN_EEPS, PARTICIPAR_ACTIV,
                                    HOB_FAMI, PAI_FAMI, DTO_FAMI}: ActualizarFamiliar){
    try {
      let actualizarFamiliar = await this.familiarRepository.actualizarFamiliar(TIP_IDEN, COD_FAMI, NOM_FAMI, APE_FAMI, TIP_RELA,
                                    SEX_FAMI, FEC_NACI, EST_VIDA, FAM_DEPE, EST_DISC, TIP_DISC, CONTACTO_EMER, FAMILIAR_IN_HOME,
                                    MPI_FAMI, DIR_FAMI, TEL_FAMI, TRA_ESTU, GRA_ESCO, BEN_CACO, BEN_EEPS, PARTICIPAR_ACTIV,
                                    HOB_FAMI, PAI_FAMI, DTO_FAMI);
      return {"ok":"Usuario actualizado"};  
    } catch (error:any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");    
    }
  }

  public async eliminarFamiliaresIndividual({ COD_FAMI }:EliminarFamiliares){
    try {
      const consultarActividad = await this.familiarRepository.eliminarFamiliaresIndividual(COD_FAMI);
      return {"ok":"Familiar eliminado"};
    } catch (error:any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");    
    }  
  }

}