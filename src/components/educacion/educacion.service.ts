import { EducacionCrearDto } from "./dto/educacion.dto";
import { EducacionRepository } from "./repositories/educacion.repository";

export class EducacionService {
  constructor(private readonly educacionRepository: EducacionRepository) {}

  public async consultarNivelEstudio() {
    try {
      const consultarNivelEstudio = await this.educacionRepository.consultarNivelEstudio();
      return consultarNivelEstudio;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async consultarEstadoEstudio(){
    try {
      const consultarEstadoEstudio = await this.educacionRepository.consultarEstadoEstudio();
      return consultarEstadoEstudio;  
    } catch (error) {
      throw new Error(error.message);  
    }
  }

  public async consultarModalidadEstudio(){
    try {
      const consultarModalidadEstudio = await this.educacionRepository.consultarModalidadEstudio();
      return consultarModalidadEstudio;  
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
    } catch (error) {
      throw new Error(error.message);  
    }
  }

}
