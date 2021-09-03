import { IsNotEmpty, IsNumber} from "class-validator";

export class CiudadesDto {
  
  @IsNotEmpty()
  @IsNumber()
  codDepartamento: number;

}