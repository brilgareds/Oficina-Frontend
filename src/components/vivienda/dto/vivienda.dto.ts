import { IsNotEmpty, IsNumber, Max } from "class-validator";

export class ViviendaDto {

  @IsNotEmpty()
  @IsNumber()
  EMP_CODIGO: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(9999999999)
  NRO_DOCUMENTO: number;

}