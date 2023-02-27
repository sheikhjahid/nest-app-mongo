import { Expose } from 'class-transformer';
import { User } from 'src/user/schemas/user.schema';

export class ReportDto {
  @Expose()
  title: string;

  @Expose()
  user: User;
}
