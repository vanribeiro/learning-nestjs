import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsISO8601, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: "name is required" })
  name!: string;

  @IsNotEmpty({ message: "email is required" })
  @IsEmail({}, { message: "email is not valid" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "birthday is required" })
  @IsISO8601(
    { strict: true },
    { message: "birthday should have a valid format YYYY-MM-DD (ISO 8601)" },
  )
  birthday!: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
