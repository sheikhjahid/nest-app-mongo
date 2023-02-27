import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Report } from 'src/report/schemas/report.schema';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  report: Report;
}
