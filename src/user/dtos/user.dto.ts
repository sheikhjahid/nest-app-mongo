import { Expose, Transform } from 'class-transformer';
import { Report } from 'src/report/schemas/report.schema';

export class UserDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  report: Report[];

  @Expose()
  token?: string;
}
