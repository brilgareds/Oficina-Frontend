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

export class CiudadesDto {
  
  @IsNotEmpty()
  @IsNumber()
  codDepartamento: number;

}

export class ActualizarInformacionBasicaDto {

  @IsNotEmpty()
  @IsString()
  TIP_CODIGO_DOCUMENTO: string;

  @IsNotEmpty()
  @IsNumber()
  EMP_CODIGO: number;

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

  @IsNumber()
  CELULAR_CONTACTO: number;

  @IsNumber()
  CELULAR_CORPORATIVO:number;

  @IsNumber()
  ANTIGUEDAD_EMPRESA: number;

  @IsNumber()
  PLAN_CARRERA: number;

  @IsNumber()
  NRO_CARGOS: number;

  @IsString()
  CARGOS_OCUPADOS: string;

}