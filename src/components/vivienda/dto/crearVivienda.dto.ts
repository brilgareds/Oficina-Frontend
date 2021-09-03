import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CrearViviendaDto {
  
  @IsNotEmpty()
  @IsNumber()
  NRO_DOCUMENTO: number;

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

  @IsNotEmpty()
  @IsNumber()
  CODIGO_EMPRESA: number

}