import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteProfileDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
