import { IsNotEmpty, IsNumber, IsString, Max } from "class-validator";

export class ActualizarInformacionBasicaDto {

  @IsNotEmpty()
  @IsString()
  TIP_CODIGO_DOCUMENTO: string;

  @IsNotEmpty()
  @IsNumber()
  EMP_CODIGO: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(9999999999)
  NRO_DOCUMENTO: number;

  @IsNotEmpty()
  @IsString()
  NOMBRES: string;

  @IsNotEmpty()
  @IsString()
  APELLIDOS: string;

  @IsNotEmpty()
  @IsString()
  SEXO: string;

  @IsNotEmpty()
  @IsString()
  FECHA_NACIMIENTO: string

  @IsString()
  ESTADO_CIVIL: string;

  @IsNumber()
  DEPARTAMENTO_RESIDENCIA: number;

  @IsNumber()
  CIUDAD_RESIDENCIA: number

  @IsString()
  BARRIO_RESIDENCIA: string;

  @IsString()
  LOCALIDAD_RESIDENCIA: string;

  @IsString()
  DIRECCION_COMPLETA: string;

  @IsString()
  EMAIL_PERSONAL: string;

  @IsString()
  EMAIL_CORPORATIVO:string;

  @IsString()
  CELULAR_CONTACTO: string;

  @IsString()
  CELULAR_CORPORATIVO:string;

  @IsNumber()
  ANTIGUEDAD_EMPRESA: number;

  @IsNumber()
  PLAN_CARRERA: number;

  @IsNumber()
  NRO_CARGOS: number;

  @IsString()
  CARGOS_OCUPADOS: string;

  @IsNotEmpty()
  @IsNumber()
  USA_UNIFORME: number

  @IsNumber()
  TALLA_CAMISA: number

  @IsNumber()
  TALLA_PANTALON: number

  @IsNumber()
  TALLA_CALZADO: number

}