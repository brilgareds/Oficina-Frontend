import { IsNotEmpty, IsNumber, IsString, Max } from "class-validator";

export class ActualizarRegistroDto {
  
  @IsNotEmpty()
  @IsNumber()
  EDUCACION_CODIGO: number;

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
  
  @IsNotEmpty()
  @IsString()
  FECHA_GRADO_TENTATIVO: string;
  
  @IsNotEmpty()
  @IsNumber()
  MODALIDAD_ESTUDIO: number;
    
  @IsNotEmpty()
  @IsString()
  PROMEDIO: string;

  @IsNotEmpty()
  @IsNumber()
  PAI_CODIGO: number;

  @IsNotEmpty()
  @IsNumber()
  DTO_CODIGO: number;

}