import { IsNotEmpty, IsNumber } from "class-validator";

export class EliminarRegistroDto {
  
  @IsNotEmpty()
  @IsNumber()
  EDUCACION_CODIGO: number;

}