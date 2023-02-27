import { Expose, Transform } from 'class-transformer';
import { Report } from 'src/report/schemas/report.schema';

export class UserDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Transform(({ obj }) => console.log(obj))
  @Expose()
  report: Report[];

  @Expose()
  token?: string;
}
