import { IsNotEmpty, IsNumber} from "class-validator";

export class CiudadesDto {
  
  @IsNotEmpty()
  @IsNumber()
  codPais: number;

  @IsNotEmpty()
  @IsNumber()
  codDepartamento: number;

}