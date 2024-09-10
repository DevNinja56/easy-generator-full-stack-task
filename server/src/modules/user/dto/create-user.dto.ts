import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ required: true, example: "John Doe" })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    description: "The email address of the user",
    example: "user@example.com",
  })
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @ApiProperty({
    required: true,
    description: "The password of the user",
    example: "P@ssw0rd123",
    minLength: 8,
    pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
  })
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      "Password must contain at least one letter, one number, and one special character",
  })
  password: string;
}
