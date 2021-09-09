import { IsNotEmpty, IsNumber, IsString, Max, IsArray } from "class-validator";

export class ActualizarDatosAdicionalesDto {

  @IsNotEmpty()
  @IsNumber()
  @Max(9999999999)
  NRO_DOCUMENTO: number;

  @IsNotEmpty()
  @IsNumber()
  CODIGO_EMPRESA: number;

  @IsString()
  HOBBIES: string;

  @IsString()
  PROFESION: string;

  ANOS_PROFESION: number;

  INGRESOS_ADICIONALES: number;

  MASCOTA: number;

  @IsString()
  CUAL_MASCOTA: string;

  RECREACION: number;

  @IsString()
  CUAL_RECREACION: string;

  @IsString()
  FRECUENCIA_RECREACION: string;

  DEPORTE: number;

  @IsString()
  CUAL_DEPORTE: string;

  @IsString()
  FRECUENCIA_DEPORTE: string;

  OTRO_TRABAJO: number;

  @IsString()
  CUAL_OTRO_TRABAJO: string;

  @IsString()
  FRECUENCIA_OTRO_TRABAJO: string;

  VEHICULO: number;

  @IsString()
  CUAL_VEHICULO: string;

  LICENCIA_CONDUCCION: number;

  @IsString()
  LICENCIA_CONDUCCION_TIPO: string;

  GRUPO_SOCIAL: number;

  @IsString()
  CUAL_GRUPO_SOCIAL: string;

  AHORRO: number;

  PORCENTAJE_AHORRO_SALARIAL: number;

  @IsString()
  DESTINO_AHORROS: string;

  @IsString()
  INTERES_OTRO: string;

  @IsString()
  CONVENIOS_ADICIONALES: string;

  @IsString()
  DEPORTES_INTERES: string;

  @IsArray()
  arrayCondicionEspecial: number[];

  @IsArray()
  arrayDeudas: number[];

  @IsArray()
  arrayDeudasFuturas: number[];
  
  @IsArray()
  arrayTemasInteres: number[];

}