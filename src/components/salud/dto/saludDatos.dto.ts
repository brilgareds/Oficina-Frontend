import { IsNotEmpty, IsNumber, Max } from "class-validator";

export class SaludDatosDto {

  @IsNotEmpty()
  @IsNumber()
  @Max(9999999999)
  cedula: number;

  @IsNotEmpty()
  @IsNumber()
  empresa: number;

}