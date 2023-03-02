import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { Permission } from './schemas/permission.schema';

@Injectable()
export class PermissionService {
  constructor(@InjectModel(Permission.name) private model: Model<Permission>) {}

  async create(payload: CreatePermissionDto) {
    const permissionModel = new this.model(payload);
    return await permissionModel.save();
  }

  async list(condition: { [index: string]: string } = {}) {
    const permissions = await this.model.find(condition, { name: 1 });
    return permissions.map((permission) => permission.name);
  }
}
