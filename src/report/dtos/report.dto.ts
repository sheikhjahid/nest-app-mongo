import { Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export class ReportDto {
  @Expose()
  id: Types.ObjectId;

  @Expose()
  title: string;

  @Expose()
  approved: boolean;

  @Transform(({ obj }) => {
    return { name: obj.user.name, email: obj.user.email };
  })
  @Expose()
  user: User;
}
