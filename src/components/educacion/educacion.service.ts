import { EducacionCrearDto, ConsultarDatosEstudio } from "./dto/educacion.dto";
import { ActualizarRegistroDto } from "./dto/actualizarRegistro.dto";
import { EliminarRegistroDto } from "./dto/eliminarRegistro.dto";
import { EducacionRepository } from "./repositories/educacion.repository";

export class EducacionService {
  constructor(private readonly educacionRepository: EducacionRepository) {}

  public async consultarNivelEstudio() {
    try {
      let consultarNivelEstudio = await this.educacionRepository.consultarNivelEstudio();
      if(!consultarNivelEstudio[0]){
        consultarNivelEstudio = {"error":"No se encontraron datos"};
      }
      return consultarNivelEstudio;
    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");    }
  }

  public async consultarEstadoEstudio(){
    try {
      let consultarEstadoEstudio = await this.educacionRepository.consultarEstadoEstudio();
      if(!consultarEstadoEstudio[0]){
        consultarEstadoEstudio = {"error":"No se encontraron datos"};
      }
      return consultarEstadoEstudio;  
    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");    }
  }

  public async consultarModalidadEstudio(){
    try {
      let consultarModalidadEstudio = await this.educacionRepository.consultarModalidadEstudio();
      if(!consultarModalidadEstudio[0]){
        consultarModalidadEstudio = {"error":"No se encontraron datos"};
      }
      return consultarModalidadEstudio;  
    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");    }
  }

  public async consultarDatosEstudios({cedula}:ConsultarDatosEstudio){
    try {
      let consultarDatosEstudio = await this.educacionRepository.consultarDatosEstudio(cedula);
      if(!consultarDatosEstudio[0]){
        consultarDatosEstudio = {"error":"No se encontraron datos"};
      }
      return consultarDatosEstudio;
    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");    }
  }

  public async crearRegistro({MENU_CODIGO, 
    INFORMACION_BASICA_CODIGO,
    NIVEL_ESTUDIO,
    TITULO,
    INSTITUCION,
    CIUDAD,
    ESTADO_ESTUDIO,
    FECHA_INICIO,
    FECHA_FINALIZACION,
    FECHA_GRADO_TENTATIVO,
    MODALIDAD_ESTUDIO,
    PROMEDIO,
    PAI_CODIGO,
    DTO_CODIGO}: EducacionCrearDto,
    url:string){
    try {

      const FECHA_INICIO_string = (FECHA_INICIO)?"'"+FECHA_INICIO+"'":"NULL";
      const FECHA_FINALIZACION_string = (FECHA_FINALIZACION)?"'"+FECHA_FINALIZACION+"'":"NULL";
      const FECHA_GRADO_TENTATIVO_string = (FECHA_GRADO_TENTATIVO)?"'"+FECHA_GRADO_TENTATIVO+"'":"NULL";
      const URL_string = (url)?"'"+url+"'":"NULL";

      let crearRegistro = await this.educacionRepository.crearRegistro(MENU_CODIGO, 
        INFORMACION_BASICA_CODIGO,
        NIVEL_ESTUDIO,
        TITULO,
        INSTITUCION,
        CIUDAD,
        ESTADO_ESTUDIO,
        FECHA_INICIO_string,
        FECHA_FINALIZACION_string,
        FECHA_GRADO_TENTATIVO_string,
        MODALIDAD_ESTUDIO,
        PROMEDIO,
        PAI_CODIGO,
        DTO_CODIGO,
        URL_string);
      return {"ok":"registro creado"}
    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");    }
  }

  public async actualizarRegistro({
    EDUCACION_CODIGO,
    NIVEL_ESTUDIO,
    TITULO,
    INSTITUCION,
    CIUDAD,
    ESTADO_ESTUDIO,
    FECHA_INICIO,
    FECHA_FINALIZACION,
    FECHA_GRADO_TENTATIVO,
    MODALIDAD_ESTUDIO,
    PROMEDIO,
    PAI_CODIGO,
    DTO_CODIGO}: ActualizarRegistroDto,
    URL: string){
    try {
      
      const FECHA_INICIO_string = (FECHA_INICIO)?"'"+FECHA_INICIO+"'":"NULL";
      const FECHA_FINALIZACION_string = (FECHA_FINALIZACION)?"'"+FECHA_FINALIZACION+"'":"NULL";
      const FECHA_GRADO_TENTATIVO_string = (FECHA_GRADO_TENTATIVO)?"'"+FECHA_GRADO_TENTATIVO+"'":"NULL";
      const URL_string = (URL)?",URL = '"+URL+"'":"";;

      const actualizarRegistro = await this.educacionRepository.actualizarRegistro(
          EDUCACION_CODIGO,
          NIVEL_ESTUDIO,
          TITULO,
          INSTITUCION,
          CIUDAD,
          ESTADO_ESTUDIO,
          FECHA_INICIO_string,
          FECHA_FINALIZACION_string,
          FECHA_GRADO_TENTATIVO_string,
          MODALIDAD_ESTUDIO,
          PROMEDIO,
          PAI_CODIGO,
          DTO_CODIGO,
          URL_string);
      return {"ok":"registro actualizado"}
    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");    }
  }

  public async eliminarRegistro({ EDUCACION_CODIGO }: EliminarRegistroDto){
    try {
      const eliminarRegistro = await this.educacionRepository.eliminarRegistro(EDUCACION_CODIGO);
      return {"ok":"Registro de educaci??n eliminado"}
    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");    }
  }

}
