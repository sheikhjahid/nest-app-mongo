import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  permission: Array<Types.ObjectId>;
}
