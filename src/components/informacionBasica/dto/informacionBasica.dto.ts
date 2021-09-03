import { IsNotEmpty, IsNumber, Max } from "class-validator";

export class InformacionBasicaDto {
  
  @IsNotEmpty()
  @IsNumber()
  @Max(9999999999)
  cedula: number;

  @IsNotEmpty()
  @IsNumber()
  empresa: number;

}