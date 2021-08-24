import { IsNotEmpty, Max } from "class-validator";
export class InformacionBasicaDto {
  @IsNotEmpty()
  @Max(9999999999)
  cedula: number;

  @IsNotEmpty()
  empresa: number;
}