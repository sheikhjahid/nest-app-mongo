import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class DeleteProfileDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}
