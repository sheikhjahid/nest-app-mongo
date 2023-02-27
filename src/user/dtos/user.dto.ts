import { Expose, Transform } from 'class-transformer';
import { Report } from 'src/report/schemas/report.schema';

export class UserDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Transform(({ obj }) =>
    obj.report != undefined
      ? obj.report.map((r) => {
          return {
            title: r.title,
            description: r.description,
            price: r.price,
            approved: r.approved,
          };
        })
      : [],
  )
  @Expose()
  report?: Report[];

  @Expose()
  token?: string;
}
