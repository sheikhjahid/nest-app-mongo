import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from './dtos/signup.dto';
import { User } from './schemas/user.schema';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async create(body: SignUpDto) {
    return await this.model.create(body);
  }

  async listUser(condition: any = {}) {
    return await this.model.find(condition).sort({ created_at: -1 });
  }

  async findUser(payload: { [index: string]: string }) {
    return await this.model.findOne(payload);
  }
}
