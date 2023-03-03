import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Permission } from 'src/permission/schemas/permission.schema';
import { Role } from 'src/role/schemas/role.schema';
import { User } from 'src/user/schemas/user.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

export class RolePermission implements Seeder {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async seed(): Promise<any> {
    const permissions = await this.permissionModel.insertMany([
      {
        name: 'manage',
        description: 'Manage all entities',
      },
      {
        name: 'create',
        description: 'Create report',
      },
      {
        name: 'read',
        description: 'Read report',
      },
      {
        name: 'update',
        description: 'Update report',
      },
      {
        name: 'delete',
        description: 'Delete report',
      },
    ]);

    const roles = await this.roleModel.insertMany([
      {
        name: 'admin',
        permission: [permissions[0]],
      },
      {
        name: 'customer',
        permission: [permissions[1], permissions[2], permissions[3]],
      },
    ]);

    const password = await bcrypt.hash('admin123', 10);
    await this.userModel.create({
      name: 'Admin',
      email: 'admin+sc@test.com',
      password: password,
      role: roles[0],
    });
  }

  async drop(): Promise<any> {
    await this.permissionModel.deleteMany();
    await this.roleModel.deleteMany();
    await this.userModel.deleteMany();
  }
}
