import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class loginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  password: string;
}