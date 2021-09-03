import { IsNotEmpty, IsNumber, IsString, Max } from "class-validator";
export class ViviendaDto {
  
  @IsNumber()
  informacionBasica_codigo: number;

  @IsNotEmpty()
  @IsNumber()
  EMP_CODIGO: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(9999999999)
  NRO_DOCUMENTO: number;

}

export class CrearViviendaDto {
  
  @IsNotEmpty()
  @IsNumber()
  INFORMACION_BASICA_CODIGO: number;

  @IsNotEmpty()
  @IsString()
  TIPO_VIVIENDA: string;

  @IsNotEmpty()
  @IsString()
  PERIMETRO: string;

  @IsNotEmpty()
  @IsNumber()
  ESTRATO: number;

  @IsNotEmpty()
  @IsString()
  BENEFICIARIO_CREDITO_VIVIENDA: string;

  @IsNotEmpty()
  @IsString()
  CREDITO_VIVIENDA_VIGENTE: string;

  @IsString()
  SERVICIOS: string;

  @IsNotEmpty()
  @IsNumber()
  HABITANTES_VIVIENDA: number;

}