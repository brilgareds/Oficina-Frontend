import { IsNotEmpty, IsNumber, Max } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(9999999999)
  readonly identification: number;

  // @IsNotEmpty()
  // @IsString()
  // readonly username: string;

  // @IsNotEmpty()
  // @IsString()
  // readonly password: string;
}
