import { IsNotEmpty, IsNumber, Max } from "class-validator";

export class BuscarDatosDto {

  @IsNotEmpty()
  @IsNumber()
  CODIGO_EMPRESA: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(9999999999)
  NRO_DOCUMENTO: number;

}