import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class PaginationDto {
  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  readonly page: number;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  readonly limit: number;
}
