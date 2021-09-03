import { IsNotEmpty, IsNumber} from "class-validator";

export class DepartamentosDto {
  
  @IsNotEmpty()
  @IsNumber()
  codPais: number;

}