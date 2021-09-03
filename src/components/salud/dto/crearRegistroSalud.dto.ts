import { IsNotEmpty, IsNumber, IsString, Max } from "class-validator";

export class CrearRegistroSaludDto {

  @IsNotEmpty()
  @IsNumber()
  EMPRESA: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(9999999999)
  NRO_DOCUMENTO: number;

  @IsNotEmpty()
  @IsString()
  GRUPO_SANGUINEO: string;

  @IsNotEmpty()
  @IsString()
  FACTOR: string;

  @IsNotEmpty()
  @IsString()
  ESTATURA: string;

  @IsNotEmpty()
  @IsString()
  PESO: string;

  @IsNotEmpty()
  @IsString()
  RAZA: string;

  @IsString()
  FUMADOR: string;

  @IsString()
  BEBEDOR: string;

  @IsString()
  ANTEOJOS: string;

  @IsString()
  ENFERMEDADES: string;

  @IsString()
  RESTRICCIONES_MEDICAS: string;

  @IsString()
  FRECUENCIA_ASISTENCIA_MEDICA: string;

  @IsString()
  SUFRE_ALERGIAS: string;

  @IsString()
  ALERGIAS: string;

  @IsString()
  CONTACTO_EMERGENCIA: string;

  @IsString()
  NUMERO_CONTACTO_EMERGENCIA: string;

  @IsString()
  ENFERMEDAD_LABORAL: string;

  @IsNumber()
  PERDIDA_CAPACIDAD_SALUD: number;

  @IsString()
  PLAN_SALUD_NO_EPS: string;

  @IsString()
  PLAN_SALUD: string;

  @IsString()
  PLAN_SALUD_OTROS: string;

  @IsString()
  ENTIDAD_OTROS: string;

}