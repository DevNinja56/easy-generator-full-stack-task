import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";
// @Dto
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {}
