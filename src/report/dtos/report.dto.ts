import { Expose, Transform } from 'class-transformer';
import { User } from 'src/user/schemas/user.schema';

export class ReportDto {
  @Expose()
  title: string;

  @Transform(({ obj }) => console.log(obj))
  @Expose()
  user: User;
}
