import { IsNotEmpty, IsNumber, IsString, Max } from "class-validator";

export class EducacionCrearDto {
  
  @IsNotEmpty()
  @IsNumber()
  MENU_CODIGO: number;
  
  @IsNotEmpty()
  @IsNumber()
  INFORMACION_BASICA_CODIGO: number;
  
  @IsNotEmpty()
  @IsNumber()
  NIVEL_ESTUDIO: number;
  
  @IsNotEmpty()
  @IsString()
  TITULO: string;
  
  @IsNotEmpty()
  @IsString()
  INSTITUCION: string;
  
  @IsNotEmpty()
  @IsNumber()
  CIUDAD: number;
  
  @IsNotEmpty()
  @IsNumber()
  ESTADO_ESTUDIO: number;
  
  @IsNotEmpty()
  @IsNumber()
  FECHA_INICIO: string;
  
  @IsNotEmpty()
  @IsString()
  FECHA_FINALIZACION: string
    
  @IsString()
  FECHA_GRADO_TENTATIVO: string;
    
  @IsNumber()
  MODALIDAD_ESTUDIO: number;
    
  @IsString()
  PROMEDIO: string;
}

export class ConsultarDatosEstudio {
  
  @IsNotEmpty()
  @IsNumber()
  cedula: number;
}