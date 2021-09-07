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
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async consultarEstadoEstudio(){
    try {
      let consultarEstadoEstudio = await this.educacionRepository.consultarEstadoEstudio();
      if(!consultarEstadoEstudio[0]){
        consultarEstadoEstudio = {"error":"No se encontraron datos"};
      }
      return consultarEstadoEstudio;  
    } catch (error) {
      throw new Error(error.message);  
    }
  }

  public async consultarModalidadEstudio(){
    try {
      let consultarModalidadEstudio = await this.educacionRepository.consultarModalidadEstudio();
      if(!consultarModalidadEstudio[0]){
        consultarModalidadEstudio = {"error":"No se encontraron datos"};
      }
      return consultarModalidadEstudio;  
    } catch (error) {
      throw new Error(error.message);  
    }
  }

  public async consultarDatosEstudios({cedula}:ConsultarDatosEstudio){
    try {
      let consultarDatosEstudio = await this.educacionRepository.consultarDatosEstudio(cedula);
      if(!consultarDatosEstudio[0]){
        consultarDatosEstudio = {"error":"No se encontraron datos"};
      }
      return consultarDatosEstudio;
    } catch (error) {
      throw new Error(error.message);  
    }
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
    PROMEDIO}: EducacionCrearDto){
    try {
      let crearRegistro = await this.educacionRepository.crearRegistro(MENU_CODIGO, 
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
        PROMEDIO);
      return {"ok":"registro creado"}
    } catch (error) {
      throw new Error(error.message);  
    }
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
    PROMEDIO}: ActualizarRegistroDto){
    try {

      let crearRegistro = await this.educacionRepository.actualizarRegistro(
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
          PROMEDIO);
      return {"ok":"registro actualizado"}
    } catch (error) {
      throw new Error(error.message);  
    }
  }

  public async eliminarRegistro({ EDUCACION_CODIGO }: EliminarRegistroDto){
    try {
      const eliminarRegistro = await this.educacionRepository.eliminarRegistro(EDUCACION_CODIGO);
      return {"ok":"Registro de educación eliminado"}
    } catch (error) {
      throw new Error(error.message);  
    }
  }

}
