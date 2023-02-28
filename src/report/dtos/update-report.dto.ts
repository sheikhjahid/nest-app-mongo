import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateReportDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @Min(0)
  @Max(100)
  @IsNumber()
  price: string;

  @IsOptional()
  files: any[];
}
