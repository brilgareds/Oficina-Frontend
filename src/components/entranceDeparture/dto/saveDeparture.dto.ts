import { IsIn, IsNotEmpty, IsNumber, ValidateIf } from "class-validator";

export class SaveDepartureDto {
  @IsNotEmpty()
  @IsIn([1164, 1165, 1166])
  @IsNumber()
  readonly typeEntrance: number | string;

  @ValidateIf((dto) => dto.typeEntrance == "1166" || dto.typeEntrance == "1165")
  @IsNumber({ maxDecimalPlaces: 1 })
  readonly temperature: number | string = "NULL";

  constructor(dto: SaveDepartureDto) {
    Object.assign(this, dto);
  }
}
