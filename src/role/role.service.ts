import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dtos/create-role.dto';
import { Role } from './schemas/role.schema';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private model: Model<Role>) {}

  async create(payload: CreateRoleDto) {
    const roleModel = new this.model(payload);
    return await roleModel.save();
  }

  async find(condition: { [index: string]: string } = {}): Promise<Role[]> {
    return await this.model.find(condition).populate('permission');
  }
}
