import { Expose, Transform } from 'class-transformer';
import { Report } from 'src/report/schemas/report.schema';

export class UserDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Transform(({ obj }) =>
    obj.report.map((r) => {
      return {
        title: r.title,
        description: r.description,
        approved: r.approved,
      };
    }),
  )
  @Expose()
  report: Report[];

  @Expose()
  token?: string;
}
