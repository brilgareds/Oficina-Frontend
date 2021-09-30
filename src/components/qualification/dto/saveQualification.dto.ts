import { IsNotEmpty, IsNumber, Max } from "class-validator";

export class CrearRegistroSaludDto {

  @IsNotEmpty()
  @IsNumber()
  @Max(9999999999)
  OVT_CEDULA: number;

  input_add: any;

  sendNotification: any;

  @IsNotEmpty()
  @IsNumber()
  CALIFICACION: number;

}