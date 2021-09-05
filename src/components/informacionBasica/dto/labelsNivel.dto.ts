import { IsNotEmpty, IsNumber } from "class-validator";

export class LabelsNivelDto {
  
  @IsNotEmpty()
  @IsNumber()
  empresa: number;

  @IsNotEmpty()
  @IsNumber()
  nivel: number;

}