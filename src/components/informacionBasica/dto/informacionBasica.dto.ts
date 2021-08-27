import { IsNotEmpty, IsNumber, IsString, Max } from "class-validator";
export class InformacionBasicaDto {
  
  @IsNotEmpty()
  @IsNumber()
  @Max(9999999999)
  cedula: number;

  @IsNotEmpty()
  @IsNumber()
  empresa: number;

}

export class DepartamentosDto {
  
  @IsNotEmpty()
  @IsNumber()
  codPais: number;

}

export class ActualizarInformacionBasicaDto {

  @IsNotEmpty()
  @IsNumber()
  TIP_CODIGO_DOCUMENTO: number;

  @IsNotEmpty()
  @IsNumber()
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

  @IsNumber()
  ESTADO_CIVIL: number;

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

  @IsNumber()
  CELULAR_CONTACTO: number;

  @IsNumber()
  CELULAR_CORPORATIVO:number;

  @IsNotEmpty()
  @IsNumber()
  NIVEL2: number;

  @IsNotEmpty()
  @IsNumber()
  NUVEL4: number;

  @IsNotEmpty()
  @IsNumber()
  NIVEL5: number;

  @IsNotEmpty()
  @IsString()
  CARGO_ACTUAL: string;

  @IsNumber()
  ANTIGUEDAD_EMPRESA: number;

  @IsNumber()
  PLAN_CARRERA: number;

  @IsNumber()
  NRO_CARGOS: number;

  @IsString()
  CARGOS_OCUPADOS: string;

}