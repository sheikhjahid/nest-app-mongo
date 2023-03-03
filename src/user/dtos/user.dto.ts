import { Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { Report } from 'src/report/schemas/report.schema';
import { Role } from 'src/role/schemas/role.schema';

export class UserDto {
  @Expose()
  id: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  picUrl: string;

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

  @Transform(({ obj }) => obj.role)
  @Expose()
  role?: Role;

  @Expose()
  token?: string;
}
