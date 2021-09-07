import { IsNotEmpty, IsNumber, Max } from "class-validator";

export class EliminarFamiliares {
  
  @IsNotEmpty()
  @IsNumber()
  @Max(9999999999)
  COD_FAMI: number;

}