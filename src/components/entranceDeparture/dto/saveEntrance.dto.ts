import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";

export class SaveEntranceDto {
  @IsNotEmpty()
  @IsIn([1164, 1165, 1166])
  @IsNumber()
  readonly typeEntrance: number | string;

  @ValidateIf((dto) => dto.typeEntrance == "1166" || dto.typeEntrance == "1165")
  @IsNumber({ maxDecimalPlaces: 1 })
  readonly temperature: number | string = "NULL";

  @IsOptional()
  @ValidateIf((object, value) => value !== "NULL")
  @IsNumber({ maxDecimalPlaces: 8 })
  readonly longitude: number | string = "NULL";

  @IsOptional()
  @ValidateIf((object, value) => value !== "NULL")
  @IsNumber({ maxDecimalPlaces: 8 })
  readonly latitude: number | string = "NULL";

  @IsOptional()
  @IsString()
  readonly reason: string = "NULL";

  @ValidateIf((dto) => dto.typeEntrance == "1166")
  @IsNumber()
  readonly branch: number | string = "NULL";

  @ValidateIf((dto) => dto.typeEntrance == "1165")
  @IsNumber()
  readonly city: number | string = "NULL";

  @ValidateIf((dto) => dto.city && dto.city !== "NULL")
  @IsNumber()
  readonly salePoint: number | string = "NULL";

  @ValidateIf((dto) => dto.salePoint == "0")
  @IsString()
  readonly otherSalePoint: string = "NULL";

  constructor(dto: SaveEntranceDto) {
    Object.assign(this, dto);
  }
}
