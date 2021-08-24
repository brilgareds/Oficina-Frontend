import { IsEmpty, IsNumber } from "class-validator";

export class CategoryParamsDto {
  @IsEmpty()
  @IsNumber()
  readonly code: number;

  @IsEmpty()
  @IsNumber()
  readonly type: number;
}
