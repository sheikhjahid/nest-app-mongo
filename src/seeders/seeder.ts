import { MongooseModule } from '@nestjs/mongoose';
import { dbConfig } from 'db/dbConfig';
import { seeder } from 'nestjs-seeder';
import {
  Permission,
  PermissionSchema,
} from 'src/permission/schemas/permission.schema';
import { Role, RoleSchema } from 'src/role/schemas/role.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { RolePermission } from './role-permission.seeder';

seeder({
  imports: [
    MongooseModule.forRootAsync(dbConfig),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
}).run([RolePermission]);
